<script>
import {
  Building2, ShoppingBag, MapPin, ChevronLeft, ChevronRight, CheckCircle,
  ArrowRight, Search, Filter, Wrench, MessageCircle, ChevronDown,
  X, CalendarClock, Trash2, Info, Plus, Check, Loader2, Phone
} from 'lucide-vue-next'

export default {
  name: 'Catalog',

  components: {
    Building2, ShoppingBag, MapPin, ChevronLeft, ChevronRight, CheckCircle, ArrowRight, Search, Filter,
    Wrench, MessageCircle, ChevronDown,
    X, CalendarClock, Trash2, Info, Plus, Check, Loader2, Phone
  },

  data() {
    return {
      // --- DATA CATALOG UTAMA ---
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 8,
      isDropdownOpen: false,
      selectedBrand: 'all',

      brandOptions: [
        { value: 'all', label: 'Semua' },
        { value: 'MITSUBISHI', label: 'Mitsubishi' },
        { value: 'PERKINS', label: 'Perkins' },
        { value: 'YANMAR', label: 'Yanmar' },
        { value: 'CATERPILLAR', label: 'Caterpillar' },
        { value: 'CUMMINS', label: 'Cummins' }
      ],

      // PROJECTS DATA
      projects: [
        { id: 'p1', title: 'Perkins 13 kVA Silent', price: 'Rp 2.500.000 / bln', image: 'https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=800', specs: [{ label: 'Brand', value: 'PERKINS' }, { label: 'Model', value: '403A-15G1' }, { label: 'Prime', value: '13 kVA' }] },
        { id: 'p2', title: 'Yanmar 60 kVA Silent', price: 'Rp 6.000.000 / bln', image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800', specs: [{ label: 'Brand', value: 'YANMAR' }, { label: 'Model', value: '4TNV98T' }, { label: 'Prime', value: '60 kVA' }] },
        { id: 'p3', title: 'Cummins 500 kVA Silent', price: 'Rp 45.000.000 / bln', image: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=800', specs: [{ label: 'Brand', value: 'CUMMINS' }, { label: 'Model', value: 'KTA19-G3' }, { label: 'Prime', value: '500 kVA' }] },
        { id: 'p4', title: 'Caterpillar 2000 kVA Silent', price: 'Rp 150.000.000 / bln', image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800', specs: [{ label: 'Brand', value: 'CATERPILLAR' }, { label: 'Model', value: '3516B' }, { label: 'Prime', value: '2000 kVA' }] },
        { id: 'p5', title: 'Mitsubishi 1000 kVA Silent', price: 'Rp 85.500.000 / bln', image: 'https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=800', specs: [{ label: 'Brand', value: 'MITSUBISHI' }, { label: 'Model', value: 'S12R-PTA' }, { label: 'Prime', value: '1000 kVA' }] },
        { id: 'p6', title: 'Perkins 100 kVA Silent', price: 'Rp 12.000.000 / bln', image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800', specs: [{ label: 'Brand', value: 'PERKINS' }, { label: 'Model', value: '1104C-44TAG2' }, { label: 'Prime', value: '100 kVA' }] },
        { id: 'p7', title: 'Cummins 250 kVA Silent', price: 'Rp 20.000.000 / bln', image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800', specs: [{ label: 'Brand', value: 'CUMMINS' }, { label: 'Model', value: '6LTAA8.9-G2' }, { label: 'Prime', value: '250 kVA' }] },
        { id: 'p8', title: 'Yanmar 40 kVA Silent', price: 'Rp 4.500.000 / bln', image: 'https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=800', specs: [{ label: 'Brand', value: 'YANMAR' }, { label: 'Model', value: '4TNV98' }, { label: 'Prime', value: '40 kVA' }] },
        { id: 'p9', title: 'Caterpillar 400 kVA Silent', price: 'Rp 32.750.000 / bln', image: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=800', specs: [{ label: 'Brand', value: 'CATERPILLAR' }, { label: 'Model', value: 'C13' }, { label: 'Prime', value: '400 kVA' }] },
        { id: 'p10', title: 'Mitsubishi 20 kVA Silent', price: 'Rp 3.000.000 / bln', image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800', specs: [{ label: 'Brand', value: 'MITSUBISHI' }, { label: 'Model', value: 'S4Q2' }, { label: 'Prime', value: '20 kVA' }] }
      ],

      // --- DATA UNTUK MODAL SEWA (RENTAL FORM) ---
      isRentalModalOpen: false,
      rentalForm: {
        name: '', tenantType: '', companyName: '', phone: '', duration: '', location: '', notes: '', selectedProducts: [], isCustomRequest: false
      },
      rentalErrors: {
        name: false, tenantType: false, companyName: false, phone: false, duration: false, location: false, notes: false, selectedProducts: false
      },
      tenantOptions: ['Pribadi', 'Perusahaan'],

      // --- KONFIGURASI LAZY LOAD (SCROLL) ---
      visibleProducts: [],
      isLoadingProducts: false,
      displayedCount: 0,
      initialLoad: 5,
      loadStep: 3,
    }
  },

  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },

  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },

  computed: {
    // --- CATALOG COMPUTED ---
    filteredProjects() {
      return this.projects.filter(project => {
        const searchLower = this.searchQuery.toLowerCase()
        const matchesSearch =
          project.title.toLowerCase().includes(searchLower) ||
          project.specs.some(spec => spec.value.toLowerCase().includes(searchLower))
        const matchesBrand = this.selectedBrand === 'all' ||
          project.specs.some(s => s.label === 'Brand' && s.value === this.selectedBrand)
        return matchesSearch && matchesBrand
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
      if (this.filteredProjects.length === 0) return 'Tidak ada produk ditemukan';
      if (this.selectedBrand === 'all') return 'Semua produk ditemukan';
      const option = this.brandOptions.find(opt => opt.value === this.selectedBrand);
      const brandName = option ? option.label : this.selectedBrand;
      return `Produk ${brandName} ditemukan`;
    },

    currentBrandLabel() {
      const option = this.brandOptions.find(opt => opt.value === this.selectedBrand);
      return option ? option.label : 'Semua';
    },

    activeTheme() {
      return {
        // UPDATE: Warna biru cerah untuk pagination
        btnActive: 'bg-blue-500 text-white shadow-blue-200 shadow-md border-blue-500',
        btnHover: 'hover:bg-blue-50 hover:text-blue-500',
        navHover: 'hover:bg-blue-500 hover:text-white hover:border-blue-500',
        titleHover: 'group-hover:text-blue-500',
        cardBtnHover: 'text-gray-700 hover:bg-blue-500 hover:text-white group-hover:shadow-blue-200'
      }
    },

    // --- MODAL DATA SOURCE ---
    allModalProducts() {
      return this.projects.map(p => ({
        id: p.id,
        name: p.title,
        price: p.price,
        image: p.image
      }));
    }
  },

  methods: {
    // --- NAVIGASI KE HALAMAN DETAIL (BARU DITAMBAHKAN) ---
    goToDetail(productId) {
      this.$router.push({ name: 'product-detail', params: { id: productId } });
    },

    // --- WHATSAPP DIRECT METHOD (KOSONGAN) ---
    contactWhatsApp() {
      // Membuka WhatsApp tanpa teks/template
      window.open('https://api.whatsapp.com/send?phone=6289670308822', '_blank');
    },

    // --- CATALOG METHODS ---
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
        // Scroll yang lebih smooth sedikit ke atas grid
        const grid = document.getElementById('project-grid')
        if (grid) {
          const yOffset = -100; // Offset agar tidak tertutup header jika ada
          const y = grid.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({top: y, behavior: 'smooth'});
        }
      }
    },

    resetFilter() {
      this.searchQuery = ''
      this.selectedBrand = 'all'
      this.currentPage = 1
    },

    toggleDropdown() { this.isDropdownOpen = !this.isDropdownOpen },

    selectBrand(brand) {
      this.selectedBrand = brand
      this.isDropdownOpen = false
      this.currentPage = 1
    },

    handleClickOutside(event) {
      const dropdown = this.$refs.dropdownContainer
      if (this.isDropdownOpen && dropdown && !dropdown.contains(event.target)) {
        this.isDropdownOpen = false
      }
    },

    // --- RENTAL MODAL METHODS ---

    openRentalModal(productFromCatalog = null) {
      Object.keys(this.rentalErrors).forEach(key => this.rentalErrors[key] = false)
      this.rentalForm.selectedProducts = []

      // Init Lazy Load List
      this.initializeProducts()

      if (productFromCatalog && typeof productFromCatalog === 'object') {
        const mappedProduct = {
          id: productFromCatalog.id,
          name: productFromCatalog.title,
          price: productFromCatalog.price,
          image: productFromCatalog.image
        }
        this.rentalForm.selectedProducts.push(mappedProduct)
      }

      this.isRentalModalOpen = true
    },
    
    closeRentalModal() { this.isRentalModalOpen = false },

    // --- LOGIC SCROLL LAZY LOAD ---
    initializeProducts() {
      this.displayedCount = this.initialLoad
      this.visibleProducts = this.allModalProducts.slice(0, this.displayedCount)
      this.isLoadingProducts = false
    },

    handleModalScroll(e) {
      const { scrollTop, clientHeight, scrollHeight } = e.target
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        this.loadMoreProducts()
      }
    },

    loadMoreProducts() {
      if (this.isLoadingProducts || this.displayedCount >= this.allModalProducts.length) return
      
      this.isLoadingProducts = true
      
      setTimeout(() => {
        const nextBatch = this.allModalProducts.slice(this.displayedCount, this.displayedCount + this.loadStep)
        this.visibleProducts.push(...nextBatch)
        this.displayedCount += this.loadStep
        this.isLoadingProducts = false
      }, 800)
    },

    // Form Utilities
    handleGlobalClick(event) {
      const interactiveTags = ['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON', 'LABEL'];
      const isInteractive = interactiveTags.includes(event.target.tagName) || event.target.closest('button') || event.target.closest('.product-item');
      if (!isInteractive) {
        Object.keys(this.rentalErrors).forEach(key => this.rentalErrors[key] = false)
      }
    },
    clearRentalError(field) { this.rentalErrors[field] = false },
    sanitizePhoneInput(e) {
      let value = e.target.value.replace(/\D/g, '')
      this.rentalForm.phone = value
      this.validateRentalField('phone')
      e.target.value = value
    },

    // Form Validation & Logic
    validateRentalField(field) {
      if (field === 'selectedProducts') {
        this.rentalErrors.selectedProducts = (this.rentalForm.selectedProducts.length === 0 && !this.rentalForm.isCustomRequest)
        return
      }
      if (field === 'companyName') {
        this.rentalErrors.companyName = !this.rentalForm.companyName
        return
      }
      if (field === 'tenantType') {
        this.rentalErrors.tenantType = !this.rentalForm.tenantType
        if (this.rentalForm.tenantType !== 'Perusahaan') this.rentalErrors.companyName = false
        return
      }
      this.rentalErrors[field] = !this.rentalForm[field]
    },

    toggleCustomRequest() { if (this.rentalForm.isCustomRequest) this.rentalErrors.selectedProducts = false },

    toggleProductSelection(product) {
      const index = this.rentalForm.selectedProducts.findIndex(p => p.id === product.id)
      if (index === -1) this.rentalForm.selectedProducts.push(product)
      else this.rentalForm.selectedProducts.splice(index, 1)
      this.validateRentalField('selectedProducts')
    },

    removeProduct(index) {
      this.rentalForm.selectedProducts.splice(index, 1)
      this.validateRentalField('selectedProducts')
      this.$nextTick(() => { if (this.$refs.selectedProductsRef) this.$refs.selectedProductsRef.focus() })
    },

    isProductSelected(productId) { return this.rentalForm.selectedProducts.some(p => p.id === productId) },

    // Submit ke WhatsApp (FORM)
    submitRental() {
      let hasError = false

      this.validateRentalField('selectedProducts')
      if (this.rentalErrors.selectedProducts) hasError = true

      const fields = ['name', 'phone', 'tenantType', 'duration', 'location', 'notes']
      fields.forEach(field => {
        this.validateRentalField(field)
        if (this.rentalErrors[field]) hasError = true
      })

      if (this.rentalForm.tenantType === 'Perusahaan') {
        this.validateRentalField('companyName')
        if (this.rentalErrors.companyName) hasError = true
      }

      if (hasError) return

      let productListText = ''
      const hasProduct = this.rentalForm.selectedProducts.length > 0
      const isChecked = this.rentalForm.isCustomRequest

      if (hasProduct) {
        this.rentalForm.selectedProducts.forEach((product, index) => {
          productListText += `${index + 1}. ${product.name} (${product.price})\n`
        })
      } else if (isChecked) {
        // --- TEKS TELAH DIUBAH DI SINI ---
        productListText = "_Saya belum memilih unit dan membutuhkan konsultasi/rekomendasi daya yang tepat._"
      }

      let closingSentence = "Mohon informasinya lebih lanjut untuk ketersediaan dan harga final. Terima kasih."
      if (hasProduct && isChecked) {
        closingSentence = "Mohon info ketersediaan dan saran teknis mengenai dayanya. Terima kasih."
      }

      const messageTemplate = `Halo Sinar Elektro Sejahtera, \n\nSaya ingin konsultasi sewa unit genset.\n\n*DATA PENYEWA*\nNama Lengkap: ${this.rentalForm.name}\nTipe Penyewa: ${this.rentalForm.tenantType}\n${this.rentalForm.tenantType === 'Perusahaan' ? `Nama Perusahaan: ${this.rentalForm.companyName}\n` : ''}No. WhatsApp: ${this.rentalForm.phone}\nDurasi Sewa: ${this.rentalForm.duration}\nLokasi: ${this.rentalForm.location}\n\n*UNIT YANG DIPILIH*\n${productListText}\n\n*DETAIL KEBUTUHAN/CATATAN*\n${this.rentalForm.notes}\n\n${closingSentence}`

      window.open(`https://api.whatsapp.com/send?phone=6289670308822&text=${encodeURIComponent(messageTemplate)}`, '_blank')

      this.closeRentalModal()
      this.rentalForm = { name: '', tenantType: '', companyName: '', phone: '', duration: '', location: '', notes: '', selectedProducts: [], isCustomRequest: false }
    },
  }
}
</script>

<template>
  <section class="relative flex flex-col justify-center items-center text-center py-20 mt-20 bg-[#1F65E2] overflow-hidden">
    <div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
    
    <div class="relative z-10 flex flex-col items-center px-4 max-w-4xl">
      <h1 class="font-bold mb-4 text-3xl md:text-[40px] leading-snug text-white drop-shadow-sm tracking-wide">
        Produk <span class="text-[#FCCC4D]">Terlengkap</span>
      </h1>
      <p class="text-blue-50 text-base md:text-lg font-light leading-relaxed max-w-3xl">
        Temukan berbagai pilihan mesin dan peralatan industri berkualitas tinggi. Tersedia opsi pembelian dan penyewaan sesuai kebutuhan Anda.
      </p>
    </div>
  </section>

  <section class="bg-white border-b border-gray-200 py-7 relative z-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row gap-6 items-start justify-between"> 
        
        <div class="relative w-full lg:w-[380px]">
          <div class="absolute top-3.5 left-0 pl-4 flex items-center pointer-events-none">
            <Search class="h-5 w-5 text-gray-400" />
          </div>
          <input 
            v-model="searchQuery" 
            type="text" 
            class="block w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1F64E1] focus:border-[#1F64E1] transition duration-150 ease-in-out text-sm" 
            placeholder="Cari produk, brand, atau spesifikasi..." 
          />
          <p class="mt-3 ml-1 text-[16px] font-medium text-[#4B5563] transition-all duration-300">
             {{ searchResultText }}
          </p>
        </div>

        <div class="flex items-center gap-2 w-full lg:w-auto relative">
            <div class="relative w-full lg:w-auto" ref="dropdownContainer">
              <button 
                @click="toggleDropdown"
                class="flex items-center justify-between gap-3 w-full lg:w-[180px] px-4 py-3.5 rounded-md text-sm font-normal transition-all whitespace-nowrap border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1F64E1] focus:border-[#1F64E1]"
              >
                <div class="flex items-center gap-2 text-gray-500">
                  <Filter class="w-4 h-4"/> 
                  <span class="text-gray-700">{{ currentBrandLabel }}</span>
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
                  class="absolute right-0 mt-2 w-full rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-hidden"
                >
                  <div role="menu" aria-orientation="vertical">
                    <button 
                      v-for="option in brandOptions"
                      :key="option.value"
                      @click="selectBrand(option.value)"
                      class="flex items-center w-full px-4 py-2 text-sm text-gray-700 transition-colors text-left hover:bg-[#1F64E1] hover:text-white"
                    >
                      {{ option.label }}
                    </button>
                  </div>
                </div>
              </transition>
            </div>
        </div>
      </div>
    </div>
  </section>

  <section id="proyek" class="pt-12 pb-20 bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div id="project-grid" class="relative min-h-[400px]">
        
        <div v-if="filteredProjects.length === 0" class="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-dashed border-gray-200">
            <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-400">
                <Search size="28"/>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">Produk tidak ditemukan</h3>
            <p class="text-gray-500 max-w-xs mx-auto mt-1 mb-6 text-sm">Tidak ada produk untuk merek atau kata kunci ini.</p>
            <button @click="resetFilter" class="px-6 py-2.5 rounded-full bg-white border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors">Reset Filter</button>
        </div>

        <transition-group
          tag="div"
          class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative"
          enter-active-class="transition-all duration-500 ease-out delay-100"
          enter-from-class="opacity-0 scale-90 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-300 ease-in absolute w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-90"
          move-class="transition-all duration-500 ease-in-out"
        >
            <div
              v-for="(project) in paginatedProjects"
              :key="project.id" 
              class="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              <div class="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  :src="project.image"
                  :alt="project.title"
                  class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
              </div>

              <div class="p-5 flex flex-col flex-grow">
                <h3 
                  :class="['text-[16px] font-bold text-gray-900 mb-3 transition-colors leading-snug', activeTheme.titleHover]"
                >
                  {{ project.title }}
                </h3>

                <div class="space-y-2 mb-6 flex-grow">
                  <div
                    v-for="(spec, idx) in project.specs"
                    :key="idx"
                    class="flex items-center justify-between text-xs border-b border-gray-50 pb-1.5 last:border-0"
                  >
                    <span class="text-gray-500">{{ spec.label }}</span>
                    <span class="font-medium text-gray-800">{{ spec.value }}</span>
                  </div>
                </div>

                <div class="flex gap-2 mt-auto">
                   <button
                    @click="goToDetail(project.id)"
                    class="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-300 bg-gray-50 text-gray-700 group-hover:scale-105 group-hover:shadow-md hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-200 cursor-pointer"
                  >
                    Lihat Detail
                    <ArrowRight size="16"/>
                  </button>
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
            :class="['h-10 px-4 rounded-xl border border-gray-200 bg-white text-gray-600 font-medium text-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm cursor-pointer', activeTheme.navHover]"
          >
            « Previous
          </button>
          
          <button
              v-for="index in totalPages"
              :key="index"
              @click="changePage(index)"
              :class="['w-10 h-10 rounded-xl font-bold text-sm transition-all duration-300 border flex items-center justify-center shadow-sm cursor-pointer', currentPage === index ? activeTheme.btnActive : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50']"
          >
            {{ index }}
          </button>
          
          <button 
            @click="changePage(currentPage + 1)" 
            :disabled="currentPage === totalPages"
            :class="['h-10 px-4 rounded-xl border border-gray-200 bg-white text-gray-600 font-medium text-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm cursor-pointer', activeTheme.navHover]"
          >
            Next »
          </button>
        </div>
      </div>
    </div>
  </section>

  <section class="py-24 bg-gradient-to-r from-[#F0F9FF] to-[#FFFBF0] border-t border-blue-50/50 relative">
    <div class="max-w-4xl mx-auto px-4 relative z-10 text-center">
      <h2 class="text-3xl md:text-[32px] font-extrabold text-[#0F172A] mb-4 tracking-tight">
        Butuh Genset untuk Operasional Bisnis Anda?
      </h2>
      <p class="text-gray-500 text-lg mb-10 max-w-xl mx-auto font-normal leading-relaxed">
        Dapatkan genset siap pakai dengan performa maksimal untuk bisnis Anda. Konsultasi gratis, respon cepat, dan penawaran harga terbaik.
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button 
          @click="contactWhatsApp"
          class="w-full sm:w-auto px-8 py-3.5 bg-white text-orange-500 font-bold rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
        >
          <MessageCircle class="w-5 h-5" />
          Tanyakan
        </button>
        
        <button 
          @click="openRentalModal()" 
          class="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShoppingBag class="w-5 h-5" />
          Sewa Genset
        </button>
      </div>
    </div>
  </section>

  <teleport to="body">
    <transition name="modal-fade">
      <div 
        v-if="isRentalModalOpen" 
        class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        @click.self="closeRentalModal"
      >
        <div 
          @click="handleGlobalClick"
          class="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row h-[90vh] relative font-poppins"
        >
          <button @click="closeRentalModal" class="absolute top-3 right-3 md:top-4 md:right-4 z-50 p-2 rounded-full bg-white/80 hover:bg-red-50 text-gray-500 hover:text-red-500 transition-all shadow-sm border border-transparent hover:border-red-100 cursor-pointer">
            <X class="w-6 h-6" />
          </button>

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
                    <img :src="item.image" alt="Selected Product" class="w-12 h-12 object-cover rounded-md border border-gray-100" />
                    <div class="flex-1">
                      <p class="font-bold text-blue-700 text-xs md:text-sm">{{ item.name }}</p>
                      <p class="text-xs font-semibold text-orange-500 mt-1">{{ item.price }}</p>
                    </div>
                    <button type="button" @click="removeProduct(index)" class="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-full transition-colors self-center cursor-pointer">
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div v-else class="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 text-sm flex flex-col items-center justify-center gap-2">
                   <div class="bg-gray-100 p-3 rounded-full"><ShoppingBag class="w-6 h-6 text-gray-300" /></div>
                   <span>Belum ada produk dipilih.</span>
                   <span class="text-blue-500 text-xs font-medium">Klik tanda (+) pada unit genset</span>
                </div>
                <p v-if="rentalErrors.selectedProducts" class="text-red-500 text-xs mt-2 text-center font-medium">Mohon pilih unit genset atau centang opsi konsultasi</p>
              </div>

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
                  <input v-model="rentalForm.phone" @input="sanitizePhoneInput" @blur="clearRentalError('phone')" type="tel" placeholder="0812xxxx" :class="['w-full border rounded-lg px-4 py-2.5 focus:outline-none text-sm bg-gray-50 focus:bg-white', rentalErrors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500']">
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
                <Info class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div class="text-sm text-blue-800">
                  <p class="font-medium">Informasi Penting</p>
                  <p class="mt-1 text-xs md:text-sm text-blue-700 leading-snug">Data ini akan diteruskan ke WhatsApp untuk <strong>konsultasi lebih lanjut</strong> dan mendapatkan <strong>penawaran harga terbaik</strong> dari tim kami.</p>
                </div>
              </div>

              <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex justify-center items-center gap-2 mt-4 cursor-pointer">
                Kirim & Konsultasi via WhatsApp
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
              </button>
            </form>
          </div>

          <div class="w-full md:w-1/2 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200 p-6 md:p-8 flex flex-col h-full overflow-hidden min-h-0">
            <div class="flex items-center mb-4 pb-2 border-b border-gray-200/60 flex-shrink-0">
              <h3 class="font-bold text-gray-800 text-lg">Pilih Unit Genset</h3>
            </div>
            
            <div class="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar relative min-h-0" @scroll="handleModalScroll">
              <div v-for="product in visibleProducts" :key="product.id" class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex gap-3 items-center group product-item">
                <div class="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-100">
                  <img :src="product.image" :alt="product.name" class="w-full h-full object-cover" />
                </div>
                <div class="flex-1">
                  <h4 class="font-bold text-gray-800 text-sm group-hover:text-blue-600 transition-colors">{{ product.name }}</h4>
                  <span class="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded mt-2 inline-block">{{ product.price }}</span>
                </div>
                <button @click="toggleProductSelection(product)" :class="['h-10 w-10 flex items-center justify-center rounded-lg transition-all shadow-sm cursor-pointer', isProductSelected(product.id) ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-100 hover:bg-blue-600 text-gray-600 hover:text-white active:scale-90']">
                  <Check v-if="isProductSelected(product.id)" class="w-6 h-6" />
                  <Plus v-else class="w-6 h-6" />
                </button>
              </div>

              <div v-if="isLoadingProducts" class="flex justify-center items-center py-4">
                <Loader2 class="w-6 h-6 animate-spin text-blue-600" />
                <span class="ml-2 text-sm text-gray-500 font-medium">Memuat produk lainnya...</span>
              </div>
              
              <div v-if="!isLoadingProducts && visibleProducts.length >= allModalProducts.length" class="text-center py-4 text-xs text-gray-400 font-medium">
                Semua produk telah ditampilkan
              </div>
            </div>

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
  </teleport>
</template>

<style scoped>
/* Transisi untuk Modal */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.3s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }

@keyframes fadeInDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
.animate-fade-in-down { animation: fadeInDown 0.3s ease-out forwards; }

.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
</style>