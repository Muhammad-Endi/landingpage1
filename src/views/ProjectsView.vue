<script>
import {
  Building2, Factory, ShoppingBag, Hotel, MapPin,
  ChevronLeft, ChevronRight, Award, CheckCircle,
  Smile, Clock, Gauge, ArrowRight, Search, Filter,
  Wrench, Zap, MessageCircle, Phone, ChevronDown
} from 'lucide-vue-next'

export default {
  name: 'Projects',

  components: {
    Building2, Factory, ShoppingBag, Hotel, MapPin,
    ChevronLeft, ChevronRight, Award, CheckCircle,
    Smile, Clock, Gauge, ArrowRight, Search, Filter,
    Wrench, Zap, MessageCircle, Phone, ChevronDown
  },

  data() {
    return {
      searchQuery: '',
      selectedCategory: 'all', 
      isDropdownOpen: false, 
      currentPage: 1,
      itemsPerPage: 8,

      categoryOptions: [
        { value: 'all', label: 'Semua', icon: 'Filter' },
        { value: 'perbaikan', label: 'Perbaikan', icon: 'Wrench' },
        { value: 'penyewaan', label: 'Penyewaan', icon: 'Clock' },
        { value: 'instalasi', label: 'Instalasi', icon: 'Zap' }
      ],

      projects: [
        { title: 'Rewinding Motor Blower Palka', category: 'perbaikan', capacity: '5,5 KW / 1500 Rpm', location: 'Bandar Lampung', image: 'https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Overhaul Mesin Kapal', category: 'perbaikan', capacity: 'Nigata, 2x5000 kW', location: 'Pelabuhan Lopana', image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Service Rutin Genset Hotel', category: 'perbaikan', capacity: 'Deutz, 2x500 kVA', location: 'Cilacap', image: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Rewinding Dinamo Conveyor', category: 'perbaikan', capacity: '30 KW', location: 'Palembang', image: 'https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Rewinding Motor Pompa Hydrant', category: 'perbaikan', capacity: '75 KW', location: 'Jakarta Selatan', image: 'https://images.pexels.com/photos/534220/pexels-photo-534220.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Overhaul Genset Pabrik Tekstil', category: 'perbaikan', capacity: 'Cummins, 1000 kVA', location: 'Bandung', image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Perbaikan Panel Control Boiler', category: 'perbaikan', capacity: 'PLC System', location: 'Cikarang', image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Rewinding Generator', category: 'perbaikan', capacity: '500 kVA', location: 'Surabaya', image: 'https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Service Rutin Motor Cooling Tower', category: 'perbaikan', capacity: '45 KW', location: 'Tangerang', image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Instalasi Genset Pabrik Baru', category: 'instalasi', capacity: '3x3000 kVA', location: 'Jakarta Industrial Park', image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Pemasangan Power Plant Baru', category: 'instalasi', capacity: 'Cummins, 1x3000 kVA', location: 'Pasuruan', image: 'https://images.pexels.com/photos/210881/pexels-photo-210881.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Pengadaan Genset Resort Bali', category: 'instalasi', capacity: 'CAT, 2x2000 kVA', location: 'Nusa Dua, Bali', image: 'https://images.pexels.com/photos/159358/construction-site-build-construction-work-159358.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Instalasi Listrik Gudang Logistik', category: 'instalasi', capacity: '197 kVA', location: 'Karawang', image: 'https://images.pexels.com/photos/1216541/pexels-photo-1216541.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Pemasangan Genset Apartemen', category: 'instalasi', capacity: 'Perkins, 2x1000 kVA', location: 'Bekasi', image: 'https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Instalasi Panel Synchronize', category: 'instalasi', capacity: '4x500 kVA', location: 'Makassar', image: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Pemasangan Cable Tray & Ladder', category: 'instalasi', capacity: 'Gedung Bertingkat', location: 'Jakarta Barat', image: 'https://images.pexels.com/photos/224924/pexels-photo-224924.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Instalasi Penerangan Jalan Umum', category: 'instalasi', capacity: 'PJU Solar Cell', location: 'Kalimantan', image: 'https://images.pexels.com/photos/378271/pexels-photo-378271.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Pemasangan Trafo Distribusi', category: 'instalasi', capacity: '2000 kVA', location: 'Cilegon', image: 'https://images.pexels.com/photos/1431664/pexels-photo-1431664.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Instalasi Panel ATS/AMF Gedung', category: 'instalasi', capacity: 'Automatic System', location: 'Sudirman, Jakarta', image: 'https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Sewa Genset Event Mall', category: 'penyewaan', capacity: 'KOHLER, 5x200 kVA', location: 'Surabaya Center', image: 'https://images.pexels.com/photos/974320/pexels-photo-974320.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Sewa Genset Proyek Tol', category: 'penyewaan', capacity: 'Perkins, 4x1500 kVA', location: 'Bandung', image: 'https://images.pexels.com/photos/14613/pexels-photo-14613.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Sewa Genset Backup RS', category: 'penyewaan', capacity: '500 kVA', location: 'Medan', image: 'https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Sewa Genset Wedding Reception', category: 'penyewaan', capacity: '60 kVA Silent', location: 'Sentul, Bogor', image: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Rental Genset Backup Server', category: 'penyewaan', capacity: '250 kVA', location: 'Jakarta Selatan', image: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Sewa Genset Proyek Jembatan', category: 'penyewaan', capacity: '150 kVA', location: 'Palembang', image: 'https://images.pexels.com/photos/176342/pexels-photo-176342.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Rental Genset Pameran Otomotif', category: 'penyewaan', capacity: '500 kVA', location: 'BSD City', image: 'https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Sewa Genset Maintenance PLN', category: 'penyewaan', capacity: '1000 kVA', location: 'Semarang', image: 'https://images.pexels.com/photos/459728/pexels-photo-459728.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Sewa Genset Konser Musik Outdoor', category: 'penyewaan', capacity: '2x500 kVA Silent', location: 'ICE BSD', image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Rental Load Bank Testing', category: 'penyewaan', capacity: '1000 KW', location: 'PLTU Jawa 7', image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800' }
      ]
    }
  },

  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },

  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },

  computed: {
    filteredProjects() {
      return this.projects.filter(project => {
        const categoryMatch = this.selectedCategory === 'all' || project.category === this.selectedCategory
        const searchLower = this.searchQuery.toLowerCase()
        const searchMatch = 
          project.title.toLowerCase().includes(searchLower) || 
          project.location.toLowerCase().includes(searchLower)
        return categoryMatch && searchMatch
      })
    },

    paginatedProjects() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredProjects.slice(start, end)
    },

    totalPages() {
      return Math.ceil(this.filteredProjects.length / this.itemsPerPage)
    },

    searchResultText() {
      const option = this.categoryOptions.find(opt => opt.value === this.selectedCategory);
      return `Proyek ${option ? option.label.toLowerCase() : ''} ditemukan`;
    },

    currentCategoryLabel() {
      const option = this.categoryOptions.find(opt => opt.value === this.selectedCategory);
      return option ? option.label : 'Semua';
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
    }
  },

  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
        document.getElementById('project-grid').scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
    
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
    },

    selectCategory(category) {
      this.selectedCategory = category
      this.isDropdownOpen = false
      this.currentPage = 1
    },

    handleClickOutside(event) {
      const dropdown = this.$refs.dropdownContainer
      if (this.isDropdownOpen && dropdown && !dropdown.contains(event.target)) {
        this.isDropdownOpen = false
      }
    }
  }
}
</script>

