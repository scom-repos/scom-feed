import {
    ControlElement,
    customElements,
    Module,
    Container,
    Markdown,
    Styles,
    VStack,
    IDataSchema,
    IUISchema,
    MarkdownEditor,
    Modal,
    Label,
    Button,
    Control,
    Panel,
    application,
    IconName

} from '@ijstech/components';
import dataConfig from './data.json';
import {IFeed, getBuilderSchema, getEmbedderSchema} from './global/index';
import {setDataFromJson} from './store/index';
import {IPost, IPostData, ScomPost} from '@scom/scom-post';
import {getHoverStyleClass} from './index.css';
import {ScomPostComposer} from '@scom/scom-post-composer';

const Theme = Styles.Theme.ThemeVars;
type callbackType = (target: ScomPost, event?: MouseEvent) => void
type submitCallbackType = (content: string, medias: IPostData[]) => void

interface ScomFeedElement extends ControlElement {
    data?: IFeed;
    isListView?: boolean;
    theme?: Markdown["theme"];
    composerPlaceholder?: string;
    isComposerVisible?: boolean;
    onItemClicked?: callbackType;
    onPostButtonClicked?: submitCallbackType;
    env?: string;
    onLikeButtonClicked?: callbackType;
    onRepostButtonClicked?: callbackType;
    avatar?: string;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['i-scom-feed']: ScomFeedElement;
        }
    }
}

type Action = {
    caption: string;
    icon?: {name: string, fill?: string;};
    tooltip?: string;
    onClick?: () => void;
    hoveredColor?: string;
}

const DefaultPlaceholder = "What's on your mind today?";

@customElements('i-scom-feed')
export default class ScomFeed extends Module {
    private pnlInput: Panel;
    private inputReply: ScomPostComposer;
    private pnlPosts: VStack;
    private mdFilter: Modal;
    private lbFilter: Label;
    private pnlFilter: Panel;
    private btnMore: Button;
    private mdActions: Modal;
    private pnlActions: Panel;
    private pnlLoading: VStack;
    private mdCreatePost: Modal;
    private inputCreatePost: ScomPostComposer;

    private currentContent: Control;
    private currentPost: IPost;
    private isRendering: boolean = false;
    private _data: IFeed = {
        posts: []
    };
    private _isListView: boolean = false;
    private _theme: Markdown['theme'];
    private _isComposerVisible: boolean = false;
    private _composerPlaceholder: string = DefaultPlaceholder;
    private env: string;

    onItemClicked: callbackType;
    onPostButtonClicked: submitCallbackType;
    onLikeButtonClicked: callbackType;
    onRepostButtonClicked: callbackType;

    tag = {
        light: {},
        dark: {}
    }

    constructor(parent?: Container, options?: any) {
        super(parent, options);
        if (dataConfig) setDataFromJson(dataConfig);
        this.onReplySubmit = this.onReplySubmit.bind(this);
        this.onViewPost = this.onViewPost.bind(this);
    }

    static async create(options?: ScomFeedElement, parent?: Container) {
        let self = new this(parent, options);
        await self.ready();
        return self;
    }

    get posts() {
        return this._data.posts || [];
    }

    set posts(value: IPost[]) {
        this._data.posts = value || [];
    }

    get isListView() {
        return this._isListView ?? false;
    }

    set isListView(value: boolean) {
        this._isListView = value ?? false;
        this.pnlFilter.visible = false && !this.isListView;
        this.btnMore.visible = false; // !this.isListView;
        this.controlInputDisplay();
    }

    set theme(value: Markdown["theme"]) {
        this._theme = value;
        this.updateTheme();
    }

    get theme() {
        return this._theme;
    }

    get isComposerVisible() {
        return this._isComposerVisible;
    }

    set isComposerVisible(value: boolean) {
        this._isComposerVisible = value ?? false;
        this.inputReply.visible = this._isComposerVisible;
        this.controlInputDisplay();
    }

