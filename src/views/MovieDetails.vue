<template>
    <!-- DESKTOP VERSION -->
    <div v-if="movieId && movieDetails" class="hidden lg:block">
        <div class="relative h-[70vh] overflow-hidden">
            <img :src="movieBackDrop" :alt="this.movieDetails.title" />
        </div>
        <div class="grid grid-cols-4 gap-4 grid-row-6 p-5">
            <div class="col-span-4 titleSection">
                <h1>{{ this.movieDetails.title }}</h1>
                <hr />
            </div>
            <div class="row-start-2 row-end-3 col-start-1 col-end-3">
                <p class="italic text-xl m-0">{{ this.movieDetails.tagline }}</p>
            </div>
            <div class="row-start-3 row-end-4 col-start-1 col-end-3">
                <div class="flex flex-row items-end gap-3">
                    Rating:
                    <Rating :rating="this.movieDetails.vote_average"></Rating>
                    <div>
                        <p class="m-0">|| Release Date: {{ this.movieDetails.release_date }}</p>
                    </div>
                </div>
            </div>

            <div class="row-start-4 row-end-5 col-start-1 col-end-3">
                <p>{{ this.movieDetails.overview }}</p>
            </div>
            <div class="border row-start-2 row-end-6 col-start-3 col-end-4"></div>
            <div class="row-start-4 row-end-5 col-start-4 col-end-5">
                <ol>
                    Produced by:
                    <li
                        v-for="company in this.movieDetails.production_companies"
                        :key="company.id"
                        class="font-semibold"
                    >
                        {{ company.name }}
                    </li>
                </ol>
            </div>
            <div class="row-start-5 row-end-6 col-start-1 col-end-3">
                <ol class="flex flex-row gap-3">
                    Genre:
                    <li v-for="genre in this.movieDetails.genres" :key="genre.id" class="font-semibold">
                        {{ genre.name }}
                    </li>
                </ol>
            </div>
            <div class="row-start-5 row-end-6 col-start-4 col-end-5">
                <ol>
                    Countries:
                    <li
                        v-for="country in this.movieDetails.production_countries"
                        :key="country.iso_3166_1"
                        class="font-semibold"
                    >
                        {{ country.name }}
                    </li>
                </ol>
            </div>
        </div>
    </div>

    <!-- RESPONSIVE VERSION -->
    <div v-if="movieId && movieDetails" class="lg:hidden">
        <div class="relative h-[70vh] overflow-hidden">
            <img :src="moviePosterMobile" :alt="this.movieDetails.title" />
        </div>
        <div class="grid grid-cols-1 gap-4 grid-row-6 p-5">
            <div class="titleSection p-0">
                <h1 class="text-2xl">{{ this.movieDetails.title }}</h1>
                <hr />
            </div>
            <div class="row-start-2 row-end-3">
                <p class="italic text-xl m-0">{{ this.movieDetails.tagline }}</p>
            </div>
            <div class="row-start-3 row-end-4 flex flex-row gap-3">
                <Rating :rating="this.movieDetails.vote_average"></Rating>
                <div>
                    <p class="m-0">|| Release Date: {{ this.movieDetails.release_date }}</p>
                </div>
            </div>

            <div class="row-start-4 row-end-5">
                <p>{{ this.movieDetails.overview }}</p>
            </div>
            <div class="row-start-5 row-end-6">
                <ol class="flex flex-row gap-3">
                    Genre:
                    <li v-for="genre in this.movieDetails.genres" :key="genre.id" class="font-semibold">
                        {{ genre.name }}
                    </li>
                </ol>
            </div>
            <div class="row-start-6 row-end-7">
                <ol class="flex flex-row gap-3">
                    Produced by:
                    <li
                        v-for="company in this.movieDetails.production_companies"
                        :key="company.id"
                        class="font-semibold"
                    >
                        {{ company.name }}
                    </li>
                </ol>
            </div>

            <div class="row-start-8 row-end-9">
                <ol class="flex flex-row gap-3">
                    Countries:
                    <li
                        v-for="country in this.movieDetails.production_countries"
                        :key="country.iso_3166_1"
                        class="font-semibold"
                    >
                        {{ country.name }}
                    </li>
                </ol>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios'
import Rating from '@/components/Rating.vue'

const apiAccessToken = import.meta.env.VITE_APIACCESSTOKEN

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
        moviePosterMobile() {
            if (this.movieDetails) {
                const rootpath = 'https://image.tmdb.org/t/p/original/'
                return rootpath + this.movieDetails.poster_path
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
                        Authorization: 'Bearer ' + apiAccessToken,
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
    components: {
        Rating,
    },
}
</script>

<style scoped></style>
