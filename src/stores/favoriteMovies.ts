import { defineStore } from 'pinia'
import axios from 'axios'

export const useFavoriteStore = defineStore({
    id: 'favoriteMovies',
    state: () => ({
        favoriteMovies: [],
        isLoading: false,
        error: null,
        token: null,
        approvedToken: null,
        requestToken: null,
    }),
    getters: {},
    actions: {
        async createToken() {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/authentication/token/new', {
                    headers: {
                        accept: 'application/json',
                        Authorization:
                            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDNjZjFkOGRjNTI4YzNkYWJkNmI2N2JhOGMxNDdmMiIsInN1YiI6IjY0ZmQ4MGJkNmEyMjI3MDBmZDFlYzVkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LG0DOBro9Ews_O2t1BheIDjZrxgBUcYSZF1SaET8_NA',
                    },
                })
                this.token = response.data.request_token
            } catch (error) {
                this.error = error
            }
        },

        async createApprovedToken(token: String) {
            window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:5173/favorite-movies`
        },

        handleReturnedToken() {
            console.log('JE SUIS DANS HANDLE POUR RETOURNER LE TOKEN')

            const params = new URLSearchParams(window.location.search)
            const secondToken = params.get('request_token')
            this.approvedToken = secondToken
            localStorage.setItem('token approved', this.approvedToken)
            console.log('token approved', this.approvedToken)

            if (this.approvedToken) {
                console.log('IN APPROVED TOKEN')
                const lastToken = localStorage.getItem('request_token')
                this.requestToken = lastToken
                console.log('request token', this.requestToken)
                this.createSession()
            } else {
                return null
            }
        },

        async createSession() {
            // const response = await axios.post('https://api.themoviedb.org/3/authentication/session/new', {
            //     headers: {
            //         accept: 'application/json',
            //         'content-type': 'application/json',
            //         Authorization:
            //             'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDNjZjFkOGRjNTI4YzNkYWJkNmI2N2JhOGMxNDdmMiIsInN1YiI6IjY0ZmQ4MGJkNmEyMjI3MDBmZDFlYzVkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LG0DOBro9Ews_O2t1BheIDjZrxgBUcYSZF1SaET8_NA',
            //     },
            //     body: this.tokenApproved,
            // })
            // console.log('ID session', response.data)

            const requestBody = {
                request_token: this.requestToken, // your approved token
            }

            const options = {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization:
                        'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDNjZjFkOGRjNTI4YzNkYWJkNmI2N2JhOGMxNDdmMiIsInN1YiI6IjY0ZmQ4MGJkNmEyMjI3MDBmZDFlYzVkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LG0DOBro9Ews_O2t1BheIDjZrxgBUcYSZF1SaET8_NA',
                },
                body: JSON.stringify(requestBody),
            }

            fetch('https://api.themoviedb.org/3/authentication/session/new', options)
                .then((response) => response.json())
                .then((response) => console.log(response))
                .catch((err) => console.error(err))
        },
        async fetchFavorite() {
            this.isLoading = true
            try {
                const response = await axios.get(
                    'https://api.themoviedb.org/3/account/MaianaB/favorite/tv?language=en-US&page=1&sort_by=created_at.asc',
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
                this.isLoading = false
            } catch (error) {
                this.error = error
                console.log('error', error)
            } finally {
                this.isloading = false
            }
        },

        async addFavorite() {
            try {
            } catch (error) {}
        },
    },
})
