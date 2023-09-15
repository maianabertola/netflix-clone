<template>
    <div v-if="movieId && movieDetails">
        <div class="brightness-80">
            <img :src="movieBackDrop" :alt="this.movieDetails.title" />
        </div>
        <div class="grid grid-cols-3 gap-4 grid-row-5 p-5">
            <div class="col-span-3">
                <h1>About {{ this.movieDetails.title }}</h1>
                <p class="italic text-xl m-0">{{ this.movieDetails.tagline }}</p>
            </div>
            <div class="col-span-3">
                <div class="flex flex-row items-end gap-3">
                    <div class="w-8">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="{1.5}"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                            />
                        </svg>
                    </div>
                    <div>
                        <p class="m-0">
                            {{ this.movieDetails.vote_average }}
                        </p>
                    </div>
                    <div>
                        <p class="m-0">|| Release Date: {{ this.movieDetails.release_date }}</p>
                    </div>
                </div>
            </div>

            <div class="row-start-4 row-end-5 col-start-1 col-end-3">
                <ol class="flex flex-row gap-3">
                    Genre:
                    <li v-for="genre in this.movieDetails.genres" key="genre.id" class="font-semibold">
                        {{ genre.name }}
                    </li>
                </ol>
            </div>
            <div class="col-span-2">
                <p>{{ this.movieDetails.overview }}</p>
            </div>
            <div class="row-start-3 row-end-4 col-start-3 col-end-4">
                <ol>
                    Produced by:
                    <li
                        v-for="company in this.movieDetails.production_companies"
                        key="company.id"
                        class="font-semibold"
                    >
                        {{ company.name }}
                    </li>
                </ol>
            </div>
            <div class="row-start-4 row-end-5 col-start-3 col-end-4">
                <ol>
                    Countries:
                    <li
                        v-for="country in this.movieDetails.production_countries"
                        key="country.iso_3166_1"
                        class="font-semibold"
                    >
                        {{ country.name }}
                    </li>
                </ol>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'MovieDetails',
    data() {
        return {
            movieId: null,
            movieDetails: null,
            errorMovieDetails: null,
        }
    },
    created() {
        this.movieId = this.$route.params.id
        this.getMovieById()
    },
    computed: {
        movieBackDrop() {
            if (this.movieDetails) {
                const rootpath = 'https://image.tmdb.org/t/p/original/'
                return rootpath + this.movieDetails.backdrop_path
            } else {
                return null
            }
        },
    },
    methods: {
        async getMovieById() {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${this.movieId}?language=en-US`, {
                    headers: {
                        accept: 'application/json',
                        Authorization:
                            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDNjZjFkOGRjNTI4YzNkYWJkNmI2N2JhOGMxNDdmMiIsInN1YiI6IjY0ZmQ4MGJkNmEyMjI3MDBmZDFlYzVkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LG0DOBro9Ews_O2t1BheIDjZrxgBUcYSZF1SaET8_NA',
                    },
                })
                this.movieDetails = response.data
                console.log('movie details', this.movieDetails)
            } catch (error) {
                this.errorMovieDetails = error
                console.log('error', this.errorMovieDetails)
            }
        },
    },
}
</script>

<style scoped></style>
