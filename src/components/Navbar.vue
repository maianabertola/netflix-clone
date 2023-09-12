<template>
    <nav class="w-full sticky top-0 p-5">
        <div class="flex justify-between">
            <div>
                <img src="../assets/logo.png" alt="netflix logo" />
            </div>
            <ul class="flex flex-row gap-10 content-center items-center">
                <RouterLink to="/"><li>Homepage</li></RouterLink>
                <RouterLink to="/"> <li>Movies</li></RouterLink>
                <RouterLink to="/"> <li>Favorite</li></RouterLink>
                <RouterLink to="/"> <li>About</li></RouterLink>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    data() {
        return {}
    },
    methods: {},
}
</script>

<style scoped></style>
