<script>
import {
  Building2, Factory, ShoppingBag, Hotel, MapPin,
  Gauge, ArrowRight, Loader2, AlertCircle
} from 'lucide-vue-next'
import apiClient from '@/api/axios'

export default {
  name: 'Projects',
  components: {
    Building2, Factory, ShoppingBag, Hotel, MapPin,
    Gauge, ArrowRight, Loader2, AlertCircle
  },

  data() {
    return {
      baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
      projects: [],
      isLoading: false,
      fetchError: null
    }
  },

  async mounted() {
    await this.fetchProjects()
  },

  methods: {
    async fetchProjects() {
      try {
        this.isLoading = true
        this.fetchError = null
        
        const response = await apiClient.get('/api/public/projects', {
          params: {
            page: 1,
            limit: 4 // Hanya 4 untuk homepage
          }
        })
        
        if (response.data.meta.success) {
          this.projects = response.data.data.map(project => ({
            uuid: project.uuid,
            title: project.project_name,
            category: project.category?.name || 'Umum',
            categorySlug: project.category?.slug || 'umum',
            location: project.location,
            image: project.image 
              ? `${this.baseURL}/${project.image}` 
              : 'https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=800'
          }))
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
        this.fetchError = 'Gagal memuat data proyek'
        this.projects = []
      } finally {
        this.isLoading = false
      }
    },

    getCategoryIcon(categorySlug) {
      const icons = {
        // 'perbaikan': Factory,
        'instalasi': Building2,
        'penyewaan': ShoppingBag,
        'maintenance': Gauge,
        'default': Factory
      }
      return icons[categorySlug] || icons['default']
    }
  }
}
</script>

<template>
  <section id="proyek" class="py-12 sm:py-24 bg-white overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="text-center mb-10 sm:mb-16 relative">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10"></div>
        <h2 class="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4 tracking-tight">
          Rekam Jejak <span class="text-blue-600">Proyek Kami</span>
        </h2>
        <p class="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
          Kepercayaan industri yang telah kami bangun melalui hasil kerja berkualitas.
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <div class="text-center">
          <Loader2 class="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p class="text-gray-500 font-medium">Memuat proyek...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="fetchError" class="flex justify-center items-center py-20">
        <div class="text-center bg-red-50 border border-red-200 rounded-xl p-8 max-w-md">
          <AlertCircle class="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 class="text-lg font-bold text-red-900 mb-2">{{ fetchError }}</h3>
          <button 
            @click="fetchProjects" 
            class="mt-4 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="projects.length === 0" class="flex justify-center items-center py-20">
        <div class="text-center">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Factory class="w-8 h-8 text-gray-400" />
          </div>
          <h3 class="text-lg font-semibold text-gray-700">Belum Ada Proyek</h3>
          <p class="text-gray-500 text-sm mt-2">Proyek akan segera ditampilkan</p>
        </div>
      </div>

      <!-- Projects Grid -->
      <div v-else class="relative mb-12">
        <transition-group 
            tag="div" 
            class="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
            enter-active-class="transition duration-500 ease-out"
            enter-from-class="opacity-0 translate-y-8"
            enter-to-class="opacity-100 translate-y-0"
        >
          <div
            v-for="(project, index) in projects"
            :key="project.uuid"
            class="group bg-white rounded-2xl overflow-hidden shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
          >
            <div class="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                onerror="this.src='https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=800'"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
              
              <!-- Category Badge -->
              <div class="absolute top-3 left-3">
                <span class="bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
                  {{ project.category }}
                </span>
              </div>
            </div>

            <div class="p-4 sm:p-5 flex flex-col flex-grow bg-white relative z-20">
              <h3 class="font-bold text-[16px] sm:text-[17px] mb-4 leading-snug text-gray-900 line-clamp-2 transition-colors group-hover:text-blue-600">
                {{ project.title }}
              </h3>

              <div class="space-y-2.5 mb-0 flex-grow">
                <div class="flex items-center justify-between text-[11px] sm:text-xs border-b border-gray-50 pb-2 last:border-0">
                  <!-- <span class="text-gray-500 flex items-center gap-1.5">
                    <component :is="getCategoryIcon(project.categorySlug)" size="13" class="text-blue-400 font-medium"/>
                    Kategori
                  </span> -->
                  <!-- <span class="font-bold text-gray-700 text-right ml-2 capitalize">{{ project.category }}</span> -->
                </div>
                <div class="flex items-center justify-between text-[11px] sm:text-xs border-b border-gray-50 pb-2 last:border-0">
                  <span class="text-gray-500 flex items-center gap-1.5">
                    <MapPin size="13" class="text-red-400 font-medium"/>
                    Lokasi
                  </span>
                  <span class="font-bold text-gray-700 text-right ml-2">{{ project.location }}</span>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>

      <!-- View All Button -->
      <div v-if="projects.length > 0" class="mt-8 sm:mt-10 flex flex-col items-center justify-center">
        <router-link 
          to="/projects" 
          class="group inline-flex items-center gap-2 text-base font-bold text-gray-500 transition-colors hover:text-blue-600"
        >
          <span class="relative">
            Lihat Proyek Lengkap
            <span class="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </span>
          <ArrowRight size="18" class="transition-transform duration-300 group-hover:translate-x-1"/>
        </router-link>
      </div>
    </div>
  </section>
</template>
