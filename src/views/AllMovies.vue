<template>
    <!-- MOVIES BY CATEGORIES DESKTOP-->

    <section class="hidden lg:block">
        <div class="titleSection">
            <h1>Discover our movies</h1>
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
            <h1>Discover our movies</h1>
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
import MyButton from '../components/MyButton.vue'
import MovieCard from '../components/MovieCard.vue'
import HeroSlider from '../components/HeroSlider.vue'
import CategoryTab from '../components/CategoryTab.vue'
import { useMoviesStore } from '../stores/discoverMovies'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

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
            moviesType: 'movie',
        }
    },
    async created() {
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
    },
}
</script>

<style scoped></style>
