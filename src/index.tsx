import {
  ControlElement,
  customElements,
  Module,
  Container,
  Markdown,
  Styles,
  VStack,
  Panel,
  Label,
  IDataSchema,
  IUISchema
} from '@ijstech/components';
import { customStyles } from './index.css';
import dataConfig from './data.json';
import { fetchDataByCid, getBuilderSchema, getEmbedderSchema } from './global/index';
import { setDataFromJson } from './store/index';
import { ScomFeedReplyInput } from './commons/index';
import ScomPost from '@scom/scom-post';

const Theme = Styles.Theme.ThemeVars;

interface ScomFeedElement extends ControlElement {
  cids?: string[];
  theme?: Markdown["theme"];
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
  private pnlMore: Panel;
  private lbMore: Label;

  private isRendering: boolean = false;
  private _cids: string[];
  private _theme: Markdown['theme'];

  tag = {
    light: {},
    dark: {}
  }

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    if (dataConfig) setDataFromJson(dataConfig);
  }

  static async create(options?: ScomFeedElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  get cids() {
    return this._cids;
  }
  set cids(value: string[]) {
    this._cids = value;
  }

  set theme(value: Markdown["theme"]) {
    this._theme = value;
    if (this.inputReply) this.inputReply.theme = value;
  }
  get theme() {
    return this._theme;
  }

  private clear() {
    this.inputReply.clear();
    this.pnlPosts.clearInnerHTML();
    this.pnlMore.visible = false;
    this.lbMore.caption = '';
  }

  private async setData(value: { cids: string[] }) {
    this.cids = value.cids ?? [];
    await this.renderUI();
  }

  private getData() {
    return { cids: this._cids };
  }

  private async renderUI() {
    this.clear();
    if (!this.cids?.length || this.isRendering) return;
    this.isRendering = true;
    for (let cid of this.cids) {
      const postData = await this.fetchData(cid)
      this.pnlPosts.appendChild(
        <i-scom-post
          data={...postData}
          theme={this.theme}
          padding={{top: 12, bottom: 12, left: 16, right: 16}}
          border={{
            bottom: {
              width: '1px',
              style: 'solid',
              color: Theme.divider
            },
          }}
          onClick={() => this.onViewPost(cid)}
        ></i-scom-post>
      )
    }
    this.isRendering = false;
    // TODO: check
    this.pnlMore.visible = false;
    this.lbMore.caption = ``;
  }

  private async fetchData(cid: string) {
    let respone = null;
    try {
      respone = await fetchDataByCid(cid);
    } catch {}
    return respone;
  }

  private onViewPost(cid: string) {
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
          const data = { cids: this._cids || []};
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
              cids: self._cids,
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
          let oldData: string[];
          let oldTag = {};
          return {
            execute: async () => {
              oldData = JSON.parse(JSON.stringify(this._cids));
              const { cids, ...themeSettings } = userInputData;
              if (builder?.setData) builder.setData({ cids });
              this.setData({ cids });

              oldTag = JSON.parse(JSON.stringify(this.tag));
              if (builder?.setTag) builder.setTag(themeSettings);
              else this.setTag(themeSettings);
            },
            undo: () => {
              if (builder?.setData) builder.setData({cids: oldData});
              this.setData({cids: oldData});

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
    const themeVar = this.theme || document.body.style.getPropertyValue('--theme') || 'light';
    this.updateStyle('--text-primary', this.tag[themeVar]?.fontColor);
    this.updateStyle('--text-secondary', this.tag[themeVar]?.secondaryColor);
    this.updateStyle('--background-main', this.tag[themeVar]?.backgroundColor);
    this.updateStyle('--background-modal', this.tag[themeVar]?.backgroundColor);
    this.updateStyle('--input-font_color', this.tag[themeVar]?.inputFontColor);
    this.updateStyle('--input-background', this.tag[themeVar]?.inputBackgroundColor);
    this.updateStyle('--colors-primary-main', this.tag[themeVar]?.primaryColor);
    this.updateStyle('--colors-primary-light', this.tag[themeVar]?.primaryBackground);
    this.updateStyle('--colors-success-main', this.tag[themeVar]?.successColor);
    this.updateStyle('--colors-success-light', this.tag[themeVar]?.successBackground);
    this.updateStyle('--colors-error-main', this.tag[themeVar]?.errorColor);
    this.updateStyle('--colors-error-light', this.tag[themeVar]?.errorBackground);
    this.updateStyle('--colors-secondary-main', this.tag[themeVar]?.subcribeButtonBackground);
    this.updateStyle('--action-hover', this.tag[themeVar]?.hoverBackgroundColor);
    this.updateStyle('--divider', this.tag[themeVar]?.borderColor);
    this.updateStyle('--colors-secondary-light', this.tag[themeVar]?.groupBorderColor);
    this.updateStyle('--text-disabled', this.tag[themeVar]?.placeholderColor);

  }

  init() {
    super.init();
    const cids = this.getAttribute('cids', true);
    if (cids) this.setData({ cids });
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
        border={{width: '1px', style: 'solid', color: Theme.divider}}
        class={customStyles}
      >
        <i-scom-feed-reply-input
          id="inputReply"
          padding={{top: 12, bottom: 12, left: 16, right: 16}}
        />
        <i-hstack
          id="pnlMore"
          minHeight={48}
          verticalAlignment="center" horizontalAlignment="center"
          border={{ top: { width: '1px', style: 'solid', color: Theme.divider }}}
        >
          <i-label
            id="lbMore"
            caption='Show 0 post'
            font={{color: Theme.colors.primary.main, size: '1rem'}}
          ></i-label>
        </i-hstack>
        <i-vstack id="pnlPosts"  border={{ top: { width: '1px', style: 'solid', color: Theme.divider } }}></i-vstack>
      </i-vstack>
    );
  }
}
