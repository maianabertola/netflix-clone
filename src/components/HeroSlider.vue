<template>
    <div class="h-[100vh] lg:block hidden">
        <!-- Desktop hero image -->
        <div class="absolute top-0 left-0 -z-10 w-screen opacity-60 overflow-hidden hidden lg:block">
            <img :src="moviePoster" :alt="title" />
        </div>
        <!-- Desk text container -->
        <div class="flex flex-col relative top-20 left-10 p-50 max-w-[85%] col-span-2 w-5/12 hidden lg:block">
            <h1 class="mb-[1rem]">Must see</h1>
            <hr />
            <h2>
                {{ title }}
            </h2>
            <hr class="w-11/12" />
            <div class="w-10/12">
                <p>{{ description }}</p>
            </div>
            <div class="flex flex-row gap-4">
                <MyButton cta="Tell me more" @click="() => navToMovieDetails(id)"></MyButton>
                <FavoriteButton cta="Add to your favorite"></FavoriteButton>
            </div>
        </div>
    </div>

    <div class="h-[80vh] lg:hidden">
        <!-- Mobile hero image -->
        <div class="absolute top-0 left-0 -z-10 w-screen opacity-40 overflow-hidden lg:hidden">
            <img :src="moviePosterMobile" :alt="title" />
        </div>

        <!-- Responsive text container -->
        <div class="flex flex-col items-center relative top-20 left-10 p-50 max-w-[85%] col-span-2 w-8/12 lg:hidden">
            <h1 class="mb-[1rem]">Must see</h1>
            <hr />
            <h2>
                {{ title }}
            </h2>
            <hr class="w-11/12" />
            <div class="w-11/12">
                <p>{{ shortOverview }}</p>
            </div>
            <div class="flex flex-col gap-4">
                <MyButton cta="Tell me more" @click="() => navToMovieDetails(id)"></MyButton>
                <FavoriteButton cta="Add to your favorite"></FavoriteButton>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import MyButton from './MyButton.vue'
import FavoriteButton from './FavoriteButton.vue'

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
        FavoriteButton,
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
        moviePosterMobile() {
            if (this.mobilePosterPath) {
                const rootPath = 'https://image.tmdb.org/t/p/original/'
                return rootPath + this.mobilePosterPath
            } else {
                return null
            }
        },
        shortOverview() {
            if (this.description) {
                return this.description.slice(0, 180) + '...'
            }
            return ''
        },
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        posterPath: {
            type: String,
            required: false,
        },
        mobilePosterPath: {
            type: String,
            required: false,
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
