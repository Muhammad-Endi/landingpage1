<script>
import {
  Building2, Factory, ShoppingBag, Hotel, MapPin,
  ChevronLeft, ChevronRight, Award, CheckCircle,
  Smile, Clock, Gauge, ArrowRight, Search, Filter,
  Wrench, Zap, MessageCircle, Phone, ChevronDown, Loader2, AlertCircle
} from 'lucide-vue-next'
import apiClient from '@/api/axios'

export default {
  name: 'Projects',

  components: {
    Building2, Factory, ShoppingBag, Hotel, MapPin,
    ChevronLeft, ChevronRight, Award, CheckCircle,
    Smile, Clock, Gauge, ArrowRight, Search, Filter,
    Wrench, Zap, MessageCircle, Phone, ChevronDown, Loader2, AlertCircle
  },

  data() {
    return {
      baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
      
      // Search & Filter
      searchQuery: '',
      selectedCategory: 'all', 
      isDropdownOpen: false, 
      
      // Pagination
      currentPage: 1,
      itemsPerPage: 8,
      totalProjects: 0,

      // Data
      projects: [],
      categories: [],
      
      // State
      isLoading: false,
      isFetchingCategories: false,
      fetchError: null
    }
  },

  async mounted() {
    document.addEventListener('click', this.handleClickOutside)
    await this.fetchCategories()
    await this.fetchProjects()
  },

  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },

  computed: {
    totalPages() {
      return Math.ceil(this.totalProjects / this.itemsPerPage)
    },

    searchResultText() {
      if (this.totalProjects === 0) return 'Tidak ada proyek ditemukan'
      const option = this.categories.find(opt => opt.slug === this.selectedCategory)
      const categoryLabel = option ? option.name.toLowerCase() : 'semua'
      return `${this.totalProjects} Proyek ${categoryLabel} ditemukan`
    },

    currentCategoryLabel() {
      if (this.selectedCategory === 'all') return 'Semua'
      const option = this.categories.find(opt => opt.slug === this.selectedCategory)
      return option ? option.name : 'Semua'
    },

    activeTheme() {
      if (this.selectedCategory === 'perbaikan') {
        return {
          btnActive: 'bg-orange-500 text-white shadow-orange-200 shadow-md border-orange-500',
          btnHover: 'hover:bg-orange-500 hover:text-white',
          titleHover: 'group-hover:text-orange-600',
          borderHover: 'hover:border-orange-300',
          navHover: 'hover:bg-orange-500 hover:text-white hover:border-orange-500',
          dropdownRing: 'focus:ring-orange-500 focus:border-orange-500'
        }
      } else if (this.selectedCategory === 'penyewaan') {
        return {
          btnActive: 'bg-indigo-500 text-white shadow-indigo-200 shadow-md border-indigo-500',
          btnHover: 'hover:bg-indigo-500 hover:text-white',
          titleHover: 'group-hover:text-indigo-600',
          borderHover: 'hover:border-indigo-300',
          navHover: 'hover:bg-indigo-500 hover:text-white hover:border-indigo-500',
          dropdownRing: 'focus:ring-indigo-500 focus:border-indigo-500'
        }
      } else if (this.selectedCategory === 'instalasi') {
        return {
          btnActive: 'bg-emerald-500 text-white shadow-emerald-200 shadow-md border-emerald-500',
          btnHover: 'hover:bg-emerald-500 hover:text-white',
          titleHover: 'group-hover:text-emerald-600',
          borderHover: 'hover:border-emerald-300',
          navHover: 'hover:bg-emerald-500 hover:text-white hover:border-emerald-500',
          dropdownRing: 'focus:ring-emerald-500 focus:border-emerald-500'
        }
      } else {
        return {
          btnActive: 'bg-blue-500 text-white shadow-blue-200 shadow-md border-blue-500',
          btnHover: 'hover:bg-[#1F64E1] hover:text-white',
          titleHover: 'group-hover:text-blue-600',
          borderHover: 'hover:border-blue-300',
          navHover: 'hover:bg-blue-500 hover:text-white hover:border-blue-500',
          dropdownRing: 'focus:ring-[#1F64E1] focus:border-[#1F64E1]'
        }
      }
    },

    // Dynamic category options with icons
    categoryOptions() {
      return this.categories.map(cat => ({
        value: cat.slug,
        label: cat.name,
        icon: this.getCategoryIcon(cat.slug)
      }))
    }
  },

  watch: {
    searchQuery() {
      this.currentPage = 1
      this.debounceFetchProjects()
    },
    selectedCategory() {
      this.currentPage = 1
      this.fetchProjects()
    },
    currentPage() {
      this.fetchProjects()
    }
  },

  methods: {
    // Fetch Categories
    async fetchCategories() {
      try {
        this.isFetchingCategories = true
        const response = await apiClient.get('/api/public/project-categories')
        
        if (response.data.meta.success) {
          this.categories = [
            { slug: 'all', name: 'Semua' },
            ...response.data.data
          ]
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
        this.categories = [
          { slug: 'all', name: 'Semua' },
          { slug: 'perbaikan', name: 'Perbaikan' },
          { slug: 'instalasi', name: 'Instalasi' },
          { slug: 'penyewaan', name: 'Penyewaan' }
        ]
      } finally {
        this.isFetchingCategories = false
      }
    },

    // Fetch Projects
    async fetchProjects() {
      try {
        this.isLoading = true
        this.fetchError = null
        
        const params = {
          page: this.currentPage,
          limit: this.itemsPerPage,
          search: this.searchQuery || undefined,
          category: this.selectedCategory !== 'all' ? this.selectedCategory : undefined
        }

        const response = await apiClient.get('/api/public/projects', { params })
        
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
          
          this.totalProjects = response.data.pagination.total
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
        this.fetchError = 'Gagal memuat data proyek'
        this.projects = []
        this.totalProjects = 0
      } finally {
        this.isLoading = false
      }
    },

    // Debounce for search
    debounceFetchProjects() {
      clearTimeout(this._searchTimer)
      this._searchTimer = setTimeout(() => {
        this.fetchProjects()
      }, 500)
    },

    // Get Category Icon
    getCategoryIcon(slug) {
      const icons = {
        'all': 'Filter',
        'perbaikan': 'Wrench',
        'instalasi': 'Zap',
        'penyewaan': 'Clock',
        'maintenance': 'Gauge'
      }
      return icons[slug] || 'Filter'
    },

    // Pagination
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
        const grid = document.getElementById('project-grid')
        if (grid) {
          grid.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    },
    
    // Dropdown
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
    },

    selectCategory(category) {
      this.selectedCategory = category
      this.isDropdownOpen = false
    },

    handleClickOutside(event) {
      const dropdown = this.$refs.dropdownContainer
      if (this.isDropdownOpen && dropdown && !dropdown.contains(event.target)) {
        this.isDropdownOpen = false
      }
    },

    resetFilter() {
      this.selectedCategory = 'all'
      this.searchQuery = ''
      this.currentPage = 1
    }
  }
}
</script>

