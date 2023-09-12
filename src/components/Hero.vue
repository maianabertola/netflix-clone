<template>
    <div>
        <img />
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Hero',
    data() {
        return {
            moviesData: null,
        }
    },
    methods: {},
    mounted() {
        try {
            const data = axios.get('https://api.themoviedb.org/3/account/20418726/lists?page=1')
            this.moviesData = res.data
            console.log('movies', moviesData)
        } catch (error) {
            console.log(error)
        }
    },
}
</script>

<style scoped></style>
