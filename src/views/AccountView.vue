<template>
    <section class="max-h-screen">
        <div class="titleSection">
            <div class="grid grid-cols-4 grid-row-4 w-full items-end mb-5">
                <div class="col-span-2 row-span-4">
                    <h1>Account</h1>
                </div>
                <div class="border"></div>
                <div v-if="isConnected" class="mb-5">
                    <div><p class="italic text-5xl">You are logged in</p></div>
                    <div><p>These are your account information</p></div>
                    <div>
                        <p>
                            Account id: <span> {{ accountId }}</span>
                        </p>
                    </div>
                    <MyButton cta="Log out" @click="() => this.logOut()"></MyButton>
                </div>
                <div v-if="!isConnected && !requestToken" class="mb-5">
                    <div><p class="italic text-5xl">Create an account</p></div>
                    <div>
                        <p>
                            If you want to keep a digital list of your favorite movies that's accessible from anywhere,
                            you can create an account
                        </p>
                        <div>
                            <p>First, give our TMDB partner your consent</p>
                        </div>
                    </div>
                    <MyButton cta="Create account" @click="() => this.createToken()"></MyButton>
                </div>
                <div v-if="!isConnected && requestToken && !accountId">
                    <div><p class="italic text-5xl">One last step</p></div>
                    <div>
                        <p>The first step to create your account is done!</p>
                        <div>
                            <p>You now have to validate your account creation.</p>
                        </div>
                    </div>
                    <MyButton cta="Confirm creation" @click="() => this.getAccessToken()"></MyButton>
                </div>
            </div>
        </div>
        <div>
            <img src="../assets/pictures/pexels-ellie-burgin-4057890.jpg" />
        </div>
    </section>
</template>

<script lang="ts">
import { useAuthStore } from '../stores/authStore'
import { storeToRefs } from 'pinia'
import MyButton from '@/components/MyButton.vue'
import { onMounted } from 'vue'

export default {
    name: 'Account',
    setup() {
        const authStore = useAuthStore()
        const { token, accessToken, requestToken, accountId, isConnected } = storeToRefs(authStore)

        const createToken = () => {
            authStore.createToken()
        }
        const getAccessToken = () => {
            authStore.getAccessToken()
        }

        const logOut = () => {
            authStore.logOut()
        }

        onMounted(() => {
            authStore.userConnected()
        })

        return {
            token,
            createToken,
            requestToken,
            accountId,
            getAccessToken,
            accessToken,
            isConnected,
            logOut,
        }
    },
    data() {
        return {}
    },
    methods: {},
    watch: {
        // requestToken(newValue) {
        //     console.log('HERE IN WATCH')
        //     if (newValue) {
        //         this.getAccessToken()
        //     }
        // },
    },
    components: {
        MyButton,
    },
}
</script>

<style scoped></style>
