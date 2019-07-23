

import Vue, { VueConstructor } from 'vue';
export type CVue = VueConstructor<Vue>

export interface Vue extends Vue {
    $jwt?: any
}
export interface _VM extends Vue{
    
    _hasId: boolean
    _hasToken: boolean
    _isLoggedIn: boolean
    $$state: {
        retrival: null | Object
        storageKey: string
    }
}

declare global {
    interface Window {
        Vue: CVue
    }
}
