<template>
    <a href="#" class="group">
        <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <FavoriteIcon></FavoriteIcon>
            <img
                v-bind:alt="title"
                v-bind:src="moviePoster"
                class="h-full w-full object-cover object-center group-hover:opacity-75"
            />
        </div>
        <h3 class="mt-4 text-sm">{{ title }}</h3>
    </a>
</template>

<script>
import FavoriteIcon from './icons/FavoriteIcon.vue'

export default {
    name: '',
    data() {
        return {}
    },
    methods: {},
    components: {
        FavoriteIcon,
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
