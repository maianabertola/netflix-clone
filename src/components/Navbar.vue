<template>
    <div class="relative">
        <!-- Navbar desktop -->
        <nav
            class="fixed top-0 left-0 right-0 py-5 px-[4vw] z-50 hidden lg:block"
            :class="{ changeBackground: scrollPosition > 50 }"
        >
            <div class="flex justify-between">
                <div>
                    <RouterLink to="/"><img src="../assets/logo.png" alt="Netflix logo" /></RouterLink>
                </div>
                <ul class="flex flex-row gap-10 content-center items-center">
                    <RouterLink to="/"><li>Homepage</li></RouterLink>
                    <RouterLink to="/all-movies"> <li>Movies</li></RouterLink>
                    <RouterLink to="/favorite-movies"> <li>Favorite</li></RouterLink>
                    <RouterLink to="/account"><li>Account</li></RouterLink>
                </ul>
            </div>
        </nav>
        <!-- Mobile desktop -->

        <nav class="fixed top-0 left-0 right-0 py-5 px-[4vw] z-50 lg:hidden">
            <ul class="flex flex-row gap-10 content-center items-center w-full">
                <RouterLink to="/"><li>Homepage</li></RouterLink>
                <RouterLink to="/all-movies"> <li>Movies</li></RouterLink>
                <RouterLink to="/favorite-movies"> <li>Favorite</li></RouterLink>
                <RouterLink to="/account"><li>Account</li></RouterLink>
            </ul>
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
