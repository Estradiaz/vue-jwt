
import applyMixin from './mixin'
import { CVue, Vue, _VM } from './types';

let Vue: CVue | undefined
export class JWT {

    private state: {
        storageKey: string,
        retrival: object | null
    } = {
        retrival: null,
        storageKey:""
    }
    private _vm!: _VM
    constructor(options: {storageKey: string, id?: string, jwt?: string}){
        
        this.state.storageKey = options.storageKey;
        this.state.retrival = null
        if(
            !Vue 
            && typeof window !== undefined 
            && window.Vue
        ) {
            install.bind(this)(window.Vue)
        }
        if(Vue) { 
            let this$ = this
            this._vm = new class extends Vue implements _VM{
                
                $$state = this$.state
                    
                get _hasId(){
                    return this.$$state.retrival && this.$$state.retrival.hasOwnProperty(options.id || 'id') || false
                }
                get _hasToken(){
                    return this.$$state.retrival && this.$$state.retrival.hasOwnProperty(options.jwt || 'jwt') || false
                }
                get _isLoggedIn(){

                    return this._hasToken && this._hasId
                }
            }()
        }
        else {
            console.error('vue is not defined')
        }
    }
    retrieve() {
        let data = localStorage.getItem(this._vm.$$state.storageKey);
        this._vm.$$state.retrival = null
        if(data !== null){

            try {

                this._vm.$$state.retrival = JSON.parse(data)
            } catch {
                
            }
        }
        return this._vm.$$state.retrival
    }
    get isLoggedIn(){

        return this._vm._isLoggedIn
    }
};

export function install(this: JWT, _Vue: CVue) {

    if (Vue && _Vue === Vue) {
        if (process.env.NODE_ENV !== 'production') {
            console.error(
            '[jwt] already installed. Vue.use(JWT) should be called only once.'
            )
        }
        return;
    };
    Vue = window.Vue;
    applyMixin(Vue);
    window.addEventListener('popstate', ev => {
        this.retrieve()
    })
}