    get composerPlaceholder() {
        return this._composerPlaceholder;
    }

    set composerPlaceholder(value: string) {
        this._composerPlaceholder = value ?? '';
        this.inputReply.placeholder = this._composerPlaceholder;
    }

    get avatar() {
        return this.inputReply.avatar;
    }

    set avatar(value: string) {
        this.inputReply.avatar = value;
        this.inputCreatePost.avatar = value;
    }

    get isSmallScreen() {
        return window.innerWidth < 768;
    }

    controlInputDisplay() {
        this.pnlInput.visible = !this.isListView && this._isComposerVisible && !this.isSmallScreen;
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('resize', (e) => {
          this.controlInputDisplay();
        });
    }

    clear() {
        this.inputReply.clear();
        this.pnlPosts.clearInnerHTML();
        this.isRendering = false;
    }

    showLoading() {
        this.pnlLoading.visible = true;
    }

    hideLoading() {
        this.pnlLoading.visible = false;
    }

    private async setData(data: IFeed) {
        this._data = data;
        await this.renderUI();
    }

    private getData() {
        return this._data;
    }

    private async renderUI() {
        this.clear();
        if (!this.posts?.length || this.isRendering) return;
        this.isRendering = true;
        this.renderPosts();
        this.isRendering = false;
    }

    private onCopyNoteText() {
        // const range = document.createRange();
        // range.selectNodeContents(this.currentContent);
        // const selectedText = range.toString();
        // const tempTextarea = document.createElement('textarea');
        // tempTextarea.value = selectedText;
        // document.body.appendChild(tempTextarea);
        // tempTextarea.select();
        // document.execCommand('copy');
        // document.body.removeChild(tempTextarea);
    }

    private renderActions() {
        const actions: Action[] = [
            {
                caption: 'Copy note link',
                icon: {name: 'copy'},
                tooltip: 'The link has been copied successfully',
                onClick: () => {
                    application.copyToClipboard(`${window.location.origin}/#/e/${this.currentPost.id}`);
                    this.mdActions.visible = false;
                }
            },
            {
                caption: 'Copy note text',
                icon: {name: 'copy'},
                tooltip: 'The text has been copied successfully',
                onClick: () => {
                    // this.onCopyNoteText();
                    application.copyToClipboard(this.currentPost['eventData']?.content);
                    this.mdActions.visible = false;
                }
            },
            {
                caption: 'Copy note ID',
                icon: {name: 'copy'},
                tooltip: 'The ID has been copied successfully',
                onClick: () => {
                    application.copyToClipboard(this.currentPost.id);
                    this.mdActions.visible = false;
                }
            },
            {
                caption: 'Copy raw data',
                tooltip: 'The raw data has been copied successfully',
                icon: {name: 'copy'},
                onClick: () => {
                    application.copyToClipboard(JSON.stringify(this.currentPost['eventData']));
                    this.mdActions.visible = false;
                }
            },
            // {
            //     caption: 'Broadcast note',
            //     icon: {name: "broadcast-tower"}
            // },
            {
                caption: 'Copy user public key',
                icon: {name: 'copy'},
                tooltip: 'The public key has been copied successfully',
                onClick: () => {
                    application.copyToClipboard(this.currentPost.author.npub || '');
                    this.mdActions.visible = false;
                }
            },
            // {
            //     caption: 'Mute user',
            //     icon: {name: "user-slash", fill: Theme.colors.error.main},
            //     hoveredColor: 'color-mix(in srgb, var(--colors-error-main) 25%, var(--background-paper))'
            // },
            // {
            //     caption: 'Report user',
            //     icon: {name: "exclamation-circle", fill: Theme.colors.error.main},
            //     hoveredColor: 'color-mix(in srgb, var(--colors-error-main) 25%, var(--background-paper))'
            // }
        ]
        this.pnlActions.clearInnerHTML();
        for (let i = 0; i < actions.length; i++) {
            const item = actions[i];
            this.pnlActions.appendChild(
                <i-hstack
                    horizontalAlignment="space-between"
                    verticalAlignment="center"
                    width="100%"
                    padding={{top: '0.625rem', bottom: '0.625rem', left: '0.75rem', right: '0.75rem'}}
                    background={{color: 'transparent'}}
                    border={{radius: '0.5rem'}}
                    opacity={item.hoveredColor ? 1 : 0.667}
                    hover={{
                        backgroundColor: item.hoveredColor || Theme.action.hoverBackground,
                        opacity: 1
                    }}
                    onClick={() => {
                        if (item.onClick) item.onClick();
                    }}
                    tooltip={{
                        content: item.tooltip,
                        trigger: 'click',
                        placement: 'bottom'
                    }}
                >
                    <i-label
                        caption={item.caption}
                        font={{color: item.icon?.fill || Theme.text.primary, weight: 400, size: '0.875rem'}}
                    ></i-label>
                    <i-icon
                        name={item.icon.name as IconName}
                        width='0.75rem' height='0.75rem'
                        display='inline-flex'
                        fill={item.icon?.fill || Theme.text.primary}
                    ></i-icon>
                </i-hstack>
            )
        }
        this.pnlActions.appendChild(
            <i-hstack
                width="100%"
                horizontalAlignment="center"
                padding={{top: 12, bottom: 12, left: 16, right: 16}}
                visible={false}
                mediaQueries={[
                    {
                        maxWidth: '767px',
                        properties: {visible: true}
                    }
                ]}
            >
                <i-button
                    caption='Cancel'
                    width="100%" minHeight={44}
                    padding={{left: 16, right: 16}}
                    font={{color: Theme.text.primary, weight: 600}}
                    border={{radius: '30px', width: '1px', style: 'solid', color: Theme.colors.secondary.light}}
                    grid={{horizontalAlignment: 'center'}}
                    background={{color: 'transparent'}}
                    boxShadow="none"
                    onClick={() => this.onCloseModal('mdActions')}
                ></i-button>
            </i-hstack>
        )
    }

