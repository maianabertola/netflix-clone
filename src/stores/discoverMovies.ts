import { defineStore } from 'pinia'
import axios from 'axios'

export const useMoviesStore = defineStore({
    id: 'movies',
    state: () => ({
        movies: [],
        isLoading: false,
        error: null,
        categories: [],
        isLoadingCategories: false,
        errorCategories: null,
    }),
    getters: {},
    actions: {
        async fetchMovies() {
            this.isLoading = true
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
                this.isLoading = false
            } catch (error) {
                this.error = error
                console.log('error', error)
            } finally {
                this.isloading = false
            }
        },
        async fetchCategories() {
            this.isLoadingCategories = true
            try {
                const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
                    headers: {
                        accept: 'application/json',
                        Authorization:
                            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDNjZjFkOGRjNTI4YzNkYWJkNmI2N2JhOGMxNDdmMiIsInN1YiI6IjY0ZmQ4MGJkNmEyMjI3MDBmZDFlYzVkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LG0DOBro9Ews_O2t1BheIDjZrxgBUcYSZF1SaET8_NA',
                    },
                })

                this.categories = response.data.genres
                // console.log('cat', this.categories)
                this.isLoadingCategories = false
            } catch (error) {
                this.errorCategories = error
            }
        },
    },
})
