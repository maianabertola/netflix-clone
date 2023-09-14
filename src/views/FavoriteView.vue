<template>
    <div v-if="!userID">
        <h1>Favorite Movies</h1>
        <h2>Welcome,</h2>
        <h3>In this page you can create your favorite movies list</h3>
        <p>To do so, you have to register first</p>
        <MyButton cta="Yes" @click="() => this.createSession(this.token.value)"></MyButton>
    </div>
    <div v-if="userID">{{ userID }}</div>
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
        const { favoriteMovies, isLoading, error, token, userID } = storeToRefs(favoriteStore)
        onMounted(() => {
            favoriteStore.fetchFavorite()
            favoriteStore.createToken()
            token
        })

        const createSession = () => {
            favoriteStore.createSession(token.value)
        }

        return {
            favoriteMovies,
            isLoading,
            error,
            createSession,
            token,
            userID,
        }
    },
    data() {
        return {}
    },
    async created() {
        await this.retrieveUserID()
    },
    methods: {
        retrieveUserID() {
            this.userID = localStorage.getItem('userID')
        },
    },
    components: {
        MyButton,
    },
}
</script>

<style scoped></style>
