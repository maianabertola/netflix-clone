import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieDetails from '../views/MovieDetails.vue'
import FavoriteView from '../views/FavoriteView.vue'
import AllMovies from '../views/AllMovies.vue'
import Confirmation from '../views/ConfirmationView.vue'
import Account from '@/views/Accountview.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/movie-details/:id',
            name: 'movie details',
            component: MovieDetails,
        },
        {
            path: '/favorite-movies',
            name: 'favorite movie',
            component: FavoriteView,
        },
        {
            path: '/all-movies',
            name: 'all movies',
            component: AllMovies,
        },
        {
            path: '/account',
            name: 'account',
            component: Account,
        },
        {
            path: '/token-created',
            name: 'token created',
            component: Confirmation,
        },
    ],
})

export default router
