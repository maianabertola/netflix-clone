<template>
    <div
        class="p-3 rounded border-2 border-red-700 cursor-pointer text-center"
        :class="{ active: isActive }"
        @click="handleClick"
    >
        {{ category }}
    </div>
</template>

<script>
export default {
    name: 'CategoryTab',
    data() {
        return {}
    },
    methods: {
        handleClick() {
            this.$emit('click')
        },
    },
    props: {
        category: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
            required: true,
        },
    },
}
</script>

<style scoped>
.active {
    background-color: red;
}
</style>
