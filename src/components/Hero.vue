<script>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { 
  ChevronLeft, 
  ChevronRight, 
  ShoppingCart, 
  CalendarClock, 
  Wrench,
  X,
  Plus,
  Trash2,
  Check,
  ChevronDown,
  Building2,
  Info,
  Loader2,
  HelpCircle,
  ClipboardList,
  AlertCircle
} from 'lucide-vue-next'
import apiClient from '@/api/axios'

export default {
  name: 'Hero',
  components: { 
    ChevronLeft, ChevronRight, ShoppingCart, CalendarClock, Wrench, X, Plus, Trash2, Check, 
    ChevronDown, Building2, Info, Loader2, HelpCircle, ClipboardList, AlertCircle
  },
  setup() {
    const router = useRouter()
    const currentSlide = ref(0)
    const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
    
    // --- 0. LOGIKA FEEDBACK KLIK (BARU) ---
    const activeServiceIndex = ref(null)

    // --- 1. LOGIKA RENTAL ---
    const isRentalModalOpen = ref(false)
    const selectedProductsRef = ref(null)
    const rentalForm = ref({
      name: '', tenantType: '', companyName: '', phone: '', duration: '', location: '', notes: '', selectedProducts: [], isCustomRequest: false 
    })
    const rentalErrors = ref({
      name: false, tenantType: false, companyName: false, phone: false, duration: false, location: false, notes: false, selectedProducts: false
    })

    // --- 2. LOGIKA SERVICE ---
    const isServiceModalOpen = ref(false)
    const serviceForm = ref({
      name: '', tenantType: '', companyName: '', phone: '', location: '', unitType: '', issue: ''
    })
    const serviceErrors = ref({
      name: false, tenantType: false, companyName: false, phone: false, location: false, unitType: false, issue: false
    })

    const tenantOptions = ['Pribadi', 'Perusahaan']
    
    // --- DATA & SCROLL LOGIC (UPDATE: Fetch dari API) ---
    const allProducts = ref([])
    const visibleProducts = ref([]) 
    const isLoadingProducts = ref(false)
    const isFetchingProducts = ref(false)
    const fetchError = ref(null)
    const displayedCount = ref(0)
    const initialLoad = 5
    const loadStep = 3

    // Fetch products from API
    const fetchRentalProducts = async () => {
      try {
        isFetchingProducts.value = true
        fetchError.value = null

        const response = await apiClient.get('/api/public/products', {
          params: {
            page: 1,
            limit: 50 // Ambil banyak untuk rental
          }
        })

        if (response.data.meta.success) {
          allProducts.value = response.data.data
            .filter(product => product.rent_price && product.rent_price > 0) // Filter hanya yang ada rent_price
            .map(product => {
              const spec = product.specifications?.[0] || {}
              return {
                id: product.uuid,
                uuid: product.uuid,
                name: product.title,
                price: formatRupiah(product.rent_price),
                rawPrice: product.rent_price,
                image: product.image 
                  ? `${baseURL}/${product.image}` 
                  : '/genset.png',
                brand: spec.brand || 'N/A',
                model: spec.model || 'N/A',
                primePower: spec.prime_power || 'N/A',
                stock: product.stock
              }
            })
        }
      } catch (error) {
        console.error('Error fetching rental products:', error)
        fetchError.value = 'Gagal memuat produk rental'
        allProducts.value = []
      } finally {
        isFetchingProducts.value = false
      }
    }

    // Format Rupiah helper
    const formatRupiah = (amount) => {
      if (!amount) return 'Rp 0'
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount)
    }

    const initializeProducts = () => {
      displayedCount.value = initialLoad
      visibleProducts.value = allProducts.value.slice(0, displayedCount.value)
      isLoadingProducts.value = false
    }

    const handleScroll = (e) => {
      const { scrollTop, clientHeight, scrollHeight } = e.target
      if (scrollTop + clientHeight >= scrollHeight - 10) loadMoreProducts()
    }

    const loadMoreProducts = () => {
      if (isLoadingProducts.value || displayedCount.value >= allProducts.value.length) return
      isLoadingProducts.value = true
      setTimeout(() => {
        const nextBatch = allProducts.value.slice(displayedCount.value, displayedCount.value + loadStep)
        visibleProducts.value.push(...nextBatch)
        displayedCount.value += loadStep
        isLoadingProducts.value = false
      }, 500)
    }

    // --- GLOBAL CLICK HANDLER ---
    const handleGlobalClick = (event) => {
      const interactiveTags = ['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON', 'LABEL'];
      const isInteractive = interactiveTags.includes(event.target.tagName) || event.target.closest('button') || event.target.closest('.product-item');

      if (!isInteractive) {
        Object.keys(rentalErrors.value).forEach(key => rentalErrors.value[key] = false)
        Object.keys(serviceErrors.value).forEach(key => serviceErrors.value[key] = false)
      }
    }

    const clearRentalError = (field) => { rentalErrors.value[field] = false }
    const clearServiceError = (field) => { serviceErrors.value[field] = false }

    // --- ACTIONS ---
    const openRentalModal = async () => {
      // Fetch products jika belum ada
      if (allProducts.value.length === 0 && !isFetchingProducts.value) {
        await fetchRentalProducts()
      }
      initializeProducts() 
      Object.keys(rentalErrors.value).forEach(key => rentalErrors.value[key] = false)
      isRentalModalOpen.value = true
      stopAutoPlay()
    }
    
    const closeRentalModal = () => { 
      isRentalModalOpen.value = false
      startAutoPlay() 
    }

    const openServiceModal = () => {
      Object.keys(serviceErrors.value).forEach(key => serviceErrors.value[key] = false)
      isServiceModalOpen.value = true
      stopAutoPlay()
    }
    const closeServiceModal = () => { isServiceModalOpen.value = false; startAutoPlay() }

    // --- VALIDATION RENTAL ---
    const validateRentalField = (field) => {
      if (field === 'selectedProducts') {
        rentalErrors.value.selectedProducts = (rentalForm.value.selectedProducts.length === 0 && !rentalForm.value.isCustomRequest)
        return
      }
      if (field === 'companyName') {
        rentalErrors.value.companyName = !rentalForm.value.companyName
        return
      }
      if (field === 'tenantType') {
        rentalErrors.value.tenantType = !rentalForm.value.tenantType
        if (rentalForm.value.tenantType !== 'Perusahaan') rentalErrors.value.companyName = false
        return
      }
      rentalErrors.value[field] = !rentalForm.value[field]
    }

    // --- VALIDATION SERVICE ---
    const validateServiceField = (field) => {
      if (field === 'companyName') {
        serviceErrors.value.companyName = !serviceForm.value.companyName
        return
      }
      if (field === 'tenantType') {
        serviceErrors.value.tenantType = !serviceForm.value.tenantType
        if (serviceForm.value.tenantType !== 'Perusahaan') serviceErrors.value.companyName = false
        return
      }
      serviceErrors.value[field] = !serviceForm.value[field]
    }

    const sanitizePhoneInput = (e, formType) => {
      let value = e.target.value.replace(/\D/g, '')
      if(formType === 'rental') {
        rentalForm.value.phone = value
        validateRentalField('phone')
      } else {
        serviceForm.value.phone = value
        validateServiceField('phone')
      }
      e.target.value = value
    }

    const toggleCustomRequest = () => { if(rentalForm.value.isCustomRequest) rentalErrors.value.selectedProducts = false }
    
    const toggleProductSelection = (product) => {
      const index = rentalForm.value.selectedProducts.findIndex(p => p.id === product.id)
      if (index === -1) rentalForm.value.selectedProducts.push(product)
      else rentalForm.value.selectedProducts.splice(index, 1)
      validateRentalField('selectedProducts')
    }

    const removeProduct = async (index) => {
      rentalForm.value.selectedProducts.splice(index, 1)
      validateRentalField('selectedProducts')
      await nextTick()
      if (selectedProductsRef.value) selectedProductsRef.value.focus()
    }

    const isProductSelected = (productId) => rentalForm.value.selectedProducts.some(p => p.id === productId)

    const submitRental = () => {
      let hasError = false
      validateRentalField('selectedProducts')
      if(rentalErrors.value.selectedProducts) hasError = true
      const fields = ['name', 'phone', 'tenantType', 'duration', 'location', 'notes']
      fields.forEach(field => {
        validateRentalField(field)
        if(rentalErrors.value[field]) hasError = true
      })
      if (rentalForm.value.tenantType === 'Perusahaan') {
        validateRentalField('companyName')
        if(rentalErrors.value.companyName) hasError = true
      }
      if (hasError) return

      let productListText = ''
      const hasProduct = rentalForm.value.selectedProducts.length > 0
      const isChecked = rentalForm.value.isCustomRequest
      if (hasProduct) {
        rentalForm.value.selectedProducts.forEach((product, index) => {
          productListText += `${index + 1}. ${product.name} (${product.price} / bln)\n`
        })
      } else if (isChecked) {
          productListText = "_Saya belum memilih unit dan membutuhkan konsultasi/rekomendasi daya yang tepat._"
      }

      let closingSentence = "Mohon informasinya lebih lanjut untuk ketersediaan dan harga final. Terima kasih."
      if (hasProduct && isChecked) {
        closingSentence = "Mohon info ketersediaan dan saran teknis mengenai dayanya. Terima kasih."
      }

      const messageTemplate = `Halo Sinar Elektro Sejahtera, \n\nSaya ingin konsultasi sewa unit genset.\n\n*DATA PENYEWA*\nNama Lengkap: ${rentalForm.value.name}\nTipe Penyewa: ${rentalForm.value.tenantType}\n${rentalForm.value.tenantType === 'Perusahaan' ? `Nama Perusahaan: ${rentalForm.value.companyName}\n` : ''}No. WhatsApp: ${rentalForm.value.phone}\nDurasi Sewa: ${rentalForm.value.duration}\nLokasi: ${rentalForm.value.location}\n\n*UNIT YANG DIPILIH*\n${productListText}\n*DETAIL KEBUTUHAN/CATATAN*\n${rentalForm.value.notes}\n\n${closingSentence}`
      window.open(`https://api.whatsapp.com/send?phone=6289670308822&text=${encodeURIComponent(messageTemplate)}`, '_blank')
      closeRentalModal()
      rentalForm.value = { name: '', tenantType: '', companyName: '', phone: '', duration: '', location: '', notes: '', selectedProducts: [], isCustomRequest: false }
    }

    const submitService = () => {
      let hasError = false
      const fields = ['name', 'phone', 'tenantType', 'location', 'unitType', 'issue']
      fields.forEach(field => {
        validateServiceField(field)
        if(serviceErrors.value[field]) hasError = true
      })
      if (serviceForm.value.tenantType === 'Perusahaan') {
        validateServiceField('companyName')
        if(serviceErrors.value.companyName) hasError = true
      }
      if (hasError) return
      const messageTemplate = `Halo Sinar Elektro Sejahtera, \n\nSaya ingin konsultasi mengenai Perbaikan/Service unit.\n\n*Data Client*\nNama Lengkap: ${serviceForm.value.name}\nTipe Klien: ${serviceForm.value.tenantType}\n${serviceForm.value.tenantType === 'Perusahaan' ? `Nama Perusahaan: ${serviceForm.value.companyName}\n` : ''}No. WhatsApp: ${serviceForm.value.phone}\nLokasi: ${serviceForm.value.location}\n\n*Detail Unit & Kendala*\nJenis Unit: ${serviceForm.value.unitType}\nKendala: ${serviceForm.value.issue}\n\nMohon informasinya untuk estimasi biaya dan jadwal pengecekan teknisi. Terima kasih.`
      window.open(`https://api.whatsapp.com/send?phone=6289670308822&text=${encodeURIComponent(messageTemplate)}`, '_blank')
      closeServiceModal()
      serviceForm.value = { name: '', tenantType: '', companyName: '', phone: '', location: '', unitType: '', issue: '' }
    }
    
    let autoPlayInterval = null
    const slides = [
      { image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1600', badge: 'Teknisi Ahli & Berpengalaman', titleLine1: 'Service Rewinding Elektro', titleLine2: 'Motor & Genset', description: 'Melayani service rewinding elektro motor 1 & 3 phase serta service genset generator dengan teknisi kompeten dan berpengalaman lebih dari 15 tahun.' },
      { image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=1600', badge: 'Kualitas Terbaik & Teruji', titleLine1: 'Penjualan Genset', titleLine2: 'Berkualitas', description: 'Temukan berbagai pilihan genset berkualitas di Sinar Elektro Sejahtera siap mendukung kebutuhan daya Anda mulai dari industri, perusahaan, hingga rumah tangga.' },
      { image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1600', badge: 'Sewa Mudah, Daya Siap Kapan Saja', titleLine1: 'Sewa Genset Cepat', titleLine2: '& Terpercaya', description: 'Sinar Elektro Sejahtera menyediakan sewa genset untuk acara, proyek, perusahaan, hingga kebutuhan rumah tangga. kami siap kapan pun dibutuhkan.' }
    ]
    const services = [
      { title: 'Penjualan', icon: ShoppingCart, desc: 'Unit Genset Baru', color: 'text-green-600', bgIcon: 'bg-green-100', actionType: 'link', path: '/catalog' },
      { title: 'Sewa', icon: CalendarClock, desc: 'Genset bulanan', color: 'text-blue-600', bgIcon: 'bg-blue-100', actionType: 'rentalModal', path: '' },
      { title: 'Perbaikan', icon: Wrench, desc: 'Service & Maintenance', color: 'text-red-600', bgIcon: 'bg-red-100', actionType: 'serviceModal', path: '' }
    ]

    const nextSlide = () => { currentSlide.value = (currentSlide.value + 1) % slides.length }
    const prevSlide = () => { currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length }
    const startAutoPlay = () => { autoPlayInterval = setInterval(() => nextSlide(), 4000) }
    const stopAutoPlay = () => { if (autoPlayInterval) clearInterval(autoPlayInterval) }

    // --- LOGIKA KLIK TOMBOL SERVICE (DENGAN DELAY) ---
    const handleServiceClick = async (service, index) => {
      activeServiceIndex.value = index
      
      await new Promise(resolve => setTimeout(resolve, 150))

      if (service.actionType === 'rentalModal') openRentalModal()
      else if (service.actionType === 'serviceModal') openServiceModal()
      else if (service.path) router.push(service.path)

      setTimeout(() => { activeServiceIndex.value = null }, 500)
    }

    onMounted(startAutoPlay)
    onUnmounted(stopAutoPlay)

    return { 
      currentSlide, slides, services, nextSlide, prevSlide, stopAutoPlay, startAutoPlay, handleServiceClick, activeServiceIndex,
      isRentalModalOpen, closeRentalModal, rentalForm, rentalErrors, tenantOptions, 
      toggleProductSelection, removeProduct, isProductSelected, submitRental,
      visibleProducts, handleScroll, isLoadingProducts, isFetchingProducts, fetchError,
      validateRentalField, sanitizePhoneInput, toggleCustomRequest,
      selectedProductsRef, allProducts, handleGlobalClick, clearRentalError,
      isServiceModalOpen, closeServiceModal, serviceForm, serviceErrors, submitService, validateServiceField, clearServiceError
    }
  }
}
</script>

<template>
  <section
    id="beranda"
    class="relative h-screen flex items-center overflow-hidden font-poppins group"
    @mouseenter="stopAutoPlay"
    @mouseleave="startAutoPlay"
  >
    <div class="absolute inset-0 z-0">
      <transition name="fade-bg" mode="out-in">
        <div :key="currentSlide" class="absolute inset-0 bg-cover bg-center" :style="{ backgroundImage: `url(${slides[currentSlide].image})` }">
          <div class="absolute inset-0 bg-black/50"></div>
        </div>
      </transition>
    </div>

    <button @click="prevSlide" class="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg active:scale-95 group-hover:opacity-100 md:opacity-0 opacity-100">
      <ChevronLeft class="w-5 h-5 md:w-6 md:h-6" />
    </button>
    <button @click="nextSlide" class="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg active:scale-95 group-hover:opacity-100 md:opacity-0 opacity-100">
      <ChevronRight class="w-5 h-5 md:w-6 md:h-6" />
    </button>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center pb-20 pointer-events-none"> 
      <div class="w-full lg:w-3/4 pointer-events-auto">
        <transition name="slide-up" mode="out-in">
          <div :key="currentSlide" class="space-y-6 text-center lg:text-left px-4 md:px-0">
            <div class="inline-block mt-6">
              <span class="bg-blue-600 text-white px-5 py-2 rounded-full text-[13px] md:text-[15px] font-semibold tracking-wide shadow-sm backdrop-blur-sm">
                {{ slides[currentSlide].badge }}
              </span>
            </div>
            <div class="space-y-2">
              <h1 class="font-bold text-[30px] md:text-[56px] text-white leading-tight drop-shadow-md">
                <span class="block">{{ slides[currentSlide].titleLine1 }}</span>
                <span class="block text-yellow-400">{{ slides[currentSlide].titleLine2 }}</span>
              </h1>
            </div>
            <p class="text-base md:text-lg text-white leading-relaxed max-w-xl font-normal mx-auto lg:mx-0">
              {{ slides[currentSlide].description }}
            </p>
          </div>
        </transition>
      </div>
    </div>
  </section>

  <div class="services-wrapper w-full flex justify-center -mt-16 relative z-40 px-4">
  <div class="max-w-6xl w-full">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      
      <div 
        v-for="(service, index) in services" 
        :key="index" 
        @click="handleServiceClick(service, index)" 
        :class="[
          /* shadow-xl digunakan untuk mengurangi bayangan sedikit saja dari sebelumnya */
          'rounded-xl shadow-xl p-4 flex items-center space-x-4 cursor-pointer select-none group border-b-4 border-transparent',
          activeServiceIndex === index 
            ? 'bg-blue-600 border-blue-700' 
            : 'bg-white hover:bg-blue-600'
        ]"
        style="transition: background-color 0.2s, border-color 0.2s;"
      >
        <div :class="[
          'p-3 rounded-lg transition-colors duration-300',
          activeServiceIndex === index 
            ? 'bg-white' 
            : `${service.bgIcon} group-hover:bg-white`
        ]">
          <component 
            :is="service.icon" 
            :size="32" 
            :class="activeServiceIndex === index ? service.color : `${service.color}`" 
          />
        </div>

        <div>
          <h3 :class="[
            'font-bold text-lg transition-colors duration-300',
            activeServiceIndex === index ? 'text-white' : 'text-gray-800 group-hover:text-white'
          ]">
            {{ service.title }}
          </h3>
          <p :class="[
            'text-sm font-medium transition-colors duration-300',
            activeServiceIndex === index ? 'text-blue-50' : 'text-gray-500 group-hover:text-blue-50'
          ]">
            {{ service.desc }}
          </p>
        </div>

      </div>
    </div>
  </div>
