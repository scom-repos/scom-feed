import {
  ControlElement,
  customElements,
  Module,
  Styles,
  Markdown,
  MarkdownEditor,
  Button,
  Image
} from '@ijstech/components';
import { editorStyle } from './index.css';
const Theme = Styles.Theme.ThemeVars;

interface ScomFeedReplyInputElement extends ControlElement {
  replyTo?: string;
  avatar?: string;
  isReplyToShown?: boolean;
  theme?: Markdown["theme"];
  onChanged?: (target: MarkdownEditor) => void;
  onSubmit?: (target: MarkdownEditor) => void;
}

interface IReplyInput {
  replyTo?: string;
  isReplyToShown?: boolean;
  avatar?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-feed-reply-input']: ScomFeedReplyInputElement;
    }
  }
}

@customElements('i-scom-feed-reply-input')
export class ScomFeedReplyInput extends Module {
  private replyEditor: MarkdownEditor;
  private btnReply: Button;
  private imgReplier: Image;

  private _data: IReplyInput;

  public onChanged: (target: MarkdownEditor) => void;
  public onSubmit: (target: MarkdownEditor) => void;

  get replyTo() {
    return this._data.replyTo ?? '';
  }
  set replyTo(value: string) {
    this._data.replyTo = value ?? '';
  }

  get avatar() {
    return this._data.avatar ?? '';
  }
  set avatar(value: string) {
    this._data.avatar = value ?? '';
  }

  get isReplyToShown(): boolean {
    return this._data.isReplyToShown ?? false;
  }
  set isReplyToShown(value: boolean) {
    this._data.isReplyToShown = value ?? false;
  }

  set theme(value: Markdown["theme"]) {
    if (this.replyEditor) this.replyEditor.theme = value;
  }

  setData(value: IReplyInput) {
    this._data = value;
    if (this.avatar) this.imgReplier.url = this.avatar;
  }

  clear() {
    this.imgReplier.url = '';
  }

  private onEditorChanged() {
    this.btnReply.enabled = !!this.replyEditor.getMarkdownValue();
    if (this.onChanged) this.onChanged(this.replyEditor);
  }

  private onReply() {
    if (this.onSubmit) this.onSubmit(this.replyEditor);
  }

  init() {
    super.init();
    this.onChanged = this.getAttribute('onChanged', true) || this.onChanged;
    this.onSubmit = this.getAttribute('onSubmit', true) || this.onSubmit;
    const replyTo = this.getAttribute('replyTo', true, '');
    const avatar = this.getAttribute('avatar', true, '');
    const isReplyToShown = this.getAttribute('isReplyToShown', true, false);
    this.setData({isReplyToShown, replyTo, avatar});
    const theme = this.getAttribute('theme', true);
    if (theme) this.theme = theme;
  }

  render() {
    return (
      <i-panel padding={{bottom: 12}}>
        <i-grid-layout
          id="gridReply"
          templateColumns={['40px', 'auto']}
          padding ={{top: 12}}
          gap={{column: 12}}
        >
          <i-image
            id="imgReplier"
            width={36} height={36} display="block"
            background={{color: Theme.background.gradient}}
            border={{radius: '50%'}}
            overflow={'hidden'}
            stack={{shrink: '0'}}
            class={'avatar'}
          ></i-image>
          <i-panel>
            {/* <i-panel></i-panel> */}
            <i-markdown-editor
              id="replyEditor"
              width="100%"
              placeholder="What is happening?!"
              viewer={false}
              hideModeSwitch={true}
              mode='wysiwyg'
              toolbarItems={[]}
              font={{size: '1.25rem', color: Theme.text.secondary}}
              background={{color: 'transparent'}}
              height="auto" theme='dark'
              onChanged={this.onEditorChanged}
              class={editorStyle}
            ></i-markdown-editor>
            {/* <i-panel></i-panel> */}
            <i-hstack horizontalAlignment="end">
              <i-button
                id="btnReply"
                minHeight={36}
                padding={{left: '1rem', right: '1rem'}}
                background={{color: Theme.colors.primary.main}}
                font={{color: Theme.colors.primary.contrastText}}
                border={{radius: '30px'}}
                enabled={false}
                caption='Reply'
                onClick={this.onReply}
              ></i-button>
            </i-hstack>
          </i-panel>
        </i-grid-layout>
      </i-panel>
    )
  }
}
