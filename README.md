# vue-jwt

#clone this
# MIT
# ngg - not finished yet - pull and feature welcome


      import JWT from 'vue-jwt'
      Vue.use(JWT)

      const jwt = new JWT.JWT('storageKey', 'optionalIdKey', 'optionalJWTKey')

      new Vue({
        ...options,
        jwt
      })