    private onViewPost(target: ScomPost, event?: MouseEvent) {
        const videos = target.querySelectorAll('video');
        for (let video of videos) {
            video.pause();
        }
        const players = target.querySelectorAll('i-scom-media-player');
        for (let player of players) {
            (player as any).onHide();
        }
        if (this.onItemClicked) this.onItemClicked(target, event);
    }

    private onReplySubmit(content: string, medias: IPostData[]) {
        let postDataArr;
        if (content) {
            const textData = {
                module: '@scom/scom-markdown-editor',
                data: {
                    "properties": {content},
                    "tag": {
                        "width": "100%",
                        "pt": 0,
                        "pb": 0,
                        "pl": 0,
                        "pr": 0
                    }
                }
            }
            postDataArr = [textData, ...medias];
        } else {
            postDataArr = [...medias];
        }
        if (this.onPostButtonClicked) this.onPostButtonClicked(content, postDataArr);
        this.mdCreatePost.visible = false;
    }

    constructPostElement(post: IPost) {
        const postEl = (
            <i-scom-post
                border={{top: {width: 1, style: 'solid', color: 'rgb(47, 51, 54)'}}}
                data={post}
                type="short"
                onClick={this.onViewPost}
                onQuotedPostClicked={this.onViewPost}
                limitHeight={true}
                overflowEllipse={true}
            ></i-scom-post>
        ) as ScomPost;
        postEl.onProfileClicked = (target: Control, data: IPost, event: Event, contentElement?: Control) => this.onShowModal(target, data, 'mdActions', contentElement);
        postEl.onReplyClicked = (target: Control, data: IPost, event?: MouseEvent) => this.onViewPost(postEl, event);
        postEl.onLikeClicked = (target: Control, data: IPost, event?: MouseEvent) => this.onLikeButtonClicked(postEl, event);
        postEl.onRepostClicked = (target: Control, data: IPost, event?: MouseEvent) => this.onRepostButtonClicked(postEl, event);
        return postEl;
    }

