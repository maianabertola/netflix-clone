import { defineStore } from 'pinia'
import axios from 'axios'

const apiAccessToken = import.meta.env.VITE_APIACCESSTOKEN

export const useAuthStore = defineStore({
    id: 'authStore',
    state: () => ({
        token: null,
        requestToken: '',
        accessToken: null,
        accountId: null,
        isConnected: false,
        isLoggedOut: true,
    }),
    getters: {},
    actions: {
        async userConnected() {
            const accessToken = localStorage.getItem('access Token')
            const accountId = localStorage.getItem('account Id')

            if (accessToken !== null && accountId !== null) {
                this.accessToken = accessToken
                this.accountId = accountId
                this.isConnected = true
            }
        },
        async createToken() {
            try {
                const response = await axios.post(
                    'https://api.themoviedb.org/4/auth/request_token',
                    {
                        redirect_to: 'http://localhost:5173/token-created',
                    },
                    {
                        headers: {
                            accept: 'application/json',
                            'content-type': 'application/json',
                            Authorization: 'Bearer ' + apiAccessToken,
                        },
                    },
                )

                this.requestToken = response.data.request_token
                localStorage.setItem('request token', this.requestToken)
                this.approveRequestToken()
            } catch (error) {
                console.error(error)
            }
        },

        async approveRequestToken() {
            window.open(`https://www.themoviedb.org/auth/access?request_token=${this.requestToken}`, 'blank')
        },

        async getAccessToken() {
            try {
                const response = await axios.post(
                    'https://api.themoviedb.org/4/auth/access_token',
                    { request_token: this.requestToken },
                    {
                        headers: {
                            accept: 'application/json',
                            'content-type': 'application/json',
                            Authorization: 'Bearer ' + apiAccessToken,
                        },
                    },
                )
                this.accountId = response.data.account_id
                localStorage.setItem('account Id', this.accountId)
                this.accessToken = response.data.access_token
                localStorage.setItem('access Token', this.accessToken)
            } catch (error) {
                console.log('Error in getAccessToken', error)
            }
        },

        async logOut() {
            localStorage.removeItem('account Id')
            localStorage.removeItem('access Token')
            localStorage.removeItem('request token')
            localStorage.removeItem('movieListId')
            this.isLoggedOut = true
        },
    },
})
