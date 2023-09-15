<template>
    <section>
        <div v-if="!approvedToken">
            <div class="titleSection">
                <h1>Favorite Movies</h1>
                <hr />
            </div>
            <div class="text-center m-width-500 m-auto">
                <h2>Looking to save your favorite movie?</h2>
                <p>
                    If you want to save your favorite movie in a digital list accessible from anywhere: you can create
                    an account. <br />
                    To do so, you have to register first and accepte to share data with our partenr TMDB.
                </p>
                <!-- When clicking, it fires the function createSession -->
                <MyButton cta="Create account" @click="() => this.createApprovedToken(this.token.value)"></MyButton>
            </div>
        </div>
        <div v-if="approvedToken">{{ approvedToken }}</div>
    </section>
</template>

<script lang="ts">
import axios from 'axios'
import { useFavoriteStore } from '../stores/favoriteMovies.ts'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import MyButton from '../components/MyButton.vue'

export default {
    name: 'FavoriteView',
    setup() {
        const favoriteStore = useFavoriteStore()
        const { favoriteMovies, isLoading, error, token, approvedToken, requestToken } = storeToRefs(favoriteStore)

        // when the DOM is mounted, these lines of code will be executed
        onMounted(() => {
            if (approvedToken) {
                favoriteStore.handleReturnedToken()
            } else {
                favoriteStore.createToken()
            }

            if (requestToken) {
                favoriteStore.fetchFavorite()
            }
        })

        //declare createApprovedToken() from the store to link it to the button
        const createApprovedToken = () => {
            favoriteStore.createApprovedToken(token.value)
        }

        return {
            favoriteMovies,
            isLoading,
            error,
            token,
            createApprovedToken,
            approvedToken,
            requestToken,
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
