import { defineStore } from 'pinia'
import axios from 'axios'

export const useMoviesStore = defineStore({
    id: 'movies',
    state: () => ({
        movies: [],
        isloading: false,
        error: null,
    }),
    getters: {},
    actions: {
        async fetchMovies() {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
                    headers: {
                        accept: 'application/json',
                        Authorization:
                            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDNjZjFkOGRjNTI4YzNkYWJkNmI2N2JhOGMxNDdmMiIsInN1YiI6IjY0ZmQ4MGJkNmEyMjI3MDBmZDFlYzVkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LG0DOBro9Ews_O2t1BheIDjZrxgBUcYSZF1SaET8_NA',
                    },
                })
                this.movies = response.data.results
                console.log('movies', this.movies)
            } catch (error) {
                console.log('error', error)
            } finally {
                this.isloading = false
            }
        },
    },
})
