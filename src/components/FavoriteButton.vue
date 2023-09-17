<template>
    <button
        type="button"
        role="link"
        class="py-2 px-6 bg-gradient-to-t from-red-500 to-red-800 rounded text-white tracking-widest font-semibold text-xl cursor-pointer opacity-90 hover:opacity-100"
        @click="handleClick"
    >
        {{ cta }}
    </button>
</template>

<script lang="ts">
import { useFavoriteStore } from '@/stores/favoriteMovies'
export default {
    name: 'FavoriteButton',
    setup() {
        const favoriteStore = useFavoriteStore()

        const addFavorite = (movieId: Number, mediaType: String) => {
            favoriteStore.addFavorite(movieId, mediaType)
        }

        const deleteFavorite = (movieId: Number, mediaType: String) => {
            favoriteStore.deleteFavorite(movieId, mediaType)
        }

        return {
            addFavorite,
            deleteFavorite,
        }
    },
    data() {
        return {
            isClicked: false,
        }
    },
    methods: {
        handleClick() {
            this.$emit('click')

            if (this.isClicked === false) {
                this.addFavorite(this.movieId, this.mediaType)
                console.log('movieId', this.movieId, 'media type', this.mediaType)

                console.log("It's been addded!")
                this.isClicked = true
            } else {
                this.deleteFavorite(this.movieId, this.mediaType)
                console.log("It's been removed!")
                this.isClicked = false
            }
        },
    },
    props: {
        movieId: {
            type: Number,
            required: true,
        },
        mediaType: {
            type: String,
            required: true,
        },
        cta: {
            type: String,
            required: true,
        },
    },
}
</script>

<style scoped></style>
