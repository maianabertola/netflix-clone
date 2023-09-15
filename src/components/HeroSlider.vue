<template>
    <div class="grid grid-cols-4 grid-rows-1 h-[80vh] bg-black">
        <div class="relative top-10 left-10 p-50 max-w-[85%] col-span-2">
            <h1>Must see</h1>
            <div class="bg-neutral-500/50 p-5 rounded">
                <h2>{{ title }}</h2>
                <p>{{ description }}</p>
                <div class="flex flex-row gap-4">
                    <MyButton cta="More info" @click="() => navToMovieDetails(id)"></MyButton>
                    <MyButton cta="Add to your favorite"></MyButton>
                </div>
            </div>
        </div>
        <div class="col-start-3 col-span-2">
            <img :src="moviePoster" class="block w-full h-full object-scale-down" :alt="title" />
        </div>
    </div>
</template>

<script lang="ts">
import MyButton from './MyButton.vue'

export default {
    name: 'HeroSlider',
    data() {
        return {}
    },
    methods: {
        navToMovieDetails(id: Number) {
            this.$emit('click')
            this.$router.push(`/movie-details/${id}`)
        },
    },
    components: {
        MyButton,
    },
    computed: {
        moviePoster() {
            if (this.posterPath) {
                const rootPath = 'https://image.tmdb.org/t/p/original/'
                return rootPath + this.posterPath
            } else {
                return null
            }
        },
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        posterPath: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        id: {
            type: Number,
            required: true,
        },
    },
}
</script>

<style scoped></style>
