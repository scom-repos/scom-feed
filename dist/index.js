var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
define("@scom/scom-feed/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.modalStyle = exports.customStyles = exports.multiLineTextStyle = exports.labelStyle = exports.spinnerStyle = void 0;
    const Theme = components_1.Styles.Theme.ThemeVars;
    const spin = components_1.Styles.keyframes({
        "to": {
            "-webkit-transform": "rotate(360deg)"
        }
    });
    exports.spinnerStyle = components_1.Styles.style({
        display: "inline-block",
        width: "2.5rem",
        height: "2.5rem",
        border: "3px solid transparent",
        borderRadius: "50%",
        borderTopColor: Theme.colors.primary.main,
        borderRightColor: Theme.colors.primary.main,
        "animation": `${spin} 0.46s linear infinite`,
        "-webkit-animation": `${spin} 0.46s linear infinite`
    });
    exports.labelStyle = components_1.Styles.style({
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    });
    exports.multiLineTextStyle = components_1.Styles.style({
        display: '-webkit-box',
        '-webkit-line-clamp': 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
    });
    exports.customStyles = components_1.Styles.style({
        $nest: {
            '.hovered-icon': {
                transition: 'background 0.3s ease-in'
            },
            '.hovered-icon:hover': {
                background: Theme.action.hover
            },
            '.avatar img': {
                objectFit: 'cover'
            }
        }
    });
    exports.modalStyle = components_1.Styles.style({
        $nest: {
            '.modal': {
                padding: '0 1rem 1rem',
                borderRadius: '1rem',
            },
            '.modal .i-modal_header': {
                display: 'none'
            }
        }
    });
});
define("@scom/scom-feed/data.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-feed/data.json.ts'/> 
    exports.default = {
        "ipfsGatewayUrl": "https://ipfs.scom.dev/ipfs/"
    };
});
define("@scom/scom-feed/store/index.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getIPFSGatewayUrl = exports.setIPFSGatewayUrl = exports.setDataFromJson = exports.state = void 0;
    ///<amd-module name='@scom/scom-feed/store/index.ts'/> 
    exports.state = {
        ipfsGatewayUrl: ""
    };
    const setDataFromJson = (options) => {
        if (options.ipfsGatewayUrl) {
            (0, exports.setIPFSGatewayUrl)(options.ipfsGatewayUrl);
        }
    };
    exports.setDataFromJson = setDataFromJson;
    const setIPFSGatewayUrl = (url) => {
        exports.state.ipfsGatewayUrl = url;
    };
    exports.setIPFSGatewayUrl = setIPFSGatewayUrl;
    const getIPFSGatewayUrl = () => {
        return exports.state.ipfsGatewayUrl;
    };
    exports.getIPFSGatewayUrl = getIPFSGatewayUrl;
});
define("@scom/scom-feed/global/utils.ts", ["require", "exports", "@ijstech/components", "@scom/scom-feed/store/index.ts"], function (require, exports, components_2, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getDuration = exports.formatNumber = exports.getImageIpfsUrl = void 0;
    const getImageIpfsUrl = (url) => {
        const ipfsBaseUrl = (0, index_1.getIPFSGatewayUrl)();
        if (isIpfsCid(url))
            return ipfsBaseUrl + url;
        return url;
    };
    exports.getImageIpfsUrl = getImageIpfsUrl;
    const isIpfsCid = (value) => {
        const regex = new RegExp('^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})$');
        return regex.test(value);
    };
    const formatNumber = (value, decimal) => {
        const numberValue = Number(value);
        if (numberValue >= 10000) {
            return components_2.FormatUtils.formatNumber(value, { shortScale: true, decimalFigures: decimal !== null && decimal !== void 0 ? decimal : 0 });
        }
        return components_2.FormatUtils.formatNumber(value, { decimalFigures: decimal !== null && decimal !== void 0 ? decimal : 0 });
    };
    exports.formatNumber = formatNumber;
    const getDuration = (date) => {
        const startDate = components_2.FormatUtils.unixToFormattedDate(date);
        const endDate = (0, components_2.moment)(new Date());
        let duration = components_2.moment.duration(endDate.diff(startDate));
        let days = duration.asDays();
        if (days >= 1)
            return components_2.moment.unix(date).format('MMM DD');
        let hours = duration.asHours();
        if (hours >= 1)
            return `${formatNumber(hours, 0)}h`;
        let minutes = duration.asMinutes();
        if (minutes >= 1)
            return `${formatNumber(minutes, 0)}m`;
        let seconds = duration.asSeconds();
        return `${formatNumber(seconds, 0)}s`;
    };
    exports.getDuration = getDuration;
});
define("@scom/scom-feed/global/localData/data.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-feed/global/localData/data.json.ts'/> 
    exports.default = {
        "username": "OpenSwap",
        "description": "We are thrilled to announce that the OpenSwap Bridge has officially launched its pilot phase! This means that you can now transfer your $OSWAP tokens between the BNB Smart Chain and Avalanche.",
        "dataUri": "bafybeicijtusosl6v3xdmvva2ggsuazfqk54qpv7z4yfib5asmbeeps3uq",
        "owner": "0xaA530FC26ee1Be26a27ca2CC001e74b972563a22",
        "avatar": "https://placehold.co/50",
        "publishDate": 1695876446.837,
        "analytics": {
            reply: 7,
            repost: 4,
            vote: 2300,
            bookmark: 950000,
            view: 10000000
        },
        replies: [
            {
                cid: 'bafybeicijtusosl6v3xdmvva2ggsuazfqk54qpv7z4yfib5asmbeeps3u0'
            },
            {
                cid: 'bafybeicijtusosl6v3xdmvva2ggsuazfqk54qpv7z4yfib5asmbeeps3u1'
            },
            {
                cid: 'bafybeicijtusosl6v3xdmvva2ggsuazfqk54qpv7z4yfib5asmbeeps3u2'
            },
            {
                cid: 'bafybeicijtusosl6v3xdmvva2ggsuazfqk54qpv7z4yfib5asmbeeps3u3'
            },
            {
                cid: 'bafybeicijtusosl6v3xdmvva2ggsuazfqk54qpv7z4yfib5asmbeeps3u4'
            },
            {
                cid: 'bafybeicijtusosl6v3xdmvva2ggsuazfqk54qpv7z4yfib5asmbeeps3u5'
            }
        ]
    };
});
define("@scom/scom-feed/global/API.ts", ["require", "exports", "@scom/scom-feed/store/index.ts", "@scom/scom-feed/global/localData/data.json.ts"], function (require, exports, index_2, data_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fetchDataByCid = void 0;
    const fetchDataByCid = async (cid) => {
        return Object.assign({}, data_json_1.default);
        try {
            const ipfsBaseUrl = (0, index_2.getIPFSGatewayUrl)();
            const url = `${ipfsBaseUrl}/${cid}`;
            const response = await fetch(url);
            return await response.json();
        }
        catch (_a) { }
        return null;
    };
    exports.fetchDataByCid = fetchDataByCid;
});
define("@scom/scom-feed/global/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-feed/global/schemas.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getEmbedderSchema = exports.getBuilderSchema = void 0;
    ///<amd-module name='@scom/scom-feed/global/schemas.ts'/> 
    const theme = {
        type: 'object',
        properties: {
            backgroundColor: {
                type: 'string',
                format: 'color'
            },
            fontColor: {
                type: 'string',
                format: 'color'
            },
            inputBackgroundColor: {
                type: 'string',
                format: 'color'
            },
            inputFontColor: {
                type: 'string',
                format: 'color'
            },
            primaryColor: {
                type: 'string',
                format: 'color'
            },
            primaryBackground: {
                type: 'string',
                format: 'color'
            },
            successColor: {
                type: 'string',
                format: 'color'
            },
            successBackground: {
                type: 'string',
                format: 'color'
            },
            errorColor: {
                type: 'string',
                format: 'color'
            },
            errorBackground: {
                type: 'string',
                format: 'color'
            },
            subcribeButtonBackground: {
                type: 'string',
                format: 'color'
            },
            placeholderColor: {
                type: 'string',
                format: 'color'
            },
            hoverBackgroundColor: {
                type: 'string',
                format: 'color'
            },
            groupBorderColor: {
                type: 'string',
                format: 'color'
            },
            borderColor: {
                type: 'string',
                format: 'color'
            },
            secondaryColor: {
                type: 'string',
                format: 'color'
            },
        }
    };
    const themeUISchema = {
        type: 'Category',
        label: 'Theme',
        elements: [
            {
                type: 'VerticalLayout',
                elements: [
                    {
                        type: 'Group',
                        label: 'Dark',
                        elements: [
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/backgroundColor'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/fontColor'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/inputBackgroundColor'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/inputFontColor'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/primaryBackground'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/primaryColor'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/successBackground'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/successColor'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/errorBackground'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/errorColor'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/subcribeButtonBackground'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/placeholderColor'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/groupBorderColor'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/borderColor'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/secondaryColor'
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        type: 'Group',
                        label: 'Light',
                        elements: [
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/backgroundColor'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/fontColor'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/inputBackgroundColor'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/inputFontColor'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/primaryBackground'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/primaryColor'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/successBackground'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/successColor'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/errorBackground'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/errorColor'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/subcribeButtonBackground'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/placeholderColor'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/groupBorderColor'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/borderColor'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/secondaryColor'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
    function getBuilderSchema() {
        return {
            dataSchema: {
                type: 'object',
                required: ['cids'],
                properties: {
                    cids: {
                        type: 'array',
                        items: {
                            type: 'string'
                        }
                    },
                    dark: theme,
                    light: theme
                }
            },
            uiSchema: {
                type: 'Categorization',
                elements: [
                    {
                        type: 'Category',
                        label: 'General',
                        elements: [
                            {
                                type: 'VerticalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/cids'
                                    }
                                ]
                            }
                        ]
                    },
                    themeUISchema
                ]
            }
        };
    }
    exports.getBuilderSchema = getBuilderSchema;
    function getEmbedderSchema() {
        return {
            dataSchema: {
                type: 'object',
                properties: {
                    cid: {
                        type: 'string',
                        required: true
                    },
                    dark: theme,
                    light: theme
                }
            },
            uiSchema: {
                type: 'Categorization',
                elements: [
                    {
                        type: 'Category',
                        label: 'General',
                        elements: [
                            {
                                type: 'VerticalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/cids'
                                    }
                                ]
                            }
                        ]
                    },
                    themeUISchema
                ]
            }
        };
    }
    exports.getEmbedderSchema = getEmbedderSchema;
});
define("@scom/scom-feed/global/index.ts", ["require", "exports", "@scom/scom-feed/global/utils.ts", "@scom/scom-feed/global/API.ts", "@scom/scom-feed/global/interface.ts", "@scom/scom-feed/global/schemas.ts"], function (require, exports, utils_1, API_1, interface_1, schemas_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-feed/global/index.ts'/> 
    __exportStar(utils_1, exports);
    __exportStar(API_1, exports);
    __exportStar(interface_1, exports);
    __exportStar(schemas_1, exports);
});
define("@scom/scom-feed/commons/replyInput/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.editorStyle = void 0;
    const Theme = components_3.Styles.Theme.ThemeVars;
    exports.editorStyle = components_3.Styles.style({
        cursor: 'text',
        $nest: {
            '.toastui-editor-ww-container > .toastui-editor': {
                minHeight: '0px !important'
            },
            '.toastui-editor-toolbar': {
                display: 'none'
            },
            '.toastui-editor-contents': {
                fontSize: '1.25rem',
                color: `${Theme.text.secondary} !important`,
                padding: '0 0 12px !important'
            },
            '.toastui-editor-defaultUI': {
                border: 'none'
            },
            '.toastui-editor-ww-container': {
                background: 'transparent !important'
            }
        }
    });
});
define("@scom/scom-feed/commons/replyInput/index.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-feed/commons/replyInput/index.css.ts"], function (require, exports, components_4, index_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomFeedReplyInput = void 0;
    const Theme = components_4.Styles.Theme.ThemeVars;
    let ScomFeedReplyInput = class ScomFeedReplyInput extends components_4.Module {
        get replyTo() {
            var _a;
            return (_a = this._data.replyTo) !== null && _a !== void 0 ? _a : '';
        }
        set replyTo(value) {
            this._data.replyTo = value !== null && value !== void 0 ? value : '';
        }
        get avatar() {
            var _a;
            return (_a = this._data.avatar) !== null && _a !== void 0 ? _a : '';
        }
        set avatar(value) {
            this._data.avatar = value !== null && value !== void 0 ? value : '';
        }
        get isReplyToShown() {
            var _a;
            return (_a = this._data.isReplyToShown) !== null && _a !== void 0 ? _a : false;
        }
        set isReplyToShown(value) {
            this._data.isReplyToShown = value !== null && value !== void 0 ? value : false;
        }
        set theme(value) {
            if (this.replyEditor)
                this.replyEditor.theme = value;
        }
        setData(value) {
            this._data = value;
            if (this.avatar)
                this.imgReplier.url = this.avatar;
        }
        clear() {
            this.imgReplier.url = '';
        }
        onEditorChanged() {
            this.btnReply.enabled = !!this.replyEditor.getMarkdownValue();
            if (this.onChanged)
                this.onChanged(this.replyEditor);
        }
        onReply() {
            if (this.onSubmit)
                this.onSubmit(this.replyEditor);
        }
        init() {
            super.init();
            this.onChanged = this.getAttribute('onChanged', true) || this.onChanged;
            this.onSubmit = this.getAttribute('onSubmit', true) || this.onSubmit;
            const replyTo = this.getAttribute('replyTo', true, '');
            const avatar = this.getAttribute('avatar', true, '');
            const isReplyToShown = this.getAttribute('isReplyToShown', true, false);
            this.setData({ isReplyToShown, replyTo, avatar });
            const theme = this.getAttribute('theme', true);
            if (theme)
                this.theme = theme;
        }
        render() {
            return (this.$render("i-panel", { padding: { bottom: 12 } },
                this.$render("i-grid-layout", { id: "gridReply", templateColumns: ['40px', 'auto'], padding: { top: 12 }, gap: { column: 12 } },
                    this.$render("i-image", { id: "imgReplier", width: 36, height: 36, display: "block", background: { color: Theme.background.gradient }, border: { radius: '50%' }, overflow: 'hidden', stack: { shrink: '0' }, class: 'avatar' }),
                    this.$render("i-panel", null,
                        this.$render("i-markdown-editor", { id: "replyEditor", width: "100%", placeholder: "What is happening?!", viewer: false, hideModeSwitch: true, mode: 'wysiwyg', toolbarItems: [], font: { size: '1.25rem', color: Theme.text.secondary }, background: { color: 'transparent' }, height: "auto", theme: 'dark', onChanged: this.onEditorChanged, class: index_css_1.editorStyle }),
                        this.$render("i-hstack", { horizontalAlignment: "end" },
                            this.$render("i-button", { id: "btnReply", minHeight: 36, padding: { left: '1rem', right: '1rem' }, background: { color: Theme.colors.primary.main }, font: { color: Theme.colors.primary.contrastText }, border: { radius: '30px' }, enabled: false, caption: 'Reply', onClick: this.onReply }))))));
        }
    };
    ScomFeedReplyInput = __decorate([
        (0, components_4.customElements)('i-scom-feed-reply-input')
    ], ScomFeedReplyInput);
    exports.ScomFeedReplyInput = ScomFeedReplyInput;
});
define("@scom/scom-feed/commons/index.ts", ["require", "exports", "@scom/scom-feed/commons/replyInput/index.tsx"], function (require, exports, index_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomFeedReplyInput = void 0;
    Object.defineProperty(exports, "ScomFeedReplyInput", { enumerable: true, get: function () { return index_3.ScomFeedReplyInput; } });
});
define("@scom/scom-feed", ["require", "exports", "@ijstech/components", "@scom/scom-feed/index.css.ts", "@scom/scom-feed/data.json.ts", "@scom/scom-feed/global/index.ts", "@scom/scom-feed/store/index.ts"], function (require, exports, components_5, index_css_2, data_json_2, index_4, index_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_5.Styles.Theme.ThemeVars;
    let ScomFeed = class ScomFeed extends components_5.Module {
        constructor(parent, options) {
            super(parent, options);
            this.isRendering = false;
            this.tag = {
                light: {},
                dark: {}
            };
            if (data_json_2.default)
                (0, index_5.setDataFromJson)(data_json_2.default);
        }
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        get cids() {
            return this._cids;
        }
        set cids(value) {
            this._cids = value;
        }
        set theme(value) {
            this._theme = value;
            if (this.inputReply)
                this.inputReply.theme = value;
        }
        get theme() {
            return this._theme;
        }
        clear() {
            this.inputReply.clear();
            this.pnlPosts.clearInnerHTML();
            this.pnlMore.visible = false;
            this.lbMore.caption = '';
        }
        async setData(value) {
            var _a;
            this.cids = (_a = value.cids) !== null && _a !== void 0 ? _a : [];
            await this.renderUI();
        }
        getData() {
            return { cids: this._cids };
        }
        async renderUI() {
            var _a;
            this.clear();
            if (!((_a = this.cids) === null || _a === void 0 ? void 0 : _a.length) || this.isRendering)
                return;
            this.isRendering = true;
            for (let cid of this.cids) {
                const postData = await this.fetchData(cid);
                this.pnlPosts.appendChild(this.$render("i-scom-post", { data: postData, theme: this.theme, padding: { top: 12, bottom: 12, left: 16, right: 16 }, border: {
                        bottom: {
                            width: '1px',
                            style: 'solid',
                            color: Theme.divider
                        },
                    }, onClick: () => this.onViewPost(cid) }));
            }
            this.isRendering = false;
            // TODO: check
            this.pnlMore.visible = false;
            this.lbMore.caption = ``;
        }
        async fetchData(cid) {
            let respone = null;
            try {
                respone = await (0, index_4.fetchDataByCid)(cid);
            }
            catch (_a) { }
            return respone;
        }
        onViewPost(cid) {
        }
        getConfigurators() {
            const self = this;
            return [
                {
                    name: 'Builder Configurator',
                    target: 'Builders',
                    getActions: () => {
                        const builderSchema = (0, index_4.getBuilderSchema)();
                        const dataSchema = builderSchema.dataSchema;
                        const uiSchema = builderSchema.uiSchema;
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
                        const embedderSchema = (0, index_4.getEmbedderSchema)();
                        const dataSchema = embedderSchema.dataSchema;
                        const uiSchema = embedderSchema.uiSchema;
                        return this._getActions(dataSchema, uiSchema);
                    },
                    getLinkParams: () => {
                        const data = { cids: this._cids || [] };
                        return {
                            data: window.btoa(JSON.stringify(data))
                        };
                    },
                    setLinkParams: async (params) => {
                        if (params.data) {
                            const utf8String = decodeURIComponent(params.data);
                            const decodedString = window.atob(utf8String);
                            const newData = JSON.parse(decodedString);
                            let resultingData = Object.assign({ cids: self._cids }, newData);
                            await this.setData(resultingData);
                        }
                    },
                    getData: this.getData.bind(this),
                    setData: this.setData.bind(this),
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                }
            ];
        }
        _getActions(dataSchema, uiSchema) {
            const actions = [
                {
                    name: 'Edit',
                    icon: 'edit',
                    command: (builder, userInputData) => {
                        let oldData;
                        let oldTag = {};
                        return {
                            execute: async () => {
                                oldData = JSON.parse(JSON.stringify(this._cids));
                                const { cids } = userInputData, themeSettings = __rest(userInputData, ["cids"]);
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData({ cids });
                                this.setData({ cids });
                                oldTag = JSON.parse(JSON.stringify(this.tag));
                                if (builder === null || builder === void 0 ? void 0 : builder.setTag)
                                    builder.setTag(themeSettings);
                                else
                                    this.setTag(themeSettings);
                            },
                            undo: () => {
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData({ cids: oldData });
                                this.setData({ cids: oldData });
                                this.tag = JSON.parse(JSON.stringify(oldTag));
                                if (builder === null || builder === void 0 ? void 0 : builder.setTag)
                                    builder.setTag(this.tag);
                                else
                                    this.setTag(this.tag);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: dataSchema,
                    userInputUISchema: uiSchema
                }
            ];
            return actions;
        }
        async getTag() {
            return this.tag;
        }
        updateTag(type, value) {
            var _a;
            this.tag[type] = (_a = this.tag[type]) !== null && _a !== void 0 ? _a : {};
            for (let prop in value) {
                if (value.hasOwnProperty(prop))
                    this.tag[type][prop] = value[prop];
            }
        }
        async setTag(value) {
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
        updateStyle(name, value) {
            value ?
                this.style.setProperty(name, value) :
                this.style.removeProperty(name);
        }
        updateTheme() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
            const themeVar = this.theme || document.body.style.getPropertyValue('--theme') || 'light';
            this.updateStyle('--text-primary', (_a = this.tag[themeVar]) === null || _a === void 0 ? void 0 : _a.fontColor);
            this.updateStyle('--text-secondary', (_b = this.tag[themeVar]) === null || _b === void 0 ? void 0 : _b.secondaryColor);
            this.updateStyle('--background-main', (_c = this.tag[themeVar]) === null || _c === void 0 ? void 0 : _c.backgroundColor);
            this.updateStyle('--background-modal', (_d = this.tag[themeVar]) === null || _d === void 0 ? void 0 : _d.backgroundColor);
            this.updateStyle('--input-font_color', (_e = this.tag[themeVar]) === null || _e === void 0 ? void 0 : _e.inputFontColor);
            this.updateStyle('--input-background', (_f = this.tag[themeVar]) === null || _f === void 0 ? void 0 : _f.inputBackgroundColor);
            this.updateStyle('--colors-primary-main', (_g = this.tag[themeVar]) === null || _g === void 0 ? void 0 : _g.primaryColor);
            this.updateStyle('--colors-primary-light', (_h = this.tag[themeVar]) === null || _h === void 0 ? void 0 : _h.primaryBackground);
            this.updateStyle('--colors-success-main', (_j = this.tag[themeVar]) === null || _j === void 0 ? void 0 : _j.successColor);
            this.updateStyle('--colors-success-light', (_k = this.tag[themeVar]) === null || _k === void 0 ? void 0 : _k.successBackground);
            this.updateStyle('--colors-error-main', (_l = this.tag[themeVar]) === null || _l === void 0 ? void 0 : _l.errorColor);
            this.updateStyle('--colors-error-light', (_m = this.tag[themeVar]) === null || _m === void 0 ? void 0 : _m.errorBackground);
            this.updateStyle('--colors-secondary-main', (_o = this.tag[themeVar]) === null || _o === void 0 ? void 0 : _o.subcribeButtonBackground);
            this.updateStyle('--action-hover', (_p = this.tag[themeVar]) === null || _p === void 0 ? void 0 : _p.hoverBackgroundColor);
            this.updateStyle('--divider', (_q = this.tag[themeVar]) === null || _q === void 0 ? void 0 : _q.borderColor);
            this.updateStyle('--colors-secondary-light', (_r = this.tag[themeVar]) === null || _r === void 0 ? void 0 : _r.groupBorderColor);
            this.updateStyle('--text-disabled', (_s = this.tag[themeVar]) === null || _s === void 0 ? void 0 : _s.placeholderColor);
        }
        init() {
            super.init();
            const cids = this.getAttribute('cids', true);
            if (cids)
                this.setData({ cids });
            const theme = this.getAttribute('theme', true);
            const themeVar = theme || document.body.style.getPropertyValue('--theme');
            if (themeVar)
                this.theme = themeVar;
        }
        render() {
            return (this.$render("i-vstack", { width: "100%", maxWidth: 600, margin: { left: 'auto', right: 'auto' }, background: { color: Theme.background.main }, border: { width: '1px', style: 'solid', color: Theme.divider }, class: index_css_2.customStyles },
                this.$render("i-scom-feed-reply-input", { id: "inputReply", padding: { top: 12, bottom: 12, left: 16, right: 16 } }),
                this.$render("i-hstack", { id: "pnlMore", minHeight: 48, verticalAlignment: "center", horizontalAlignment: "center", border: { top: { width: '1px', style: 'solid', color: Theme.divider } } },
                    this.$render("i-label", { id: "lbMore", caption: 'Show 0 post', font: { color: Theme.colors.primary.main, size: '1rem' } })),
                this.$render("i-vstack", { id: "pnlPosts", border: { top: { width: '1px', style: 'solid', color: Theme.divider } } })));
        }
    };
    ScomFeed = __decorate([
        (0, components_5.customElements)('i-scom-feed')
    ], ScomFeed);
    exports.default = ScomFeed;
});
