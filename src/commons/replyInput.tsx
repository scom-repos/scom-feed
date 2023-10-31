import {
  Module,
  Styles,
  Label,
  MarkdownEditor,
  Button,
  Panel,
  GridLayout,
  Image,
  HStack,
  customElements,
  ControlElement,
  Container,
  application,
  Modal,
  CardLayout,
  Input,
  Icon,
  VStack,
  Control,
  Switch
} from '@ijstech/components';
import {
  fetchReactionGifs,
  fetchGifs,
  fetchEmojis,
  emojiCategories,
  IEmojiCategory,
  colorsMapper,
  IEmoji,
  searchEmojis
} from '../global/index';
import { getCurrentUser } from '../store/index';
import { IPost, IPostData } from '@scom/scom-post';

const Theme = Styles.Theme.ThemeVars;

type IReplyType = 'reply' | 'quote';
type onChangedCallback = (target: MarkdownEditor) => void;
type onSubmitCallback = (target: MarkdownEditor, medias: IPostData[]) => void;

interface IReplyInput {
  replyTo?: IPost;
  isReplyToShown?: boolean;
  type?: IReplyType;
  placeholder?: string;
}

interface ReplyInputElement extends ControlElement {
  replyTo?: IPost;
  isReplyToShown?: boolean;
  type?: IReplyType;
  placeholder?: string;
  onChanged?: onChangedCallback;
  onSubmit?: onSubmitCallback;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-feed--reply-input']: ReplyInputElement;
    }
  }
}

@customElements('i-scom-feed--reply-input')
export class ScomFeedReplyInput extends Module {
  private mdEmoji: Modal;
  private mdGif: Modal;
  private mdWidgets: Modal;
  private lbReplyTo: Label;
  private replyEditor: MarkdownEditor;
  private btnReply: Button;
  private pnlReplyTo: Panel;
  private gridReply: GridLayout;
  private imgReplier: Image;
  private pnlBorder: Panel;
  private pnlIcons: HStack;
  private gridGif: CardLayout;
  private gridGifCate: CardLayout;
  private pnlGif: Panel;
  private iconGif: Icon;
  private inputGif: Input;
  private bottomElm: Panel;
  private gridEmojiCate: GridLayout;
  private groupEmojis: VStack;
  private pnlColors: Panel;
  private lbEmoji: Label;
  private pnlEmojiResult: VStack;
  private inputEmoji: Input;
  private gifLoading: VStack;
  private autoPlaySwitch: Switch;
  private pnlMedias: VStack;
  private selectedColor: Panel;
  private recent: Panel;

