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
        <div class="grid grid-cols-6 row-auto gap-5" v-if="categories">
            <CategoryTab
                v-for="category in categories"
                :category="category.name"
                :key="category.id"
                @click="() => filterMoviesByCategory(category.id)"
            />
        </div>
        <div v-if="isLoading">Content is loading</div>
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

<script lang="ts">
import axios from 'axios'
import MyButton from '../components/MyButton.vue'
import MovieCard from '../components/MovieCard.vue'
import HeroSlider from '../components/HeroSlider.vue'
import CategoryTab from '../components/CategoryTab.vue'
import { useMoviesStore } from '../stores/discoverMovies.ts'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

export default {
    name: 'HomeView',
    setup() {
        const moviesStore = useMoviesStore()
        const { movies, isLoading, error, categories, isLoadingCategories, errorCategories } = storeToRefs(moviesStore)

        onMounted(() => {
            moviesStore.fetchMovies()
            moviesStore.fetchCategories()
        })

        return {
            movies,
            isLoading,
            error,
            categories,
            isLoadingCategories,
            errorCategories,
        }
    },
    data() {
        return {
            bestMovies: null,
            errorBestMovies: null,
            topRatedMovies: null,
            errorTopRatedMovies: null,
            selectedCategory: null,
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
        filteredMovies() {
            if (!this.selectedCategory) {
                return this.movies
            } else {
                console.log('CAT IN Filtered movies', this.selectedCategory)
                const moviesFiltered = this.movies.filter((movie) => movie.genre_ids.includes(this.selectedCategory))
                console.log('movies after filter', moviesFiltered)
                return (this.movies = moviesFiltered)
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
        filterMoviesByCategory(id: Number) {
            this.selectedCategory = id
            console.log('ID selected', this.selectedCategory)
            this.filteredMovies()
        },
    },
    components: {
        MyButton,
        MovieCard,
        HeroSlider,
        CategoryTab,
    },
}
</script>

<style scoped></style>
