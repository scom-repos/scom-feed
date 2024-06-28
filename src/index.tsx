import {
    ControlElement,
    customElements,
    Module,
    Container,
    Markdown,
    Styles,
    IDataSchema,
    IUISchema,
    MarkdownEditor,
    Modal,
    Label,
    Button,
    Control,
    Panel,
    application,
    IconName,
    StackLayout,
    Alert

} from '@ijstech/components';
import dataConfig from './data.json';
import {IFeed, getBuilderSchema, getEmbedderSchema, IPostExtended} from './global/index';
import {setDataFromJson} from './store/index';
import {IPost, IPostData, ScomPost} from '@scom/scom-post';
import {getActionButtonStyle, getHoverStyleClass} from './index.css';
import {ScomPostComposer} from '@scom/scom-post-composer';

const Theme = Styles.Theme.ThemeVars;
type callbackType = (target: ScomPost, event?: MouseEvent) => void
type asyncCallbackType = (target: ScomPost, event?: MouseEvent) => Promise<boolean>
type submitCallbackType = (content: string, medias: IPostData[], audience?: string) => void
type pinCallbackType = (post: any, action: 'pin' | 'unpin', event?: MouseEvent) => Promise<void>
type deleteCallbackType = (post: any) => Promise<void>

interface ScomFeedElement extends ControlElement {
    data?: IFeed;
    isListView?: boolean;
    theme?: Markdown["theme"];
    composerPlaceholder?: string;
    isComposerVisible?: boolean;
    onItemClicked?: callbackType;
    onPostButtonClicked?: submitCallbackType;
    env?: string;
    onLikeButtonClicked?: asyncCallbackType;
    onRepostButtonClicked?: callbackType;
    onZapButtonClicked?: callbackType;
    avatar?: string;
    allowDelete?: boolean;
    allowPin?: boolean;
    apiBaseUrl?: string;
    pinNoteToTop?: boolean;
    onDeleteButtonClicked?: deleteCallbackType;
    onPinButtonClicked?: pinCallbackType;
    onBookmarkButtonClicked?: callbackType;
    isPostAudienceShown?: boolean;
    isPublicPostLabelShown?: boolean;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['i-scom-feed']: ScomFeedElement;
        }
    }
}

type Action = {
    id?: string;
    caption: string;
    icon?: {name: string, fill?: string;};
    tooltip?: string;
    onClick?: (target: Control, event: MouseEvent) => void;
    hoveredColor?: string;
}

const DefaultPlaceholder = "What's on your mind today?";

@customElements('i-scom-feed')
export default class ScomFeed extends Module {
    private pnlInput: Panel;
    private inputReply: ScomPostComposer;
    private pnlPosts: StackLayout;
    private mdFilter: Modal;
    private lbFilter: Label;
    private pnlFilter: Panel;
    private btnMore: Button;
    private mdActions: Modal;
    private pnlActions: Panel;
    private pnlLoading: StackLayout;
    private mdCreatePost: Modal;
    private inputCreatePost: ScomPostComposer;
    private mdDeleteConfirm: Alert;

    private currentContent: Control;
    private currentPost: IPostExtended;
    private isRendering: boolean = false;
    private _data: IFeed = {
        posts: []
    };
    private _isListView: boolean = false;
    private _theme: Markdown['theme'];
    private _isComposerVisible: boolean = false;
    private _composerPlaceholder: string = DefaultPlaceholder;
    private env: string;
    private _allowDelete: boolean = false;
    private _allowPin: boolean = false;
    private _pinNoteToTop: boolean = false;
    private _pinnedNotes: IPostExtended[] = [];
    private pinnedNoteIds: string[] = [];
    private btnPinAction: Button;
    private selectedPost: ScomPost;
    private _apiBaseUrl: string;
    private _isPublicPostLabelShown: boolean = false;

