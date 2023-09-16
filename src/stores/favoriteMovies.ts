import { defineStore } from 'pinia'
import axios from 'axios'

export const useFavoriteStore = defineStore({
    id: 'favoriteMovies',
    state: () => ({
        favoriteMovies: [],
        isLoadingFetchFavorite: false,
        errorFetchFavorite: null,
        token: null,
        requestToken: '',
        accountId: null,
        accessToken: null,
        errorAddFavorite: null,
        errorDeleteFavorite: null,
    }),
    getters: {},
    actions: {
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
                            Authorization:
                                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDNjZjFkOGRjNTI4YzNkYWJkNmI2N2JhOGMxNDdmMiIsInN1YiI6IjY0ZmQ4MGJkNmEyMjI3MDBmZDFlYzVkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LG0DOBro9Ews_O2t1BheIDjZrxgBUcYSZF1SaET8_NA',
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
                            Authorization:
                                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDNjZjFkOGRjNTI4YzNkYWJkNmI2N2JhOGMxNDdmMiIsInN1YiI6IjY0ZmQ4MGJkNmEyMjI3MDBmZDFlYzVkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LG0DOBro9Ews_O2t1BheIDjZrxgBUcYSZF1SaET8_NA',
                        },
                    },
                )
                console.log('RES GET ACCESS TOKEN', response.data)
                this.accountId = response.data.account_id
                localStorage.setItem('account Id', this.accountId)
                this.accessToken = response.data.access_token
                localStorage.setItem('access Token', this.accessToken)
            } catch (error) {
                console.log('Error in getAccessToken', error)
            }
        },

        async createSession() {
            const options = {
                method: 'POST',
                url: 'https://api.themoviedb.org/3/authentication/session/convert/4',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDNjZjFkOGRjNTI4YzNkYWJkNmI2N2JhOGMxNDdmMiIsInN1YiI6IjY0ZmQ4MGJkNmEyMjI3MDBmZDFlYzVkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LG0DOBro9Ews_O2t1BheIDjZrxgBUcYSZF1SaET8_NA',
                },
                data: this.accessToken,
            }

            axios
                .request(options)
                .then(function (response) {
                    console.log(response.data)
                })
                .catch(function (error) {
                    console.error(error)
                })
        },
        async fetchFavorite() {
            this.isLoadingFetchFavorite = true
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/4/account/${this.accountId}/movie/favorites`,
                    {
                        headers: {
                            accept: 'application/json',
                            Authorization:
                                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDNjZjFkOGRjNTI4YzNkYWJkNmI2N2JhOGMxNDdmMiIsInN1YiI6IjY0ZmQ4MGJkNmEyMjI3MDBmZDFlYzVkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LG0DOBro9Ews_O2t1BheIDjZrxgBUcYSZF1SaET8_NA',
                        },
                    },
                )
                this.favoriteMovies = response.data.results
                console.log('fav', this.favoriteMovies)
                this.isLoadingFetchFavorite = false
            } catch (error) {
                this.errorFetchFavorite = error
                console.log('error', error)
            }
        },
        async addFavorite(movieId: Number) {
            // try {
            //     console.log('I AM HERE IN ADD')
            //     const id = localStorage.getItem('account Id')
            //     this.accountId = id
            //     console.log('accound ID', this.accountId)
            //     const response = await axios.post(
            //         `https://api.themoviedb.org/3/account/${this.accountId}/favorite`,
            //         { media_type: 'movie', media_id: { movieId }, favorite: true },
            //         {
            //             headers: {
            //                 accept: 'application/json',
            //                 Authorization:
            //                     'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDNjZjFkOGRjNTI4YzNkYWJkNmI2N2JhOGMxNDdmMiIsInN1YiI6IjY0ZmQ4MGJkNmEyMjI3MDBmZDFlYzVkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LG0DOBro9Ews_O2t1BheIDjZrxgBUcYSZF1SaET8_NA',
            //             },
            //         },
            //     )
            //     console.log('Success in adding a new movie as favorite', response.data)
            // } catch (error) {
            //     this.errorAddFavorite = error
            //     console.log(this.errorAddFavorite)
            // }
            this.favoriteMovies.push(movieId)
        },
        async deleteFavorite(movieId: Number) {
            try {
                const response = await axios.post(`https://api.themoviedb.org/3/account/${this.accountId}/favorite`, {
                    headers: {
                        accept: 'application/json',
                        Authorization:
                            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDNjZjFkOGRjNTI4YzNkYWJkNmI2N2JhOGMxNDdmMiIsInN1YiI6IjY0ZmQ4MGJkNmEyMjI3MDBmZDFlYzVkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LG0DOBro9Ews_O2t1BheIDjZrxgBUcYSZF1SaET8_NA',
                    },
                    body: JSON.stringify({ media_type: 'movie', media_id: { movieId }, favorite: false }),
                })
                console.log('Success in adding a new movie as favorite', response.data)
            } catch (error) {
                this.errorDeleteFavorite = error
            }
        },
    },
})
