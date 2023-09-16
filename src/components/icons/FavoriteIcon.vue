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

export default {
    name: 'FavoriteIcon',
    setup() {
        const favoriteStore = useFavoriteStore()

        const addFavorite = () => {
            favoriteStore.addFavorite()
        }

        const deleteFavorite = () => {
            favoriteStore.deleteFavorite()
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
            this.isClicked = !this.isClicked

            if (this.isClicked === false) {
                this.addFavorite()
                console.log("It's been addded!")
            }

            if (this.isClicked === true) {
                this.deleteFavorite()
            }
        },
    },
}
</script>

<style scoped></style>