    onItemClicked: callbackType;
    onPostButtonClicked: submitCallbackType;
    onLikeButtonClicked: asyncCallbackType;
    onRepostButtonClicked: callbackType;
    onZapButtonClicked: callbackType;
    onDeleteButtonClicked: deleteCallbackType
    onPinButtonClicked: pinCallbackType;
    onBookmarkButtonClicked: callbackType;

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

    set posts(value: IPostExtended[]) {
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

    get allowDelete() {
        return this._allowDelete;
    }

    set allowDelete(value: boolean) {
        let isChanged = this._allowDelete != value ?? false;
        this._allowDelete = value ?? false;
        if (isChanged) this.renderActions();
    }

    get allowPin() {
        return this._allowPin;
    }

    set allowPin(value: boolean) {
        let isChanged = this._allowPin != value ?? false;
        this._allowPin = value ?? false;
        if (isChanged) this.renderActions();
    }

    get isSmallScreen() {
        return window.innerWidth < 768;
    }
    
    get pinNoteToTop() {
        return this._pinNoteToTop;
    }

    set pinNoteToTop(value: boolean) {
        this._pinNoteToTop = value;
    }

    get pinnedNotes() {
        return this._pinnedNotes;
    }
    
    set pinnedNotes(posts: IPostExtended[]) {
        this._pinnedNotes = posts || [];
        this.pinnedNoteIds = this._pinnedNotes.map(post => post.id);
    }

    get apiBaseUrl() {
        return this._apiBaseUrl;
    }

    set apiBaseUrl(value: string) {
        this._apiBaseUrl = value;
    }

    get isPostAudienceShown() {
        return this.inputReply.isPostAudienceShown;
    }

    set isPostAudienceShown(value: boolean) {
        this.inputReply.isPostAudienceShown = value;
        this.inputCreatePost.isPostAudienceShown = value;
    }

    get isPublicPostLabelShown() {
        return this._isPublicPostLabelShown;
    }

    set isPublicPostLabelShown(value: boolean) {
        this._isPublicPostLabelShown = value;
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
        this.renderPosts(this.posts);
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
                    application.copyToClipboard(`${window.location.origin}/#!/e/${this.currentPost.id}`);
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
        if (this.allowPin) {
            actions.push(
                {
                    id: 'btnPinAction',
                    caption: 'Pin note',
                    icon: { name: 'thumbtack' },
                    onClick: async (target: Button, event: MouseEvent) => {
                        const isPinned = this.pinnedNoteIds.includes(this.currentPost.id);
                        if (this.onPinButtonClicked) {
                            target.rightIcon.spin = true;
                            target.rightIcon.name = "spinner";
                            let action: 'pin' | 'unpin' = isPinned ? 'unpin' : 'pin';
                            await this.onPinButtonClicked(this.currentPost, action, event);
                            if (this.pinNoteToTop) {
                                if (action === 'pin') {
                                    this.pnlPosts.prepend(this.selectedPost);
                                    this.selectedPost.isPinned = true;
                                } else {
                                    const sortedPost = this._data.posts.filter(
                                        post => !this.pinnedNoteIds.includes(post.id)
                                    ).sort((a, b) => b['eventData'].created_at - a['eventData'].created_at);
                                    let index = sortedPost.findIndex(post => post.id === this.currentPost.id);
                                    if (index !== -1) {
                                        index += this.pinnedNoteIds.length;
                                        if (index === 0) {
                                            this.pnlPosts.prepend(this.selectedPost);
                                        } else {
                                            this.pnlPosts.children[index].after(this.selectedPost);
                                        }
                                    } else {
                                        this.pnlPosts.appendChild(this.selectedPost);
                                    }
                                    this.selectedPost.isPinned = false;
                                }
                            }
                            target.rightIcon.spin = false;
                            target.rightIcon.name = "thumbtack";
                        }
                        this.mdActions.visible = false;
                    }
                }
            );
        }
        if (this.allowDelete) {
            actions.push(
                {
                    caption: 'Delete note',
                    icon: { name: 'trash-alt' },
                    onClick: async (target: Button, event: MouseEvent) => {
                        this.mdActions.visible = false;
                        this.mdDeleteConfirm.showModal();
                    }
                }
            )
        }
        this.btnPinAction = null;
        this.pnlActions.clearInnerHTML();
        for (let i = 0; i < actions.length; i++) {
            const item = actions[i];
            const elm = (
                <i-button
                    class={getActionButtonStyle(item.hoveredColor)}
                    width="100%"
                    padding={{top: '0.625rem', bottom: '0.625rem', left: '0.75rem', right: '0.75rem'}}
                    background={{color: 'transparent'}}
                    border={{radius: '0.5rem'}}
                    opacity={item.hoveredColor ? 1 : 0.667}
                    caption={item.caption}
                    font={{color: item.icon?.fill || Theme.text.primary, weight: 400, size: '0.875rem'}}
                    rightIcon={{
                        width: "0.75rem",
                        height: "0.75rem",
                        display: "inline-flex",
                        name: item.icon.name as IconName,
                        fill: item.icon?.fill || Theme.text.primary
                    }}
                    onClick={(target: Control, event: MouseEvent) => {
                        if (item.onClick) item.onClick(target, event);
                    }}
                    tooltip={{
                        content: item.tooltip,
                        trigger: 'click',
                        placement: 'bottom'
                    }}
                ></i-button>
            );
            if (item.id === 'btnPinAction') this.btnPinAction = elm;
            this.pnlActions.appendChild(elm);
        }
        this.pnlActions.appendChild(
            <i-stack
                width="100%"
                direction="horizontal"
                justifyContent="center"
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
            </i-stack>
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
        let audience: string;
        if (this.isPostAudienceShown) {
            audience = this.mdCreatePost.visible ? this.inputCreatePost.postAudience : this.inputReply.postAudience;
        }
        if (this.onPostButtonClicked) this.onPostButtonClicked(content, postDataArr, audience);
        this.mdCreatePost.visible = false;
    }

    constructPostElement(post: IPostExtended) {
        const postEl = (
            <i-scom-post
                data={post}
                type="card"
                onClick={this.onViewPost}
                onQuotedPostClicked={this.onViewPost}
                limitHeight={true}
                overflowEllipse={true}
                isPinned={post.isPinned || false}
                apiBaseUrl={this.apiBaseUrl}
                isPublicPostLabelShown={this.isPublicPostLabelShown && post.isPublicPost}
            ></i-scom-post>
        ) as ScomPost;
        postEl.onProfileClicked = (target: Control, data: IPost, event: Event, contentElement?: Control) => this.showActionModal(postEl, target, data, contentElement);
        postEl.onReplyClicked = (target: Control, data: IPost, event?: MouseEvent) => this.onViewPost(postEl, event);
        postEl.onLikeClicked = async (target: Control, data: IPost, event?: MouseEvent) => await this.onLikeButtonClicked(postEl, event);
        postEl.onRepostClicked = (target: Control, data: IPost, event?: MouseEvent) => this.onRepostButtonClicked(postEl, event);
        postEl.onZapClicked = (target: Control, data: IPost, event?: MouseEvent) => this.onZapButtonClicked(postEl, event);
        postEl.onBookmarkClicked = (target: Control, data: IPost, event?: MouseEvent) => this.onBookmarkButtonClicked(postEl, event);
        return postEl;
    }

    private sortPosts(posts: IPostExtended[]) {
        if (this.pinNoteToTop) {
            let pinnedPosts: IPostExtended[] = [];
            if (this.pinnedNotes?.length > 0) {
                for (let i = posts.length - 1; i >= 0; i--) {
                    if (this.pinnedNoteIds.includes(posts[i].id)) {
                        const post = posts.splice(i, 1)[0];
                        post.isPinned = true;
                        pinnedPosts.unshift(post);
                    }
                }
            }
            if (pinnedPosts.length !== this.pinnedNotes?.length) {
                for (let i = this.pinnedNotes.length - 1; i >= 0; i--) {
                    const post = this.pinnedNotes[i];
                    if (pinnedPosts.findIndex(p => p.id === post.id) === -1) {
                        post.isPinned = true;
                        pinnedPosts.unshift(post);
                    }
                }
            }
            return [...pinnedPosts, ...posts];
        } else {
            return posts;
        }
    }

    removePost(post: IPostExtended) {
        const index = this._data.posts.findIndex(p => p.id === post.id);
        if (index === -1) return;
        try {
            const elm = this.pnlPosts.children[index];
            if (elm) this.pnlPosts.removeChild(elm);
            this._data.posts.splice(index, 1);
        } catch (err) {}
    }

    addPost(post: IPostExtended, isPrepend?: boolean) {
        if (post.id && this._data.posts.find(p => p.id === post.id)) return;
        this._data.posts.push(post);
        this.addPostToPanel(post, isPrepend);
    }

    addPosts(posts: IPostExtended[], isPrepend?: boolean) {
        let postEls = [];
        for (let post of posts) {
            if (this._data.posts.find(p => p.id === post.id)) continue;
            this._data.posts.push(post);
            const postEl = this.constructPostElement(post);
            postEls.push(postEl);
        }
        if (isPrepend) {
            if (this.pinNoteToTop && this.pinnedNoteIds.length) {
                this.pnlPosts.children[this.pinnedNoteIds.length - 1].after(...postEls);
            } else {
                this.pnlPosts.prepend(...postEls);
            }
        }
        else this.pnlPosts.append(...postEls);
    }

    setPosts(posts: IPostExtended[]) {
        if (!this._data) this._data = {posts: []};
        this._data.posts = [...posts];
        const sortedPosts = this.sortPosts([...posts]);
        this.renderPosts(sortedPosts);
    }

    private addPostToPanel(post: IPostExtended, isPrepend?: boolean) {
        const postEl = this.constructPostElement(post);
        if (isPrepend) {
            if (this.pinNoteToTop && this.pinnedNoteIds.length) {
                this.pnlPosts.children[this.pinnedNoteIds.length - 1].after(postEl);
            } else {
                this.pnlPosts.prepend(postEl);
            }
        }
        else this.pnlPosts.append(postEl);
    }

    private renderPosts(posts: IPostExtended[]) {
        this.pnlPosts.clearInnerHTML();
        for (let post of posts) {
            if (!this.pinNoteToTop) post.isPinned = false;
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

    private onShowModal(target: Control, name: string, contentElement?: Control) {
        if (this[name]) {
            this[name].parent = target;
            this[name].position = 'absolute';
            this[name].showBackdrop = false;
            this[name].visible = true;
            this[name].classList.add('show');
        }
    }

    private showActionModal(target: ScomPost, parent: Control, data: IPost, contentElement?: Control) {
        this.selectedPost = target;
        this.currentPost = data;
        this.currentContent = contentElement;
        if (this.btnPinAction) {
            const isPinned = this.pinnedNoteIds.includes(this.currentPost.id);
            this.btnPinAction.caption = isPinned ? 'Unpin note' : 'Pin note';
        }
        this.onShowModal(parent, 'mdActions', contentElement);
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
        this.onZapButtonClicked = this.getAttribute('onZapButtonClicked', true) || this.onZapButtonClicked;
        this.onPostButtonClicked = this.getAttribute('onPostButtonClicked', true) || this.onPostButtonClicked;
        this.onBookmarkButtonClicked = this.getAttribute('onBookmarkButtonClicked', true) || this.onBookmarkButtonClicked;
        const apiBaseUrl = this.getAttribute('apiBaseUrl', true);
        if (apiBaseUrl) this.apiBaseUrl = apiBaseUrl;
        const isPublicPostLabelShown = this.getAttribute('isPublicPostLabelShown', true);
        if (isPublicPostLabelShown != null) this.isPublicPostLabelShown = isPublicPostLabelShown;
        const pinNoteToTop = this.getAttribute('pinNoteToTop', true);
        if (pinNoteToTop != null) this.pinNoteToTop = pinNoteToTop;
        const data = this.getAttribute('data', true);
        if (data) this.setData(data);
        const isListView = this.getAttribute('isListView', true, false);
        this.isListView = isListView;
        const theme = this.getAttribute('theme', true);
        const themeVar = theme || document.body.style.getPropertyValue('--theme');
        if (themeVar) this.theme = themeVar as Markdown['theme'];
        this.isComposerVisible = this.getAttribute('isComposerVisible', true, false);
        this.composerPlaceholder = this.getAttribute('composerPlaceholder', true, DefaultPlaceholder);
        const isPostAudienceShown = this.getAttribute('isPostAudienceShown', false);
        if (isPostAudienceShown != null) this.isPostAudienceShown = isPostAudienceShown;
        const avatar = this.getAttribute('avatar', true);
        if (avatar) this.avatar = avatar;
        this._allowDelete = this.getAttribute('allowDelete', true, false);
        this._allowPin = this.getAttribute('allowPin', true, false);
        this.renderActions();
        application.EventBus.register(this, 'FAB_CREATE_POST', () => {
            this.mdCreatePost.visible = true;
            this.inputCreatePost.setFocus();
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

    private async deleteNote() {
        if (this.onDeleteButtonClicked) {
            await this.onDeleteButtonClicked(this.currentPost);
            const index = this._data.posts.findIndex(post => post.id === this.currentPost.id);
            if (index !== -1) this._data.posts.splice(index, 1);
            this.currentPost = null;
            this.selectedPost.remove();
            this.selectedPost = null;
        }
    }

    render() {
        return (
            <i-stack
                direction="vertical"
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
                    <i-stack
                        width={'100%'}
                        direction="horizontal"
                        justifyContent="end"
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
                    </i-stack>
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
                        <i-stack direction="vertical">
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
                        </i-stack>
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
                    <i-stack
                        id="pnlLoading"
                        direction="vertical"
                        padding={{top: '0.5rem', bottom: '0.5rem'}}
                        visible={false}
                        height="100%" width="100%" minHeight={200}
                        position="absolute"
                        top={0} bottom={0}
                        zIndex={999}
                        background={{color: Theme.background.main}}
                        class="i-loading-overlay"
                    >
                        <i-stack
                            direction="vertical"
                            alignItems="center" justifyContent="center"
                            position="absolute" top="calc(50% - 0.75rem)" left="calc(50% - 0.75rem)"
                        >
                            <i-icon
                                class="i-loading-spinner_icon"
                                name="spinner"
                                width={24}
                                height={24}
                                fill={Theme.colors.primary.main}
                            />
                        </i-stack>
                    </i-stack>
                    <i-stack id="pnlPosts" direction="vertical" gap="0.5rem" padding={{bottom: 50}}/>
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
                    <i-stack id="pnlActions" direction="vertical" minWidth={0}/>
                </i-modal>
                <i-modal id={"mdCreatePost"} visible={false}>
                    <i-scom-post-composer id={"inputCreatePost"} mobile={true} autoFocus={true} onCancel={this.handleModalClose.bind(this)} placeholder={"What's happening?"} onSubmit={this.onReplySubmit.bind(this)} />
                </i-modal>
                <i-alert
                    id="mdDeleteConfirm"
                    status="confirm"
                    title="Are you sure?"
                    content="Do you really want to delete this note?"
                    onConfirm={this.deleteNote}
                ></i-alert>
            </i-stack>
        );
    }
}