    addPost(post: IPost, isPrepend?: boolean) {
        if (post.id && this._data.posts.find(p => p.id === post.id)) return;
        this._data.posts.push(post);
        this.addPostToPanel(post, isPrepend);
    }

    addPosts(posts: IPost[], isPrepend?: boolean) {
        let postEls = [];
        for (let post of posts) {
            if (this._data.posts.find(p => p.id === post.id)) continue;
            this._data.posts.push(post);
            const postEl = this.constructPostElement(post);
            postEls.push(postEl);
        }
        if (isPrepend)
            this.pnlPosts.prepend(...postEls);
        else this.pnlPosts.append(...postEls);
    }

    setPosts(posts: IPost[]) {
        if (!this._data) this._data = {posts: []};
        this._data.posts = [...posts];
        this.renderPosts();
    }

    private addPostToPanel(post: IPost, isPrepend?: boolean) {
        const postEl = this.constructPostElement(post);
        if (isPrepend)
            this.pnlPosts.prepend(postEl);
        else this.pnlPosts.append(postEl);
    }

    private renderPosts() {
        this.pnlPosts.clearInnerHTML();
        for (let post of this.posts) {
            this.addPostToPanel(post);
        }
    }

    private onShowFilter() {
        this.mdFilter.visible = true;
    }

    private onFilter(target: Button) {
        this.mdFilter.visible = false;
        this.lbFilter.caption = target.caption || 'Latest';
        const buttons = this.mdFilter.querySelectorAll('i-button');
        for (let btn of buttons) {
            (btn as Button).font = {color: Theme.text.secondary};
            (btn as Button).rightIcon.visible = false;
        }
        target.rightIcon.visible = true;
        target.font = {color: Theme.text.primary};
    }

    private onCloseModal(name: string) {
        if (this[name]) this[name].visible = false;
    }

    private onShowModal(target: Control, data: IPost, name: string, contentElement?: Control) {
        if (this[name]) {
            this[name].parent = target;
            this[name].position = 'absolute';
            this[name].showBackdrop = false;
            this[name].visible = true;
            this[name].classList.add('show');
            if (name === 'mdActions') {
                this.currentPost = data;
                this.currentContent = contentElement;
            }
        }
    }

    private removeShow(name: string) {
        if (this[name]) this[name].classList.remove('show');
    }

    getConfigurators() {
        const self = this;
        return [
            {
                name: 'Builder Configurator',
                target: 'Builders',
                getActions: () => {
                    const builderSchema = getBuilderSchema();
                    const dataSchema = builderSchema.dataSchema as IDataSchema;
                    const uiSchema = builderSchema.uiSchema as IUISchema;
                    return this._getActions(dataSchema, uiSchema);
                },
                getData: this.getData.bind(this),
                setData: this.setData.bind(this),
                getTag: this.getTag.bind(this),
                setTag: this.setTag.bind(this)
            },
            {
                name: 'Emdedder Configurator',
                target: 'Embedders',
                getActions: () => {
                    const embedderSchema = getEmbedderSchema();
                    const dataSchema = embedderSchema.dataSchema as any;
                    const uiSchema = embedderSchema.uiSchema as IUISchema;
                    return this._getActions(dataSchema, uiSchema);
                },
                getLinkParams: () => {
                    const data = this._data
                    return {
                        data: window.btoa(JSON.stringify(data))
                    }
                },
                setLinkParams: async (params: any) => {
                    if (params.data) {
                        const utf8String = decodeURIComponent(params.data);
                        const decodedString = window.atob(utf8String);
                        const newData = JSON.parse(decodedString);
                        let resultingData = {
                            ...self._data,
                            ...newData
                        };
                        await this.setData(resultingData);
                    }
                },
                getData: this.getData.bind(this),
                setData: this.setData.bind(this),
                getTag: this.getTag.bind(this),
                setTag: this.setTag.bind(this)
            }
        ]
    }

