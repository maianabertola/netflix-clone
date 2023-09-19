<template>
    <section>
        <div class="titleSection">
            <h1>Favorite Movies</h1>
            <hr />
        </div>
        <!-- DESKTOP version -->
        <!-- User is not connected -->
        <div v-if="!isConnected" class="hidden lg:block">
            <div
                class="w-full h-screen pt-[3vh]"
                :style="{
                    'background-image':
                        'linear-gradient(rgb(0 0 0 / 83%), rgb(18 17 17 / 50%)),url(https://files.natixis.sbcdnsb.com/images/iFgRxe8MTtGHJmoianoj3A/content/1643367631/1371098/600/mosaique.png)',
                }"
            >
                <div class="text-center w-7/12 m-auto p-10">
                    <h2>Looking to save your favorite movies?</h2>
                    <p>
                        If you want to keep a digital list of your favorite movies that's accessible from anywhere, you
                        can create an account. To do so, you need to register first and agree to share data with our
                        partner, TMDB.
                    </p>
                    <MyButton cta="Create an account" @click="() => navToAccount()"></MyButton>
                </div>
            </div>
        </div>
        <!-- User is connected but did not create a list -->
        <div v-if="isConnected && !movieListId" class="hidden lg:block">
            <div class="grid grid-cols-4">
                <div class="row-start-1 col-start-1">
                    <p>
                        Dear user, <br />
                        It seems you haven't created a favorite movies list yet! Please create one to save and access
                        your favorite films without any hassle.
                    </p>
                </div>
                <div class="border row-start-1 col-start-2 h-full"></div>
                <form @submit.prevent="createList" class="col-start-3 col-span-2">
                    <div class="grid-rows-4 cols-2">
                        <div class="inputWrapper">
                            <label>Name</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                v-model="nameList"
                                placeholder="Eg: Michel favorite movies"
                            />
                        </div>
                        <div class="inputWrapper">
                            <label>Description</label>
                            <input
                                id="description"
                                type="textaera"
                                name="description"
                                v-model="description"
                                placeholder="Few words about your list"
                            />
                        </div>
                        <div class="inputWrapper">
                            <label>Private List </label>
                            <input
                                id="privateList"
                                type="checkbox"
                                name="privateList"
                                v-model="privateList"
                                placeholder="Few words about your list"
                                class="w-2/6"
                            />
                        </div>
                        <div class="flex flex-col justify-center">
                            <MyButton cta="Create list" type="submit"></MyButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <!-- User is connected and has a list to save fav. movies -->
        <div v-if="isConnected && movieListId" class="lg:block hidden">
            <div v-if="!favoriteMovies.length">
                <p class="text-center">
                    Your list is currently empty.
                    <RouterLink to="/all-movies">Explore our collection and add your favorites.</RouterLink>
                </p>
            </div>

            <div v-if="favoriteMovies.length >= 1">
                <div class="grid grid-cols-4 grid-rows-3 gap-3" v-if="favoriteMovies">
                    <MovieCard
                        v-for="movie in favoriteMovies"
                        :key="movie.id"
                        :title="movie.original_title"
                        :moviePosterPath="movie.poster_path"
                        :rating="movie.vote_average"
                        :movieId="movie.id"
                    />
                </div>
            </div>
        </div>

        <!-- Mobile version -->
        <!-- User is not connected -->
        <div v-if="!isConnected" class="lg:hidden">
            <div
                class="w-full h-screen pt-[3vh]"
                :style="{
                    'background-image':
                        'linear-gradient(rgb(0 0 0 / 83%), rgb(18 17 17 / 50%)),url(https://files.natixis.sbcdnsb.com/images/iFgRxe8MTtGHJmoianoj3A/content/1643367631/1371098/600/mosaique.png)',
                }"
            >
                <div class="text-center w-12/12 m-auto p-10">
                    <h2>Join the movement</h2>
                    <p>
                        If you want to keep a digital list of your favorite movies that's accessible from anywhere, you
                        can create an account. To do so, you need to register first and agree to share data with our
                        partner, TMDB.
                    </p>
                    <MyButton cta="Create an account" @click="() => navToAccount()"></MyButton>
                </div>
            </div>
        </div>

        <!-- User is connected but did not create a list -->
        <div v-if="isConnected && !movieListId" class="grid grid-cols-1 lg:hidden">
            <div class="flex flex-col justify-center">
                <p class="text-center">
                    Dear user, <br />
                    Please create a list to save and access your favorite films without any hassle.
                </p>
            </div>
            <form @submit.prevent="createList" class="col-span-2 grid">
                <div class="grid-rows-6 cols-2">
                    <div class="inputWrapper">
                        <label>Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            v-model="nameList"
                            placeholder="Eg: Michel favorite movies"
                        />
                    </div>
                    <div class="inputWrapper">
                        <label>Description</label>
                        <input
                            id="description"
                            type="textaera"
                            name="description"
                            v-model="description"
                            placeholder="Few words about your list"
                        />
                    </div>
                    <div class="inputWrapper">
                        <label>Private List </label>
                        <input
                            id="privateList"
                            type="checkbox"
                            name="privateList"
                            v-model="privateList"
                            placeholder="Few words about your list"
                            class="w-2/6"
                        />
                    </div>
                    <div class="flex flex-col justify-center">
                        <MyButton cta="Create list" type="submit"></MyButton>
                    </div>
                </div>
            </form>
        </div>

        <!-- User is connected and has a list to save fav. movies -->
        <div v-if="isConnected && movieListId" class="lg:hidden">
            <div v-if="!favoriteMovies.length">
                <p class="text-center">
                    Your list is currently empty.
                    <RouterLink to="/all-movies"><br />Explore our collection and add your favorites.</RouterLink>
                </p>
            </div>

            <div v-if="favoriteMovies.length >= 1">
                <div class="grid grid-cols-2 grid-rows-3 gap-3" v-if="favoriteMovies">
                    <MovieCard
                        v-for="movie in favoriteMovies"
                        :key="movie.id"
                        :title="movie.original_title"
                        :moviePosterPath="movie.poster_path"
                        :rating="movie.vote_average"
                        :movieId="movie.id"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { useFavoriteStore } from '../stores/favoriteMovies.ts'
