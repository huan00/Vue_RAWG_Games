import { createWebHistory, createRouter } from 'vue-router'
import HomePage from './pages/HomePage'
import GameDetails from './pages/GameDetails'
import ViewGames from './pages/ViewGames'
import AboutPage from './pages/AboutPage'
import PlatformPage from './pages/PlatformPage.vue'
import PlatformDetail from './pages/PlatformDetail'

const routes = [
  { path: '/', component: HomePage, name: 'HomePage' },
  { path: '/games/:genre_id', component: ViewGames, name: 'ViewGames' },
  {
    path: '/details/:game_id',
    component: GameDetails,
    name: 'GameDetails'
  },
  { path: '/platform', component: PlatformPage, name: 'PlatformPage' },
  {
    path: '/platform/detail/:platform_id',
    component: PlatformDetail,
    name: 'PlatformDetail'
  },
  { path: '/about', component: AboutPage, name: 'AboutPage' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
