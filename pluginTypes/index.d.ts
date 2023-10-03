/// <amd-module name="@scom/scom-feed/index.css.ts" />
declare module "@scom/scom-feed/index.css.ts" {
    export const spinnerStyle: string;
    export const labelStyle: string;
    export const multiLineTextStyle: string;
    export const customStyles: string;
    export const modalStyle: string;
}
/// <amd-module name="@scom/scom-feed/data.json.ts" />
declare module "@scom/scom-feed/data.json.ts" {
    const _default: {
        ipfsGatewayUrl: string;
    };
    export default _default;
}
/// <amd-module name="@scom/scom-feed/store/index.ts" />
declare module "@scom/scom-feed/store/index.ts" {
    export const state: {
        ipfsGatewayUrl: string;
    };
    export const setDataFromJson: (options: any) => void;
    export const setIPFSGatewayUrl: (url: string) => void;
    export const getIPFSGatewayUrl: () => string;
}
/// <amd-module name="@scom/scom-feed/global/utils.ts" />
declare module "@scom/scom-feed/global/utils.ts" {
    const getImageIpfsUrl: (url: string) => string;
    const formatNumber: (value: number | string, decimal?: number) => string;
    const getDuration: (date: number) => string;
    export { getImageIpfsUrl, formatNumber, getDuration };
}
/// <amd-module name="@scom/scom-feed/global/localData/data.json.ts" />
declare module "@scom/scom-feed/global/localData/data.json.ts" {
    const _default_1: {
        username: string;
        description: string;
        dataUri: string;
        owner: string;
        avatar: string;
        publishDate: number;
        analytics: {
            reply: number;
            repost: number;
            vote: number;
            bookmark: number;
            view: number;
        };
        replies: {
            cid: string;
        }[];
    };
    export default _default_1;
}
/// <amd-module name="@scom/scom-feed/global/API.ts" />
declare module "@scom/scom-feed/global/API.ts" {
    const fetchDataByCid: (cid: string) => Promise<any>;
    export { fetchDataByCid };
}
/// <amd-module name="@scom/scom-feed/global/interface.ts" />
declare module "@scom/scom-feed/global/interface.ts" {
    interface IPostAnalytics {
        reply: string | number;
        repost: string | number;
        like: string | number;
        bookmark: string | number;
        view: string | number;
    }
    export interface IReply {
        cid: string;
    }
    export interface IPostData {
        username: string;
        owner?: string;
        description?: string;
        dataUri?: string;
        publishDate?: number;
        avatar?: string;
        replies?: IReply[];
        analytics?: IPostAnalytics;
    }
}
/// <amd-module name="@scom/scom-feed/global/schemas.ts" />
declare module "@scom/scom-feed/global/schemas.ts" {
    export function getBuilderSchema(): {
        dataSchema: {
            type: string;
            required: string[];
            properties: {
                cids: {
                    type: string;
                    items: {
                        type: string;
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
                        inputBackgroundColor: {
                            type: string;
                            format: string;
                        };
                        inputFontColor: {
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
                        inputBackgroundColor: {
                            type: string;
                            format: string;
                        };
                        inputFontColor: {
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
                        label: string;
                        elements: {
                            type: string;
                            elements: {
                                type: string;
                                scope: string;
                            }[];
                        }[];
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
                cid: {
                    type: string;
                    required: boolean;
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
                        inputBackgroundColor: {
                            type: string;
                            format: string;
                        };
                        inputFontColor: {
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
                        inputBackgroundColor: {
                            type: string;
                            format: string;
                        };
                        inputFontColor: {
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
                        label: string;
                        elements: {
                            type: string;
                            elements: {
                                type: string;
                                scope: string;
                            }[];
                        }[];
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
/// <amd-module name="@scom/scom-feed/global/index.ts" />
declare module "@scom/scom-feed/global/index.ts" {
    export * from "@scom/scom-feed/global/utils.ts";
    export * from "@scom/scom-feed/global/API.ts";
    export * from "@scom/scom-feed/global/interface.ts";
    export * from "@scom/scom-feed/global/schemas.ts";
}
/// <amd-module name="@scom/scom-feed/commons/replyInput/index.css.ts" />
declare module "@scom/scom-feed/commons/replyInput/index.css.ts" {
    export const editorStyle: string;
}
/// <amd-module name="@scom/scom-feed/commons/replyInput/index.tsx" />
declare module "@scom/scom-feed/commons/replyInput/index.tsx" {
    import { ControlElement, Module, Markdown, MarkdownEditor } from '@ijstech/components';
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
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-feed-reply-input']: ScomFeedReplyInputElement;
            }
        }
    }
    export class ScomFeedReplyInput extends Module {
        private replyEditor;
        private btnReply;
        private imgReplier;
        private _data;
        onChanged: (target: MarkdownEditor) => void;
        onSubmit: (target: MarkdownEditor) => void;
        get replyTo(): string;
        set replyTo(value: string);
        get avatar(): string;
        set avatar(value: string);
        get isReplyToShown(): boolean;
        set isReplyToShown(value: boolean);
        set theme(value: Markdown["theme"]);
        setData(value: IReplyInput): void;
        clear(): void;
        private onEditorChanged;
        private onReply;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-feed/commons/index.ts" />
declare module "@scom/scom-feed/commons/index.ts" {
    export { ScomFeedReplyInput } from "@scom/scom-feed/commons/replyInput/index.tsx";
}
/// <amd-module name="@scom/scom-feed" />
declare module "@scom/scom-feed" {
    import { ControlElement, Module, Container, Markdown, IDataSchema, IUISchema } from '@ijstech/components';
    interface ScomFeedElement extends ControlElement {
        cids?: string[];
        theme?: Markdown["theme"];
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-feed']: ScomFeedElement;
            }
        }
    }
    export default class ScomFeed extends Module {
        private inputReply;
        private pnlPosts;
        private pnlMore;
        private lbMore;
        private isRendering;
        private _cids;
        private _theme;
        tag: {
            light: {};
            dark: {};
        };
        constructor(parent?: Container, options?: any);
        static create(options?: ScomFeedElement, parent?: Container): Promise<ScomFeed>;
        get cids(): string[];
        set cids(value: string[]);
        set theme(value: Markdown["theme"]);
        get theme(): Markdown["theme"];
        private clear;
        private setData;
        private getData;
        private renderUI;
        private fetchData;
        private onViewPost;
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
