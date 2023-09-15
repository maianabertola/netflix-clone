<template>
    <div>
        <RouterLink to="/">
            <div
                class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
            >
                <img
                    :alt="title"
                    :src="moviePoster"
                    class="h-full w-full object-cover object-center group-hover:opacity-75"
                />
            </div>
        </RouterLink>
        <div class="flex flex-row justify-between content-center py-3 px-1">
            <h3>{{ title }}</h3>
            <FavoriteIcon></FavoriteIcon>
        </div>
    </div>
</template>

<script lang="ts">
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
