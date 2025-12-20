<script>
import {
  CheckCircle2, Zap, Wrench, ShoppingCart, Truck, Factory,
  Building2, Hammer, TrendingUp, Briefcase, Award, Clock,
  Shield, HeadsetIcon, Smile, ArrowRight, Users, MessageCircle,
  X, ChevronDown, Info, Loader2, AlertCircle
} from 'lucide-vue-next'
import apiClient from '@/api/axios'

export default {
  name: 'AboutView',

  components: {
    CheckCircle2, Zap, Wrench, ShoppingCart, Truck, Factory,
    Building2, Hammer, TrendingUp, Briefcase, Award, Clock,
    Shield, HeadsetIcon, Smile, ArrowRight, Users, MessageCircle,
    X, ChevronDown, Info, Loader2, AlertCircle
  },

  data() {
    return {
      baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
      
      // --- Data Asli AboutView ---
      mainServices: [
        { icon: Zap, title: 'Rewinding Elektro Motor 1 & 3 Phase' },
        { icon: Wrench, title: 'Service dan Maintenance Genset' },
        { icon: ShoppingCart, title: 'Penjualan Genset & Generator Baru' },
        { icon: Truck, title: 'Sewa Genset Berbagai Kapasitas' },
        { icon: Truck, title: 'Garansi Resmi & Transparan' },
        { icon: Truck, title: 'Konsultasi Gratis' },
      ],

      companyImage: {
        url: "/workshop.jpg"
      },

      stats: [
        { value: '15+', label: 'TAHUN PENGALAMAN', icon: Clock, color: 'text-blue-600' },
        { value: '100+', label: 'KLIEN PUAS', icon: Users, color: 'text-green-600' },
        { value: '100+', label: 'PROYEK SELESAI', icon: Zap, color: 'text-yellow-500' },
      ],

      // Clients from API
      clients: [],
      isLoadingClients: false,
      clientsError: null,

      whyChooseUs: [
        { icon: Award, title: 'Pengalaman Teruji', description: 'Rekam jejak sempurna sejak 2009 dalam menangani berbagai masalah elektro industri.' },
        { icon: Clock, title: 'Respon Cepat 24/7', description: 'Tim darurat kami siap sedia kapanpun mesin atau genset Anda mengalami masalah.' },
        { icon: Shield, title: 'Bergaransi Resmi', description: 'Setiap perbaikan dan suku cadang dilindungi garansi untuk ketenangan pikiran Anda.' },
        { icon: Wrench, title: 'Teknisi Berkompeten', description: 'Dikerjakan oleh tenaga ahli yang berkompetensi dalam bidang elektro.' },
        { icon: ShoppingCart, title: 'Sparepart Original', description: 'Kami hanya menggunakan suku cadang asli dan berkualitas tinggi untuk daya tahan maksimal.' },
        { icon: HeadsetIcon, title: 'Konsultasi Gratis', description: 'Diskusi teknis gratis untuk menemukan solusi paling efisien dan hemat biaya.' }
      ],

      whatsappNumber: '6289670308822',

      // --- Data Baru untuk Modal Service Form ---
      isServiceModalOpen: false,
      tenantOptions: ['Pribadi', 'Perusahaan'],
      serviceForm: {
        name: '',
        tenantType: '',
        companyName: '',
        phone: '',
        location: '',
        unitType: '',
        issue: ''
      },
      serviceErrors: {
        name: false,
        tenantType: false,
        companyName: false,
        phone: false,
        location: false,
        unitType: false,
        issue: false
      }
    }
  },

  async mounted() {
    await this.fetchClients()
  },

  methods: {
    // Fetch Clients from API
    async fetchClients() {
      try {
        this.isLoadingClients = true
        this.clientsError = null
        
        const response = await apiClient.get('/api/public/clients', {
          params: { limit: 20 }
        })
        
        if (response.data.meta.success) {
          this.clients = response.data.data.map(client => ({
            name: client.name,
            image: client.image 
              ? `${this.baseURL}/${client.image}` 
              : 'https://via.placeholder.com/100x100?text=Logo'
          }))
        }
      } catch (error) {
        console.error('Error fetching clients:', error)
        this.clientsError = 'Gagal memuat data klien'
        // Fallback to default icons if API fails
        this.clients = [
          { icon: Factory, name: 'Industri & Pabrik' },
          { icon: Building2, name: 'Perusahaan Swasta' },
          { icon: Hammer, name: 'Proyek Konstruksi' },
          { icon: TrendingUp, name: 'Retail & Perdagangan' },
          { icon: Zap, name: 'Pembangkit Listrik' }, 
          { icon: Truck, name: 'Logistik & Transport' },
          { icon: ShoppingCart, name: 'Pusat Perbelanjaan' },
          { icon: Briefcase, name: 'Perkantoran' }
        ]
      } finally {
        this.isLoadingClients = false
      }
    },

    // --- Method untuk Handle WhatsApp & Modal ---
    openWhatsApp(type) {
      if (type === 'perbaiki') {
        this.openServiceModal()
        return
      }

      if (type === 'konsultasi') {
        window.open(`https://wa.me/${this.whatsappNumber}`, '_blank')
        return
      }
    },

    openServiceModal() {
      this.isServiceModalOpen = true
      document.body.style.overflow = 'hidden'
    },

    closeServiceModal() {
      this.isServiceModalOpen = false
      document.body.style.overflow = ''
      this.resetServiceForm()
    },

    resetServiceForm() {
      this.serviceForm = {
        name: '', tenantType: '', companyName: '',
        phone: '', location: '', unitType: '', issue: ''
      }
      this.serviceErrors = {
        name: false, tenantType: false, companyName: false,
        phone: false, location: false, unitType: false, issue: false
      }
    },

    clearAllErrors() {
      Object.keys(this.serviceErrors).forEach(key => {
        this.serviceErrors[key] = false
      })
    },

    handleGlobalClick(e) {
      e.stopPropagation()
      this.clearAllErrors()
    },

    sanitizePhoneInput(event) {
      let value = event.target.value.replace(/\D/g, '')
      this.serviceForm.phone = value
    },

    validateServiceField(field) {
      this.serviceErrors[field] = !this.serviceForm[field]
    },

    clearServiceError(field) {
      if (this.serviceForm[field]) {
        this.serviceErrors[field] = false
      }
    },

    submitService() {
      // 1. Validasi manual semua field
      this.validateServiceField('name')
      this.validateServiceField('tenantType')
      if (this.serviceForm.tenantType === 'Perusahaan') {
        this.validateServiceField('companyName')
      }
      this.validateServiceField('phone')
      this.validateServiceField('location')
      this.validateServiceField('unitType')
      this.validateServiceField('issue')

      // 2. Cek apakah ada error
      const hasErrors = Object.keys(this.serviceErrors).some(key => {
        if (key === 'companyName' && this.serviceForm.tenantType !== 'Perusahaan') return false
        return this.serviceErrors[key]
      })

      if (hasErrors) return

      // 3. Format Pesan WhatsApp
      let message = `Halo Sinar Elektro Sejahtera,\n\nSaya ingin konsultasi mengenai Service/Perbaikan Unit.\n\n`
      
      message += `*Data Client:*\n`
      message += `Nama: ${this.serviceForm.name}\n`
      message += `Tipe: ${this.serviceForm.tenantType}\n`
      
      if (this.serviceForm.tenantType === 'Perusahaan') {
        message += `Perusahaan: ${this.serviceForm.companyName}\n`
      }
      
      message += `No. WA: ${this.serviceForm.phone}\n`
      message += `Lokasi: ${this.serviceForm.location}\n\n`
      message += `*Detail Unit & Kerusakan:*\n`
      message += `Nama Unit: ${this.serviceForm.unitType}\n`
      message += `Kendala: ${this.serviceForm.issue}\n\n`
      message += `Mohon informasi estimasi biaya dan jadwal pengecekan teknisi. Terima kasih.`

      // 4. Kirim ke WhatsApp
      const url = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`
      window.open(url, '_blank')
      
      // 5. Tutup Modal
      this.closeServiceModal()
    }
  }
}
</script>

<template>
  <div class="antialiased text-gray-800 overflow-x-hidden">
    
    <!-- Hero Section -->
    <section class="relative flex flex-col justify-center items-center text-center py-18 md:py-20 mt-20 md:mt-20 bg-[#1F65E2] overflow-hidden">
      <div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
      
      <div class="relative z-10 flex flex-col items-center px-4 max-w-4xl">
        <h1 class="font-bold mb-4 text-3xl md:text-[40px] leading-tight md:leading-snug text-white drop-shadow-sm tracking-wide">
          Tentang <span class="text-[#FCCC4D]">Sinar Elektro</span>
        </h1>
        
        <p class="text-blue-50 text-[16px] md:text-lg font-light leading-relaxed max-w-3xl opacity-90">
          Mitra strategis terpercaya untuk solusi perbaikan motor listrik, genset, dan kebutuhan energi industri Anda sejak 2009.
        </p>
      </div>
    </section>

    <!-- Company Info Section -->
    <section id="perusahaan" class="py-12 sm:py-20 lg:py-28 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-4 sm:gap-10 lg:gap-16 items-start">
          
          <div class="contents lg:block">
            <div class="order-1">
              <h2 class="text-2xl sm:text-4xl font-bold text-gray-900 mb-0 sm:mb-6 leading-tight">
                Solusi Energi & Mekanikal <br class="hidden sm:block">
                <span class="text-blue-600 relative">
                  Profesional
                  <svg class="absolute w-full h-2 sm:h-3 -bottom-1 left-0 text-yellow-400 opacity-60" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.00025 6.99997C25.7501 2.99991 74.8047 -1.49999 198 3.5" stroke="currentColor" stroke-width="3"/>
                  </svg>
                </span>
              </h2>
            </div>

            <div class="order-3">
              <p class="text-base sm:text-lg text-gray-600 leading-relaxed mb-3 sm:mb-6 text-justify">
                Berdiri sejak 2009, <strong>Sinar Elektro Sejahtera</strong> adalah workshop spesialis yang bergerak di bidang <em>Rewinding</em> Elektromotor 1 & 3 Phase. Selain itu kami juga menyediakan layanan service, penjualan, serta penyewaan genset.
              </p>
              <p class="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8">
                Melalui teknologi presisi dan teknisi ahli, kami menjamin mesin kembali ke performa maksimal pabrikan.
              </p>

              <div class="bg-blue-50/50 rounded-xl p-5 sm:p-6 border border-blue-100">
                <h3 class="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-base sm:text-base">
                  <Zap class="text-yellow-500" size="18"/> Layanan Unggulan Kami:
                </h3>
                
                <ul class="space-y-3">
                  <li v-for="(service, index) in mainServices" :key="index" class="flex items-start gap-3">
                    <CheckCircle2 class="text-blue-600 shrink-0 mt-0.5" :size="18" />
                    
                    <span class="text-gray-700 text-base sm:text-base font-normal sm:font-medium">
                      {{ service.title }}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="contents lg:block">
            <div class="order-2">
              <div class="relative rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl group mb-0 sm:mb-8">
                <div class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                <img src="/mitra.jpeg" alt="Workshop Sinar Elektro" class="w-full h-[220px] sm:h-[300px] lg:h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out" onerror="this.src='https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800';" />
                
                <div class="absolute left-3 bottom-3 bg-white rounded-xl p-3 sm:p-4 shadow-xl flex items-center gap-3">
                  <div class="flex items-center gap-3 sm:gap-4">
                    <div class="flex items-center justify-center shrink-0">
                      <img src="/logo.png" alt="Logo Workshop" class="w-8 h-8 sm:w-10 sm:h-10 object-contain" onerror="this.style.display='none'" />
                    </div>
                    <div>
                      <p class="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Kualitas Terjamin</p>
                      <p class="text-xs sm:text-base font-bold text-gray-900 leading-none mt-0.5">Sejak 2009</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="order-4 mt-2 sm:mt-0">
              <div class="grid grid-cols-3 gap-2 sm:gap-4 border-t border-gray-100 pt-6">
                <div v-for="(stat, index) in stats" :key="index" class="text-center">
                  <div class="flex justify-center mb-1 sm:mb-2">
                    <component :is="stat.icon" class="w-5 h-5 sm:w-6 sm:h-6" :class="stat.color" stroke-width="2.5" />
                  </div>
                  <div class="text-xl sm:text-[22px] font-extrabold text-gray-900 leading-none mb-1">{{ stat.value }}</div>
                  <div class="text-[9px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider sm:tracking-widest">{{ stat.label }}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Clients Section with API -->
    <section class="py-10 md:py-16 bg-gray-50 border-y border-gray-200 overflow-hidden">
      <div class="w-full">
        <div class="text-center mb-6 md:mb-10 px-4">
          <h2 class="text-[13px] md:text-[14px] font-bold text-slate-500 tracking-[0.15em] md:tracking-widest uppercase">
            DIPERCAYA OLEH BERBAGAI SEKTOR
          </h2>
        </div>

        <!-- Loading State -->
        <div v-if="isLoadingClients" class="flex justify-center items-center py-10">
          <Loader2 class="w-8 h-8 animate-spin text-blue-600" />
        </div>

        <!-- Error State -->
        <div v-else-if="clientsError" class="text-center py-10 px-4">
          <AlertCircle class="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p class="text-gray-500 text-sm">{{ clientsError }}</p>
        </div>

        <!-- Clients Marquee -->
        <div v-else class="relative w-full mask-linear-fade">
          <div class="flex w-max animate-marquee hover:[animation-play-state:paused] items-center py-2 md:py-4">
            <div v-for="i in 3" :key="i" class="flex gap-4 md:gap-6 px-2 md:px-3">
              <div v-for="(client, index) in clients" :key="index" 
                class="group relative flex items-center gap-3 md:gap-5 p-3.5 md:p-5 min-w-60 md:min-w-[300px] bg-white border border-slate-200/80 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_-5px_rgba(37,99,235,0.15)] hover:border-blue-300 transition-all duration-300 cursor-default">
                
                <!-- Image instead of Icon -->
                <div class="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-xl flex items-center justify-center transition-all duration-300 bg-white border border-slate-200 group-hover:border-blue-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/20 overflow-hidden">
                  <img 
                    v-if="client.image" 
                    :src="client.image" 
                    :alt="client.name"
                    class="w-full h-full object-contain p-1"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
                  />
                  <!-- Fallback Icon if image fails -->
                  <component 
                    v-if="client.icon"
                    :is="client.icon" 
                    class="w-5 h-5 md:w-6 md:h-6 text-slate-400 group-hover:text-blue-600" 
                    stroke-width="1.5"
                    style="display: none;"
                  />
                </div>

                <div class="flex flex-col">
                  <h3 class="text-[14px] md:text-[16px] font-bold text-slate-700 group-hover:text-blue-700 transition-colors">
                    {{ client.name }}
                  </h3>
                </div>

                <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div class="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="py-12 md:py-24 bg-white relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
          <h2 class="text-2xl md:text-[29px] font-bold text-gray-900 mb-4">
            Mengapa Memilih <span class="text-blue-600">Kami?</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div v-for="(item, index) in whyChooseUs" :key="index" 
            class="group bg-white rounded-2xl p-6 md:p-8 border border-gray-100 hover:border-blue-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out relative overflow-hidden">
            
            <div class="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300 blur-xl"></div>
            
            <div class="w-12 h-12 md:w-14 md:h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-4 md:mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
              <component :is="item.icon" class="w-6 h-6 md:w-7 md:h-7" stroke-width="1.5" />
            </div>
            
            <h3 class="text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              {{ item.title }}
            </h3>
            
            <p class="text-gray-600 leading-relaxed text-sm">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative py-24 bg-linear-to-r from-[#F0F9FF] to-[#FFFBF0] border-t border-blue-50/50 overflow-hidden">
      <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-[32px] font-extrabold text-[#0F172A] mb-4 tracking-tight">Butuh Konsultasi dan Perbaikan ?</h2>
        <p class="text-gray-500 text-lg mb-10 max-w-xl mx-auto font-normal leading-relaxed">Dapatkan konsultasi terbaik dan perbaikan dengan teknisi berpengalaman kami.</p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button @click="openWhatsApp('konsultasi')" class="w-full sm:w-auto px-8 py-3.5 bg-white text-orange-600 font-bold rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.03)] border border-gray-200 hover:shadow-md hover:-translate-y-0.5 hover:border-orange-200 transition-all duration-300 flex items-center justify-center gap-2">
            <MessageCircle class="w-5 h-5" /> Konsultasi
          </button>
          <button @click="openWhatsApp('perbaiki')" class="w-full sm:w-auto px-8 py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
            <Wrench class="w-5 h-5" /> Perbaikan
          </button>
        </div>
      </div>
    </section>

    <!-- Service Modal (sama seperti sebelumnya) -->
    <teleport to="body">
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

            <div class="p-6 md:p-8 overflow-y-auto custom-scrollbar">
              <div class="mb-6 border-b border-gray-100 pb-4">
                <div class="flex items-center gap-2 mb-2">
                  <div class="bg-red-100 p-2 rounded-lg text-red-600">
                    <Wrench class="w-6 h-6" />
                  </div>
                  <h2 class="text-2xl font-bold text-gray-800">Form Service</h2>
                </div>
                <p class="text-gray-500 text-sm">Isi data dan keluhan kerusakan unit Anda</p>
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
                  <label class="block text-sm font-medium text-gray-700 mb-1">Tipe Client <span class="text-red-500">*</span></label>
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

  </div>
</template>

<style scoped>
/* Marquee & Masking */
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-33.33%); }
}

.animate-marquee {
  animation: marquee 50s linear infinite;
  width: max-content;
}

.w-max {
  width: max-content;
}

.mask-linear-fade {
  mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
}

/* Modal & Animations */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.3s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }

@keyframes fadeInDown { 
  from { opacity: 0; transform: translateY(-10px); } 
  to { opacity: 1; transform: translateY(0); } 
}

.animate-fade-in-down { 
  animation: fadeInDown 0.3s ease-out forwards; 
}

/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
</style>
