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
  moment,
  IdUtils,
  Modal,
  Label,
  Button
} from '@ijstech/components';
import dataConfig from './data.json';
import { IFeed, getBuilderSchema, getEmbedderSchema } from './global/index';
import { setDataFromJson } from './store/index';
import { ScomFeedReplyInput } from './commons/replyInput';
import { getCurrentUser } from './store/index';
import { IPost, IPostData, ScomPost } from '@scom/scom-post';
import assets from './assets';
import { hoverStyle } from './index.css';

const Theme = Styles.Theme.ThemeVars;
type callbackType = (target: ScomPost) => {}

interface ScomFeedElement extends ControlElement {
  data?: IFeed;
  theme?: Markdown["theme"];
  onItemClicked?: callbackType;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-feed']: ScomFeedElement;
    }
  }
}

@customElements('i-scom-feed')
export default class ScomFeed extends Module {
  private inputReply: ScomFeedReplyInput;
  private pnlPosts: VStack;
  private mdFilter: Modal;
  private lbFilter: Label;
  private btnMore: Button;

  private isRendering: boolean = false;
  private _data: IFeed;
  private _theme: Markdown['theme'];

  onItemClicked: callbackType;

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

  set theme(value: Markdown["theme"]) {
    this._theme = value;
    this.updateTheme();
  }
  get theme() {
    return this._theme;
  }

  private clear() {
    this.inputReply.clear();
    this.pnlPosts.clearInnerHTML();
    this.isRendering = false;
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
    for (let post of this.posts) {
      this.addPost(post);
    }
    this.isRendering = false;
  }

  private onViewPost(target: ScomPost) {
    console.log(this.onItemClicked)
    if (this.onItemClicked) this.onItemClicked(target);
  }

  private onReplySubmit(target: MarkdownEditor, medias: IPostData[]) {
    const content = target.getMarkdownValue();
    const textData = {
      module: '@scom/scom-markdown-editor',
      data: {
        "properties": { content },
        "tag": {
          "width": "100%",
          "pt": 0,
          "pb": 0,
          "pl": 0,
          "pr": 0
        }
      }
    }
    const postDatas = content ? [textData, ...medias] : [...medias];
    const newPost = {
      id: IdUtils.generateUUID(),
      publishDate: moment().utc().toString(),
      author: getCurrentUser(),
      stat: {
        reply: 0,
        repost: 0,
        upvote: 0,
        downvote: 0,
        view: 0
      },
      data: [...postDatas]
    }
    this.addPost(newPost)
  }

  addPost(post: IPost) {
    const postEl = (
      <i-scom-post
        data={post}
        type="short"
        onClick={this.onViewPost}
      ></i-scom-post>
    )
    this.pnlPosts.appendChild(postEl);
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
              const { posts, ...themeSettings } = userInputData;
              if (builder?.setData) builder.setData({ posts });
              this.setData({ posts });

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
            redo: () => { }
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
    this.onItemClicked = this.getAttribute('onItemClicked', true) || this.onItemClicked;
    const data = this.getAttribute('data', true);
    if (data) this.setData(data);
    const theme = this.getAttribute('theme', true);
    const themeVar = theme || document.body.style.getPropertyValue('--theme');
    if (themeVar) this.theme = themeVar as Markdown['theme'];
  }

  render() {
    return (
      <i-vstack
        width="100%" maxWidth={600}
        margin={{left: 'auto', right: 'auto'}}
        background={{color: Theme.background.main}}
      >
        <i-panel padding={{top: '1.625rem', left: '1.25rem', right: '1.25rem'}}>
          <i-scom-feed--reply-input
            id="inputReply"
            type="reply"
            onSubmit={this.onReplySubmit}
          />
        </i-panel>
        <i-panel minHeight={'2rem'} padding={{left: '1.25rem', right: '1.25rem', top: '0.5rem'}}>
          <i-hstack
            width={'100%'}
            horizontalAlignment="end"
            gap={'0.5rem'}
            cursor="pointer"
            onClick={this.onShowFilter}
          >
            <i-label id="lbFilter" caption='Latest' font={{color: Theme.text.secondary}}></i-label>
            <i-panel
              width={'1rem'} height={'1rem'}
              background={{color: `url(${assets.fullPath('img/picker.svg')}) center/contain`}}
              display="inline-flex"
            ></i-panel>
          </i-hstack>
          <i-modal
            id="mdFilter"
            popupPlacement='bottomRight'
            showBackdrop={false}
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
                rightIcon={{name: 'check', fill: Theme.text.primary, width: '0.875rem', height: '0.875rem', visible: false}}
                class={hoverStyle}
                onClick={this.onFilter}
              ></i-button>
              <i-button
                caption='Latest with Replies'
                padding={{top: '0.75rem', bottom: '0.75rem', left: '1rem', right: '1rem'}}
                grid={{horizontalAlignment: 'end'}}
                background={{color: 'transparent'}}
                rightIcon={{name: 'check', fill: Theme.text.primary, width: '0.875rem', height: '0.875rem', visible: false}}
                font={{color: Theme.text.secondary}}
                boxShadow='none'
                class={hoverStyle}
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
          margin={{top: '0.25rem'}}
          caption='0 new note'
          boxShadow={Theme.shadows[1]}
          visible={false}
          class={hoverStyle}
        ></i-button>
        <i-vstack id="pnlPosts" />
      </i-vstack>
    );
  }
}
