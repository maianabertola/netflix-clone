<template>
    <button
        type="button"
        role="link"
        class="py-2 px-6 bg-red-700 rounded hover:bg-opacity-80 cursor-pointer"
        @click="handleClick"
    >
        {{ cta }}
    </button>
</template>

<script>
export default {
    name: 'MyButton',
    data() {
        return {}
    },
    methods: {
        handleClick() {
            this.$emit('click')
        },
    },
    props: {
        cta: {
            type: String,
            required: true,
        },
    },
}
</script>

<style scoped></style>