    private _getActions(dataSchema: IDataSchema, uiSchema: IUISchema) {
        const actions = [
            {
                name: 'Edit',
                icon: 'edit',
                command: (builder: any, userInputData: any) => {
                    let oldData: IFeed
                    let oldTag = {};
                    return {
                        execute: async () => {
                            oldData = JSON.parse(JSON.stringify(this._data));
                            const {posts, ...themeSettings} = userInputData;
                            if (builder?.setData) builder.setData({posts});
                            this.setData({posts});

                            oldTag = JSON.parse(JSON.stringify(this.tag));
                            if (builder?.setTag) builder.setTag(themeSettings);
                            else this.setTag(themeSettings);
                        },
                        undo: () => {
                            if (builder?.setData) builder.setData({...oldData});
                            this.setData({...oldData});

                            this.tag = JSON.parse(JSON.stringify(oldTag));
                            if (builder?.setTag) builder.setTag(this.tag);
                            else this.setTag(this.tag);
                        },
                        redo: () => {
                        }
                    }
                },
                userInputDataSchema: dataSchema,
                userInputUISchema: uiSchema
            }
        ]
        return actions
    }

    private async getTag() {
        return this.tag;
    }

    private updateTag(type: 'light' | 'dark', value: any) {
        this.tag[type] = this.tag[type] ?? {};
        for (let prop in value) {
            if (value.hasOwnProperty(prop))
                this.tag[type][prop] = value[prop];
        }
    }

    private async setTag(value: any) {
        const newValue = value || {};
        for (let prop in newValue) {
            if (newValue.hasOwnProperty(prop)) {
                if (prop === 'light' || prop === 'dark')
                    this.updateTag(prop, newValue[prop]);
                else
                    this.tag[prop] = newValue[prop];
            }
        }
        this.updateTheme();
    }

    private updateStyle(name: string, value: any) {
        value ?
            this.style.setProperty(name, value) :
            this.style.removeProperty(name);
    }

    private updateTheme() {
        const themeVar = this._theme || document.body.style.getPropertyValue('--theme');
        this.updateStyle('--text-primary', this.tag[themeVar]?.fontColor);
        this.updateStyle('--text-secondary', this.tag[themeVar]?.secondaryColor);
        this.updateStyle('--background-main', this.tag[themeVar]?.backgroundColor);
        this.updateStyle('--background-modal', this.tag[themeVar]?.modalBackground);
        this.updateStyle('--background-paper', this.tag[themeVar]?.cardBackground);
        this.updateStyle('--background-gradient', this.tag[themeVar]?.gradientBackground);
        this.updateStyle('--colors-primary-main', this.tag[themeVar]?.primaryColor);
        this.updateStyle('--colors-primary-light', this.tag[themeVar]?.primaryBackground);
        this.updateStyle('--colors-success-main', this.tag[themeVar]?.successColor);
        this.updateStyle('--colors-success-light', this.tag[themeVar]?.successBackground);
        this.updateStyle('--colors-error-main', this.tag[themeVar]?.errorColor);
        this.updateStyle('--colors-error-light', this.tag[themeVar]?.errorBackground);
        this.updateStyle('--colors-secondary-main', this.tag[themeVar]?.subcribeButtonBackground);
        this.updateStyle('--action-hover_background', this.tag[themeVar]?.hoverBackgroundColor);
        this.updateStyle('--divider', this.tag[themeVar]?.borderColor);
        this.updateStyle('--colors-secondary-light', this.tag[themeVar]?.groupBorderColor);
        this.updateStyle('--text-disabled', this.tag[themeVar]?.placeholderColor);
        this.updateStyle('--shadows-1', this.tag[themeVar]?.boxShadow);
    }

