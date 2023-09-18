<template>
    <section class="h-screen">
        <div class="grid grid-cols-4 grid-row-4 w-full items-end mb-5">
            <div class="col-span-2 row-span-4">
                <h1>Account</h1>
            </div>
            <div class="border"></div>

            <div v-if="!isConnected && !requestToken" class="mb-5">
                <div><p class="italic text-5xl">Create an account</p></div>
                <div>
                    <p>
                        If you want to keep a digital list of your favorite movies that's accessible from anywhere, you
                        can create an account
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
            <div v-if="isConnected && !isLoggedOut" class="mb-5">
                <div>
                    <div><p class="italic text-5xl">You are logged in</p></div>
                    <div><p>These are your account information</p></div>
                    <div>
                        <p>
                            Account id: <span> {{ accountId }}</span>
                        </p>
                    </div>
                    <div class="flex flex-col gap-5">
                        <FavoriteButton cta="Create a favorite list" @click="() => navToFavorite()"></FavoriteButton>
                        <MyButton cta="Log out" @click="() => this.logOut()"></MyButton>
                    </div>
                </div>
            </div>
            <div v-if="isLoggedOut && isConnected">
                <div><p class="italic text-5xl">You have been logged out</p></div>
                <div><p>This page will automatically refresh.</p></div>
            </div>
        </div>

        <div class="overflow-hidden">
            <img src="../assets/pictures/pexels-ellie-burgin-4057890.jpg" />
        </div>
    </section>
</template>

<script lang="ts">
import { useAuthStore } from '../stores/authStore'
import { storeToRefs } from 'pinia'
import MyButton from '@/components/MyButton.vue'
import { onMounted } from 'vue'
import FavoriteButton from '@/components/FavoriteButton.vue'

export default {
    name: 'Account',
    setup() {
        const authStore = useAuthStore()
        const { token, accessToken, requestToken, accountId, isConnected, isLoggedOut } = storeToRefs(authStore)

        const createToken = () => {
            authStore.createToken()
        }
        const getAccessToken = () => {
            authStore.getAccessToken()
        }

        const logOut = () => {
            authStore.logOut()
        }

        const userConnected = () => {
            authStore.userConnected()
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
            userConnected,
            isLoggedOut,
        }
    },
    data() {
        return {}
    },
    methods: {
        navToFavorite() {
            this.$emit('click')
            this.$router.push(`/favorite-movies`)
        },
    },
    watch: {
        accessToken(newValue) {
            console.log('user is connected or not', newValue)
            this.userConnected()
        },
        isLoggedOut: {
            handler(newValue) {
                if (newValue == true) {
                    setTimeout(() => {
                        this.isLoggedOut = false
                        this.isConnected = false
                        this.userConnected()
                    }, 5000) // after 5 seconds
                }
            },
            immediate: true,
        },
    },
    components: {
        MyButton,
        FavoriteButton,
    },
}
</script>

<style scoped></style>