<template>
  <!-- Hero Section -->
  <section class="relative flex flex-col justify-center items-center text-center py-18 md:py-20 mt-20 md:mt-20 bg-[#1F65E2] overflow-hidden">
    <div class="absolute inset-0 opacity-10 bg-radial from-white via-transparent to-transparent"></div>
    <div class="relative z-10 flex flex-col items-center px-4 max-w-4xl">
      <h1 class="font-bold mb-4 text-3xl md:text-[40px] leading-tight md:leading-snug text-white drop-shadow-sm tracking-wide">
        Proyek<span class="text-[#FCCC4D]"> Kami</span>
      </h1>
      <p class="text-blue-50 text-[16px] md:text-lg font-light leading-relaxed max-w-3xl opacity-90">
        Temukan dan jelajahi proyek sukses yang telah kami kerjakan dari berbagai sektor industri perusahaan dan bisnis.
      </p>
    </div>
  </section>

  <!-- Search & Filter Section -->
  <section class="bg-white border-b border-gray-200 py-7 relative z-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-6"> 
        
        <div class="w-full lg:w-[380px] order-1">
          <div class="relative w-full">
            <div class="absolute top-3.5 left-0 pl-4 flex items-center pointer-events-none">
              <Search class="h-5 w-5 text-gray-400" />
            </div>
            <input 
              v-model="searchQuery" 
              type="text" 
              class="block w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-1 text-sm transition duration-150" 
              :class="activeTheme.dropdownRing"
              placeholder="Cari nama proyek atau lokasi..." 
            />
          </div>
          <p class="hidden lg:block mt-3 ml-1 text-[16px] font-medium text-[#4B5563]">
              {{ searchResultText }}
          </p>
        </div>

        <div class="w-full lg:w-auto relative order-2" ref="dropdownContainer">
          <button 
            @click="toggleDropdown"
            class="flex items-center justify-between gap-3 w-full lg:w-[190px] px-4 py-3.5 rounded-md text-sm font-normal transition-all border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-1"
            :class="activeTheme.dropdownRing"
          >
            <div class="flex items-center gap-2 text-gray-500">
              <Filter v-if="selectedCategory === 'all'" class="w-4 h-4"/>
              <Wrench v-else-if="selectedCategory === 'perbaikan'" class="w-4 h-4"/>
              <Clock v-else-if="selectedCategory === 'penyewaan'" class="w-4 h-4"/>
              <Zap v-else-if="selectedCategory === 'instalasi'" class="w-4 h-4"/>
              <Gauge v-else class="w-4 h-4"/>
              <span class="text-gray-700">{{ currentCategoryLabel }}</span>
            </div>
            <ChevronDown class="w-4 h-4 text-gray-400" /> 
          </button>

          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div 
              v-if="isDropdownOpen"
              class="absolute left-0 lg:right-0 lg:left-auto mt-2 w-full lg:w-[200px] rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-hidden"
            >
              <div role="menu">
                <button 
                  v-for="option in categoryOptions"
                  :key="option.value"
                  @click="selectCategory(option.value)"
                  class="flex items-center gap-2 w-full px-4 py-3 text-sm text-gray-700 text-left bg-white transition-all hover:bg-gray-50"
                  :class="activeTheme.btnHover"
                >
                  <component :is="option.icon" class="w-4 h-4 opacity-70" />
                  {{ option.label }}
                </button>
              </div>
            </div>
          </transition>
        </div>

        <p class="block lg:hidden order-3 mt-1 ml-1 text-[15px] font-medium text-[#4B5563]">
            {{ searchResultText }}
        </p>

      </div>
    </div>
  </section>

  <!-- Projects Grid Section -->
  <section id="proyek" class="pt-12 pb-20 bg-gray-50 min-h-screen overflow-x-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div id="project-grid" class="relative min-h-[400px]">
        
        <!-- Loading State -->
        <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
          <Loader2 class="w-12 h-12 animate-spin text-blue-600 mb-4" />
          <p class="text-gray-500 font-medium">Memuat proyek...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="fetchError" class="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-dashed border-red-200">
          <AlertCircle class="w-16 h-16 text-red-500 mb-4" />
          <h3 class="text-lg font-semibold text-gray-900">{{ fetchError }}</h3>
          <p class="text-gray-500 max-w-xs mx-auto mt-1 mb-6 text-sm">Terjadi kesalahan saat memuat proyek.</p>
          <button @click="fetchProjects" class="px-6 py-2.5 rounded-full bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors">Coba Lagi</button>
        </div>

        <!-- Empty State -->
        <div v-else-if="projects.length === 0" class="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-dashed border-gray-200">
            <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-400">
                <Search size="28"/>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">Proyek tidak ditemukan</h3>
            <p class="text-gray-500 max-w-xs mx-auto mt-1 mb-6 text-sm">Coba ubah kata kunci pencarian atau kategori filter anda.</p>
            <button @click="resetFilter" class="px-6 py-2.5 rounded-full bg-white border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors">Reset Filter</button>
        </div>

        <!-- Projects Grid -->
        <transition-group
          v-else
          tag="div"
          class="grid gap-6 grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-4"
          enter-active-class="transition duration-500 ease-out"
          enter-from-class="opacity-0 translate-y-8"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="absolute opacity-0"
        >
          <div
            v-for="project in projects"
            :key="project.uuid" 
            :class="['group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full w-[88%] sm:w-full', activeTheme.borderHover]"
          >
            <div class="relative aspect-4/3 overflow-hidden bg-gray-100">
              <img 
                :src="project.image" 
                :alt="project.title" 
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                onerror="this.src='https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=800'"
              />
              <div class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
              
              <!-- Category Badge -->
              <div class="absolute top-3 left-3">
                <span class="bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
                  {{ project.category }}
                </span>
              </div>
            </div>

           <div class="p-5 flex flex-col grow bg-white">
              <h3 :class="['font-semibold text-[16px] sm:text-[14.5px] mb-4 leading-snug text-gray-900 line-clamp-2 transition-colors', activeTheme.titleHover]">
                {{ project.title }}
              </h3>
              <div class="space-y-2 mb-0 grow">
                <div class="flex items-center justify-between text-xs border-b border-gray-50 pb-1.5 last:border-0">
                  <span class="text-gray-500 text-[14px] sm:text-[12.5px] flex items-center gap-1.5">
                    <MapPin size="13" class="text-red-400"/> Lokasi
                  </span>
                  <span class="font-semibold text-[14px] sm:text-[12.5px] text-gray-500">{{ project.location }}</span>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1 && !isLoading" class="mt-16 flex flex-col items-center justify-center">
        <div class="flex items-center gap-3">
          <button 
            @click="changePage(currentPage - 1)" 
            :disabled="currentPage === 1"
            :class="['h-10 px-4 rounded-xl border border-gray-200 bg-white text-gray-600 font-medium text-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm', activeTheme.navHover]"
          >
            Previous
          </button>

          <button
              v-for="index in totalPages"
              :key="index"
              @click="changePage(index)"
              :class="['w-10 h-10 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center shadow-sm', 
              currentPage === index 
                ? activeTheme.btnActive 
                : ['bg-white text-gray-600 hover:bg-gray-50']]"
          >
            {{ index }}
          </button>

          <button 
            @click="changePage(currentPage + 1)" 
            :disabled="currentPage === totalPages"
            :class="['h-10 px-4 rounded-xl border border-gray-200 bg-white text-gray-600 font-medium text-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm', activeTheme.navHover]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-24 bg-linear-to-r from-[#F0F9FF] to-[#FFFBF0] border-t border-blue-50/50 relative">
    <div class="max-w-4xl mx-auto px-4 relative z-10 text-center">
      <h2 class="text-3xl md:text-[32px] font-extrabold text-[#0F172A] mb-4 tracking-tight">
        Tertarik bekerjasama dengan kami?
      </h2>
      <p class="text-gray-500 text-lg mb-10 max-w-xl mx-auto font-normal leading-relaxed">
        Diskusikan kebutuhan elektrikal Anda bersama tim ahli kami. Solusi terbaik menanti Anda.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="https://wa.me/6289670308822" target="_blank" class="w-full sm:w-auto px-8 py-3.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-xl shadow-lg shadow-green-500/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
          <Phone class="w-5 h-5" />
          Chat via WhatsApp
        </a>
      </div>
    </div>
  </section>
</template>
