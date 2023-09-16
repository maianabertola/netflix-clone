<template>
    <!-- HERO SECTION -->
    <section v-if="topRatedMovies" class="p-0">
        <HeroSlider
            v-if="topRatedMovies"
            :title="topRatedMovies[0].title"
            :posterPath="topRatedMovies[0].poster_path"
            :description="topRatedMovies[0].overview"
            :id="topRatedMovies[0].id"
        ></HeroSlider>
    </section>

    <!-- TOP 4 MOVIES -->
    <section class="relative">
        <div class="titleSection">
            <h1>Best movies of the month</h1>
            <hr />
        </div>

        <div class="grid grid-cols-4 grid-rows-1 gap-20 z-10 px-10 max-w-200px" v-if="bestMovies">
            <MovieCard
                v-for="movie in bestMovies"
                :key="movie.id"
                :title="movie.original_title"
                :moviePosterPath="movie.poster_path"
                class="pl-12"
                :rating="movie.vote_average"
            />
        </div>
        <div
            class="-z-10 text-[25rem] grid grid-cols-4 grid-rows-1 -mb-6 absolute -translate-y-[32rem] -translate-x-1 gap-12"
        >
            <div v-for="number in topMovies" class="text-slate-100 hover:text-red-700">
                {{ number }}
            </div>
        </div>
    </section>

    <!-- MOVIES BY CATEGORIES -->
    <section>
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
        <div class="grid grid-cols-4 grid-rows-3 gap-3" v-if="movies">
            <MovieCard
                v-for="movie in moviesToDisplay"
                :key="movie.id"
                :title="movie.original_title"
                :moviePosterPath="movie.poster_path"
                :rating="movie.vote_average"
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
                        Authorization:
                            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDNjZjFkOGRjNTI4YzNkYWJkNmI2N2JhOGMxNDdmMiIsInN1YiI6IjY0ZmQ4MGJkNmEyMjI3MDBmZDFlYzVkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LG0DOBro9Ews_O2t1BheIDjZrxgBUcYSZF1SaET8_NA',
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
                        Authorization:
                            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDNjZjFkOGRjNTI4YzNkYWJkNmI2N2JhOGMxNDdmMiIsInN1YiI6IjY0ZmQ4MGJkNmEyMjI3MDBmZDFlYzVkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LG0DOBro9Ews_O2t1BheIDjZrxgBUcYSZF1SaET8_NA',
                    },
                    params: {
                        page: 1,
                    },
                })
                this.topRatedMovies = response.data.results
                console.log(this.topRatedMovies)
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
    },
}
</script>

<style scoped></style>
