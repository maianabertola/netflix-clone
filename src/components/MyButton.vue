<template>
    <button type="button" role="link" class="py-1 px-5 bg-red-700 rounded hover:bg-opacity-80 cursor-pointer">
        {{ cta }}
    </button>
</template>

<script>
export default {
    name: 'MyButton',
    data() {
        return {}
    },
    methods: {},
    props: {
        cta: {
            type: String,
            required: true,
        },
    },
}
</script>

<style scoped></style>
