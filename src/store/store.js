import Vue from 'vue'
import Vuex from 'vuex'
import AuthService from '../domain/user/AuthService.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      token: localStorage.getItem('access_token') || null
    },

    getters: {
        loggedIn(state) {
            return state.token !== null
        }
    },

    mutations: {
      authUser(state, token) {
        state.token = token
      },

      destroyToken(state) {
        state.token = null
      }
    },
    
    actions: {
        login(context, user) {
            return new Promise((resolve, reject) => {
                const service = new AuthService(Vue.resource)
                service
                    .login(user)
                    .then(res => {
                        const token = res.body.token
    
                        localStorage.setItem('access_token', token)
                        context.commit('authUser', token)
                        resolve(res)
    
                    }, err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },

        destroyToken(context) {
            if (context.getters.loggedIn) {
                localStorage.removeItem('access_token')
                context.commit('destroyToken')
            }
        }
    }
})