  private _data: IReplyInput;
  private extensions: string[] = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'tiff', 'tif', 'mp4', 'avi', 'mkv', 'mov', 'm3u8'];
  private currentGifPage: number = 0;
  private totalGifPage: number = 1;
  private renderedMap: {[key: number]: boolean} = {};
  private bottomObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (this.currentGifPage < this.totalGifPage) {
        ++this.currentGifPage;
        this.renderGifs(this.inputGif.value || '');
      }
      // else {
      //   this.clearObservers();
      // }
    });
  }, {
    root: null,
    rootMargin: "20px",
    threshold: 0.9
  });
  private newReply: IPostData[] = [];
  private isEmojiSearching: boolean = false;
  private recentEmojis: {[key: string]: IEmoji} = {};
  private emojiCateMapper: Map<string, VStack> = new Map();
  private emojiGroupsData: Map<string, any> = new Map();
  private searchTimer: any;

  public onChanged: onChangedCallback;
  public onSubmit: onSubmitCallback;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    this.onRecentClear = this.onRecentClear.bind(this);
    this.onEmojiColorSelected = this.onEmojiColorSelected.bind(this);
  }

  static async create(options?: ReplyInputElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  get replyTo() {
    return this._data.replyTo;
  }
  set replyTo(value: IPost) {
    this._data.replyTo = value;
  }

  get type() {
    return this._data.type ?? 'reply';
  }
  set type(value: IReplyType) {
    this._data.type = value ?? 'reply';
  }

  get placeholder() {
    return this._data.placeholder ?? '';
  }
  set placeholder(value: string) {
    this._data.placeholder = value ?? '';
  }

  get isReplyToShown(): boolean {
    return this._data.isReplyToShown ?? false;
  }
  set isReplyToShown(value: boolean) {
    this._data.isReplyToShown = value ?? false;
  }

  private get isQuote() {
    return this.type === 'quote';
  }

  private get hasRecentEmojis() {
    return !!Object.values(this.recentEmojis).length;
  }

  private get emojiColors() {
    return Object.keys(colorsMapper);
  }

  private get currentEmojiColor() {
    return this.selectedColor?.background?.color || this.emojiColors[0];
  }

  private isRecent(category: IEmojiCategory) {
    return category.value === 'recent';
  }

  setData(value: IReplyInput) {
    this.clear();
    this._data = value;
    this.lbReplyTo.caption = `@${this.replyTo?.author?.username || ''}`;
    this.imgReplier.url = getCurrentUser()?.avatar || ''
    const defaultPlaceholder = this.isQuote ? 'Add a comment' : 'Post your reply';
    this.replyEditor.placeholder = this.placeholder || defaultPlaceholder;
    this.btnReply.caption = this.isQuote ? 'Post' : 'Reply';
    this.pnlBorder.style.borderTopStyle = this.isQuote ? 'solid' : 'none';
    this.updateGrid();
  }

  clear() {
    this.pnlReplyTo.visible = false;
    this.lbReplyTo.caption = '';
    this.imgReplier.url = '';
    this.replyEditor.value = '';
    this.pnlBorder.border = {
      top: {
        width: '1px',
        style: 'none',
        color: Theme.divider,
      }
    };
    this.btnReply.caption = 'Reply';
    this.currentGifPage = 1;
    this.totalGifPage = 1
    this.pnlMedias.clearInnerHTML();
    this.emojiGroupsData = new Map();
  }

  private clearObservers() {
    this.bottomElm.visible = false;
    this.bottomObserver.unobserve(this.bottomElm);
    this.renderedMap = {};
  }

  private updateGrid() {
    if (this.isQuote) {
      this.gridReply.templateColumns = ['2.75rem', 'auto'];
      this.gridReply.templateAreas = [
        ['avatar', 'editor'],
        ['avatar', 'quoted'],
        ['avatar', 'reply'],
      ];
      this.isReplyToShown = false;
      this.pnlReplyTo.visible = false;
    } else {
      if (this.isReplyToShown && !this.pnlReplyTo.visible) {
        this.gridReply.templateAreas = [['avatar', 'editor', 'reply']];
        this.gridReply.templateColumns = ['2.75rem', 'auto', '5.5rem'];
      } else {
        this.gridReply.templateColumns = ['2.75rem', 'auto'];
        this.gridReply.templateAreas = [
          ['avatar', 'editor'],
          ['avatar', 'reply'],
        ];
      }
    }
    this.pnlReplyTo.visible = this.isReplyToShown;
  }

  private onEditorChanged() {
    this.btnReply.enabled = !!this.replyEditor.getMarkdownValue();
    if (this.onChanged) this.onChanged(this.replyEditor);
  }

  private onReply() {
    if (this.onSubmit) this.onSubmit(this.replyEditor, [...this.newReply]);
    this.replyEditor.value = '';
    this.pnlMedias.clearInnerHTML();
  }

  private async onUpload() {
    const result = application.uploadFile(this.extensions);
    console.log('onUpload', result);
  }

  private onCloseModal(name: string) {
    this[name].visible = false;
  }

  private onShowModal(name: string) {
    this[name].refresh();
    this[name].visible = true;
  }

  private onGifMdOpen() {
    this.autoPlaySwitch.checked = true;
    this.onToggleMainGif(true);
  }

  private onGifMdClose() {
    this.clearObservers();
  }

  private async renderGifCate() {
    this.gridGifCate.clearInnerHTML();
    const { data = [] } = await fetchReactionGifs();
    const limitedList = [...data].slice(0, 8);
    for (let cate of limitedList) {
      this.gridGifCate.appendChild(
        <i-panel
          overflow={'hidden'}
          onClick={() => this.onGifSearch(cate.name)}
        >
          <i-image
            url={cate.gif.images['480w_still'].url}
            width={'100%'} display='block'
          ></i-image>
          <i-label
            caption={cate.name}
            font={{size: '1.25rem', weight: 700}}
            position="absolute" bottom="0px"
            display="block" width={'100%'}
            padding={{left: '0.5rem', top: '0.5rem', right: '0.5rem', bottom: '0.5rem'}}
          ></i-label>
        </i-panel>
      )
    }
  }

  private onGifSelected(gif: any) {
    this.onCloseModal('mdGif');
    this.btnReply.enabled = true;
    let index = this.newReply.length;
    const mediaWrap = <i-panel background={{color: Theme.action.hover}}>
      <i-panel
        width={'100%'} height={'100%'}
        position='absolute' zIndex={5}
        background={{color: Theme.action.hoverOpacity}}
      ></i-panel>
      <i-icon
        name="times" width={16} height={16} fill={Theme.text.primary}
        border={{radius: '50%'}}
        padding={{top: 5, bottom: 5, left: 5, right: 5}}
        background={{color: 'rgba(15, 20, 25, 0.75)'}}
        position='absolute' right="10px" top="10px" zIndex={9}
        onClick={() => {
          mediaWrap.remove();
          this.newReply.splice(index, 1);
        }}
      ></i-icon>
    </i-panel>;
    mediaWrap.parent = this.pnlMedias;
    this.pnlMedias.appendChild(mediaWrap);
    const getPostData = (render: boolean) => {
      return {
        module: '@scom/scom-image',
        data: {
          "properties": {
            url: render ? gif.images.original_still.url : gif.images.original.url
          },
          "tag": {
            "width": "100%",
            "height": "auto",
            "pt": 0,
            "pb": 0,
            "pl": 0,
            "pr": 0
          }
        }
      }
    }
    this.newReply.push(getPostData(false));
    // TODO: check
    // getEmbedElement(getPostData(true), mediaWrap);
  }

  private onGifSearch(q: string) {
    this.onToggleMainGif(false);
    this.inputGif.value = q;
    this.renderGifs(q);
  }

  private onToggleMainGif(value: boolean) {
    this.gridGifCate.visible = value;
    this.pnlGif.visible = !value;
    this.currentGifPage = 1;
    this.totalGifPage = 1;
    if (value) {
      this.bottomObserver.unobserve(this.bottomElm);
      this.iconGif.name = 'times';
    } else {
      this.bottomObserver.observe(this.bottomElm);
      this.iconGif.name = 'arrow-left';
    }
    this.gridGif.clearInnerHTML();
    this.renderedMap = {};
    this.mdGif.refresh();
  }

  private async renderGifs(q: string) {
    if (this.renderedMap[this.currentGifPage]) return;
    this.gifLoading.visible = true;
    this.renderedMap[this.currentGifPage] = true;
    const params = { q, offset: this.currentGifPage - 1 };
    const { data = [], pagination: { total_count, count } } = await fetchGifs(params);
    this.totalGifPage = Math.ceil(total_count / count);
    this.bottomElm.visible = this.totalGifPage > 1;
    const autoPlay = this.autoPlaySwitch.checked;
    for (let gif of data) {
      this.gridGif.appendChild(
        <i-panel
          onClick={() => this.onGifSelected(gif)}
          width="100%"
          overflow={'hidden'}
        >
          <i-image
            url={autoPlay ? gif.images.fixed_height.url : gif.images.fixed_height_still.url}
            width={'100%'} height='100%' objectFit='cover' display='block'
          ></i-image>
        </i-panel>
      )
    }
    this.gifLoading.visible = false;
    this.mdGif.refresh();
  }

  private onGifPlayChanged(target: Switch) {
    this.renderGifs(this.inputGif.value);
  }

  private onIconGifClicked(icon: Icon) {
    if (icon.name === 'times') {
      this.onCloseModal('mdGif');
    } else {
      this.pnlGif.visible = false;
      this.gridGifCate.visible = true;
    }
  }

  private async renderEmojis() {
    this.recentEmojis = {};
    this.emojiCateMapper = new Map();
    this.renderEmojiCate();
    for (let category of emojiCategories) {
      this.renderEmojiGroup(this.groupEmojis, category);
    }
    this.renderColor(this.emojiColors[0]);
  }

  private async renderEmojiCate() {
    this.gridEmojiCate.clearInnerHTML();
    for (let category of emojiCategories) {
      const cateEl = (
        <i-vstack
          id={`cate-${category.value}`}
          overflow={'hidden'}
          cursor='pointer'
          opacity={0.5}
          padding={{top: '0.25rem', bottom: '0.25rem'}}
          horizontalAlignment="center"
          position='relative'
          class="emoji-cate"
          gap={'0.5rem'}
          onClick={(target: Control) => this.onEmojiCateSelected(target, category)}
        >
          <i-image
            url={category.image}
            width={'1.25rem'} height={'1.25rem'} display='block'
          ></i-image>
          <i-hstack
            visible={false}
            border={{radius: '9999px'}}
            height={'0.25rem'}
            width={'100%'}
            position='absolute' bottom="0px"
            background={{color: Theme.colors.primary.main}}
          ></i-hstack>
        </i-vstack>
      )
      this.gridEmojiCate.appendChild(cateEl);
      this.emojiCateMapper.set(`cate-${category.value}`, cateEl);
    }
  }

  private async renderEmojiGroup(parent: Control, category: IEmojiCategory) {
    const group = (
      <i-vstack
        id={`${category.value}`}
        border={{bottom: {width: '1px', style: 'solid', color: Theme.divider}}}
        gap="0.75rem"
        class="emoji-group"
      >
        <i-hstack
          padding={{top: '0.75rem', left: '0.75rem', right: '0.75rem', bottom: '0.75rem'}}
          position="sticky" top="0px" width={'100%'} zIndex={9}
          background={{color: Theme.background.modal}}
          verticalAlignment="center" horizontalAlignment="space-between"
        >
          <i-label
            caption={category.name}
            font={{size: '1.063rem', weight: 700}}
            wordBreak="break-word"
          ></i-label>
          <i-button
            caption="Clear all"
            font={{size: '0.9rem', weight: 700, color: Theme.colors.primary.main}}
            cursor='pointer'
            boxShadow='none'
            padding={{left: '0.75rem', right: '0.75rem'}}
            lineHeight={'1.25rem'}
            border={{radius: '9999px'}}
            background={{color: Theme.colors.info.light}}
            visible={this.isRecent(category) && this.hasRecentEmojis}
            onClick={this.onRecentClear}
          ></i-button>
        </i-hstack>
      </i-vstack>
    )
    const itemWrap = <i-grid-layout id={`group-${category.value}`} columnsPerRow={9} padding={{left: '0.75rem', right: '0.75rem', bottom: '0.75rem'}} />
    group.append(itemWrap);
    parent.appendChild(group);
    let data = [];
    if (this.isRecent(category)) {
      data = Object.values(this.recentEmojis);
    } else if (category.value === 'search') {
      const result = searchEmojis(this.inputEmoji.value, this.emojiGroupsData);
      data = this.filterGroups(result);
    } else {
      if (!this.emojiGroupsData.has(category.value)) {
        const list = await fetchEmojis({category: category.value});
        this.emojiGroupsData.set(category.value, JSON.parse(JSON.stringify(list)));
      }
      data = this.filterGroups(this.emojiGroupsData.get(category.value));
    }
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      itemWrap.appendChild(
        <i-panel
          width={'1.5rem'} height={'1.5rem'}
          onClick={(target: Control, event: MouseEvent) => this.onEmojiSelected(event, item)}
        >
          <i-label
            caption={item.htmlCode.join('')}
            display="inline-block"
          ></i-label>
        </i-panel>
      )
    }
    if (this.isRecent(category)) {
      this.recent = group;
      parent.insertAdjacentElement('afterbegin', group);
    }
  }

  private updateEmojiGroups() {
    for (let i = 1; i < emojiCategories.length; i++) {
      const category = emojiCategories[i];
      const gridElm = this.groupEmojis.querySelector(`#group-${category.value}`) as Control;
      if (!gridElm) continue;
      gridElm.clearInnerHTML();
      const data = this.filterGroups(this.emojiGroupsData.get(category.value));
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        gridElm.appendChild(
          <i-panel
            width={'1.5rem'} height={'1.5rem'}
            onClick={(target: Control, event: MouseEvent) => this.onEmojiSelected(event, item)}
          >
            <i-label
              caption={item.htmlCode.join('')}
              display="inline-block"
            ></i-label>
          </i-panel>
        )
      }
    }
  }

  private filterGroups(data: any[]) {
    const colorHtmlCode = colorsMapper[this.currentEmojiColor].htmlCode;
    return [...data].filter(item => {
      if (colorHtmlCode) {
        return item.htmlCode.includes(colorHtmlCode);
      } else {
        const itemLength = item.htmlCode?.length;
        return itemLength && itemLength !== 2;
      }
    })
  }

  private onRecentClear() {
    this.recentEmojis = {};
    if (this.recent) {
      this.recent.clearInnerHTML();
      this.recent = null;
    }
    this.onEmojiCateSelected(this.gridEmojiCate.children[1] as Control, emojiCategories[1]);
  }

  private renderEmojiColors() {
    this.pnlColors.clearInnerHTML();
    for (let color of this.emojiColors) {
      this.renderColor(color);
    }
  }

  private renderColor(color: string) {
    const isCurrentColor = color === this.currentEmojiColor;
    const colorEl = (
      <i-panel
        background={{color}}
        border={{radius: '50%'}}
        width={'1.188rem'} height={'1.188rem'}
        padding={{left: '0.35rem'}}
        stack={{grow: '0', shrink: '0', basis: '1.188rem'}}
        boxShadow={`${isCurrentColor ? 'rgb(29, 155, 240) 0px 0px 0px 2px' : 'none'}`}
        onClick={this.onEmojiColorSelected}
      >
        <i-icon
          name='check' width={'0.5rem'} height={'0.5rem'}
          lineHeight={'0.35rem'}
          fill={'rgb(21, 32, 43)'} visible={isCurrentColor}
        ></i-icon>
      </i-panel>
    )
    if (isCurrentColor) this.selectedColor = colorEl;
    this.pnlColors.appendChild(colorEl);
  }

  private onEmojiColorSelected(target: Control) {
    if (!this.pnlColors?.children || this.pnlColors?.children?.length < 2) {
      this.renderEmojiColors();
      return;
    }
    if (this.selectedColor) {
      this.selectedColor.boxShadow = 'none';
      const icon = this.selectedColor.querySelector('i-icon') as Icon;
      if (icon) icon.visible = false;
    }
    target.boxShadow = 'rgb(29, 155, 240) 0px 0px 0px 2px';
    const icon = target.querySelector('i-icon') as Icon;
    if (icon) icon.visible = true;
    this.selectedColor = target as Panel;
    this.updateEmojiGroups();
  }

  private onEmojiCateSelected(target: Control, category: IEmojiCategory) {
    const preventSelected = this.isEmojiSearching || (this.isRecent(category) && !this.recent?.children[1]?.innerHTML);
    if (preventSelected) return;
    const cates = this.querySelectorAll('.emoji-cate');
    for (let cateEl of cates) {
      (cateEl as Control).opacity = 0.5;
      (cateEl.children[1] as Control).visible = false;
    }
    (target.children[1] as Control).visible = true;
    target.opacity = 1;
    if (this.isRecent(category)) {
      this.groupEmojis.scrollTo({top: 0});
    } else {
      const groupEl = this.querySelector(`#${category.value}`) as Control;
      if (groupEl) {
        this.groupEmojis.scrollTo({top: groupEl.offsetTop});
      }
    }
  }

  private onEmojiSelected(event: MouseEvent, emoji: IEmoji) {
    event.stopImmediatePropagation();
    event.preventDefault();
    this.lbEmoji.caption = `${emoji.htmlCode.join('')}`;
    this.replyEditor.value = this.replyEditor.getMarkdownValue() + `<span style='font-size:1.25rem;'>${emoji.htmlCode.join('')}</span>`
    this.recentEmojis[emoji.name] = emoji;
    const parent = (event.target as Control).closest('.emoji-group') as Control;
    if (parent) {
      this.groupEmojis.scrollTo({top: parent.offsetTop + event.clientY});
    }
  }

  private async onEmojiSearch() {
    if (this.searchTimer) clearTimeout(this.searchTimer);
    this.pnlEmojiResult.visible = true;
    this.groupEmojis.visible = false;
    this.pnlEmojiResult.clearInnerHTML();
    this.searchTimer = setTimeout(() => {
      const category = {
        name: 'Search results',
        value: 'search'
      }
      this.renderEmojiGroup(this.pnlEmojiResult, category);
      this.mdEmoji.refresh();
    }, 100)
    this.isEmojiSearching = true;
  }

  private onEmojiMdOpen() {
    this.pnlEmojiResult.visible = false;
    this.groupEmojis.visible = true;
    this.inputEmoji.value = '';
    this.lbEmoji.caption = '';
    this.isEmojiSearching = false;
    if (this.hasRecentEmojis) {
      const recent = this.groupEmojis.querySelector('#recent');
      recent && this.groupEmojis.removeChild(recent);
      this.renderEmojiGroup(this.groupEmojis, emojiCategories[0]);
    } else {
      this.recent && this.recent.clearInnerHTML();
    }
    const index = this.hasRecentEmojis ? 0 : 1;
    this.onEmojiCateSelected(this.gridEmojiCate.children[index] as Control, emojiCategories[index]);
    this.pnlColors.clearInnerHTML();
    this.renderColor(this.currentEmojiColor);
    this.mdEmoji.refresh();
  }

  protected _handleClick(event: MouseEvent, stopPropagation?: boolean): boolean {
    this.pnlIcons.visible = true;
    if (this.isReplyToShown) {
      this.pnlReplyTo.visible = true;
      this.updateGrid();
    }
    return true;
  }

  init() {
    super.init();
    this.onChanged = this.getAttribute('onChanged', true) || this.onChanged;
    this.onSubmit = this.getAttribute('onSubmit', true) || this.onSubmit;
    const replyTo = this.getAttribute('replyTo', true);
    const type = this.getAttribute('type', true, 'reply');
    const isReplyToShown = this.getAttribute('isReplyToShown', true, false);
    const placeholder = this.getAttribute('placeholder', true);
    this.setData({ isReplyToShown, replyTo, type, placeholder });
    this.renderGifCate();
    this.renderEmojis();
  }

  render() {
    return (
      <i-panel padding={{ bottom: '0.75rem', top: '0.75rem' }} cursor='default'>
        <i-hstack
          id="pnlReplyTo"
          visible={false}
          gap="0.5rem"
          verticalAlignment="center"
          padding={{ top: '0.25rem', bottom: '0.75rem', left: '3.25rem' }}
        >
          <i-label
            caption="Replying to"
            font={{ size: '1rem', color: Theme.text.secondary }}
          ></i-label>
          <i-label
            id="lbReplyTo"
            link={{ href: '' }}
            font={{ size: '1rem', color: Theme.colors.primary.main }}
          ></i-label>
        </i-hstack>
        <i-grid-layout
          id="gridReply"
          gap={{ column: '0.75rem' }}
          templateColumns={['2.75rem', 'auto']}
          templateRows={['auto']}
          templateAreas={[
            ['avatar', 'editor'],
            ['avatar', 'reply']
          ]}
        >
          <i-image
            id="imgReplier"
            grid={{ area: 'avatar' }}
            width={'2.75rem'}
            height={'2.75rem'}
            display="block"
            background={{ color: Theme.background.gradient }}
            border={{ radius: '50%' }}
            overflow={'hidden'}
            margin={{top: '0.75rem'}}
            objectFit='cover'
          ></i-image>
          <i-panel grid={{ area: 'editor' }}>
            <i-markdown-editor
              id="replyEditor"
              width="100%"
              viewer={false}
              hideModeSwitch={true}
              mode="wysiwyg"
              toolbarItems={[]}
              font={{ size: '1.25rem', color: Theme.text.primary }}
              lineHeight={1.5}
              padding={{top: 12, bottom: 12, left: 0, right: 0}}
              background={{ color: 'transparent' }}
              height="auto"
              minHeight={0}
              onChanged={this.onEditorChanged}
              cursor='text'
              border={{style: 'none'}}
            ></i-markdown-editor>
            <i-vstack id="pnlMedias" margin={{bottom: '1rem'}} />
          </i-panel>
          
          {/* comment */}
          <i-hstack
            id="pnlBorder"
            horizontalAlignment="space-between"
            grid={{ area: 'reply' }}
            padding={{ top: '0.75rem' }}
          >
            <i-hstack
              id="pnlIcons"
              gap="4px" verticalAlignment="center"
              visible={false}
            >
              <i-icon
                name="image" width={28} height={28} fill={Theme.colors.primary.main}
                border={{radius: '50%'}}
                padding={{top: 5, bottom: 5, left: 5, right: 5}}
                tooltip={{content: 'Media', placement: 'bottom'}}
                onClick={this.onUpload}
              ></i-icon>
              <i-icon
                name="images" width={28} height={28} fill={Theme.colors.primary.main}
                border={{radius: '50%'}}
                padding={{top: 5, bottom: 5, left: 5, right: 5}}
                tooltip={{content: 'GIF', placement: 'bottom'}}
                onClick={() => this.onShowModal('mdGif')}
              ></i-icon>
              <i-panel>
                <i-icon
                  name="smile" width={28} height={28} fill={Theme.colors.primary.main}
                  border={{radius: '50%'}}
                  padding={{top: 5, bottom: 5, left: 5, right: 5}}
                  tooltip={{content: 'Emoji', placement: 'bottom'}}
                  onClick={() => this.onShowModal('mdEmoji')}
                ></i-icon>
                <i-modal
                  id="mdEmoji"
                  maxWidth={'100%'}
                  minWidth={320}
                  popupPlacement='bottomRight'
                  showBackdrop={false}
                  border={{radius: '1rem'}}
                  boxShadow='rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px'
                  padding={{top: 0, left: 0, right: 0, bottom: 0}}
                  onOpen={this.onEmojiMdOpen}
                >
                  <i-vstack position='relative' padding={{left: '0.25rem', right: '0.25rem'}}>
                    <i-hstack
                      verticalAlignment="center"
                      border={{radius: '9999px', width: '1px', style: 'solid', color: Theme.divider}}
                      minHeight={40} width={'100%'}
                      background={{color: Theme.input.background}}
                      padding={{left: '0.75rem', right: '0.75rem'}}
                      margin={{top: '0.25rem', bottom: '0.25rem'}}
                      gap="4px"
                    >
                      <i-icon width={'1rem'} height={'1rem'} name='search' fill={Theme.text.secondary}/>
                      <i-input
                        id="inputEmoji"
                        placeholder='Search emojis'
                        width='100%'
                        height='100%'
                        border={{style: 'none'}}
                        captionWidth={'0px'}
                        showClearButton={true}
                        onClearClick={this.onEmojiMdOpen}
                        onKeyUp={this.onEmojiSearch}
                      ></i-input>
                    </i-hstack>
                    <i-grid-layout
                      id="gridEmojiCate"
                      verticalAlignment="center"
                      columnsPerRow={9}
                      margin={{top: 4}}
                      grid={{verticalAlignment: 'center', horizontalAlignment: 'center'}}
                      border={{bottom: {width: '1px', style: 'solid', color: Theme.divider}}}
                    ></i-grid-layout>
                    <i-vstack id="groupEmojis" maxHeight={400} overflow={{y: 'auto'}} />
                    <i-vstack
                      id="pnlEmojiResult"
                      border={{bottom: {width: '1px', style: 'solid', color: Theme.divider}}}
                      maxHeight={400} overflow={{y: 'auto'}}
                      minHeight={200}
                      gap="0.75rem"
                      visible={false}
                    />
                    <i-hstack
                      bottom="0px" left="0px" position="absolute" width={'100%'}
                      verticalAlignment="center" horizontalAlignment="space-between"
                      padding={{top: '0.75rem', left: '0.75rem', right: '0.75rem', bottom: '0.75rem'}}
                      gap="0.75rem" zIndex={20}
                      background={{color: Theme.background.modal}}
                      border={{radius: '0 0 1rem 1rem', top: {width: '1px', style: 'solid', color: Theme.divider}}}
                    >
                      <i-label id="lbEmoji" width={'1.25rem'} height={'1.25rem'} display="inline-block"></i-label>
                      <i-hstack
                        id="pnlColors"
                        verticalAlignment="center" gap={'0.25rem'}
                        overflow={'hidden'}
                        cursor="pointer"
                        padding={{top: '0.25rem', left: '0.25rem', right: '0.25rem', bottom: '0.25rem'}}
                      />
                    </i-hstack>
                  </i-vstack>
                </i-modal>
              </i-panel>
              <i-icon
                name="map-marker-alt" width={28} height={28} fill={Theme.colors.primary.main}
                border={{radius: '50%'}}
                padding={{top: 5, bottom: 5, left: 5, right: 5}}
                tooltip={{content: 'SCOM widgets', placement: 'bottom'}}
                onClick={() => this.onShowModal('mdWidgets')}
              ></i-icon>
            </i-hstack>
            <i-button
              id="btnReply"
              height={36}
              padding={{ left: '1rem', right: '1rem' }}
              background={{ color: Theme.colors.primary.main }}
              font={{ color: Theme.colors.primary.contrastText, bold: true }}
              border={{ radius: '30px' }}
              enabled={false}
              margin={{left: 'auto'}}
              caption="Reply"
              onClick={this.onReply}
            ></i-button>
          </i-hstack>
        </i-grid-layout>

        <i-modal
          id="mdGif"
          border={{radius: '1rem'}}
          maxWidth={'600px'}
          maxHeight={'90vh'}
          padding={{top: 0, right: 0, left: 0, bottom: 0}}
          mediaQueries={[
            {
              maxWidth: '767px',
              properties: {
                showBackdrop: true,
                popupPlacement: 'top',
                position: 'fixed',
                zIndex: 999,
                maxWidth: '100%',
                height: '100%',
                width: '100%',
                border: {radius: 0}
              }
            }
          ]}
          onOpen={this.onGifMdOpen}
          onClose={this.onGifMdClose}
        >
          <i-vstack>
            <i-hstack
              verticalAlignment="center"
              height={53}
              margin={{top: 8, bottom: 8}}
              padding={{right: '1rem', left: '1rem'}}
              position="sticky"
              zIndex={2} top={'0px'}
              background={{color: Theme.background.modal}}
            >
              <i-panel stack={{basis: '56px'}}>
                <i-icon
                  id="iconGif"
                  name="times"
                  cursor='pointer'
                  width={20} height={20} fill={Theme.colors.secondary.main}
                  onClick={this.onIconGifClicked}
                ></i-icon>
              </i-panel>
              <i-hstack
                verticalAlignment="center"
                padding={{left: '0.75rem', right: '0.75rem'}}
                border={{radius: '9999px', width: '1px', style: 'solid', color: Theme.divider}}
                minHeight={40} width={'100%'}
                background={{color: Theme.input.background}}
                gap="4px"
              >
                <i-icon width={16} height={16} name='search' fill={Theme.text.secondary}/>
                <i-input
                  id="inputGif"
                  placeholder='Search for Gifs'
                  width='100%'
                  height='100%'
                  captionWidth={'0px'}
                  border={{style: 'none'}}
                  showClearButton={true}
                  onClearClick={() => this.onToggleMainGif(true)}
                  onKeyUp={(target: Input) => this.onGifSearch(target.value)}
                ></i-input>
              </i-hstack>
            </i-hstack>
            <i-card-layout
              id="gridGifCate"
              cardMinWidth={'18rem'}
              cardHeight={'9.375rem'}
            ></i-card-layout>
            <i-vstack id="pnlGif" visible={false}>
              <i-hstack
                horizontalAlignment="space-between"
                gap="0.5rem"
                padding={{left: '0.75rem', right: '0.75rem', top: '0.75rem', bottom: '0.75rem'}}
              >
                <i-label caption="Auto-play GIFs" font={{color: Theme.text.secondary, size: '0.9rem'}}></i-label>
                <i-switch
                  id="autoPlaySwitch"
                  checked={true}
                  checkedThumbColor={Theme.colors.info.main}
                  checkedTrackColor={Theme.colors.info.light}
                  uncheckedTrackColor='rgb(147, 147, 147)'
                  uncheckedThumbColor={Theme.colors.secondary.contrastText}
                  onChanged={this.onGifPlayChanged}
                ></i-switch>
              </i-hstack>
              <i-panel id="topElm" width={'100%'}></i-panel>
              <i-card-layout
                id="gridGif"
                autoRowSize="auto"
                autoColumnSize="auto"
                cardHeight={'auto'}
                columnsPerRow={4}
              ></i-card-layout>
              <i-panel id="bottomElm" width={'100%'} minHeight={20}>
                <i-vstack
                  id="gifLoading"
                  padding={{top: '0.5rem', bottom: '0.5rem'}}
                  visible={false}
                  height="100%" width="100%"
                  class="i-loading-overlay"
                  background={{color: Theme.background.modal}}
                >
                  <i-vstack class="i-loading-spinner" horizontalAlignment="center" verticalAlignment="center">
                    <i-icon
                      class="i-loading-spinner_icon"
                      name="spinner"
                      width={24}
                      height={24}
                      fill={Theme.colors.primary.main}
                    />
                  </i-vstack>
                </i-vstack>
              </i-panel>
            </i-vstack>
          </i-vstack>
        </i-modal>

        <i-modal
          id="mdWidgets"
          border={{radius: '1rem'}}
          maxWidth={'600px'}
          maxHeight={'90vh'}
          padding={{top: 0, right: 0, left: 0, bottom: 0}}
          mediaQueries={[
            {
              maxWidth: '767px',
              properties: {
                showBackdrop: true,
                popupPlacement: 'top',
                position: 'fixed',
                zIndex: 999,
                maxWidth: '100%',
                height: '100%',
                width: '100%',
                border: {radius: 0}
              }
            }
          ]}
        >
          <i-vstack>
            <i-hstack
              verticalAlignment="center" horizontalAlignment="space-between"
              padding={{right: '1rem', left: '1rem', top: '1rem', bottom: '1rem'}}
            >
              <i-label caption='SCOM Widgets' font={{color: Theme.colors.primary.main, size: '1rem', bold: true}}></i-label>
              <i-icon
                name="times"
                cursor='pointer'
                width={20} height={20} fill={Theme.colors.secondary.main}
                onClick={() => this.onCloseModal('mdWidgets')}
              ></i-icon>
            </i-hstack>
          </i-vstack>
        </i-modal>
      </i-panel>
    );
  }
}
