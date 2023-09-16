import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieDetails from '../views/MovieDetails.vue'
import FavoriteView from '../views/FavoriteView.vue'
import AllMovies from '../views/AllMovies.vue'
import Confirmation from '../views/ConfirmationView.vue'

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
            path: '/token-created',
            name: 'token created',
            component: Confirmation,
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue'),
        },
    ],
})

export default router
