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
            const accessToken = localStorage.getItem('access Token')

            try {
                const response = await axios.get(`https://api.themoviedb.org/4/list/${this.movieListId}`, {
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer ' + accessToken,
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
        async addFavorite(movieId: Number) {
            const movieList = localStorage.getItem('movieListId')
            this.movieListId = movieList

            const accessToken = localStorage.getItem('access Token')

            const options = {
                method: 'POST',
                url: `https://api.themoviedb.org/4/list/${this.movieListId}/items`,
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: 'Bearer ' + accessToken,
                },
                data: {
                    items: [{ media_type: 'movie', media_id: movieId }],
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
        async deleteFavorite(movieId: Number) {
            const movieList = localStorage.getItem('movieListId')
            this.movieListId = movieList
            const accessToken = localStorage.getItem('access Token')
            console.log('access', accessToken)

            const options = {
                method: 'DELETE',
                url: `https://api.themoviedb.org/4/list/${this.movieListId}/items`,
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: 'Bearer ' + accessToken,
                },
                data: {
                    items: [{ media_type: 'movie', media_id: movieId }],
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
        async retrieveListID() {
            const list = localStorage.getItem('movieListId')
            this.movieListId = list
        },
    },
})
