<template>
    <section>
        <div v-if="!requestToken">
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

        <div v-if="accountId">
            <div class="titleSection">
                <h1>Favorite Movies</h1>
                <hr />
            </div>
            <h3>Acound Id: {{ accountId }}</h3>
            <MyButton cta="Display your favorite movies" @click="() => this.fetchFavorite()"></MyButton>
            <div v-if="!favoriteMovies.length">
                Your list is empty. <RouterLink to="/all-movies">Discover our movies to add them.</RouterLink>
            </div>
            <div v-if="favoriteMovies.length > 1">This is your list {{ favoriteMovies }}</div>
        </div>

        <!-- <MyButton cta="Create session" @click="() => this.createSession()"></MyButton>> -->
    </section>
</template>

<script lang="ts">
import { useFavoriteStore } from '../stores/favoriteMovies.ts'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import MyButton from '../components/MyButton.vue'

export default {
    name: 'FavoriteView',
    setup() {
        const favoriteStore = useFavoriteStore()
        const { favoriteMovies, isLoadingFetchFavorite, errorFetchFavorite, token, requestToken, accountId } =
            storeToRefs(favoriteStore)

        // when the DOM is mounted, these lines of code will be executed
        onMounted(() => {})

        //declare createApprovedToken() from the store to link it to the button
        const createToken = () => {
            favoriteStore.createToken()
        }
        const getAccessToken = () => {
            favoriteStore.getAccessToken()
        }

        const fetchFavorite = () => {
            favoriteStore.fetchFavorite()
        }

        const createSession = () => {
            favoriteStore.createSession()
        }

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
            createSession,
        }
    },
    data() {
        return {}
    },
    async created() {},
    methods: {},
    components: {
        MyButton,
    },
}
</script>

<style scoped></style>
