<template>
    <div class="relative">
        <nav class="w-full fixed top-0 left-0 right-0 p-5 z-100" :class="{ changeBackground: scrollPosition > 50 }">
            <div class="flex justify-between">
                <div>
                    <RouterLink to="/"><img src="../assets/logo.png" alt="Netflix logo" /></RouterLink>
                </div>
                <ul class="flex flex-row gap-10 content-center items-center">
                    <RouterLink to="/"><li>Homepage</li></RouterLink>
                    <RouterLink to="/all-movies"> <li>Movies</li></RouterLink>
                    <RouterLink to="/favorite-movies"> <li>Favorite</li></RouterLink>
                    <RouterLink to="/about"> <li>About</li></RouterLink>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Navbar',
    data() {
        return {
            scrollPosition: null,
        }
    },
    methods: {
        updateScroll() {
            this.scrollPosition = window.scrollY
        },
    },
    mounted() {
        window.addEventListener('scroll', this.updateScroll)
    },
}
</script>

<style scoped>
.changeBackground {
    background-color: hsla(0, 3%, 13%, 0.418);
}
</style>
