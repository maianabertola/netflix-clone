import { defineStore } from 'pinia'
import axios from 'axios'

export const useFavoriteStore = defineStore({
    id: 'favoriteMovies',
    state: () => ({
        movieListId: null,
        favoriteMovies: [],
        isLoadingFetchFavorite: false,
        errorFetchFavorite: null,
        errorAddFavorite: null,
        errorDeleteFavorite: null,
    }),
    getters: {},
    actions: {
        async fetchFavorite() {
            this.isLoadingFetchFavorite = true
            try {
                const response = await axios.get(`https://api.themoviedb.org/4/list/${this.movieListId}`, {
                    headers: {
                        accept: 'application/json',
                        Authorization:
                            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDNjZjFkOGRjNTI4YzNkYWJkNmI2N2JhOGMxNDdmMiIsInN1YiI6IjY0ZmQ4MGJkNmEyMjI3MDBmZDFlYzVkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LG0DOBro9Ews_O2t1BheIDjZrxgBUcYSZF1SaET8_NA',
                    },
                })
                this.favoriteMovies = response.data.results
                console.log('fav', this.favoriteMovies)
                this.isLoadingFetchFavorite = false
            } catch (error) {
                this.errorFetchFavorite = error
                console.log('error', error)
            }
        },
        async addFavorite(movieId: Number, mediaType: String) {
            const movieList = localStorage.getItem('movieListId')
            this.movieListId = movieList

            // try {
            //     const response = await axios.post(
            //         `https://api.themoviedb.org/4/${this.movieListId}/items`,

            //         { items: [{ media_type: mediaType, media_id: movieId }] },
            //         {
            //             headers: {
            //                 accept: 'application/json',
            //                 Authorization:
            //                     'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NGZkODBiZDZhMjIyNzAwZmQxZWM1ZGIiLCJuYmYiOjE2OTQ5NDM0NjcsImF1ZCI6ImU0M2NmMWQ4ZGM1MjhjM2RhYmQ2YjY3YmE4YzE0N2YyIiwianRpIjoiNjcwNzQ4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCIsImFwaV93cml0ZSJdLCJ2ZXJzaW9uIjoxfQ.NscnYsAEb9X2GI-ttP5DTqvN6A5L0-FQ567WIAYy0O4',
            //             },
            //         },
            //     )
            //     console.log('Success', response.data)
            // } catch (error) {
            //     console.log(error)
            // }

            const options = {
                method: 'POST',
                url: `https://api.themoviedb.org/4/list/${this.movieListId}/items`,
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization:
                        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NGZkODBiZDZhMjIyNzAwZmQxZWM1ZGIiLCJuYmYiOjE2OTQ5NDM0NjcsImF1ZCI6ImU0M2NmMWQ4ZGM1MjhjM2RhYmQ2YjY3YmE4YzE0N2YyIiwianRpIjoiNjcwNzQ4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCIsImFwaV93cml0ZSJdLCJ2ZXJzaW9uIjoxfQ.NscnYsAEb9X2GI-ttP5DTqvN6A5L0-FQ567WIAYy0O4',
                },
                data: {
                    items: [{ media_type: mediaType, media_id: movieId }],
                },
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
        async deleteFavorite(movieId: Number, mediaType: String) {
            const movieList = localStorage.getItem('movieListId')
            this.movieListId = movieList

            // try {
            //     const response = await axios.post(
            //         `https://api.themoviedb.org/4/${this.movieListId}/items`,

            //         { items: [{ media_type: mediaType, media_id: movieId }] },
            //         {
            //             headers: {
            //                 accept: 'application/json',
            //                 Authorization:
            //                     'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NGZkODBiZDZhMjIyNzAwZmQxZWM1ZGIiLCJuYmYiOjE2OTQ5NDM0NjcsImF1ZCI6ImU0M2NmMWQ4ZGM1MjhjM2RhYmQ2YjY3YmE4YzE0N2YyIiwianRpIjoiNjcwNzQ4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCIsImFwaV93cml0ZSJdLCJ2ZXJzaW9uIjoxfQ.NscnYsAEb9X2GI-ttP5DTqvN6A5L0-FQ567WIAYy0O4',
            //             },
            //         },
            //     )
            //     console.log('Success', response.data)
            // } catch (error) {
            //     console.log(error)
            // }

            const options = {
                method: 'DELETE',
                url: `https://api.themoviedb.org/4/list/${this.movieListId}/items`,
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization:
                        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NGZkODBiZDZhMjIyNzAwZmQxZWM1ZGIiLCJuYmYiOjE2OTQ5NDM0NjcsImF1ZCI6ImU0M2NmMWQ4ZGM1MjhjM2RhYmQ2YjY3YmE4YzE0N2YyIiwianRpIjoiNjcwNzQ4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCIsImFwaV93cml0ZSJdLCJ2ZXJzaW9uIjoxfQ.NscnYsAEb9X2GI-ttP5DTqvN6A5L0-FQ567WIAYy0O4',
                },
                data: {
                    items: [{ media_type: mediaType, media_id: movieId }],
                },
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
    },
})
