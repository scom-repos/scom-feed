/// <amd-module name="@scom/scom-feed/data.json.ts" />
declare module "@scom/scom-feed/data.json.ts" {
    const _default: {
        ipfsGatewayUrl: string;
    };
    export default _default;
}
/// <amd-module name="@scom/scom-feed/global/schemas.ts" />
declare module "@scom/scom-feed/global/schemas.ts" {
    export function getBuilderSchema(): {
        dataSchema: {
            type: string;
            required: string[];
            properties: {
                posts: {
                    type: string;
                    items: {
                        type: string;
                        properties: {};
                    };
                };
                dark: {
                    type: string;
                    properties: {
                        backgroundColor: {
                            type: string;
                            format: string;
                        };
                        fontColor: {
                            type: string;
                            format: string;
                        };
                        cardBackground: {
                            type: string;
                            format: string;
                        };
                        gradientBackground: {
                            type: string;
                            format: string;
                        };
                        primaryColor: {
                            type: string;
                            format: string;
                        };
                        primaryBackground: {
                            type: string;
                            format: string;
                        };
                        successColor: {
                            type: string;
                            format: string;
                        };
                        successBackground: {
                            type: string;
                            format: string;
                        };
                        errorColor: {
                            type: string;
                            format: string;
                        };
                        errorBackground: {
                            type: string;
                            format: string;
                        };
                        subcribeButtonBackground: {
                            type: string;
                            format: string;
                        };
                        placeholderColor: {
                            type: string;
                            format: string;
                        };
                        hoverBackgroundColor: {
                            type: string;
                            format: string;
                        };
                        groupBorderColor: {
                            type: string;
                            format: string;
                        };
                        borderColor: {
                            type: string;
                            format: string;
                        };
                        secondaryColor: {
                            type: string;
                            format: string;
                        };
                        modalBackground: {
                            type: string;
                            format: string;
                        };
                        boxShadow: {
                            type: string;
                            format: string;
                        };
                    };
                };
                light: {
                    type: string;
                    properties: {
                        backgroundColor: {
                            type: string;
                            format: string;
                        };
                        fontColor: {
                            type: string;
                            format: string;
                        };
                        cardBackground: {
                            type: string;
                            format: string;
                        };
                        gradientBackground: {
                            type: string;
                            format: string;
                        };
                        primaryColor: {
                            type: string;
                            format: string;
                        };
                        primaryBackground: {
                            type: string;
                            format: string;
                        };
                        successColor: {
                            type: string;
                            format: string;
                        };
                        successBackground: {
                            type: string;
                            format: string;
                        };
                        errorColor: {
                            type: string;
                            format: string;
                        };
                        errorBackground: {
                            type: string;
                            format: string;
                        };
                        subcribeButtonBackground: {
                            type: string;
                            format: string;
                        };
                        placeholderColor: {
                            type: string;
                            format: string;
                        };
                        hoverBackgroundColor: {
                            type: string;
                            format: string;
                        };
                        groupBorderColor: {
                            type: string;
                            format: string;
                        };
                        borderColor: {
                            type: string;
                            format: string;
                        };
                        secondaryColor: {
                            type: string;
                            format: string;
                        };
                        modalBackground: {
                            type: string;
                            format: string;
                        };
                        boxShadow: {
                            type: string;
                            format: string;
                        };
                    };
                };
            };
        };
        uiSchema: {
            type: string;
            elements: ({
                type: string;
                label: string;
                elements: {
                    type: string;
                    elements: {
                        type: string;
                        elements: {
                            type: string;
                            elements: {
                                type: string;
                                scope: string;
                            }[];
                        }[];
                        label: string;
                    }[];
                }[];
            } | {
                type: string;
                label: string;
                elements: {
                    type: string;
                    elements: {
                        type: string;
                        scope: string;
                    }[];
                }[];
            })[];
        };
    };
    export function getEmbedderSchema(): {
        dataSchema: {
            type: string;
            properties: {
                post: {
                    type: string;
                    required: boolean;
                    properties: {};
                };
                dark: {
                    type: string;
                    properties: {
                        backgroundColor: {
                            type: string;
                            format: string;
                        };
                        fontColor: {
                            type: string;
                            format: string;
                        };
                        cardBackground: {
                            type: string;
                            format: string;
                        };
                        gradientBackground: {
                            type: string;
                            format: string;
                        };
                        primaryColor: {
                            type: string;
                            format: string;
                        };
                        primaryBackground: {
                            type: string;
                            format: string;
                        };
                        successColor: {
                            type: string;
                            format: string;
                        };
                        successBackground: {
                            type: string;
                            format: string;
                        };
                        errorColor: {
                            type: string;
                            format: string;
                        };
                        errorBackground: {
                            type: string;
                            format: string;
                        };
                        subcribeButtonBackground: {
                            type: string;
                            format: string;
                        };
                        placeholderColor: {
                            type: string;
                            format: string;
                        };
                        hoverBackgroundColor: {
                            type: string;
                            format: string;
                        };
                        groupBorderColor: {
                            type: string;
                            format: string;
                        };
                        borderColor: {
                            type: string;
                            format: string;
                        };
                        secondaryColor: {
                            type: string;
                            format: string;
                        };
                        modalBackground: {
                            type: string;
                            format: string;
                        };
                        boxShadow: {
                            type: string;
                            format: string;
                        };
                    };
                };
                light: {
                    type: string;
                    properties: {
                        backgroundColor: {
                            type: string;
                            format: string;
                        };
                        fontColor: {
                            type: string;
                            format: string;
                        };
                        cardBackground: {
                            type: string;
                            format: string;
                        };
                        gradientBackground: {
                            type: string;
                            format: string;
                        };
                        primaryColor: {
                            type: string;
                            format: string;
                        };
                        primaryBackground: {
                            type: string;
                            format: string;
                        };
                        successColor: {
                            type: string;
                            format: string;
                        };
                        successBackground: {
                            type: string;
                            format: string;
                        };
                        errorColor: {
                            type: string;
                            format: string;
                        };
                        errorBackground: {
                            type: string;
                            format: string;
                        };
                        subcribeButtonBackground: {
                            type: string;
                            format: string;
                        };
                        placeholderColor: {
                            type: string;
                            format: string;
                        };
                        hoverBackgroundColor: {
                            type: string;
                            format: string;
                        };
                        groupBorderColor: {
                            type: string;
                            format: string;
                        };
                        borderColor: {
                            type: string;
                            format: string;
                        };
                        secondaryColor: {
                            type: string;
                            format: string;
                        };
                        modalBackground: {
                            type: string;
                            format: string;
                        };
                        boxShadow: {
                            type: string;
                            format: string;
                        };
                    };
                };
            };
        };
        uiSchema: {
            type: string;
            elements: ({
                type: string;
                label: string;
                elements: {
                    type: string;
                    elements: {
                        type: string;
                        elements: {
                            type: string;
                            elements: {
                                type: string;
                                scope: string;
                            }[];
                        }[];
                        label: string;
                    }[];
                }[];
            } | {
                type: string;
                label: string;
                elements: {
                    type: string;
                    elements: {
                        type: string;
                        scope: string;
                    }[];
                }[];
            })[];
        };
    };
}
/// <amd-module name="@scom/scom-feed/global/interface.ts" />
declare module "@scom/scom-feed/global/interface.ts" {
    import { IPost } from "@scom/scom-post";
    export interface IFeed {
        posts: IPost[];
    }
}
/// <amd-module name="@scom/scom-feed/global/API.ts" />
declare module "@scom/scom-feed/global/API.ts" {
    export const fetchGifs: (params: any) => Promise<any>;
    export const fetchReactionGifs: () => Promise<any>;
    export interface IEmojiCategory {
        name: string;
        value: string;
        image?: string;
        groups?: string[];
    }
    export interface IEmoji {
        name: string;
        category: string;
        group: string;
        htmlCode: string[];
        unicode: string[];
    }
    export const emojiCategories: {
        name: string;
        value: string;
        image: string;
        groups: string[];
    }[];
    export const colorsMapper: {
        'rgb(255, 220, 93)': {
            htmlCode: string;
            unicode: string;
        };
        'rgb(247, 222, 206)': {
            htmlCode: string;
            unicode: string;
        };
        'rgb(243, 210, 162)': {
            htmlCode: string;
            unicode: string;
        };
        'rgb(213, 171, 136)': {
            htmlCode: string;
            unicode: string;
        };
        'rgb(175, 126, 87)': {
            htmlCode: string;
            unicode: string;
        };
        'rgb(124, 83, 62)': {
            htmlCode: string;
            unicode: string;
        };
    };
    export const fetchEmojis: (params: any) => Promise<any>;
    export const searchEmojis: (q: string, mapper: Map<string, any>) => any;
}
/// <amd-module name="@scom/scom-feed/global/index.ts" />
declare module "@scom/scom-feed/global/index.ts" {
    export * from "@scom/scom-feed/global/schemas.ts";
    export * from "@scom/scom-feed/global/interface.ts";
    export * from "@scom/scom-feed/global/API.ts";
}
/// <amd-module name="@scom/scom-feed/store/index.ts" />
declare module "@scom/scom-feed/store/index.ts" {
    import { IAuthor } from "@scom/scom-post";
    export const state: {
        ipfsGatewayUrl: string;
    };
    export const setDataFromJson: (options: any) => void;
    export const setIPFSGatewayUrl: (url: string) => void;
    export const getIPFSGatewayUrl: () => string;
    export const getCurrentUser: () => IAuthor;
}
/// <amd-module name="@scom/scom-feed/commons/replyInput.tsx" />
declare module "@scom/scom-feed/commons/replyInput.tsx" {
    import { Module, MarkdownEditor, ControlElement, Container } from '@ijstech/components';
    import { IPost, IPostData } from '@scom/scom-post';
    type IReplyType = 'reply' | 'quote';
    type onChangedCallback = (target: MarkdownEditor) => void;
    type onSubmitCallback = (target: MarkdownEditor, medias: IPostData[]) => void;
    interface IReplyInput {
        replyTo?: IPost;
        isReplyToShown?: boolean;
        type?: IReplyType;
        placeholder?: string;
        buttonCaption?: string;
    }
    interface ReplyInputElement extends ControlElement {
        replyTo?: IPost;
        isReplyToShown?: boolean;
        type?: IReplyType;
        placeholder?: string;
        buttonCaption?: string;
        onChanged?: onChangedCallback;
        onSubmit?: onSubmitCallback;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-feed--reply-input']: ReplyInputElement;
            }
        }
    }
    export class ScomFeedReplyInput extends Module {
        private mdEmoji;
        private mdGif;
        private mdWidgets;
        private lbReplyTo;
        private replyEditor;
        private btnReply;
        private pnlReplyTo;
        private gridReply;
        private imgReplier;
        private pnlBorder;
        private pnlIcons;
        private gridGif;
        private gridGifCate;
        private pnlGif;
        private iconGif;
        private inputGif;
        private bottomElm;
        private gridEmojiCate;
        private groupEmojis;
        private pnlColors;
        private lbEmoji;
        private pnlEmojiResult;
        private inputEmoji;
        private gifLoading;
        private autoPlaySwitch;
        private pnlMedias;
        private selectedColor;
        private recent;
        private _data;
        private extensions;
        private currentGifPage;
        private totalGifPage;
        private renderedMap;
        private bottomObserver;
        private newReply;
        private isEmojiSearching;
        private recentEmojis;
        private emojiCateMapper;
        private emojiGroupsData;
        private searchTimer;
        onChanged: onChangedCallback;
        onSubmit: onSubmitCallback;
        constructor(parent?: Container, options?: any);
        static create(options?: ReplyInputElement, parent?: Container): Promise<ScomFeedReplyInput>;
        get replyTo(): IPost;
        set replyTo(value: IPost);
        get type(): IReplyType;
        set type(value: IReplyType);
        get placeholder(): string;
        set placeholder(value: string);
        get buttonCaption(): string;
        set buttonCaption(value: string);
        get isReplyToShown(): boolean;
        set isReplyToShown(value: boolean);
        private get isQuote();
        private get hasRecentEmojis();
        private get emojiColors();
        private get currentEmojiColor();
        private isRecent;
        setData(value: IReplyInput): void;
        clear(): void;
        private clearObservers;
        private updateGrid;
        private onEditorChanged;
        private onReply;
        private onUpload;
        private onCloseModal;
        private onShowModal;
        private onGifMdOpen;
        private onGifMdClose;
        private renderGifCate;
        private onGifSelected;
        private onGifSearch;
        private onToggleMainGif;
        private renderGifs;
        private onGifPlayChanged;
        private onIconGifClicked;
        private renderEmojis;
        private renderEmojiCate;
        private renderEmojiGroup;
        private updateEmojiGroups;
        private filterGroups;
        private onRecentClear;
        private renderEmojiColors;
        private renderColor;
        private onEmojiColorSelected;
        private onEmojiCateSelected;
        private onEmojiSelected;
        private onEmojiSearch;
        private onEmojiMdOpen;
        protected _handleClick(event: MouseEvent, stopPropagation?: boolean): boolean;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-feed/assets.ts" />
declare module "@scom/scom-feed/assets.ts" {
    function fullPath(path: string): string;
    const _default_1: {
        fullPath: typeof fullPath;
    };
    export default _default_1;
}
/// <amd-module name="@scom/scom-feed/index.css.ts" />
declare module "@scom/scom-feed/index.css.ts" {
    export const getHoverStyleClass: (color?: string) => string;
}
/// <amd-module name="@scom/scom-feed" />
declare module "@scom/scom-feed" {
    import { ControlElement, Module, Container, Markdown, IDataSchema, IUISchema } from '@ijstech/components';
    import { IFeed } from "@scom/scom-feed/global/index.ts";
    import { IPost, ScomPost } from '@scom/scom-post';
    type callbackType = (target: ScomPost) => void;
    type submitCallbackType = (newPost: IPost) => void;
    interface ScomFeedElement extends ControlElement {
        data?: IFeed;
        isListView?: boolean;
        theme?: Markdown["theme"];
        onItemClicked?: callbackType;
        onPostButtonClicked?: submitCallbackType;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-feed']: ScomFeedElement;
            }
        }
    }
    export default class ScomFeed extends Module {
        private pnlInput;
        private inputReply;
        private pnlPosts;
        private mdFilter;
        private lbFilter;
        private pnlFilter;
        private btnMore;
        private mdActions;
        private pnlActions;
        private isRendering;
        private _data;
        private _isListView;
        private _theme;
        onItemClicked: callbackType;
        onPostButtonClicked: submitCallbackType;
        tag: {
            light: {};
            dark: {};
        };
        constructor(parent?: Container, options?: any);
        static create(options?: ScomFeedElement, parent?: Container): Promise<ScomFeed>;
        get posts(): IPost[];
        set posts(value: IPost[]);
        get isListView(): boolean;
        set isListView(value: boolean);
        set theme(value: Markdown["theme"]);
        get theme(): Markdown["theme"];
        clear(): void;
        private setData;
        private getData;
        private renderUI;
        private renderActions;
        private onViewPost;
        private onReplySubmit;
        addPost(post: IPost, isPrepend?: boolean): void;
        setPosts(posts: IPost[]): void;
        private renderPosts;
        private onShowFilter;
        private onFilter;
        private onCloseModal;
        private onShowModal;
        private removeShow;
        getConfigurators(): ({
            name: string;
            target: string;
            getActions: () => {
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                userInputDataSchema: IDataSchema;
                userInputUISchema: IUISchema;
            }[];
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
            getLinkParams?: undefined;
            setLinkParams?: undefined;
        } | {
            name: string;
            target: string;
            getActions: () => {
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                userInputDataSchema: IDataSchema;
                userInputUISchema: IUISchema;
            }[];
            getLinkParams: () => {
                data: string;
            };
            setLinkParams: (params: any) => Promise<void>;
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        })[];
        private _getActions;
        private getTag;
        private updateTag;
        private setTag;
        private updateStyle;
        private updateTheme;
        init(): void;
        render(): any;
    }
}
