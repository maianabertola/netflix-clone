<template>
    <button
        type="button"
        role="link"
        class="py-2 px-6 bg-slate-300 rounded text-black tracking-widest font-semibold text-xl cursor-pointer opacity-90 hover:opacity-100 shadow-xl"
        @click="handleClick"
    >
        {{ cta }}
    </button>
</template>

<script lang="ts">
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
