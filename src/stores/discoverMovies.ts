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
        categoriesToDisplay: [],
    }),
    getters: {
        filteredCategories() {
            const selectedCategories = ['All', 'Action', 'Documentary', 'Animation', 'Adventure', 'Comedy']
            this.categoriesToDisplay = this.categories
                .filter((category) => selectedCategories.includes(category.name))
                .map((category) => {
                    return {
                        ...category,
                        isActive: false,
                    }
                })
            return this.categoriesToDisplay.sort((a, b) => a.id - b.id)
        },
    },
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
                const allCategory = { id: 0, name: 'All' }
                this.categories.push(allCategory)
                this.filteredCategories
                this.isLoadingCategories = false
            } catch (error) {
                this.errorCategories = error
            }
        },
    },
})
