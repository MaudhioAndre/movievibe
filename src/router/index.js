import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home | movievibe by Maudhio Andre Wijaya',
        description: 'Homepage',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/movie-detail/:id',
      name: 'movie-detail',
      component: () => import('../views/MovieDetail.vue'),
      meta: {
        title: 'Movie Detail | movievibe by Maudhio Andre Wijaya',
        description: 'Movie Detail',
      },
    },

    {
      path: '/search/:movieName/:page',
      name: 'movie-search',
      component: () => import('../views/MovieList.vue'),
      props: (route) => ({
        endpoint: `/Movie?Content=${route.params.movieName}&Page=${route.params.page}&Language=en-US&Adult=true`,
        pageTitle: `Search Result for "${route.params.movieName}"`,
      }),
      meta: {
        title: 'Search Movie | movievibe by Maudhio Andre Wijaya',
        description: 'Movie Detail',
      },
    },
    {
      path: '/top-rated/:page',
      name: 'top-rated',
      component: () => import('../views/MovieList.vue'),
      props: (route) => ({
        endpoint: `/Movie/TopRated?Page=${route.params.page}&Language=en-US&Adult=true`,
        pageTitle: `Top Rated Movies`,
      }),
      meta: {
        title: 'Top Rated Movies | movievibe by Maudhio Andre Wijaya',
        description: 'Top Rated Movies',
      },
    },
    {
      path: '/popular/:page',
      name: 'popular',
      component: () => import('../views/MovieList.vue'),
      props: (route) => ({
        endpoint: `/Movie/Popular?Page=${route.params.page}&Language=en-US&Adult=true`,
        pageTitle: `Popular Movies`,
      }),
      meta: {
        title: 'Popular Movies | movievibe by Maudhio Andre Wijaya',
        description: 'Popular Movies',
      },
    },
    {
      path: '/recommendation/:page',
      name: 'recommendation',
      component: () => import('../views/MovieList.vue'),
      props: (route) => ({
        endpoint: `/Movie/Recommendation?Page=${route.params.page}&Language=en-US&ItemId=812`,
        pageTitle: `Recommendation Movies`,
      }),
      meta: {
        title: 'Recommendation Movie | movievibe by Maudhio Andre Wijaya',
        description: 'Recommendation Movie',
      },
    },

    {
      path: '/genre/:genre',
      name: 'genre',
      component: () => import('../views/MovieByGenre.vue'),
      props: (route) => ({
        endpoint: `search?rows=100&genre=${route.params.genre}`,
        pageTitle: `${route.params.genre} Movie`,
      }),
      meta: {
        title: 'Movie | movievibe by Maudhio Andre Wijaya',
        description: 'Movie genre',
      },
    },
  ],
})

router.afterEach((to) => {
  document.title = to.meta.title || 'Judul Default Website'
  const descriptionMeta = document.querySelector('meta[name="description"]')
  if (descriptionMeta) {
    descriptionMeta.setAttribute('content', to.meta.description || 'Deskripsi Default Website.')
  } else {
    const meta = document.createElement('meta')
    meta.setAttribute('name', 'description')
    meta.setAttribute('content', to.meta.description || 'Deskripsi Default Website.')
    document.head.appendChild(meta)
  }
})

export default router
