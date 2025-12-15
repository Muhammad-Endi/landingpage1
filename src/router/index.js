import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import CatalogView from '../views/CatalogView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ContactView from '../views/ContactView.vue'
import ProductDetailView from '../views/ProductDetailView.vue' // Import Baru
import TrackingView from '../views/TrackingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: CatalogView,
    },
    {
      // Route baru untuk detail produk
      path: '/catalog/:id',
      name: 'product-detail',
      component: ProductDetailView,
    },
    {
    path: '/tracking',
    name: 'tracking',
    component: TrackingView
  },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
  ],
  // Agar saat pindah halaman scroll otomatis ke paling atas
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router