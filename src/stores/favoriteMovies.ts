import { defineStore } from 'pinia'
import axios from 'axios'

export const useFavoriteStore = defineStore({
    id: 'favoriteMovies',
    state: () => ({
        favoriteMovies: [],
        isLoading: false,
        error: null,
        token: null,
        userID: null,
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
                console.log('TOKEN STORE', typeof this.token, this.token)
            } catch (error) {
                this.error = error
            }
        },
        async createSession(token: String) {
            window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:5173/favorite-movies`
            const params = new URLSearchParams(window.location.search)
        },
        handleReturnedToken() {
            const params = new URLSearchParams(window.location.search)
            const token = params.get('request_token')

            if (token) {
                this.userID = token
                localStorage.setItem('userID', this.userID)
                console.log('USERID', this.userID)
                this.createUserID()
            }
        },
        async createUserID() {
            const response = await axios.post('https://api.themoviedb.org/3/authentication/session/new', {
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDNjZjFkOGRjNTI4YzNkYWJkNmI2N2JhOGMxNDdmMiIsInN1YiI6IjY0ZmQ4MGJkNmEyMjI3MDBmZDFlYzVkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LG0DOBro9Ews_O2t1BheIDjZrxgBUcYSZF1SaET8_NA',
                },
            })

            console.log('ID session', response.data)
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