</div>

   <!-- Rental Modal (UPDATED dengan API) -->
  <teleport to="body">
    <transition name="modal-fade">
      <div 
        v-if="isRentalModalOpen" 
        class="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        @click.self="closeRentalModal"
      >
        <div 
          @click="handleGlobalClick"
          class="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row h-[90vh] relative"
        >
          <button @click="closeRentalModal" class="absolute top-3 right-3 md:top-4 md:right-4 z-50 p-2 rounded-full bg-white/80 hover:bg-red-50 text-gray-500 hover:text-red-500 transition-all shadow-sm border border-transparent hover:border-red-100">
            <X class="w-6 h-6" />
          </button>

          <!-- Form Section (Tetap sama) -->
          <div class="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
            <div class="mb-6">
              <div class="flex items-center gap-2 mb-2">
                <div class="bg-blue-100 p-2 rounded-lg text-blue-600">
                  <CalendarClock class="w-6 h-6" />
                </div>
                <h2 class="text-2xl font-bold text-gray-800">Formulir Sewa</h2>
              </div>
              <p class="text-gray-500 text-sm">Isi data diri Anda dan pilih unit genset</p>
            </div>

            <form @submit.prevent="submitRental" class="space-y-4">
              <div 
                ref="selectedProductsRef"
                tabindex="0"
                @blur="clearRentalError('selectedProducts')"
                class="p-4 bg-blue-50 border rounded-xl transition-all focus:outline-none"
                :class="rentalErrors.selectedProducts ? 'border-red-500' : 'border-blue-100'"
              >
                <div class="flex justify-between items-center mb-2">
                  <h3 class="text-sm font-semibold text-gray-600">Produk yang akan disewa <span class="text-red-500">*</span>:</h3>
                  <span v-if="rentalForm.selectedProducts.length > 0" class="text-xs font-bold text-blue-600 bg-white px-2 py-1 rounded-full border border-blue-100">
                    {{ rentalForm.selectedProducts.length }} Unit
                  </span>
                </div>
                
                <div v-if="rentalForm.selectedProducts.length > 0" class="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                  <div v-for="(item, index) in rentalForm.selectedProducts" :key="item.id" class="flex gap-3 items-center bg-white p-2.5 rounded-lg shadow-sm border border-blue-200">
                    <img :src="item.image" alt="Selected Product" class="w-12 h-12 object-cover rounded-md border border-gray-100" onerror="this.src='/genset.png'" />
                    <div class="flex-1">
                      <p class="font-bold text-blue-700 text-xs md:text-sm">{{ item.name }}</p>
                      <p class="text-xs font-semibold text-orange-500 mt-1">{{ item.price }} / bln</p>
                    </div>
                    <button type="button" @click="removeProduct(index)" class="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-full transition-colors self-center">
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div v-else class="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 text-sm flex flex-col items-center justify-center gap-2">
                   <div class="bg-gray-100 p-3 rounded-full"><ShoppingCart class="w-6 h-6 text-gray-300" /></div>
                   <span>Belum ada produk dipilih.</span>
                   <span class="text-blue-500 text-xs font-medium">Klik tanda (+) pada unit genset</span>
                </div>
                <p v-if="rentalErrors.selectedProducts" class="text-red-500 text-xs mt-2 text-center font-medium">Mohon pilih unit genset atau centang opsi konsultasi</p>
              </div>

              <!-- Form fields tetap sama (name, tenant, company, phone, duration, location, notes) -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">{{ rentalForm.tenantType === 'Perusahaan' ? 'Nama Lengkap / PIC' : 'Nama Lengkap' }} <span class="text-red-500">*</span></label>
                  <input v-model="rentalForm.name" @input="validateRentalField('name')" @blur="clearRentalError('name')" type="text" placeholder="Contoh: Budi Santoso" :class="['w-full border rounded-lg px-4 py-2.5 focus:outline-none text-sm bg-gray-50 focus:bg-white', rentalErrors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500']">
                  <p v-if="rentalErrors.name" class="text-red-500 text-xs mt-1">Nama wajib diisi</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Tipe Penyewa <span class="text-red-500">*</span></label>
                  <div class="relative">
                    <select v-model="rentalForm.tenantType" @change="validateRentalField('tenantType')" @blur="clearRentalError('tenantType')" :class="['w-full border rounded-lg px-4 py-2.5 focus:outline-none text-sm appearance-none cursor-pointer bg-gray-50 focus:bg-white', rentalErrors.tenantType ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500']">
                      <option disabled value="" hidden>Pilih Tipe</option>
                      <option v-for="(type, index) in tenantOptions" :key="index" :value="type">{{ type }}</option>
                    </select>
                    <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400"><ChevronDown class="w-4 h-4" /></div>
                  </div>
                  <p v-if="rentalErrors.tenantType" class="text-red-500 text-xs mt-1">Wajib dipilih</p>
                </div>
              </div>

              <div v-if="rentalForm.tenantType === 'Perusahaan'" class="animate-fade-in-down">
                <label class="block text-sm font-medium text-gray-700 mb-1">Nama Perusahaan <span class="text-red-500">*</span></label>
                <div class="relative">
                  <input v-model="rentalForm.companyName" @input="validateRentalField('companyName')" @blur="clearRentalError('companyName')" type="text" placeholder="Contoh: PT. Sinar Elektro Sejahtera" :class="['w-full border rounded-lg px-4 py-2.5 pl-10 focus:outline-none text-sm bg-gray-50 focus:bg-white', rentalErrors.companyName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500']">
                  <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400"><Building2 class="w-4 h-4" /></div>
                </div>
                <p v-if="rentalErrors.companyName" class="text-red-500 text-xs mt-1">Nama perusahaan wajib diisi</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">No. WhatsApp <span class="text-red-500">*</span></label>
                  <input v-model="rentalForm.phone" @input="(e) => sanitizePhoneInput(e, 'rental')" @blur="clearRentalError('phone')" type="tel" placeholder="0812xxxx" :class="['w-full border rounded-lg px-4 py-2.5 focus:outline-none text-sm bg-gray-50 focus:bg-white', rentalErrors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500']">
                  <p v-if="rentalErrors.phone" class="text-red-500 text-xs mt-1">No. WhatsApp wajib diisi</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Durasi Sewa <span class="text-red-500">*</span></label>
                  <input v-model="rentalForm.duration" @input="validateRentalField('duration')" @blur="clearRentalError('duration')" type="text" placeholder="Contoh: 1 Bulan" :class="['w-full border rounded-lg px-4 py-2.5 focus:outline-none text-sm bg-gray-50 focus:bg-white', rentalErrors.duration ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500']">
                  <p v-if="rentalErrors.duration" class="text-red-500 text-xs mt-1">Durasi wajib diisi</p>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Lokasi <span class="text-red-500">*</span></label>
                <input v-model="rentalForm.location" @input="validateRentalField('location')" @blur="clearRentalError('location')" type="text" placeholder="Masukan alamat lengkap" :class="['w-full border rounded-lg px-4 py-2.5 focus:outline-none text-sm bg-gray-50 focus:bg-white', rentalErrors.location ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500']">
                <p v-if="rentalErrors.location" class="text-red-500 text-xs mt-1">Lokasi wajib diisi</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Detail kebutuhan <span class="text-red-500">*</span></label>
                <textarea v-model="rentalForm.notes" @input="validateRentalField('notes')" @blur="clearRentalError('notes')" rows="2" placeholder="Contoh: Untuk backup kantor, dll..." :class="['w-full border rounded-lg px-4 py-2.5 focus:outline-none text-sm resize-none bg-gray-50 focus:bg-white', rentalErrors.notes ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500']"></textarea>
                <p v-if="rentalErrors.notes" class="text-red-500 text-xs mt-1">Detail kebutuhan wajib diisi</p>
              </div>

              <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-3 mt-2">
                <Info class="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <div class="text-sm text-blue-800">
                  <p class="font-medium">Informasi Penting</p>
                  <p class="mt-1 text-xs md:text-sm text-blue-700 leading-snug">Data ini akan diteruskan ke WhatsApp untuk <strong>konsultasi lebih lanjut</strong> dan mendapatkan <strong>penawaran harga terbaik</strong> dari tim kami.</p>
                </div>
              </div>

              <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex justify-center items-center gap-2 mt-4">
                Kirim & Konsultasi via WhatsApp
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
              </button>
            </form>
          </div>

          <!-- Products List Section (UPDATED dengan API) -->
          <div class="w-full md:w-1/2 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200 p-6 md:p-8 flex flex-col h-full overflow-hidden min-h-0">
            <div class="flex items-center mb-4 pb-2 border-b border-gray-200/60 shrink-0">
              <h3 class="font-bold text-gray-800 text-lg">Pilih Unit Genset</h3>
            </div>

            <!-- Loading State -->
            <div v-if="isFetchingProducts" class="flex-1 flex flex-col items-center justify-center">
              <Loader2 class="w-10 h-10 animate-spin text-blue-600 mb-3" />
              <p class="text-sm text-gray-500 font-medium">Memuat produk rental...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="fetchError" class="flex-1 flex flex-col items-center justify-center p-4">
              <AlertCircle class="w-12 h-12 text-red-500 mb-3" />
              <p class="text-sm text-red-600 font-medium text-center">{{ fetchError }}</p>
              <button @click="fetchRentalProducts" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Coba Lagi
              </button>
            </div>

            <!-- Empty State -->
            <div v-else-if="allProducts.length === 0" class="flex-1 flex flex-col items-center justify-center">
              <ShoppingCart class="w-16 h-16 text-gray-300 mb-3" />
              <p class="text-sm text-gray-500">Belum ada produk rental tersedia</p>
            </div>

            <!-- Products List -->
            <div v-else class="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar relative min-h-0" @scroll="handleScroll">
              <div v-for="product in visibleProducts" :key="product.id" class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex gap-3 items-center group product-item">
                <div class="w-20 h-20 shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-100">
                  <img :src="product.image" :alt="product.name" class="w-full h-full object-cover" onerror="this.src='/genset.png'" />
                </div>
                <div class="flex-1">
                  <h4 class="font-bold text-gray-800 text-sm group-hover:text-blue-600 transition-colors">{{ product.name }}</h4>
                  <span class="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded mt-2 inline-block">{{ product.price }} / bln</span>
                </div>
                <button @click="toggleProductSelection(product)" :class="['h-10 w-10 flex items-center justify-center rounded-lg transition-all shadow-sm', isProductSelected(product.id) ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-100 hover:bg-blue-600 text-gray-600 hover:text-white active:scale-90']">
                  <Check v-if="isProductSelected(product.id)" class="w-6 h-6" />
                  <Plus v-else class="w-6 h-6" />
                </button>
              </div>
              <div v-if="isLoadingProducts" class="flex justify-center items-center py-4"><Loader2 class="w-6 h-6 animate-spin text-blue-600" /><span class="ml-2 text-sm text-gray-500 font-medium">Memuat produk lainnya...</span></div>
              <div v-if="!isLoadingProducts && visibleProducts.length >= allProducts.length" class="text-center py-4 text-xs text-gray-400 font-medium">Semua produk telah ditampilkan</div>
            </div>

            <!-- Consultation Checkbox -->
            <div class="p-4 border-t border-gray-200 bg-blue-50/50 mt-auto">
                <label class="flex items-start gap-3 cursor-pointer group">
                    <div class="relative flex items-center">
                        <input type="checkbox" v-model="rentalForm.isCustomRequest" @change="toggleCustomRequest" class="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-gray-300 transition-all checked:border-blue-600 checked:bg-blue-600 hover:border-blue-400" />
                        <Check class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 w-3.5 h-3.5" />
                    </div>
                    <div class="text-sm text-gray-700 select-none">
                        <span class="font-medium block text-gray-900 group-hover:text-blue-700 transition-colors">Bingung pilih kapasitas / Unit tidak ada?</span>
                        <span class="text-xs text-gray-500">Centang ini untuk konsultasi & rekomendasi daya dari tim ahli kami.</span>
                    </div>
                </label>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="modal-fade">
      <div 
        v-if="isServiceModalOpen" 
        class="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        @click.self="closeServiceModal"
      >
        <div 
          @click="handleGlobalClick"
          class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col relative max-h-[90vh]"
        >
          <button @click="closeServiceModal" class="absolute top-3 right-3 z-50 p-2 rounded-full bg-white/80 hover:bg-red-50 text-gray-500 hover:text-red-500 transition-all shadow-sm border border-transparent hover:border-red-100">
            <X class="w-6 h-6" />
          </button>

          <div class="p-6 md:p-8 overflow-y-auto">
            <div class="mb-6 border-b border-gray-100 pb-4">
              <div class="flex items-center gap-2 mb-2">
                <div class="bg-red-100 p-2 rounded-lg text-red-600">
                  <Wrench class="w-6 h-6" />
                </div>
                <h2 class="text-2xl font-bold text-gray-800">Formulir Service</h2>
              </div>
              <p class="text-gray-500 text-sm">Isi data dan Kendala pada unit Anda.</p>
            </div>

            <form @submit.prevent="submitService" class="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ serviceForm.tenantType === 'Perusahaan' ? 'Nama PIC' : 'Nama Lengkap' }} <span class="text-red-500">*</span>
                </label>
                <input v-model="serviceForm.name" @input="validateServiceField('name')" @blur="clearServiceError('name')" type="text" placeholder="Nama Anda" :class="['w-full border rounded-lg px-4 py-2.5 focus:outline-none text-sm bg-gray-50 focus:bg-white', serviceErrors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500']">
                <p v-if="serviceErrors.name" class="text-red-500 text-xs mt-1">Nama wajib diisi</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tipe Klien <span class="text-red-500">*</span></label>
                <div class="relative">
                  <select v-model="serviceForm.tenantType" @change="validateServiceField('tenantType')" @blur="clearServiceError('tenantType')" :class="['w-full border rounded-lg px-4 py-2.5 focus:outline-none text-sm appearance-none cursor-pointer bg-gray-50 focus:bg-white', serviceErrors.tenantType ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500']">
                    <option disabled value="" hidden>Pilih Tipe</option>
                    <option v-for="(type, index) in tenantOptions" :key="index" :value="type">{{ type }}</option>
                  </select>
                  <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400"><ChevronDown class="w-4 h-4" /></div>
                </div>
                <p v-if="serviceErrors.tenantType" class="text-red-500 text-xs mt-1">Wajib dipilih</p>
              </div>

              <div v-if="serviceForm.tenantType === 'Perusahaan'" class="animate-fade-in-down">
                <label class="block text-sm font-medium text-gray-700 mb-1">Nama Perusahaan <span class="text-red-500">*</span></label>
                <div class="relative">
                  <input v-model="serviceForm.companyName" @input="validateServiceField('companyName')" @blur="clearServiceError('companyName')" type="text" placeholder="Contoh: PT. Sinar Elektro" :class="['w-full border rounded-lg px-4 py-2.5 pl-10 focus:outline-none text-sm bg-gray-50 focus:bg-white', serviceErrors.companyName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500']">
                  <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400"><Building2 class="w-4 h-4" /></div>
                </div>
                <p v-if="serviceErrors.companyName" class="text-red-500 text-xs mt-1">Nama perusahaan wajib diisi</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">No. WhatsApp <span class="text-red-500">*</span></label>
                <input v-model="serviceForm.phone" @input="(e) => sanitizePhoneInput(e)" @blur="clearServiceError('phone')" type="tel" placeholder="0812xxxx" :class="['w-full border rounded-lg px-4 py-2.5 focus:outline-none text-sm bg-gray-50 focus:bg-white', serviceErrors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500']">
                <p v-if="serviceErrors.phone" class="text-red-500 text-xs mt-1">No. WhatsApp wajib diisi</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nama Unit / Barang <span class="text-red-500">*</span></label>
                <input v-model="serviceForm.unitType" @input="validateServiceField('unitType')" @blur="clearServiceError('unitType')" type="text" placeholder="Contoh: Genset 10kVA" :class="['w-full border rounded-lg px-4 py-2.5 focus:outline-none text-sm bg-gray-50 focus:bg-white', serviceErrors.unitType ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500']">
                <p v-if="serviceErrors.unitType" class="text-red-500 text-xs mt-1">Jenis unit wajib diisi</p>
              </div>

              <div :class="serviceForm.tenantType === 'Perusahaan' ? '' : 'md:col-span-2'">
                <label class="block text-sm font-medium text-gray-700 mb-1">Alamat <span class="text-red-500">*</span></label>
                <input v-model="serviceForm.location" @input="validateServiceField('location')" @blur="clearServiceError('location')" type="text" placeholder="Alamat lengkap unit berada" :class="['w-full border rounded-lg px-4 py-2.5 focus:outline-none text-sm bg-gray-50 focus:bg-white', serviceErrors.location ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500']">
                <p v-if="serviceErrors.location" class="text-red-500 text-xs mt-1">Lokasi wajib diisi</p>
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Kendala / Kerusakan <span class="text-red-500">*</span></label>
                <textarea v-model="serviceForm.issue" @input="validateServiceField('issue')" @blur="clearServiceError('issue')" rows="3" placeholder="Jelaskan kendala yang dialami..." :class="['w-full border rounded-lg px-4 py-2.5 focus:outline-none text-sm resize-none bg-gray-50 focus:bg-white', serviceErrors.issue ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500']"></textarea>
                <p v-if="serviceErrors.issue" class="text-red-500 text-xs mt-1">Keluhan wajib diisi</p>
              </div>

              <div class="md:col-span-2 space-y-4">
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-3">
                  <Info class="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  <div class="text-sm text-blue-800">
                    <p class="font-medium">Konsultasi Service</p>
                    <p class="mt-1 text-xs md:text-sm text-blue-700 leading-snug">
                      Tim teknisi kami akan menganalisa keluhan Anda dan memberikan estimasi perbaikan via WhatsApp.
                    </p>
                  </div>
                </div>

                <button type="submit" class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex justify-center items-center gap-2">
                  Ajukan Service via WhatsApp
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </transition>

  </teleport>
</template>

<style scoped>
.services-wrapper div, 
.services-wrapper h3, 
.services-wrapper p {
  -webkit-tap-highlight-color: transparent;
  outline: none;
  transform: none !important;
}
.fade-bg-enter-active, .fade-bg-leave-active { transition: opacity 0.8s ease; }
.fade-bg-enter-from, .fade-bg-leave-to { opacity: 0; }
.slide-up-enter-active { transition: all 0.7s ease; }
.slide-up-leave-active { transition: all 0.4s ease; }
.slide-up-enter-from { opacity: 0; transform: translateY(40px); }
.slide-up-leave-to { opacity: 0; transform: translateY(-40px); }
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.3s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
@keyframes fadeInDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
.animate-fade-in-down { animation: fadeInDown 0.3s ease-out forwards; }
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
</style>