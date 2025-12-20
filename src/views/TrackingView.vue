<script>
import { 
  Search, Hash, Loader2, AlertCircle, Info, PackageSearch, MessageCircle, MapPin, Check,
  ClipboardList, Wrench, ClipboardCheck, Truck, PackageCheck, ShoppingCart, Calendar
} from 'lucide-vue-next'
import apiClient from '@/api/axios'

export default {
  name: 'TrackingView',
  components: {
    Search, Hash, Loader2, AlertCircle, Info, PackageSearch, MessageCircle, MapPin, Check,
    ClipboardList, Wrench, ClipboardCheck, Truck, PackageCheck, ShoppingCart, Calendar
  },
  data() {
    return {
      baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
      searchCode: '',
      isLoading: false,
      errorMsg: '',
      trackingResult: null
    }
  },
  computed: {
    currentStepIndex() { 
      if (!this.trackingResult) return 0
      
      const statusMap = {
        // Penjualan
        'proses': 0,
        'dikirim': 1,
        // Penyewaan
        'disewa': 1,
        // Perbaikan
        'masuk': 0,
        'dikerjakan': 1,
        // Common
        'selesai': 2
      }
      
      return statusMap[this.trackingResult.status] || 0
    },

    currentSteps() {
      if (!this.trackingResult) return []
      const type = this.trackingResult.type

      if (type === 'penyewaan') {
        return [
          { label: 'Booking Confirmed', icon: 'Calendar' },
          { label: 'Unit di Lokasi', icon: 'MapPin' },
          { label: 'Selesai', icon: 'Check' }
        ]
      } else if (type === 'penjualan') {
        return [
          { label: 'Order Masuk', icon: 'ShoppingCart' },
          { label: 'Dalam Pengiriman', icon: 'Truck' },
          { label: 'Pesanan Tiba', icon: 'Check' }
        ]
      } else if (type === 'perbaikan') {
        return [
          { label: 'Unit Masuk', icon: 'ClipboardList' },
          { label: 'Dikerjakan', icon: 'Wrench' },
          { label: 'Selesai', icon: 'Check' }
        ]
      }
      return []
    },

    currentStatusInfo() {
      if (!this.trackingResult) return { title: '-', description: '-' }
      
      const step = this.currentStepIndex
      const type = this.trackingResult.type

      if (type === 'penyewaan') {
        switch (step) {
          case 0: return { title: 'Booking Terkonfirmasi', description: 'Jadwal sewa telah dikunci. Admin sedang menyiapkan unit dan administrasi.' }
          case 1: return { title: 'Unit Aktif di Lokasi', description: 'Unit telah tiba dan beroperasi di lokasi proyek. Masa sewa dimulai.' }
          case 2: return { title: 'Sewa Selesai', description: 'Masa sewa telah berakhir. Unit telah dikembalikan. Terima kasih atas kepercayaan Anda.' }
        }
      }
      else if (type === 'penjualan') {
        switch (step) {
          case 0: return { title: 'Pesanan Diterima', description: 'Pembayaran terverifikasi. Kami sedang menyiapkan pesanan Anda.' }
          case 1: return { title: 'Dalam Pengiriman', description: 'Paket sedang dalam perjalanan menuju alamat tujuan.' }
          case 2: return { title: 'Transaksi Selesai', description: 'Barang telah diterima. Terima kasih telah berbelanja.' }
        }
      }
      else if (type === 'perbaikan') {
        switch (step) {
          case 0: return { title: 'Unit Masuk Workshop', description: 'Unit telah diterima dan sedang menjalani diagnosa awal oleh teknisi.' }
          case 1: return { title: 'Sedang Dikerjakan', description: 'Teknisi sedang melakukan perbaikan dan penggantian komponen pada unit.' }
          case 2: return { title: 'Perbaikan Selesai', description: 'Unit sudah selesai diperbaiki dan siap diambil atau diantar kembali.' }
        }
      }
      return { title: 'Status Info', description: 'Silakan hubungi admin.' }
    },

    dynamicHelpText() {
      if (!this.trackingResult) return 'Butuh bantuan?'
      const type = this.trackingResult.type
      if (type === 'perbaikan') return 'Butuh bantuan terkait perbaikan ini?'
      if (type === 'penyewaan') return 'Butuh bantuan terkait penyewaan ini?'
      if (type === 'penjualan') return 'Butuh bantuan terkait pesanan ini?'
      return 'Butuh bantuan?'
    },

    visibleDetails() {
      if (!this.trackingResult) return []
      const t = this.trackingResult
      let details = []

      // A. PERBAIKAN
      if (t.type === 'perbaikan') {
        details = [
          { label: 'Kode Invoice', value: t.invoice },
          { label: 'Nama Barang', value: t.item_repair },
          { label: 'Tanggal Masuk', value: this.formatDate(t.start_date) },
          { label: 'Estimasi Selesai', value: this.formatDate(t.end_date) },
          { label: 'Deskripsi Kerusakan', value: t.description },
          { label: 'PIC', value: t.pic },
          { label: 'Biaya Perbaikan', value: this.formatCurrency(t.repair_cost), isHighlight: true }
        ]

        if (t.customer) {
          details.push(
            { label: 'Customer', value: t.customer.name_perusahaan },
            { label: 'Telepon', value: t.customer.no_telp },
            { label: 'Alamat', value: t.customer.address }
          )
        }

        if (t.component) {
          details.push({ label: 'Komponen Diganti', value: t.component })
        }
      }

      // B. PENYEWAAN
      else if (t.type === 'penyewaan') {
        details = [
          { label: 'Kode Invoice', value: t.invoice },
          { label: 'Tanggal Booking', value: this.formatDate(t.created_at) },
          { label: 'Total Biaya Sewa', value: this.formatCurrency(t.grand_total), isHighlight: true }
        ]

        if (t.customer) {
          details.push(
            { label: 'Nama Perusahaan', value: t.customer.name_perusahaan },
            { label: 'Telepon', value: t.customer.no_telp },
            { label: 'Lokasi Proyek', value: t.customer.address }
          )
        }

        // Add rental period from details
        if (t.details && t.details.length > 0) {
          const firstDetail = t.details[0]
          details.push(
            { label: 'Tanggal Mulai', value: this.formatDate(firstDetail.start_date) },
            { label: 'Tanggal Selesai', value: this.formatDate(firstDetail.end_date) }
          )

          // Add product list
          const products = t.details.map(d => `${d.product.title} (${d.qty}x)`).join(', ')
          details.push({ label: 'Unit Disewa', value: products })
        }
      }

      // C. PENJUALAN
      else if (t.type === 'penjualan') {
        details = [
          { label: 'Kode Invoice', value: t.invoice },
          { label: 'Tanggal Transaksi', value: this.formatDate(t.created_at) },
          { label: 'Total', value: this.formatCurrency(t.grand_total), isHighlight: true }
        ]

        if (t.customer) {
          details.push(
            { label: 'Customer', value: t.customer.name_perusahaan },
            { label: 'Telepon', value: t.customer.no_telp },
            { label: 'Alamat', value: t.customer.address }
          )
        }

        if (t.transaction_details && t.transaction_details.length > 0) {
          const products = t.transaction_details.map(d => `${d.product.title} (${d.qty}x)`).join(', ')
          details.push({ label: 'Barang', value: products })
        }
      }

      return details
    }
  },
  methods: {
    async handleSearch() {
      this.errorMsg = ''
      this.trackingResult = null
      
      if (!this.searchCode.trim()) {
        this.errorMsg = 'Mohon masukkan kode invoice.'
        return
      }

      try {
        this.isLoading = true
        
        // Try main tracking endpoint (for sales)
        try {
          const response = await apiClient.get(`/api/public/tracking/${this.searchCode.trim()}`)
          if (response.data.meta.success) {
            this.trackingResult = response.data.data
            return
          }
        } catch (err) {
          // Continue to next endpoint
        }

        // Try repair endpoint
        try {
          const repairResponse = await apiClient.get(`/api/public/tracking/repair/${this.searchCode.trim()}`)
          if (repairResponse.data.meta.success) {
            this.trackingResult = repairResponse.data.data
            return
          }
        } catch (err) {
          // Continue to next endpoint
        }

        // Try rental endpoint
        try {
          const rentalResponse = await apiClient.get(`/api/public/tracking/rental/${this.searchCode.trim()}`)
          if (rentalResponse.data.meta.success) {
            this.trackingResult = rentalResponse.data.data
            return
          }
        } catch (err) {
          // All endpoints failed
        }

        // If we reach here, invoice not found
        this.errorMsg = `Invoice "${this.searchCode}" tidak ditemukan.`

      } catch (error) {
        console.error('Error fetching tracking:', error)
        this.errorMsg = 'Gagal memuat data tracking. Silakan coba lagi.'
      } finally {
        this.isLoading = false
      }
    },

    resetSearch() {
      this.searchCode = ''
      this.trackingResult = null
      this.errorMsg = ''
    },
    
    contactSupport() {
      if (!this.trackingResult) return
      
      const code = this.trackingResult.invoice
      const type = this.trackingResult.type
      let typeText = 'barang'
      
      if (type === 'perbaikan') typeText = 'perbaikan'
      else if (type === 'penyewaan') typeText = 'penyewaan'
      else if (type === 'penjualan') typeText = 'pesanan'
      
      const msg = `Halo Sinar Elektro Sejahtera, saya ingin bertanya tentang ${typeText} dengan invoice ${code}`
      const phone = '6289670308822'
      
      window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(msg)}`, '_blank')
    },

    formatDate(date) {
      if (!date) return '-'
      return new Date(date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    },

    formatCurrency(amount) {
      if (!amount) return '-'
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(amount)
    },

    getStepCircleStyle(index) {
      if (index < this.currentStepIndex) return 'bg-[#1F65E2] border-[#1F65E2] text-white shadow-md'
      else if (index === this.currentStepIndex) return 'bg-white border-[#1F65E2] ring-4 ring-blue-50 text-[#1F65E2] shadow-lg scale-110'
      else return 'bg-white border-gray-200 text-gray-300'
    },

    getIconStyle(index) {
      if (index < this.currentStepIndex) return 'text-white'
      else if (index === this.currentStepIndex) return 'text-[#1F65E2]'
      else return 'text-gray-300'
    },

    getTypeBadgeColor(type) {
      if (type === 'perbaikan') return 'bg-orange-50 text-orange-600 border-orange-200'
      if (type === 'penyewaan') return 'bg-purple-50 text-purple-600 border-purple-200'
      if (type === 'penjualan') return 'bg-green-50 text-green-600 border-green-200'
      return 'bg-gray-50 text-gray-600 border-gray-200'
    },

    getImageUrl(imagePath) {
      if (!imagePath) return null
      if (imagePath.startsWith('http')) return imagePath
      return `${this.baseURL}/${imagePath}`
    }
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    
    <!-- Hero Section -->
    <section class="relative flex flex-col justify-center items-center text-center py-16 mt-16 bg-[#1F65E2] overflow-hidden">
      <div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
      <div class="relative z-10 flex flex-col items-center px-4 max-w-4xl">
        <h1 class="font-bold mb-2 text-3xl md:text-4xl text-white drop-shadow-sm tracking-wide">
          Lacak <span class="text-[#FCCC4D]">Status Barang</span>
        </h1>
        <p class="text-blue-50 text-base font-light leading-relaxed">
          Pantau progres Perbaikan, Penyewaan, atau Pembelian unit Anda.
        </p>
      </div>
    </section>

    <!-- Search Box -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
        <div class="text-center mb-6">
          <h2 class="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <Search class="w-5 h-5 text-[#1F65E2]" />
            Lacak Sekarang
          </h2>
          <p class="text-sm text-gray-500 mt-1">Masukkan Kode Invoice Anda</p>
        </div>

        <div class="flex flex-col md:flex-row gap-3 max-w-2xl mx-auto">
          <div class="relative grow">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Hash class="h-5 w-5 text-gray-400" />
            </div>
            <input 
              v-model="searchCode" 
              @keyup.enter="handleSearch"
              type="text" 
              class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1F65E2] focus:border-[#1F65E2] sm:text-sm transition-shadow" 
              placeholder="Contoh: INV-20251219-001"
            >
          </div>
          <div class="flex gap-2">
            <button 
              @click="handleSearch" 
              :disabled="isLoading"
              class="flex-1 md:flex-none px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-[#1F65E2] hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 min-w-[100px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Loader2 v-if="isLoading" class="w-4 h-4 animate-spin" />
              <span v-else>Cari</span>
            </button>
            <button @click="resetSearch" class="px-4 py-3 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              Reset
            </button>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="errorMsg" class="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-center">
          <p class="text-red-600 text-sm font-medium flex items-center justify-center gap-2">
            <AlertCircle class="w-4 h-4" /> {{ errorMsg }}
          </p>
        </div>
      </div>
    </div>

    <!-- Tracking Result -->
    <transition name="fade">
      <div v-if="trackingResult" class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          
          <!-- Header -->
          <div class="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-2">
            <div>
              <p class="text-xs text-gray-500 uppercase tracking-wider font-bold">Kode Invoice</p>
              <p class="text-lg font-bold text-[#1F65E2]">{{ trackingResult.invoice }}</p>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-bold border capitalize" :class="getTypeBadgeColor(trackingResult.type)">
              {{ trackingResult.type }}
            </span>
          </div>

          <div class="p-6 md:p-8">
            
            <!-- Repair Image (if exists) -->
            <div v-if="trackingResult.type === 'perbaikan' && trackingResult.image" class="mb-8">
              <h3 class="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Foto Unit</h3>
              <div class="rounded-xl overflow-hidden border border-gray-200">
                <img 
                  :src="getImageUrl(trackingResult.image)" 
                  :alt="trackingResult.item_repair"
                  class="w-full h-64 object-cover"
                />
              </div>
            </div>

            <!-- Rental Products (if exists) -->
            <div v-if="trackingResult.type === 'penyewaan' && trackingResult.details && trackingResult.details.length > 0" class="mb-8">
              <h3 class="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Unit yang Disewa</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  v-for="(detail, idx) in trackingResult.details" 
                  :key="idx"
                  class="flex gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <div v-if="detail.product.image" class="flex-shrink-0">
                    <img 
                      :src="getImageUrl(detail.product.image)" 
                      :alt="detail.product.title"
                      class="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-semibold text-gray-900">{{ detail.product.title }}</p>
                    <p class="text-xs text-gray-600 mt-1">Qty: {{ detail.qty }} unit</p>
                    <p class="text-xs text-purple-600 font-medium mt-1">{{ formatCurrency(detail.rent_price) }}/bulan</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Progress Steps -->
            <div class="mb-12 relative px-2 mt-4">
              <div class="flex items-center justify-between w-full">
                
                <div v-for="(step, index) in currentSteps" :key="index" class="relative flex flex-col items-center flex-1">
                  
                  <!-- Connector Line -->
                  <div 
                    v-if="index !== 0" 
                    class="absolute top-5 md:top-6 right-[50%] w-full h-1.5 -z-10 rounded-full overflow-hidden bg-gray-100"
                  >
                    <div 
                      class="h-full w-full transition-all duration-1000 origin-left"
                      :class="index <= currentStepIndex ? 'bg-[#1F65E2] animate-flow-bar' : 'bg-transparent'"
                    ></div>
                  </div>

                  <!-- Step Circle -->
                  <div class="relative group">
                    <span v-if="index === currentStepIndex" class="absolute -inset-4 rounded-full bg-blue-400 opacity-20 animate-ping"></span>
                    <span v-if="index === currentStepIndex" class="absolute -inset-1 rounded-full bg-blue-100 animate-pulse"></span>

                    <div 
                      class="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-[3px] transition-all duration-500 relative z-10 shadow-sm"
                      :class="getStepCircleStyle(index)"
                    >
                      <component 
                        :is="step.icon" 
                        class="w-5 h-5 md:w-6 md:h-6 transition-all duration-300"
                        :class="getIconStyle(index)"
                      />
                      <div v-if="index < currentStepIndex" class="absolute -right-1 -bottom-1 bg-green-500 rounded-full p-0.5 border-2 border-white">
                        <Check class="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>

                  <!-- Step Label -->
                  <div class="mt-4 text-center px-1">
                    <p 
                      class="text-[10px] md:text-xs font-bold uppercase tracking-wide transition-colors duration-300"
                      :class="index <= currentStepIndex ? 'text-[#1F65E2]' : 'text-gray-400'"
                    >
                      {{ step.label }}
                    </p>
                    
                    <!-- Date from tracking history -->
                    <div v-if="index <= currentStepIndex && trackingResult.trackings && trackingResult.trackings[index]" class="mt-1">
                      <p class="text-[10px] text-gray-500 font-medium bg-gray-50 px-2 py-0.5 rounded-md inline-block border border-gray-100">
                        {{ formatDate(trackingResult.trackings[index].created_at) }}
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            <!-- Status Info Box -->
            <div class="bg-[#EFF6FF] border border-blue-200 rounded-xl p-5 flex items-start gap-4 mb-8 shadow-[0_2px_8px_rgba(59,130,246,0.1)] relative overflow-hidden">
              <div class="absolute right-0 top-0 opacity-5 -mr-4 -mt-4">
                <component :is="currentSteps[currentStepIndex] ? currentSteps[currentStepIndex].icon : 'Info'" class="w-24 h-24 text-blue-800" />
              </div>
              <div class="bg-white p-2.5 rounded-full shadow-sm text-[#1F65E2] animate-bounce-slow z-10">
                <Info class="w-6 h-6" />
              </div>
              <div class="z-10 flex-1">
                <p class="text-sm md:text-base text-blue-900 font-bold mb-1">
                  Status Terkini: {{ currentStatusInfo.title }}
                </p>
                <p class="text-xs md:text-sm text-blue-700 leading-relaxed opacity-90">
                  {{ currentStatusInfo.description }}
                </p>
              </div>
            </div>

            <!-- Details Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
              
              <div v-for="(field, idx) in visibleDetails" :key="idx">
                <label class="text-xs text-gray-400 font-bold uppercase tracking-wide mb-1 block">
                  {{ field.label }}
                </label>
                
                <p 
                  class="text-base font-semibold" 
                  :class="field.isHighlight ? 'text-orange-600' : 'text-gray-900'"
                >
                  {{ field.value }}
                </p>
              </div>

            </div>

            <!-- Tracking History -->
            <div v-if="trackingResult.trackings && trackingResult.trackings.length > 0" class="mt-8 pt-6 border-t border-gray-100">
              <h3 class="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Riwayat Tracking</h3>
              <div class="space-y-3">
                <div 
                  v-for="(track, idx) in trackingResult.trackings" 
                  :key="idx"
                  class="flex gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Check class="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-semibold text-gray-900 capitalize">{{ track.status }}</p>
                    <p class="text-xs text-gray-600 mt-0.5">{{ track.notes }}</p>
                    <p class="text-xs text-gray-400 mt-1">{{ formatDate(track.created_at) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Contact Support -->
            <div class="mt-8 pt-6 border-t border-gray-100 flex justify-end">
              <button @click="contactSupport" class="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#1F65E2] transition-colors">
                <MessageCircle class="w-4 h-4 group-hover:scale-110 transition-transform" />
                {{ dynamicHelpText }}
              </button>
            </div>

          </div>
        </div>
      </div>
    </transition>

    <!-- Empty State -->
    <div v-if="!trackingResult && !isLoading" class="mt-12 flex flex-col items-center justify-center opacity-40">
      <PackageSearch class="w-24 h-24 text-gray-300 mb-4" />
      <p class="text-gray-400 font-medium">Silakan masukkan kode Invoice / Resi</p>
    </div>

  </div>
</template>

<style scoped>
.animate-flow-bar {
  background-image: linear-gradient(45deg, #1F65E2 25%, #60a5fa 50%, #1F65E2 75%);
  background-size: 20px 20px;
  animation: move-stripe 1s linear infinite;
}
@keyframes move-stripe { 0% { background-position: 0 0; } 100% { background-position: 20px 0; } }
@keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
.animate-bounce-slow { animation: bounce-slow 2s infinite; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease, transform 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(10px); }
</style>
