<template>
    <div v-if="moviesData && moviesData.results" class="relative w-full">
        <div class="relative z-0 w-full h-[500px]">
            <img :src="moviePoster" class="w-full h-full object-cover" alt="Movie Poster" />
        </div>
        <div class="absolute top-10 left-10 z-10 p-50 w-3/5">
            <h1>Movies to not miss</h1>
            <div class="bg-neutral-500/50 p-5 rounded">
                <h2>{{ moviesData.results[0].original_title }}</h2>
                <p>{{ moviesData.results[0].overview }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'HomeView',
    data() {
        return {
            moviesData: null,
            errorMovies: null,
        }
    },
    async created() {
        await this.fetchMovies()
    },
    computed: {
        moviePoster() {
            if (this.moviesData && this.moviesData.results) {
                const rootpath = 'https://image.tmdb.org/t/p/original/'
                return rootpath + this.moviesData.results[0].poster_path
            } else {
                return null
            }
        },
    },
    methods: {
        async fetchMovies() {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
                    headers: {
                        accept: 'application/json',
                        Authorization:
                            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDNjZjFkOGRjNTI4YzNkYWJkNmI2N2JhOGMxNDdmMiIsInN1YiI6IjY0ZmQ4MGJkNmEyMjI3MDBmZDFlYzVkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LG0DOBro9Ews_O2t1BheIDjZrxgBUcYSZF1SaET8_NA',
                    },
                })
                this.moviesData = response.data
                console.log('movies', this.moviesData)
            } catch (error) {
                this.errorMovies = error.message
                console.log(error)
            }
        },

        getPoster() {
            if (moviesData.length > 1) {
            }
        },
    },
}
</script>

<style scoped></style>