    init() {
        super.init();
        this.env = this.getAttribute('env', true) || this.env;
        this.onItemClicked = this.getAttribute('onItemClicked', true) || this.onItemClicked;
        this.onLikeButtonClicked = this.getAttribute('onLikeButtonClicked', true) || this.onLikeButtonClicked;
        this.onRepostButtonClicked = this.getAttribute('onRepostButtonClicked', true) || this.onRepostButtonClicked;
        this.onPostButtonClicked = this.getAttribute('onPostButtonClicked', true) || this.onPostButtonClicked;
        const data = this.getAttribute('data', true);
        if (data) this.setData(data);
        const isListView = this.getAttribute('isListView', true, false);
        this.isListView = isListView;
        const theme = this.getAttribute('theme', true);
        const themeVar = theme || document.body.style.getPropertyValue('--theme');
        if (themeVar) this.theme = themeVar as Markdown['theme'];
        this.isComposerVisible = this.getAttribute('isComposerVisible', true, false);
        this.composerPlaceholder = this.getAttribute('composerPlaceholder', true, DefaultPlaceholder);
        const avatar = this.getAttribute('avatar', true);
        if (avatar) this.avatar = avatar;
        this.renderActions();
        application.EventBus.register(this, 'FAB_CREATE_POST', () => {
            this.mdCreatePost.visible = true;
        });
        if(this.env === 'prod') {
            this.inputReply.disableMarkdownEditor();
            this.inputReply.isAttachmentDisabled = true;
            this.inputCreatePost.disableMarkdownEditor();
            this.inputCreatePost.isAttachmentDisabled = true;
        }
    }

    onShow(options) {
        this.mdCreatePost.visible = options.isCreatePost;
    }

    private handleModalClose() {
        this.mdCreatePost.visible = false;
        history.replaceState(null, 'Post', location.hash.replace('/create-post', ''));
    }

