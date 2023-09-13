<template>
    <!-- HERO SECTION -->
    <section v-if="topRatedMovies">
        <HeroSlider
            v-if="topRatedMovies"
            :title="topRatedMovies[0].title"
            :posterPath="topRatedMovies[0].poster_path"
            :description="topRatedMovies[0].overview"
            :id="topRatedMovies[0].id"
        ></HeroSlider>
    </section>

    <!-- TOP 4 MOVIES -->
    <section>
        <h1>Best movies of the month</h1>
        <hr />
        <div class="grid grid-cols-4 grid-rows-1 gap-3" v-if="bestMovies">
            <MovieCard
                v-for="movie in bestMovies.splice(0, 4)"
                :key="movie.id"
                :title="movie.original_title"
                :moviePosterPath="movie.poster_path"
            />
        </div>
    </section>

    <!-- MOVIES BY CATEGORIES -->
    <section>
        <h1>Discover our movies</h1>
        <hr />
        <div class="grid grid-cols-4 grid-rows-3 gap-3" v-if="isloading">Content is loading</div>
        <div class="grid grid-cols-4 grid-rows-3 gap-3" v-if="movies">
            <MovieCard
                v-for="movie in movies"
                :key="movie.id"
                :title="movie.original_title"
                :moviePosterPath="movie.poster_path"
            />
        </div>
    </section>
</template>

<script>
import axios from 'axios'
import MyButton from '../components/MyButton.vue'
import MovieCard from '../components/MovieCard.vue'
import HeroSlider from '../components/HeroSlider.vue'
import { useMoviesStore } from '../stores/discoverMovies.ts'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

export default {
    name: 'HomeView',
    setup() {
        const moviesStore = useMoviesStore()
        const { movies, isloading, error } = storeToRefs(moviesStore)

        onMounted(() => {
            moviesStore.fetchMovies()
        })

        return {
            movies,
            isloading,
            error,
        }
    },
    data() {
        return {
            bestMovies: null,
            errorBestMovies: null,
            topRatedMovies: null,
            errorTopRatedMovies: null,
        }
    },
    async created() {
        await this.fetchBestMovies()
        await this.fetchTopRatedMovies()
    },
    computed: {
        moviePoster() {
            if (this.bestMovies) {
                const rootPath = 'https://image.tmdb.org/t/p/original/'
                return rootPath + this.bestMovies.poster_path
            } else {
                return null
            }
        },
    },
    methods: {
        async fetchBestMovies() {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
                    headers: {
                        accept: 'application/json',
                        Authorization:
                            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDNjZjFkOGRjNTI4YzNkYWJkNmI2N2JhOGMxNDdmMiIsInN1YiI6IjY0ZmQ4MGJkNmEyMjI3MDBmZDFlYzVkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LG0DOBro9Ews_O2t1BheIDjZrxgBUcYSZF1SaET8_NA',
                    },
                })
                this.bestMovies = response.data.results
                //console.log('movies', this.bestMovies)
            } catch (error) {
                this.errorBestMovies = error.message
                //console.log(this.errorBestMovies)
            }
        },
        async fetchTopRatedMovies() {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated', {
                    headers: {
                        accept: 'application/json',
                        Authorization:
                            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDNjZjFkOGRjNTI4YzNkYWJkNmI2N2JhOGMxNDdmMiIsInN1YiI6IjY0ZmQ4MGJkNmEyMjI3MDBmZDFlYzVkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LG0DOBro9Ews_O2t1BheIDjZrxgBUcYSZF1SaET8_NA',
                    },
                    params: {
                        page: 1,
                    },
                })
                this.topRatedMovies = response.data.results
            } catch (error) {
                this.errorTopRatedMovies = error
                console.log(this.errorTopRatedMovies)
            }
        },
    },
    components: {
        MyButton,
        MovieCard,
        HeroSlider,
    },
}
</script>

<style scoped></style>
