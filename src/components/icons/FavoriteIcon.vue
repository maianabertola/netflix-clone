<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 hover:scale-75 transition ease-in-out cursor-pointer active:fill-red-500"
        @click="handleClick"
        :style="{ fill: isClicked ? 'red' : 'initial' }"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
    </svg>
</template>

<script lang="ts">
import { useFavoriteStore } from '@/stores/favoriteMovies'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'

export default {
    name: 'FavoriteIcon',
    setup() {
        const favoriteStore = useFavoriteStore()
        const authStore = useAuthStore()

        const { accessToken } = storeToRefs(authStore)

        const { favoriteMovies } = storeToRefs(favoriteStore)

        const addFavorite = (movieId: Number) => {
            favoriteStore.addFavorite(movieId)
        }

        const deleteFavorite = (movieId: Number) => {
            favoriteStore.deleteFavorite(movieId)
        }

        return {
            addFavorite,
            deleteFavorite,
            accessToken,
            favoriteMovies,
        }
    },
    data() {
        return {
            isClicked: false,
        }
    },
    created() {
        this.checkFavorite()
    },
    methods: {
        handleClick() {
            this.$emit('click')

            if (this.isClicked === false) {
                this.addFavorite(this.movieId)
                this.isClicked = true
            } else {
                this.deleteFavorite(this.movieId)
                this.isClicked = false
            }
        },

        checkFavorite() {
            this.favoriteMovies.map((favoriteMovie) => {
                if (favoriteMovie.id === this.movieId) {
                    this.isClicked = true
                }
            })
        },
    },
    props: {
        movieId: {
            type: Number,
            required: true,
        },
    },
}
</script>

<style scoped></style>
