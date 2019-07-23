System.register("mixin", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function applyMixin(Vue) {
        // asume version 2++
        Vue.mixin({ beforeCreate: jwtInit });
        function jwtInit() {
            const options = this.$options;
            if (options.jwt) {
                this.$jwt = typeof options.jwt === 'function' ?
                    options.jwt() : options.jwt;
            }
            else if (options.parent && options.parent.$jwt) {
                this.$jwt = options.parent.$jwt;
            }
        }
    }
    exports_1("default", applyMixin);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("jwt", ["mixin"], function (exports_2, context_2) {
    "use strict";
    var mixin_1, Vue, JWT;
    var __moduleName = context_2 && context_2.id;
    function install(_Vue) {
        if (Vue && _Vue === Vue) {
            if (process.env.NODE_ENV !== 'production') {
                console.error('[jwt] already installed. Vue.use(JWT) should be called only once.');
            }
            return;
        }
        ;
        Vue = window.Vue;
        mixin_1.default(Vue);
        window.addEventListener('popstate', ev => {
            this.retrieve();
        });
    }
    exports_2("install", install);
    return {
        setters: [
            function (mixin_1_1) {
                mixin_1 = mixin_1_1;
            }
        ],
        execute: function () {
            JWT = class JWT {
                constructor(options) {
                    this.state = {
                        retrival: null,
                        storageKey: ""
                    };
                    this.state.storageKey = options.storageKey;
                    this.state.retrival = null;
                    if (!Vue
                        && typeof window !== undefined
                        && window.Vue) {
                        install.bind(this)(window.Vue);
                    }
                    if (Vue) {
                        let this$ = this;
                        this._vm = new class extends Vue {
                            constructor() {
                                super(...arguments);
                                this.$$state = this$.state;
                            }
                            get _hasId() {
                                return this.$$state.retrival && this.$$state.retrival.hasOwnProperty(options.id || 'id') || false;
                            }
                            get _hasToken() {
                                return this.$$state.retrival && this.$$state.retrival.hasOwnProperty(options.jwt || 'jwt') || false;
                            }
                            get _isLoggedIn() {
                                return this._hasToken && this._hasId;
                            }
                        }();
                    }
                    else {
                        console.error('vue is not defined');
                    }
                }
                retrieve() {
                    let data = localStorage.getItem(this._vm.$$state.storageKey);
                    this._vm.$$state.retrival = null;
                    if (data !== null) {
                        try {
                            this._vm.$$state.retrival = JSON.parse(data);
                        }
                        catch {
                        }
                    }
                    return this._vm.$$state.retrival;
                }
                get isLoggedIn() {
                    return this._vm._isLoggedIn;
                }
            };
            exports_2("JWT", JWT);
            ;
        }
    };
});
System.register("index", ["jwt"], function (exports_3, context_3) {
    "use strict";
    var jwt_1;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (jwt_1_1) {
                jwt_1 = jwt_1_1;
            }
        ],
        execute: function () {
            exports_3("install", jwt_1.install);
            exports_3("JWT", jwt_1.JWT);
        }
    };
});
//# sourceMappingURL=vue-jwt.js.map