<template>
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
              placeholder="Cari nama proyek..." 
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

  <section id="proyek" class="pt-12 pb-20 bg-gray-50 min-h-screen overflow-x-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div id="project-grid" class="relative min-h-[400px]">
        
        <div v-if="filteredProjects.length === 0" class="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-dashed border-gray-200">
            <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-400">
                <Search size="28"/>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">Proyek tidak ditemukan</h3>
            <p class="text-gray-500 max-w-xs mx-auto mt-1 mb-6 text-sm">Coba ubah kata kunci pencarian atau kategori filter anda.</p>
            <button @click="selectedCategory = 'all'; searchQuery = ''" class="px-6 py-2.5 rounded-full bg-white border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors">Reset Filter</button>
        </div>

        <transition-group
          tag="div"
          class="grid gap-6 grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-4"
          enter-active-class="transition duration-500 ease-out"
          enter-from-class="opacity-0 translate-y-8"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="absolute opacity-0"
        >
          <div
            v-for="(project) in paginatedProjects"
            :key="project.title" 
            :class="['group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full w-[88%] sm:w-full', activeTheme.borderHover]"
          >
            <div class="relative aspect-4/3 overflow-hidden bg-gray-100">
              <img :src="project.image" :alt="project.title" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" />
              <div class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
            </div>

           <div class="p-5 flex flex-col grow bg-white">
              <h3 :class="['font-semibold text-[16px] sm:text-[14.5px] mb-4 leading-snug text-gray-900 line-clamp-2 transition-colors', activeTheme.titleHover]">
                {{ project.title }}
              </h3>
              <div class="space-y-2 mb-0 grow">
                <div class="flex items-center justify-between text-xs border-b border-gray-50 pb-1.5 last:border-0">
                  <span class="text-gray-500 text-[14px] sm:text-[12.5px] flex items-center gap-1.5"><MapPin size="13" class="text-red-400"/> Lokasi</span>
                  <span class="font-semibold text-[14px] sm:text-[12.5px] text-gray-500">{{ project.location }}</span>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>

      <div v-if="totalPages > 1" class="mt-16 flex flex-col items-center justify-center">
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