    render() {
        return (
            <i-vstack
                width="100%" maxWidth={'100%'}
                margin={{left: 'auto', right: 'auto'}}
                background={{color: Theme.background.main}}
            >
                <i-panel
                    id="pnlInput"
                    padding={{top: '1.625rem', left: '1.25rem', right: '1.25rem'}}
                >
                    <i-scom-post-composer
                        id="inputReply"
                        buttonCaption='Post'
                        visible={false}
                        placeholder={'Post your thoughts...'}
                        onSubmit={this.onReplySubmit}
                   />
                </i-panel>
                <i-panel id="pnlFilter" minHeight={'2rem'} padding={{left: '1.25rem', right: '1.25rem', top: '0.5rem'}} visible={false}>
                    <i-hstack
                        width={'100%'}
                        horizontalAlignment="end"
                        gap={'0.5rem'}
                        cursor="pointer"
                        opacity={0.5}
                        hover={{
                            opacity: 1
                        }}
                        onClick={this.onShowFilter}
                    >
                        <i-label id="lbFilter" caption='Latest' font={{color: Theme.text.primary}}></i-label>
                        <i-icon
                            width={'1rem'} height={'1rem'}
                            display="inline-flex"
                            fill={Theme.text.primary}
                            name="stream"
                        ></i-icon>
                    </i-hstack>
                    <i-modal
                        id="mdFilter"
                        popupPlacement='bottomRight'
                        showBackdrop={false}
                        visible={false}
                        minWidth={200}
                        maxWidth={200}
                        border={{radius: '0.25rem', width: '1px', style: 'solid', color: Theme.divider}}
                        padding={{top: '0.5rem', left: '0.5rem', right: '0.5rem', bottom: '0.5rem'}}
                    >
                        <i-vstack>
                            <i-button
                                caption='Latest'
                                padding={{top: '0.75rem', bottom: '0.75rem', left: '1rem', right: '1rem'}}
                                grid={{horizontalAlignment: 'end'}}
                                background={{color: 'transparent'}}
                                font={{color: Theme.text.secondary}}
                                boxShadow='none'
                                rightIcon={{
                                    name: 'check',
                                    fill: Theme.text.primary,
                                    width: '0.875rem',
                                    height: '0.875rem',
                                    visible: false
                                }}
                                class={getHoverStyleClass()}
                                onClick={this.onFilter}
                            ></i-button>
                            <i-button
                                caption='Latest with Replies'
                                padding={{top: '0.75rem', bottom: '0.75rem', left: '1rem', right: '1rem'}}
                                grid={{horizontalAlignment: 'end'}}
                                background={{color: 'transparent'}}
                                rightIcon={{
                                    name: 'check',
                                    fill: Theme.text.primary,
                                    width: '0.875rem',
                                    height: '0.875rem',
                                    visible: false
                                }}
                                font={{color: Theme.text.secondary}}
                                boxShadow='none'
                                class={getHoverStyleClass()}
                                onClick={this.onFilter}
                            ></i-button>
                        </i-vstack>
                    </i-modal>
                </i-panel>
                <i-button
                    id="btnMore"
                    width={'100%'}
                    font={{size: '0.875rem', color: Theme.text.secondary}}
                    background={{color: Theme.background.paper}}
                    border={{radius: '0.5rem'}}
                    height={'2.5rem'}
                    margin={{top: '0.25rem', bottom: '0.5rem'}}
                    caption='0 new note'
                    boxShadow={Theme.shadows[1]}
                    visible={false}
                    class={getHoverStyleClass()}
                ></i-button>
                <i-panel>
                    <i-vstack
                        id="pnlLoading"
                        padding={{top: '0.5rem', bottom: '0.5rem'}}
                        visible={false}
                        height="100%" width="100%" minHeight={200}
                        position="absolute"
                        top={0} bottom={0}
                        zIndex={999}
                        background={{color: Theme.background.main}}
                        class="i-loading-overlay"
                    >
                        <i-vstack
                            horizontalAlignment="center" verticalAlignment="center"
                            position="absolute" top="calc(50% - 0.75rem)" left="calc(50% - 0.75rem)"
                        >
                            <i-icon
                                class="i-loading-spinner_icon"
                                name="spinner"
                                width={24}
                                height={24}
                                fill={Theme.colors.primary.main}
                            />
                        </i-vstack>
                    </i-vstack>
                    <i-vstack id="pnlPosts" gap="0.5rem" padding={{bottom: 50}}/>
                </i-panel>
                <i-modal
                    id="mdActions"
                    visible={false}
                    maxWidth={'15rem'}
                    minWidth={'12.25rem'}
                    maxHeight={'27.5rem'}
                    popupPlacement='bottomRight'
                    showBackdrop={false}
                    border={{radius: '0.25rem', width: '1px', style: 'solid', color: Theme.divider}}
                    padding={{top: '0.5rem', left: '0.5rem', right: '0.5rem', bottom: '0.5rem'}}
                    zIndex={999}
                    mediaQueries={[
                        {
                            maxWidth: '767px',
                            properties: {
                                showBackdrop: true,
                                popupPlacement: 'bottom',
                                position: 'fixed',
                                zIndex: 1001,
                                maxWidth: '100%',
                                width: '100%',
                                maxHeight: '50vh',
                                overflow: {y: 'auto'},
                                border: {radius: '16px 16px 0 0'}
                            }
                        }
                    ]}
                    onClose={() => this.removeShow('mdActions')}
                >
                    <i-vstack id="pnlActions" minWidth={0}/>
                </i-modal>
                <i-modal id={"mdCreatePost"} visible={false}>
                    <i-scom-post-composer id={"inputCreatePost"} mobile={true} onCancel={this.handleModalClose.bind(this)} placeholder={"What's happening?"} onSubmit={this.onReplySubmit.bind(this)} />
                </i-modal>
            </i-vstack>
        );
    }
}
