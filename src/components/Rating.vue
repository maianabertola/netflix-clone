<template>
    <div class="bg-amber-500 px-3 rounded">{{ rating }}</div>
</template>

<script lang="ts">
export default {
    name: 'Rating',
    data() {
        return {}
    },
    methods: {},
    props: {
        rating: {
            type: Number,
            required: false,
        },
    },
}
</script>

<style scoped></style>
