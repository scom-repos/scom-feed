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
define("@scom/scom-feed/data.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-feed/data.json.ts'/> 
    exports.default = {
        "ipfsGatewayUrl": "https://ipfs.scom.dev/ipfs/"
    };
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
            cardBackground: {
                type: 'string',
                format: 'color'
            },
            gradientBackground: {
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
            modalBackground: {
                type: 'string',
                format: 'color'
            },
            boxShadow: {
                type: 'string',
                format: 'color'
            }
        }
    };
    const groupSchema = {
        type: 'Group',
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
                        scope: '#/properties/dark/properties/cardBackground'
                    },
                    {
                        type: 'Control',
                        scope: '#/properties/dark/properties/gradientBackground'
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
                    },
                    {
                        type: 'Control',
                        scope: '#/properties/dark/properties/modalBackground'
                    }
                ]
            },
            {
                type: 'HorizontalLayout',
                elements: [
                    {
                        type: 'Control',
                        scope: '#/properties/dark/properties/boxShadow'
                    }
                ]
            }
        ]
    };
    const themeUISchema = {
        type: 'Category',
        label: 'Theme',
        elements: [
            {
                type: 'VerticalLayout',
                elements: [
                    {
                        label: 'Dark',
                        ...groupSchema
                    },
                    {
                        label: 'Light',
                        ...groupSchema
                    }
                ]
            }
        ]
    };
    function getBuilderSchema() {
        return {
            dataSchema: {
                type: 'object',
                required: ['posts'],
                properties: {
                    posts: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {}
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
                                        scope: '#/properties/posts'
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
                    post: {
                        type: 'object',
                        required: true,
                        properties: {}
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
                                        scope: '#/properties/posts'
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
define("@scom/scom-feed/global/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-feed/global/API.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.searchEmojis = exports.fetchEmojis = exports.colorsMapper = exports.emojiCategories = exports.fetchReactionGifs = exports.fetchGifs = void 0;
    ///<amd-module name='@scom/scom-feed/global/API.ts'/> 
    const fetchGifs = async (params) => {
        if (!params.offset)
            params.offset = 0;
        if (!params.limit)
            params.limit = 40;
        params.api_key = 'K0QfKNGrvsuY9nPKE1vn9lEGapWEY4eR';
        const queries = params ? new URLSearchParams({
            ...params
        }).toString() : '';
        try {
            const response = await fetch(`http://api.giphy.com/v1/gifs/search?${queries}`);
            return await response.json();
        }
        catch {
            return null;
        }
    };
    exports.fetchGifs = fetchGifs;
    const fetchReactionGifs = async () => {
        const params = {
            api_key: 'K0QfKNGrvsuY9nPKE1vn9lEGapWEY4eR'
        };
        const queries = new URLSearchParams({ ...params }).toString();
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/categories/reactions?${queries}`);
            return await response.json();
        }
        catch {
            return null;
        }
    };
    exports.fetchReactionGifs = fetchReactionGifs;
    exports.emojiCategories = [
        {
            name: 'Recent',
            value: 'recent',
            image: 'https://abs-0.twimg.com/emoji/v2/svg/1f551.svg',
            groups: []
        },
        {
            name: 'Smileys & Emotion',
            value: 'smileys-and-people',
            image: 'https://abs-0.twimg.com/emoji/v2/svg/1f600.svg',
            groups: ['body', 'cat-face', 'clothing', 'creature-face', 'emotion', 'face-negative', 'face-neutral', 'face-positive', 'face-positive', 'face-role', 'face-sick', 'family', 'monkey-face', 'person', 'person-activity', 'person-gesture', 'person-role', 'skin-tone']
        },
        {
            name: 'Animals & nature',
            value: 'animals-and-nature',
            image: 'https://abs-0.twimg.com/emoji/v2/svg/1f43b.svg',
            groups: ['animal-amphibian', 'animal-bird', 'animal-bug', 'animal-mammal', 'animal-marine', 'animal-reptile', 'plant-flower', 'plant-other']
        },
        {
            name: 'Food & drink',
            value: 'food-and-drink',
            image: 'https://abs-0.twimg.com/emoji/v2/svg/1f354.svg',
            groups: ['dishware', 'drink', 'food-asian', 'food-fruit', 'food-prepared', 'food-sweat', 'food-vegetable']
        },
        {
            name: 'Activity',
            value: 'activities',
            image: 'https://abs-0.twimg.com/emoji/v2/svg/26bd.svg',
            groups: ["activities"]
        },
        {
            name: 'Travel & places',
            value: 'travel-and-places',
            image: 'https://abs-0.twimg.com/emoji/v2/svg/1f698.svg',
            groups: ["travel-and-places"]
        },
        {
            name: 'Objects',
            value: 'objects',
            image: 'https://abs-0.twimg.com/emoji/v2/svg/1f4a1.svg',
            groups: ["objects"]
        },
        {
            name: 'Symbols',
            value: 'symbols',
            image: 'https://abs-0.twimg.com/emoji/v2/svg/1f523.svg',
            groups: ["symbols"]
        },
        {
            name: 'Flags',
            value: 'flags',
            image: 'https://abs-0.twimg.com/emoji/v2/svg/1f6a9.svg',
            groups: ["flags"]
        }
    ];
    exports.colorsMapper = {
        'rgb(255, 220, 93)': {
            htmlCode: '',
            unicode: ''
        },
        'rgb(247, 222, 206)': {
            htmlCode: '&#127995;',
            unicode: 'U+1F3FB'
        },
        'rgb(243, 210, 162)': {
            htmlCode: '&#127996;',
            unicode: 'U+1F3FC'
        },
        'rgb(213, 171, 136)': {
            htmlCode: '&#127997;',
            unicode: 'U+1F3FD'
        },
        'rgb(175, 126, 87)': {
            htmlCode: '&#127998;',
            unicode: 'U+1F3FE'
        },
        'rgb(124, 83, 62)': {
            htmlCode: '&#127999;',
            unicode: 'U+1F3FF'
        }
    };
    const EMOJI_BASE_URL = 'https://emojihub.yurace.pro/api/all';
    const fetchEmojis = async (params) => {
        try {
            const uri = `${EMOJI_BASE_URL}/category/${params.category}`;
            const response = await fetch(`${uri}`);
            return await response.json();
        }
        catch {
            return [];
        }
    };
    exports.fetchEmojis = fetchEmojis;
    const searchEmojis = (q, mapper) => {
        const keyword = q.toLowerCase();
        const categoryName = exports.emojiCategories.find(cate => cate.name.toLowerCase().includes(keyword))?.name;
        if (categoryName)
            return mapper.get(categoryName);
        const groups = Array.from(mapper);
        let result = [];
        for (let group of groups) {
            const filteredGroup = [...group].filter(emoji => emoji.name.toLowerCase().includes(keyword));
            result = [...result, ...filteredGroup];
        }
        return result;
    };
    exports.searchEmojis = searchEmojis;
});
define("@scom/scom-feed/global/index.ts", ["require", "exports", "@scom/scom-feed/global/schemas.ts", "@scom/scom-feed/global/interface.ts", "@scom/scom-feed/global/API.ts"], function (require, exports, schemas_1, interface_1, API_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-feed/global/index.ts'/> 
    __exportStar(schemas_1, exports);
    __exportStar(interface_1, exports);
    __exportStar(API_1, exports);
});
define("@scom/scom-feed/store/index.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getCurrentUser = exports.getIPFSGatewayUrl = exports.setIPFSGatewayUrl = exports.setDataFromJson = exports.state = void 0;
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
    const getCurrentUser = () => {
        const user = {
            id: "",
            username: "",
            internetIdentifier: "",
            npub: "",
            displayName: "",
            description: "",
            avatar: undefined
        };
        return user;
    };
    exports.getCurrentUser = getCurrentUser;
});
define("@scom/scom-feed/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getActionButtonStyle = exports.getHoverStyleClass = void 0;
    const Theme = components_1.Styles.Theme.ThemeVars;
    const getHoverStyleClass = (color) => {
        const styleObj = {
            $nest: {
                '&:hover': {
                    color: `${Theme.text.primary} !important`,
                    background: `${color || Theme.action.hoverBackground} !important`,
                    $nest: {
                        'i-label': {
                            color: `${Theme.text.primary} !important`
                        }
                    }
                }
            }
        };
        return components_1.Styles.style(styleObj);
    };
    exports.getHoverStyleClass = getHoverStyleClass;
    const getActionButtonStyle = (hoveredColor) => components_1.Styles.style({
        justifyContent: 'space-between',
        $nest: {
            '&:hover': {
                backgroundColor: hoveredColor || Theme.action.hoverBackground,
                opacity: 1
            }
        }
    });
    exports.getActionButtonStyle = getActionButtonStyle;
    components_1.Styles.cssRule('#mdCreatePost', {
        $nest: {
            '.modal': {
                height: '100%',
                top: 0,
                position: 'absolute',
                padding: 0,
                overflow: 'hidden'
            }
        }
    });
});
define("@scom/scom-feed", ["require", "exports", "@ijstech/components", "@scom/scom-feed/data.json.ts", "@scom/scom-feed/global/index.ts", "@scom/scom-feed/store/index.ts", "@scom/scom-feed/index.css.ts"], function (require, exports, components_2, data_json_1, index_1, index_2, index_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_2.Styles.Theme.ThemeVars;
    const DefaultPlaceholder = "What's on your mind today?";
    let ScomFeed = class ScomFeed extends components_2.Module {
        constructor(parent, options) {
            super(parent, options);
            this.isRendering = false;
            this._data = {
                posts: []
            };
            this._isListView = false;
            this._isComposerVisible = false;
            this._composerPlaceholder = DefaultPlaceholder;
            this._allowPin = false;
            this._pinNoteToTop = false;
            this.pinnedNoteIds = [];
            this.tag = {
                light: {},
                dark: {}
            };
            if (data_json_1.default)
                (0, index_2.setDataFromJson)(data_json_1.default);
            this.onReplySubmit = this.onReplySubmit.bind(this);
            this.onViewPost = this.onViewPost.bind(this);
        }
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        get posts() {
            return this._data.posts || [];
        }
        set posts(value) {
            this._data.posts = value || [];
        }
        get isListView() {
            return this._isListView ?? false;
        }
        set isListView(value) {
            this._isListView = value ?? false;
            this.pnlFilter.visible = false && !this.isListView;
            this.btnMore.visible = false; // !this.isListView;
            this.controlInputDisplay();
        }
        set theme(value) {
            this._theme = value;
            this.updateTheme();
        }
        get theme() {
            return this._theme;
        }
        get isComposerVisible() {
            return this._isComposerVisible;
        }
        set isComposerVisible(value) {
            this._isComposerVisible = value ?? false;
            this.inputReply.visible = this._isComposerVisible;
            this.controlInputDisplay();
        }
        get composerPlaceholder() {
            return this._composerPlaceholder;
        }
        set composerPlaceholder(value) {
            this._composerPlaceholder = value ?? '';
            this.inputReply.placeholder = this._composerPlaceholder;
        }
        get avatar() {
            return this.inputReply.avatar;
        }
        set avatar(value) {
            this.inputReply.avatar = value;
            this.inputCreatePost.avatar = value;
        }
        get allowPin() {
            return this._allowPin;
        }
        set allowPin(value) {
            let isChanged = this._allowPin != value ?? false;
            this._allowPin = value ?? false;
            if (isChanged)
                this.renderActions();
        }
        get isSmallScreen() {
            return window.innerWidth < 768;
        }
        get pinNoteToTop() {
            return this._pinNoteToTop;
        }
        set pinNoteToTop(value) {
            this._pinNoteToTop = value;
        }
        get pinnedNotes() {
            return this._pinnedNotes;
        }
        set pinnedNotes(posts) {
            this._pinnedNotes = posts || [];
            this.pinnedNoteIds = this._pinnedNotes.map(post => post.id);
        }
        get apiBaseUrl() {
            return this._apiBaseUrl;
        }
        set apiBaseUrl(value) {
            this._apiBaseUrl = value;
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
        async setData(data) {
            this._data = data;
            await this.renderUI();
        }
        getData() {
            return this._data;
        }
        async renderUI() {
            this.clear();
            if (!this.posts?.length || this.isRendering)
                return;
            this.isRendering = true;
            this.renderPosts(this.posts);
            this.isRendering = false;
        }
        onCopyNoteText() {
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
        renderActions() {
            const actions = [
                {
                    caption: 'Copy note link',
                    icon: { name: 'copy' },
                    tooltip: 'The link has been copied successfully',
                    onClick: () => {
                        components_2.application.copyToClipboard(`${window.location.origin}/#!/e/${this.currentPost.id}`);
                        this.mdActions.visible = false;
                    }
                },
                {
                    caption: 'Copy note text',
                    icon: { name: 'copy' },
                    tooltip: 'The text has been copied successfully',
                    onClick: () => {
                        // this.onCopyNoteText();
                        components_2.application.copyToClipboard(this.currentPost['eventData']?.content);
                        this.mdActions.visible = false;
                    }
                },
                {
                    caption: 'Copy note ID',
                    icon: { name: 'copy' },
                    tooltip: 'The ID has been copied successfully',
                    onClick: () => {
                        components_2.application.copyToClipboard(this.currentPost.id);
                        this.mdActions.visible = false;
                    }
                },
                {
                    caption: 'Copy raw data',
                    tooltip: 'The raw data has been copied successfully',
                    icon: { name: 'copy' },
                    onClick: () => {
                        components_2.application.copyToClipboard(JSON.stringify(this.currentPost['eventData']));
                        this.mdActions.visible = false;
                    }
                },
                // {
                //     caption: 'Broadcast note',
                //     icon: {name: "broadcast-tower"}
                // },
                {
                    caption: 'Copy user public key',
                    icon: { name: 'copy' },
                    tooltip: 'The public key has been copied successfully',
                    onClick: () => {
                        components_2.application.copyToClipboard(this.currentPost.author.npub || '');
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
            ];
            if (this.allowPin) {
                actions.push({
                    id: 'btnPinAction',
                    caption: 'Pin note',
                    icon: { name: 'thumbtack' },
                    onClick: async (target, event) => {
                        const isPinned = this.pinnedNoteIds.includes(this.currentPost.id);
                        if (this.onPinButtonClicked) {
                            target.rightIcon.spin = true;
                            target.rightIcon.name = "spinner";
                            let action = isPinned ? 'unpin' : 'pin';
                            await this.onPinButtonClicked(this.currentPost, action, event);
                            if (this.pinNoteToTop) {
                                if (action === 'pin') {
                                    this.pnlPosts.prepend(this.selectedPost);
                                    this.selectedPost.isPinned = true;
                                }
                                else {
                                    const sortedPost = this._data.posts.filter(post => !this.pinnedNoteIds.includes(post.id)).sort((a, b) => b['eventData'].created_at - a['eventData'].created_at);
                                    let index = sortedPost.findIndex(post => post.id === this.currentPost.id);
                                    if (index !== -1) {
                                        index += this.pinnedNoteIds.length;
                                        if (index === 0) {
                                            this.pnlPosts.prepend(this.selectedPost);
                                        }
                                        else {
                                            this.pnlPosts.children[index].after(this.selectedPost);
                                        }
                                    }
                                    else {
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
                });
            }
            this.btnPinAction = null;
            this.pnlActions.clearInnerHTML();
            for (let i = 0; i < actions.length; i++) {
                const item = actions[i];
                const elm = (this.$render("i-button", { class: (0, index_css_1.getActionButtonStyle)(item.hoveredColor), width: "100%", padding: { top: '0.625rem', bottom: '0.625rem', left: '0.75rem', right: '0.75rem' }, background: { color: 'transparent' }, border: { radius: '0.5rem' }, opacity: item.hoveredColor ? 1 : 0.667, caption: item.caption, font: { color: item.icon?.fill || Theme.text.primary, weight: 400, size: '0.875rem' }, rightIcon: {
                        width: "0.75rem",
                        height: "0.75rem",
                        display: "inline-flex",
                        name: item.icon.name,
                        fill: item.icon?.fill || Theme.text.primary
                    }, onClick: (target, event) => {
                        if (item.onClick)
                            item.onClick(target, event);
                    }, tooltip: {
                        content: item.tooltip,
                        trigger: 'click',
                        placement: 'bottom'
                    } }));
                if (item.id === 'btnPinAction')
                    this.btnPinAction = elm;
                this.pnlActions.appendChild(elm);
            }
            this.pnlActions.appendChild(this.$render("i-stack", { width: "100%", direction: "horizontal", justifyContent: "center", padding: { top: 12, bottom: 12, left: 16, right: 16 }, visible: false, mediaQueries: [
                    {
                        maxWidth: '767px',
                        properties: { visible: true }
                    }
                ] },
                this.$render("i-button", { caption: 'Cancel', width: "100%", minHeight: 44, padding: { left: 16, right: 16 }, font: { color: Theme.text.primary, weight: 600 }, border: { radius: '30px', width: '1px', style: 'solid', color: Theme.colors.secondary.light }, grid: { horizontalAlignment: 'center' }, background: { color: 'transparent' }, boxShadow: "none", onClick: () => this.onCloseModal('mdActions') })));
        }
        onViewPost(target, event) {
            const videos = target.querySelectorAll('video');
            for (let video of videos) {
                video.pause();
            }
            const players = target.querySelectorAll('i-scom-media-player');
            for (let player of players) {
                player.onHide();
            }
            if (this.onItemClicked)
                this.onItemClicked(target, event);
        }
        onReplySubmit(content, medias) {
            let postDataArr;
            if (content) {
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
                };
                postDataArr = [textData, ...medias];
            }
            else {
                postDataArr = [...medias];
            }
            if (this.onPostButtonClicked)
                this.onPostButtonClicked(content, postDataArr);
            this.mdCreatePost.visible = false;
        }
        constructPostElement(post) {
            const postEl = (this.$render("i-scom-post", { data: post, type: "card", onClick: this.onViewPost, onQuotedPostClicked: this.onViewPost, limitHeight: true, overflowEllipse: true, isPinned: post.isPinned || false, apiBaseUrl: this.apiBaseUrl }));
            postEl.onProfileClicked = (target, data, event, contentElement) => this.showActionModal(postEl, target, data, contentElement);
            postEl.onReplyClicked = (target, data, event) => this.onViewPost(postEl, event);
            postEl.onLikeClicked = async (target, data, event) => await this.onLikeButtonClicked(postEl, event);
            postEl.onRepostClicked = (target, data, event) => this.onRepostButtonClicked(postEl, event);
            postEl.onZapClicked = (target, data, event) => this.onZapButtonClicked(postEl, event);
            return postEl;
        }
        sortPosts(posts) {
            if (this.pinNoteToTop) {
                let pinnedPosts = [];
                if (this.pinnedNotes.length > 0) {
                    for (let i = posts.length - 1; i >= 0; i--) {
                        if (this.pinnedNoteIds.includes(posts[i].id)) {
                            const post = posts.splice(i, 1)[0];
                            post.isPinned = true;
                            pinnedPosts.unshift(post);
                        }
                    }
                }
                if (pinnedPosts.length !== this.pinnedNotes.length) {
                    for (let i = this.pinnedNotes.length - 1; i >= 0; i--) {
                        const post = this.pinnedNotes[i];
                        if (pinnedPosts.findIndex(p => p.id === post.id) === -1) {
                            post.isPinned = true;
                            pinnedPosts.unshift(post);
                        }
                    }
                }
                return [...pinnedPosts, ...posts];
            }
            else {
                return posts;
            }
        }
        addPost(post, isPrepend) {
            if (post.id && this._data.posts.find(p => p.id === post.id))
                return;
            this._data.posts.push(post);
            this.addPostToPanel(post, isPrepend);
        }
        addPosts(posts, isPrepend) {
            let postEls = [];
            for (let post of posts) {
                if (this._data.posts.find(p => p.id === post.id))
                    continue;
                this._data.posts.push(post);
                const postEl = this.constructPostElement(post);
                postEls.push(postEl);
            }
            if (isPrepend) {
                if (this.pinNoteToTop && this.pinnedNoteIds.length) {
                    this.pnlPosts[this.pinnedNoteIds.length - 1].after(...postEls);
                }
                else {
                    this.pnlPosts.prepend(...postEls);
                }
            }
            else
                this.pnlPosts.append(...postEls);
        }
        setPosts(posts) {
            if (!this._data)
                this._data = { posts: [] };
            this._data.posts = [...posts];
            const sortedPosts = this.sortPosts([...posts]);
            this.renderPosts(sortedPosts);
        }
        addPostToPanel(post, isPrepend) {
            const postEl = this.constructPostElement(post);
            if (isPrepend) {
                if (this.pinNoteToTop && this.pinnedNoteIds.length) {
                    this.pnlPosts[this.pinnedNoteIds.length - 1].after(postEl);
                }
                else {
                    this.pnlPosts.prepend(postEl);
                }
            }
            else
                this.pnlPosts.append(postEl);
        }
        renderPosts(posts) {
            this.pnlPosts.clearInnerHTML();
            for (let post of posts) {
                if (!this.pinNoteToTop)
                    post.isPinned = false;
                this.addPostToPanel(post);
            }
        }
        onShowFilter() {
            this.mdFilter.visible = true;
        }
        onFilter(target) {
            this.mdFilter.visible = false;
            this.lbFilter.caption = target.caption || 'Latest';
            const buttons = this.mdFilter.querySelectorAll('i-button');
            for (let btn of buttons) {
                btn.font = { color: Theme.text.secondary };
                btn.rightIcon.visible = false;
            }
            target.rightIcon.visible = true;
            target.font = { color: Theme.text.primary };
        }
        onCloseModal(name) {
            if (this[name])
                this[name].visible = false;
        }
        onShowModal(target, name, contentElement) {
            if (this[name]) {
                this[name].parent = target;
                this[name].position = 'absolute';
                this[name].showBackdrop = false;
                this[name].visible = true;
                this[name].classList.add('show');
            }
        }
        showActionModal(target, parent, data, contentElement) {
            this.selectedPost = target;
            this.currentPost = data;
            this.currentContent = contentElement;
            if (this.btnPinAction) {
                const isPinned = this.pinnedNoteIds.includes(this.currentPost.id);
                this.btnPinAction.caption = isPinned ? 'Unpin note' : 'Pin note';
            }
            this.onShowModal(parent, 'mdActions', contentElement);
        }
        removeShow(name) {
            if (this[name])
                this[name].classList.remove('show');
        }
        getConfigurators() {
            const self = this;
            return [
                {
                    name: 'Builder Configurator',
                    target: 'Builders',
                    getActions: () => {
                        const builderSchema = (0, index_1.getBuilderSchema)();
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
                        const embedderSchema = (0, index_1.getEmbedderSchema)();
                        const dataSchema = embedderSchema.dataSchema;
                        const uiSchema = embedderSchema.uiSchema;
                        return this._getActions(dataSchema, uiSchema);
                    },
                    getLinkParams: () => {
                        const data = this._data;
                        return {
                            data: window.btoa(JSON.stringify(data))
                        };
                    },
                    setLinkParams: async (params) => {
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
                                oldData = JSON.parse(JSON.stringify(this._data));
                                const { posts, ...themeSettings } = userInputData;
                                if (builder?.setData)
                                    builder.setData({ posts });
                                this.setData({ posts });
                                oldTag = JSON.parse(JSON.stringify(this.tag));
                                if (builder?.setTag)
                                    builder.setTag(themeSettings);
                                else
                                    this.setTag(themeSettings);
                            },
                            undo: () => {
                                if (builder?.setData)
                                    builder.setData({ ...oldData });
                                this.setData({ ...oldData });
                                this.tag = JSON.parse(JSON.stringify(oldTag));
                                if (builder?.setTag)
                                    builder.setTag(this.tag);
                                else
                                    this.setTag(this.tag);
                            },
                            redo: () => {
                            }
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
            this.tag[type] = this.tag[type] ?? {};
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
            const apiBaseUrl = this.getAttribute('apiBaseUrl', true);
            if (apiBaseUrl)
                this.apiBaseUrl = apiBaseUrl;
            const pinNoteToTop = this.getAttribute('pinNoteToTop', true);
            if (pinNoteToTop != null)
                this.pinNoteToTop = pinNoteToTop;
            const data = this.getAttribute('data', true);
            if (data)
                this.setData(data);
            const isListView = this.getAttribute('isListView', true, false);
            this.isListView = isListView;
            const theme = this.getAttribute('theme', true);
            const themeVar = theme || document.body.style.getPropertyValue('--theme');
            if (themeVar)
                this.theme = themeVar;
            this.isComposerVisible = this.getAttribute('isComposerVisible', true, false);
            this.composerPlaceholder = this.getAttribute('composerPlaceholder', true, DefaultPlaceholder);
            const avatar = this.getAttribute('avatar', true);
            if (avatar)
                this.avatar = avatar;
            this._allowPin = this.getAttribute('allowPin', true, false);
            this.renderActions();
            components_2.application.EventBus.register(this, 'FAB_CREATE_POST', () => {
                this.mdCreatePost.visible = true;
                this.inputCreatePost.setFocus();
            });
            if (this.env === 'prod') {
                this.inputReply.disableMarkdownEditor();
                this.inputReply.isAttachmentDisabled = true;
                this.inputCreatePost.disableMarkdownEditor();
                this.inputCreatePost.isAttachmentDisabled = true;
            }
        }
        onShow(options) {
            this.mdCreatePost.visible = options.isCreatePost;
        }
        handleModalClose() {
            this.mdCreatePost.visible = false;
            history.replaceState(null, 'Post', location.hash.replace('/create-post', ''));
        }
        render() {
            return (this.$render("i-stack", { direction: "vertical", width: "100%", maxWidth: '100%', margin: { left: 'auto', right: 'auto' }, background: { color: Theme.background.main } },
                this.$render("i-panel", { id: "pnlInput", padding: { top: '1.625rem', left: '1.25rem', right: '1.25rem' } },
                    this.$render("i-scom-post-composer", { id: "inputReply", buttonCaption: 'Post', visible: false, placeholder: 'Post your thoughts...', onSubmit: this.onReplySubmit })),
                this.$render("i-panel", { id: "pnlFilter", minHeight: '2rem', padding: { left: '1.25rem', right: '1.25rem', top: '0.5rem' }, visible: false },
                    this.$render("i-stack", { width: '100%', direction: "horizontal", justifyContent: "end", gap: '0.5rem', cursor: "pointer", opacity: 0.5, hover: {
                            opacity: 1
                        }, onClick: this.onShowFilter },
                        this.$render("i-label", { id: "lbFilter", caption: 'Latest', font: { color: Theme.text.primary } }),
                        this.$render("i-icon", { width: '1rem', height: '1rem', display: "inline-flex", fill: Theme.text.primary, name: "stream" })),
                    this.$render("i-modal", { id: "mdFilter", popupPlacement: 'bottomRight', showBackdrop: false, visible: false, minWidth: 200, maxWidth: 200, border: { radius: '0.25rem', width: '1px', style: 'solid', color: Theme.divider }, padding: { top: '0.5rem', left: '0.5rem', right: '0.5rem', bottom: '0.5rem' } },
                        this.$render("i-stack", { direction: "vertical" },
                            this.$render("i-button", { caption: 'Latest', padding: { top: '0.75rem', bottom: '0.75rem', left: '1rem', right: '1rem' }, grid: { horizontalAlignment: 'end' }, background: { color: 'transparent' }, font: { color: Theme.text.secondary }, boxShadow: 'none', rightIcon: {
                                    name: 'check',
                                    fill: Theme.text.primary,
                                    width: '0.875rem',
                                    height: '0.875rem',
                                    visible: false
                                }, class: (0, index_css_1.getHoverStyleClass)(), onClick: this.onFilter }),
                            this.$render("i-button", { caption: 'Latest with Replies', padding: { top: '0.75rem', bottom: '0.75rem', left: '1rem', right: '1rem' }, grid: { horizontalAlignment: 'end' }, background: { color: 'transparent' }, rightIcon: {
                                    name: 'check',
                                    fill: Theme.text.primary,
                                    width: '0.875rem',
                                    height: '0.875rem',
                                    visible: false
                                }, font: { color: Theme.text.secondary }, boxShadow: 'none', class: (0, index_css_1.getHoverStyleClass)(), onClick: this.onFilter })))),
                this.$render("i-button", { id: "btnMore", width: '100%', font: { size: '0.875rem', color: Theme.text.secondary }, background: { color: Theme.background.paper }, border: { radius: '0.5rem' }, height: '2.5rem', margin: { top: '0.25rem', bottom: '0.5rem' }, caption: '0 new note', boxShadow: Theme.shadows[1], visible: false, class: (0, index_css_1.getHoverStyleClass)() }),
                this.$render("i-panel", null,
                    this.$render("i-stack", { id: "pnlLoading", direction: "vertical", padding: { top: '0.5rem', bottom: '0.5rem' }, visible: false, height: "100%", width: "100%", minHeight: 200, position: "absolute", top: 0, bottom: 0, zIndex: 999, background: { color: Theme.background.main }, class: "i-loading-overlay" },
                        this.$render("i-stack", { direction: "vertical", alignItems: "center", justifyContent: "center", position: "absolute", top: "calc(50% - 0.75rem)", left: "calc(50% - 0.75rem)" },
                            this.$render("i-icon", { class: "i-loading-spinner_icon", name: "spinner", width: 24, height: 24, fill: Theme.colors.primary.main }))),
                    this.$render("i-stack", { id: "pnlPosts", direction: "vertical", gap: "0.5rem", padding: { bottom: 50 } })),
                this.$render("i-modal", { id: "mdActions", visible: false, maxWidth: '15rem', minWidth: '12.25rem', maxHeight: '27.5rem', popupPlacement: 'bottomRight', showBackdrop: false, border: { radius: '0.25rem', width: '1px', style: 'solid', color: Theme.divider }, padding: { top: '0.5rem', left: '0.5rem', right: '0.5rem', bottom: '0.5rem' }, zIndex: 999, mediaQueries: [
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
                                overflow: { y: 'auto' },
                                border: { radius: '16px 16px 0 0' }
                            }
                        }
                    ], onClose: () => this.removeShow('mdActions') },
                    this.$render("i-stack", { id: "pnlActions", direction: "vertical", minWidth: 0 })),
                this.$render("i-modal", { id: "mdCreatePost", visible: false },
                    this.$render("i-scom-post-composer", { id: "inputCreatePost", mobile: true, autoFocus: true, onCancel: this.handleModalClose.bind(this), placeholder: "What's happening?", onSubmit: this.onReplySubmit.bind(this) }))));
        }
    };
    ScomFeed = __decorate([
        (0, components_2.customElements)('i-scom-feed')
    ], ScomFeed);
    exports.default = ScomFeed;
});
