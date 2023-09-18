<template>
    <div class="scale-100 hover:drop-shadow-2xl">
        <RouterLink :to="`/movie-details/${movieId}`">
            <div
                class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 hover:border-2 border-red-700"
            >
                <img :alt="title" :src="moviePoster" />
            </div>
        </RouterLink>
        <div class="flex flex-row justify-between content-center py-3 px-1">
            <!-- <h3>{{ title }}</h3> -->
            <Rating :rating="rating"></Rating>
            <FavoriteIcon :movieId="movieId" :mediaType="mediaType"></FavoriteIcon>
        </div>
    </div>
</template>

<script lang="ts">
import FavoriteIcon from './icons/FavoriteIcon.vue'
import Rating from './Rating.vue'

export default {
    name: 'MovieCard',
    data() {
        return {}
    },
    methods: {},
    components: {
        FavoriteIcon,
        Rating,
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        moviePosterPath: {
            type: String,
            required: true,
        },
        movieId: {
            type: Number,
            required: true,
        },
        mediaType: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
    },
    computed: {
        moviePoster() {
            const rootPath = 'https://image.tmdb.org/t/p/original/'
            return rootPath + this.moviePosterPath
        },
    },
}
</script>

<style scoped></style>
