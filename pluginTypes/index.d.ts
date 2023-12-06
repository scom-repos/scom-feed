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
/// <amd-module name="@scom/scom-feed/index.css.ts" />
declare module "@scom/scom-feed/index.css.ts" {
    export const getHoverStyleClass: (color?: string) => string;
}
/// <amd-module name="@scom/scom-feed" />
declare module "@scom/scom-feed" {
    import { ControlElement, Module, Container, Markdown, IDataSchema, IUISchema } from '@ijstech/components';
    import { IFeed } from "@scom/scom-feed/global/index.ts";
    import { IPost, IPostData, ScomPost } from '@scom/scom-post';
    type callbackType = (target: ScomPost, event: MouseEvent) => void;
    type submitCallbackType = (content: string, medias: IPostData[]) => void;
    interface ScomFeedElement extends ControlElement {
        data?: IFeed;
        isListView?: boolean;
        theme?: Markdown["theme"];
        isComposerVisible?: boolean;
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
        private pnlLoading;
        private isRendering;
        private _data;
        private _isListView;
        private _theme;
        private _isComposerVisible;
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
        get isComposerVisible(): boolean;
        set isComposerVisible(value: boolean);
        clear(): void;
        showLoading(): void;
        hideLoading(): void;
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
