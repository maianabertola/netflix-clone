<template>
    <section>
        <div
            class="w-full h-[100vh] pt-[3vh]"
            :style="{
                'background-image':
                    'linear-gradient(rgb(0 0 0 / 83%), rgb(18 17 17 / 50%)),url(https://files.natixis.sbcdnsb.com/images/iFgRxe8MTtGHJmoianoj3A/content/1643367631/1371098/600/mosaique.png)',
            }"
        >
            <div class="text-center w-12/12 m-auto p-10">
                <h2>Good news,</h2>
                <p>
                    You've successfully completed the first step in creating your account.

                    <br />
                    Feel free to close this tab and continue with the next steps.
                </p>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
export default {
    name: 'ConfirmationView',
    data() {
        return {}
    },
    methods: {},
}
</script>

<style scoped></style>
