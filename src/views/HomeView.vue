<template>
    <!-- LOADING BARS -->
    <div class="vl-parent">
        <Loading
            :active="isLoadingCategories || isLoading"
            :isFullPage="true"
            color="red"
            loader="bars"
            backgroundColor="black"
            :width="800"
            :zIndex="999"
            :opacity="100"
        >
        </Loading>
    </div>

    <!-- HERO SECTION -->
    <section v-if="topRatedMovies" class="p-0">
        <HeroSlider
            v-if="topRatedMovies"
            :title="topRatedMovies[0].title"
            :posterPath="topRatedMovies[0].backdrop_path"
            :mobilePosterPath="topRatedMovies[0].poster_path"
            :description="topRatedMovies[0].overview"
            :id="topRatedMovies[0].id"
        ></HeroSlider>
    </section>

    <!-- TOP 4 MOVIES DESKTOP -->
    <section class="hidden lg:block">
        <div class="titleSection">
            <h2>Best movies of the month</h2>
            <hr />
        </div>
        <div class="-z-10 text-[25rem] grid grid-cols-4 grid-rows-1 numbers cursor-pointer relative">
            <div v-for="number in topMovies" class="text-slate-100 hover:text-red-700 mr-3" :key="number">
                {{ number }}
            </div>
        </div>
        <div
            class="grid grid-cols-4 grid-rows-1 gap-[47px] z-10 px-10 absolute -translate-y-[33rem] -translate-x-5"
            v-if="bestMovies"
        >
            <MovieCard
                v-for="movie in bestMovies"
                :key="movie.id"
                :title="movie.original_title"
                :moviePosterPath="movie.poster_path"
                class="pl-20"
                :rating="movie.vote_average"
                :movieId="movie.id"
            />
        </div>
    </section>

    <!-- TOP 4 MOVIES RESPONSIVE -->
    <section class="lg:hidden">
        <div class="titleSection">
            <h2>Best movies <br />of the month</h2>
            <hr />
        </div>
        <div class="grid grid-cols-2 grid-rows-1 gap-[10px] z-10 px-10" v-if="bestMovies">
            <MovieCard
                v-for="movie in bestMovies"
                :key="movie.id"
                :title="movie.original_title"
                :moviePosterPath="movie.poster_path"
                :rating="movie.vote_average"
                :movieId="movie.id"
            />
        </div>
    </section>

    <!-- MOVIES BY CATEGORIES DESKTOP-->
    <section class="hidden lg:block">
        <div class="titleSection">
            <h2>Discover our movies</h2>
            <hr />
        </div>
        <div class="grid grid-cols-6 row-auto gap-5 pb-6" v-if="categories">
            <CategoryTab
                v-for="category in categoriesToDisplay"
                :category="category.name"
                :key="category.id"
                @click="() => filterMoviesByCategory(category.id)"
                :isActive="category.isActive"
            />
        </div>
        <div v-if="isLoading">Content is loading</div>
        <div v-if="emptyMovie">Oups, it seems this category is empty</div>
        <div class="grid grid-cols-4 grid-rows-3 gap-20" v-if="movies">
            <MovieCard
                v-for="movie in moviesToDisplay"
                :key="movie.id"
                :title="movie.original_title"
                :moviePosterPath="movie.poster_path"
                :rating="movie.vote_average"
                :movieId="movie.id"
            />
        </div>
    </section>

    <!-- MOVIES BY CATEGORIES RESPONSIVE -->
    <section class="lg:hidden">
        <div class="titleSection">
            <h2>Discover our movies</h2>
            <hr />
        </div>
        <div class="grid grid-cols-3 row-auto gap-3 pb-6 text-sm" v-if="categories">
            <CategoryTab
                v-for="category in categoriesToDisplay"
                :category="category.name"
                :key="category.id"
                @click="() => filterMoviesByCategory(category.id)"
                :isActive="category.isActive"
            />
        </div>
        <div v-if="isLoading">Content is loading</div>
        <div v-if="emptyMovie">Oups, it seems this category is empty</div>
        <div class="grid grid-cols-2 grid-rows-3 gap-10" v-if="movies">
            <MovieCard
                v-for="movie in moviesToDisplay"
                :key="movie.id"
                :title="movie.original_title"
                :moviePosterPath="movie.poster_path"
                :rating="movie.vote_average"
                :movieId="movie.id"
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
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

const apiAccessToken = import.meta.env.VITE_APIACCESSTOKEN

export default {
    name: 'HomeView',
    setup() {
        const moviesStore = useMoviesStore()
        const { movies, isLoading, error, categories, isLoadingCategories, errorCategories, categoriesToDisplay } =
            storeToRefs(moviesStore)
        onMounted(() => {
            moviesStore.fetchMovies()
            moviesStore.fetchCategories()
            moviesStore.filteredCategories
        })

        return {
            movies,
            isLoading,
            error,
            categories,
            isLoadingCategories,
            errorCategories,
            categoriesToDisplay,
        }
    },
    data() {
        return {
            bestMovies: null,
            errorBestMovies: null,
            topRatedMovies: null,
            errorTopRatedMovies: null,
            selectedCategory: null,
            moviesToDisplay: [],
            emptyMovie: false,
            topMovies: [1, 2, 3, 4],
            moviesType: 'movie',
        }
    },
    async created() {
        await this.fetchBestMovies()
        await this.fetchTopRatedMovies()
        await this.moviesCopy
    },
    computed: {
        moviesCopy() {
            return (this.moviesToDisplay = this.movies)
        },

        moviePoster() {
            if (this.bestMovies) {
                const rootPath = 'https://image.tmdb.org/t/p/original/'
                return rootPath + this.bestMovies.poster_path
            } else {
                return null
            }
        },
        filteredMovies() {
            if (this.selectedCategory === 0) {
                return (this.moviesToDisplay = this.movies)
            } else {
                this.moviesToDisplay = this.movies

                const moviesFiltered = this.moviesToDisplay.filter((movie) =>
                    movie.genre_ids.includes(this.selectedCategory),
                )
                if (!moviesFiltered.length) {
                    return (this.emptyMovie = true)
                } else return (this.emptyMovie = false), (this.moviesToDisplay = moviesFiltered)
            }
        },
    },
    methods: {
        async fetchBestMovies() {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer ' + apiAccessToken,
                    },
                })
                this.bestMovies = response.data.results.splice(0, 4)
            } catch (error) {
                this.errorBestMovies = error.message
            }
        },
        async fetchTopRatedMovies() {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated', {
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer ' + apiAccessToken,
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
            localStorage.setItem('activeCategory', this.selectedCategory)
            this.savedCategory()
            this.filteredMovies
        },

        savedCategory() {
            const savedCategory = localStorage.getItem('activeCategory')
            this.categoriesToDisplay.map((category) => {
                if (category.id === parseInt(savedCategory)) {
                    return (category.isActive = true)
                } else {
                    category.isActive = false
                }
            })
        },
    },
    components: {
        MyButton,
        MovieCard,
        HeroSlider,
        CategoryTab,
        Loading,
    },
}
</script>

<style scoped></style>
