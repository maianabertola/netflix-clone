<template>
    <section>
        <div v-if="!isConnected && !requestToken">
            <div
                class="w-full h-[100vh] pt-[3vh]"
                :style="{
                    'background-image':
                        'linear-gradient(rgb(0 0 0 / 83%), rgb(18 17 17 / 50%)),url(https://files.natixis.sbcdnsb.com/images/iFgRxe8MTtGHJmoianoj3A/content/1643367631/1371098/600/mosaique.png)',
                }"
            >
                <div class="text-center m-width-500 m-auto p-10">
                    <h2>Looking to save your favorite movies?</h2>
                    <p>
                        If you want to keep a digital list of your favorite movies that's accessible from anywhere, you
                        can create an account. <br />
                        To do so, you need to register first and agree to share data with our partner, TMDB.
                    </p>
                    <!-- When clicking, it fires the function createSession -->
                    <MyButton cta="Create account" @click="() => this.createToken()"></MyButton>
                </div>
            </div>
        </div>

        <div v-if="requestToken && !accountId">
            <div class="titleSection">
                <h1>Favorite Movies</h1>
                <hr />
            </div>
            <div class="text-center m-width-500 m-auto p-10">
                <h2>One last step,</h2>
                <p>
                    The first step to create your account is done!
                    <br />
                    You now have to validate your account creation.
                </p>
                <MyButton cta="Confirm creation" @click="() => this.getAccessToken()"></MyButton>
            </div>
        </div>

        <div v-if="isConnected">
            <div class="titleSection">
                <h1>Favorite Movies</h1>
                <hr />
            </div>
            <div class="flex flex-row justify-between">
                <h3>Acound Id: {{ accountId }}</h3>
            </div>
            <div v-if="!movieListId">
                <form @submit.prevent="createList">
                    <div>
                        <label>List name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            v-model="nameList"
                            placeholder="Name your list of favorite movies"
                            class="text-black"
                        />
                        {{ nameList }}
                    </div>
                    <div>
                        <label>Description</label>
                        <input
                            id="description"
                            type="textaera"
                            name="description"
                            v-model="description"
                            placeholder="Few words about your list"
                            class="text-black"
                        />
                        {{ description }}
                    </div>
                    <div>
                        <label
                            >Private List
                            <input
                                id="privateList"
                                type="checkbox"
                                name="privateList"
                                v-model="privateList"
                                placeholder="Few words about your list"
                            />
                        </label>
                        {{ privateList }}
                    </div>
                    <button type="submit" class="btn btn-primary">Click me</button>
                </form>
            </div>
            <div v-if="movieListId">
                <MyButton cta="click to fetch" @click="() => this.fetchFavorite()"></MyButton>

                <div v-if="!favoriteMovies.length">
                    <p>
                        Your list is empty. <RouterLink to="/all-movies">Discover our movies to add them.</RouterLink>
                    </p>
                </div>
                <div v-if="favoriteMovies.length > 1">
                    <div class="grid grid-cols-4 grid-rows-3 gap-3" v-if="favoriteMovies">
                        <MovieCard
                            v-for="movie in favoriteMovies"
                            :key="movie.id"
                            :title="movie.original_title"
                            :moviePosterPath="movie.poster_path"
                            :rating="movie.vote_average"
                            :movieId="movie.id"
                            :mediaType="moviesType"
                        />
                    </div>
                </div>
            </div>
        </div>

        <!-- <MyButton cta="Create session" @click="() => this.createSession()"></MyButton>> -->
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
        const { token, accessToken, requestToken, accountId, isConnected } = storeToRefs(authStore)

        //declare createApprovedToken() from the store to link it to the button
        const createToken = () => {
            authStore.createToken()
        }
        const getAccessToken = () => {
            favoriteStore.getAccessToken()
        }

        const fetchFavorite = () => {
            favoriteStore.fetchFavorite()
        }

        onMounted(() => {
            authStore.userConnected()
        })

        return {
            favoriteMovies,
            isLoadingFetchFavorite,
            errorFetchFavorite,
            token,
            createToken,
            requestToken,
            accountId,
            getAccessToken,
            fetchFavorite,
            accessToken,
            isConnected,
            movieListId,
        }
    },
    data() {
        return {
            nameList: '',
            description: '',
            privateList: false,
        }
    },
    async created() {},
    methods: {
        async createList() {
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
                            Authorization: 'Bearer ' + this.accessToken,
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
    },
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
