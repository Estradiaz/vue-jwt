
import { CVue, Vue } from './types';

export default function applyMixin(Vue: CVue){

    // asume version 2++
    Vue.mixin({beforeCreate: jwtInit})

    function jwtInit(this: Vue){

        const options = this.$options as {jwt?: any, parent?: any}
        if(options.jwt) {

            this.$jwt = typeof options.jwt === 'function' ?
            options.jwt() : options.jwt
        } else if (options.parent && options.parent.$jwt) {
            this.$jwt = options.parent.$jwt
        }
    }
}