import { useAuthStore } from '../stores/authStore'
import { storeToRefs } from 'pinia'
import MyButton from '../components/MyButton.vue'
import axios from 'axios'
import { onMounted } from 'vue'
import MovieCard from '@/components/MovieCard.vue'
import { watchArray } from '@vueuse/core'

export default {
    name: 'FavoriteView',
    setup() {
        const favoriteStore = useFavoriteStore()
        const authStore = useAuthStore()
        const { favoriteMovies, isLoadingFetchFavorite, errorFetchFavorite, movieListId } = storeToRefs(favoriteStore)
        const { accessToken, accountId, isConnected } = storeToRefs(authStore)

        const fetchFavorite = () => {
            favoriteStore.fetchFavorite()
        }

        onMounted(() => {
            authStore.userConnected()
            favoriteStore.retrieveListID()
        })

        return {
            favoriteMovies,
            isLoadingFetchFavorite,
            errorFetchFavorite,
            fetchFavorite,
            movieListId,
            accountId,
            isConnected,
            accessToken,
        }
    },
    data() {
        return {
            nameList: '',
            description: '',
            privateList: false,
        }
    },
    created() {},
    methods: {
        async createList() {
            const accessToken = localStorage.getItem('access Token')
            try {
                const response = await axios.post(
                    'https://api.themoviedb.org/4/list',
                    {
                        description: this.description,
                        name: this.nameList,
                        iso_3166_1: 'US',
                        iso_639_1: 'en',
                        public: this.privateList,
                    },
                    {
                        headers: {
                            accept: 'application/json',
                            'content-type': 'application/json',
                            Authorization: 'Bearer ' + accessToken,
                        },
                    },
                )

                this.movieListId = response.data.id
                localStorage.setItem('movieListId', this.movieListId)
            } catch (error) {
                console.log(error)
            }
        },
        navToAccount() {
            this.$emit('click')
            this.$router.push(`/account`)
        },
    },
    computed: {},
    watch: {
        movieListId(newValue) {
            if (newValue) {
                this.fetchFavorite()
            }
        },
    },

    components: {
        MyButton,
        MovieCard,
    },
}
</script>

<style scoped></style>
