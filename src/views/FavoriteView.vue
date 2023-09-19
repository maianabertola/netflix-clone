<template>
    <section>
        <div class="titleSection">
            <h1>Favorite Movies</h1>
            <hr />
        </div>
        <div v-if="!isConnected">
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
                    <MyButton cta="Create an account" @click="() => navToAccount"></MyButton>
                </div>
            </div>
        </div>

        <div v-if="isConnected && !movieListId" class="grid grid-cols-4 items-center">
            <div>
                <p>
                    Dear user, <br />
                    It seems you haven't created a favorite movies list yet! Please create one to save and access your
                    favorite films without any hassle.
                </p>
            </div>
            <div class="border"></div>
            <form @submit.prevent="createList" class="col-span-2 grid">
                <div class="grid-rows-6 cols-2">
                    <h3 class="col-span-2">Fullfill this form to</h3>
                    <p class="text-7xl font-semibold italic">Create your favorite list</p>
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
                    <MyButton cta="Create list" type="submit"></MyButton>
                </div>
            </form>
        </div>

        <div v-if="isConnected && movieListId">
            <div v-if="!favoriteMovies.length">
                <p>Your list is empty. <RouterLink to="/all-movies">Discover our movies to add them.</RouterLink></p>
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

            // console.log('MOVIE LIST ID IN MOUNTED', movieListId.value)

            // if (movieListId !== null) {
            //     console.log('FETCHING IN MOUNTED')
            //     favoriteStore.fetchFavorite()
            //     console.log('fav movies in mounted', favoriteMovies)
            // }
            // console.log('MOVIE LIST ID IN MOUNTED', movieListId.value)
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
                console.log(this.movieListId)
            } catch (error) {
                console.log(error)
            }
        },
        navToAccount() {
            console.log('in nav')
            this.$emit('click')
            this.$router.push(`/account`)
        },
    },
    computed: {
        // favoriteMoviesLength() {
        //     return this.favoriteMovies.length
        // },
    },
    watch: {
        movieListId(newValue) {
            if (newValue) {
                this.fetchFavorite()
            }
        },

        // favoriteMovies: {
        //     deep: true,
        //     handler(newValue, oldValue) {
        //         console.log('I AM IN THE WATCHER', newValue)
        //         this.fetchFavorite()
        //     },
        // },
    },

    components: {
        MyButton,
        MovieCard,
    },
}
</script>

<style scoped></style>
