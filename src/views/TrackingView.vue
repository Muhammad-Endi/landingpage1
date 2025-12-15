<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    
    <section class="relative flex flex-col justify-center items-center text-center py-16 mt-16 bg-[#1F65E2] overflow-hidden">
      <div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
      <div class="relative z-10 flex flex-col items-center px-4 max-w-4xl">
        <h1 class="font-bold mb-2 text-3xl md:text-4xl text-white drop-shadow-sm tracking-wide">
          Lacak <span class="text-[#FCCC4D]">Status Barang</span>
        </h1>
        <p class="text-blue-50 text-base font-light leading-relaxed">
          Pantau progres Perbaikan, Penyewaan, atau Pembelian unit Anda.
        </p>
      </div>
    </section>

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
          <div class="relative flex-grow">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Hash class="h-5 w-5 text-gray-400" />
            </div>
            <input 
              v-model="searchCode" 
              @keyup.enter="handleSearch"
              type="text" 
              class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1F65E2] focus:border-[#1F65E2] sm:text-sm transition-shadow" 
              placeholder="Contoh: SRV-001, RENT-001, SALE-001"
            >
          </div>
          <div class="flex gap-2">
            <button 
              @click="handleSearch" 
              :disabled="isLoading"
              class="flex-1 md:flex-none px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-[#1F65E2] hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 min-w-[100px]"
            >
              <Loader2 v-if="isLoading" class="w-4 h-4 animate-spin" />
              <span v-else>Cari</span>
            </button>
            <button @click="resetSearch" class="px-4 py-3 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              Reset
            </button>
          </div>
        </div>

        <div v-if="errorMsg" class="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-center">
          <p class="text-red-600 text-sm font-medium flex items-center justify-center gap-2">
            <AlertCircle class="w-4 h-4" /> {{ errorMsg }}
          </p>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div v-if="trackingResult" class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          
          <div class="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-2">
            <div>
              <p class="text-xs text-gray-500 uppercase tracking-wider font-bold">Kode Invoice</p>
              <p class="text-lg font-bold text-[#1F65E2]">{{ trackingResult.invoiceCode }}</p>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-bold border" :class="getTypeBadgeColor(trackingResult.type)">
              {{ trackingResult.type }}
            </span>
          </div>

          <div class="p-6 md:p-8">
            
            <div class="mb-12 relative px-2 mt-4">
              <div class="flex items-center justify-between w-full">
                
                <div v-for="(step, index) in currentSteps" :key="index" class="relative flex flex-col items-center flex-1">
                  
                  <div 
                    v-if="index !== 0" 
                    class="absolute top-5 md:top-6 right-[50%] w-full h-1.5 -z-10 rounded-full overflow-hidden bg-gray-100"
                  >
                    <div 
                      class="h-full w-full transition-all duration-1000 origin-left"
                      :class="index <= currentStepIndex ? 'bg-[#1F65E2] animate-flow-bar' : 'bg-transparent'"
                    ></div>
                  </div>

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

                  <div class="mt-4 text-center px-1">
                    <p 
                      class="text-[10px] md:text-xs font-bold uppercase tracking-wide transition-colors duration-300"
                      :class="index <= currentStepIndex ? 'text-[#1F65E2]' : 'text-gray-400'"
                    >
                      {{ step.label }}
                    </p>
                    
                    <div v-if="index <= currentStepIndex && trackingResult.history[index]" class="mt-1">
                      <p class="text-[10px] text-gray-500 font-medium bg-gray-50 px-2 py-0.5 rounded-md inline-block border border-gray-100">
                        {{ trackingResult.history[index].date }}
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </div>

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

            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
              
              <div v-for="(field, idx) in visibleDetails" :key="idx">
                <label class="text-xs text-gray-400 font-bold uppercase tracking-wide mb-1 block">
                  {{ field.label }}
                </label>
                
                <p 
                  class="text-base font-semibold" 
                  :class="field.isHighlight ? 'text-orange-600' : 'text-gray-900'"
                >
                  <span v-if="field.icon" class="inline-block mr-1">
                    <component :is="field.icon" class="w-4 h-4 text-gray-500 inline -mt-0.5" />
                  </span>
                  {{ field.value }}
                </p>
              </div>

            </div>

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

    <div v-if="!trackingResult && !isLoading" class="mt-12 flex flex-col items-center justify-center opacity-40">
      <PackageSearch class="w-24 h-24 text-gray-300 mb-4" />
      <p class="text-gray-400 font-medium">Silakan masukkan kode Invoice / Resi</p>
    </div>

  </div>
</template>

<script>
import { 
  Search, Hash, Loader2, AlertCircle, Info, PackageSearch, MessageCircle, MapPin, Check,
  ClipboardList, Wrench, ClipboardCheck, Truck, PackageCheck, ShoppingCart, Calendar
} from 'lucide-vue-next'

export default {
  name: 'TrackingView',
  components: {
    Search, Hash, Loader2, AlertCircle, Info, PackageSearch, MessageCircle, MapPin, Check,
    ClipboardList, Wrench, ClipboardCheck, Truck, PackageCheck, ShoppingCart, Calendar
  },
  data() {
    return {
      searchCode: '',
      isLoading: false,
      errorMsg: '',
      trackingResult: null,

      // --- MOCK DATABASE ---
      mockDatabase: [
        // 1. SERVICE (PERBAIKAN)
        {
          invoiceCode: 'SRV-001',
          type: 'PERBAIKAN',
          statusStep: 1, 
          itemName: 'Genset Perkins 100 kVA',      
          secondaryInfo: 'Overhaul Mesin', 
          picName: 'Ibu Siska (RS. Medika)',
          dateStart: '10 Des 2025', 
          location: 'Jl. Merdeka No 10 (Gudang Belakang)', 
          dateEnd: '17 Des 2025',   
          history: [
            { date: '10 Des 2025' }, { date: '11 Des 2025' }, null, null
          ]
        },

        // 2. RENTAL (PENYEWAAN)
        {
          invoiceCode: 'RENT-001',
          type: 'PENYEWAAN',
          statusStep: 2, 
          itemName: 'Genset Yanmar 60 kVA',
          secondaryInfo: '1 Bulan', 
          picName: 'PT. Waskita Karya (Bpk. Budi)',
          dateStart: '14 Des 2025', 
          location: 'Proyek Tol Lampung Km 80',
          dateEnd: '14 Jan 2026',
          history: [
            { date: '12 Des 2025' }, { date: '13 Des 2025' }, { date: '14 Des 2025' }, null
          ]
        },

        // 3. SALES (PENJUALAN)
        {
          invoiceCode: 'SALE-001',
          type: 'PENJUALAN',
          statusStep: 3, 
          itemName: 'ATS Panel 1000A', 
          picName: 'Bpk. Gunawan (PT. Sejahtera)', 
          location: 'Jl. Sudirman No. 45, Jakarta Pusat', 
          price: 'Rp 15.500.000', 
          dateStart: '15 Des 2025', 
          history: [
            { date: '15 Des 2025' }, { date: '15 Des 2025' }, { date: '16 Des 2025' }, { date: '18 Des 2025' }
          ]
        }
      ]
    }
  },
  computed: {
    currentStepIndex() { return this.trackingResult ? this.trackingResult.statusStep : 0 },

    currentSteps() {
      if (!this.trackingResult) return [];
      const type = this.trackingResult.type;

      if (type === 'PENYEWAAN') {
        return [
          { label: 'Booking Confirmed', icon: 'Calendar' },
          { label: 'Cek Unit', icon: 'Wrench' },
          { label: 'Pengiriman', icon: 'Truck' },
          { label: 'Unit di Lokasi', icon: 'MapPin' }
        ];
      } else if (type === 'PENJUALAN') {
        return [
          { label: 'Order Masuk', icon: 'ShoppingCart' },
          { label: 'Packing', icon: 'PackageCheck' },
          { label: 'Dalam Pengiriman', icon: 'Truck' },
          { label: 'Pesanan Tiba', icon: 'Check' }
        ];
      } else {
        return [
          { label: 'Unit Diterima', icon: 'ClipboardList' },
          { label: 'Pengerjaan', icon: 'Wrench' },
          { label: 'QC / Test', icon: 'ClipboardCheck' },
          { label: 'Selesai', icon: 'Check' }
        ];
      }
    },

    // --- TEXT STATUS DINAMIS (UPDATED: PERBAIKAN STEP 1) ---
    currentStatusInfo() {
      if (!this.trackingResult) return { title: '-', description: '-' };
      const step = this.trackingResult.statusStep;
      const type = this.trackingResult.type;

      if (type === 'PENYEWAAN') {
        switch (step) {
          case 0: return { title: 'Booking Terkonfirmasi', description: 'Jadwal sewa telah dikunci. Admin sedang menyiapkan administrasi.' };
          case 1: return { title: 'Persiapan Unit (QC)', description: 'Teknisi melakukan General Check & Load Test sebelum unit dikirim.' };
          case 2: return { title: 'Unit Sedang Dikirim', description: 'Unit sedang dalam perjalanan menuju lokasi proyek menggunakan armada kami.' };
          case 3: return { title: 'Unit Aktif di Lokasi', description: 'Unit telah tiba dan beroperasi di lokasi proyek. Masa sewa dimulai.' };
        }
      }
      else if (type === 'PENJUALAN') {
        switch (step) {
          case 0: return { title: 'Pesanan Diterima', description: 'Pembayaran terverifikasi. Kami sedang menyiapkan stok barang.' };
          case 1: return { title: 'Proses Packing', description: 'Barang sedang dikemas dengan standar keamanan pengiriman.' };
          case 2: return { title: 'Dalam Pengiriman', description: 'Paket telah diserahkan ke kurir logistik. Cek detail resi.' };
          case 3: return { title: 'Transaksi Selesai', description: 'Barang telah diterima oleh pemesan. Terima kasih telah berbelanja.' };
        }
      }
      else {
        // PERBAIKAN (SERVICE)
        switch (step) {
          case 0: return { title: 'Unit Diterima', description: 'Unit masuk antrean workshop untuk diagnosa awal.' };
          // KALIMAT DI BAWAH INI YANG DIPERBARUI:
          case 1: return { title: 'Sedang Diperbaiki', description: 'Teknisi sedang melakukan perbaikan dan penggantian parts pada unit.' };
          case 2: return { title: 'Final QC & Load Test', description: 'Perbaikan selesai, unit sedang diuji beban maksimal.' };
          case 3: return { title: 'Siap Diambil/Diantar', description: 'Unit sudah ready. Menunggu jadwal pengiriman kembali ke client.' };
        }
      }
      return { title: 'Status Info', description: 'Silakan hubungi admin.' };
    },

    // --- TEXT BANTUAN FOOTER DINAMIS ---
    dynamicHelpText() {
      if (!this.trackingResult) return 'Butuh bantuan?';
      const type = this.trackingResult.type;
      if (type === 'PERBAIKAN') return 'Butuh bantuan terkait perbaikan ini?';
      if (type === 'PENYEWAAN') return 'Butuh bantuan terkait penyewaan ini?';
      if (type === 'PENJUALAN') return 'Butuh bantuan terkait pesanan ini?';
      return 'Butuh bantuan?';
    },

    // --- VISIBLE DETAILS LOGIC ---
    visibleDetails() {
      if (!this.trackingResult) return [];
      const t = this.trackingResult;
      
      // A. PERBAIKAN
      if (t.type === 'PERBAIKAN') {
        return [
          { label: 'Nama Barang', value: t.itemName },        
          { label: 'Tanggal Masuk', value: t.dateStart },     
          { label: 'Jenis Pekerjaan', value: t.secondaryInfo }, 
          { label: 'Tanggal Keluar', value: t.dateEnd, isHighlight: true }, 
          { label: 'Nama Client', value: t.picName },         
          { label: 'Alamat Client', value: t.location }       
        ];
      }
      
      // B. PENYEWAAN
      else if (t.type === 'PENYEWAAN') {
        return [
          { label: 'Unit Disewa', value: t.itemName },
          { label: 'Durasi Sewa', value: t.secondaryInfo }, 
          { label: 'Nama Perusahaan / PIC', value: t.picName },
          { label: 'Mulai Sewa', value: t.dateStart },
          { label: 'Lokasi Penempatan', value: t.location }, 
          { label: 'Berakhir Pada', value: t.dateEnd, isHighlight: true }
        ];
      }
      
      // C. PENJUALAN
      else if (t.type === 'PENJUALAN') {
        return [
          { label: 'Nama Pembeli', value: t.picName },        
          { label: 'Tanggal Pembelian', value: t.dateStart }, 
          { label: 'Nama Barang', value: t.itemName },        
          { label: 'Alamat Pembeli', value: t.location },     
          { label: 'Harga Barang', value: t.price, isHighlight: true } 
        ];
      }
      
      return [];
    }
  },
  methods: {
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
      if(type === 'PERBAIKAN') return 'bg-orange-50 text-orange-600 border-orange-200';
      if(type === 'PENYEWAAN') return 'bg-purple-50 text-purple-600 border-purple-200';
      if(type === 'PENJUALAN') return 'bg-green-50 text-green-600 border-green-200';
      return 'bg-gray-50 text-gray-600 border-gray-200';
    },
    handleSearch() {
      this.errorMsg = ''; this.trackingResult = null;
      if (!this.searchCode) { this.errorMsg = 'Mohon masukkan kode.'; return }
      this.isLoading = true
      setTimeout(() => {
        const found = this.mockDatabase.find(i => i.invoiceCode.toLowerCase() === this.searchCode.toLowerCase())
        if (found) this.trackingResult = found
        else this.errorMsg = `Kode "${this.searchCode}" tidak ditemukan.`
        this.isLoading = false
      }, 800)
    },
    resetSearch() { this.searchCode = ''; this.trackingResult = null; this.errorMsg = '' },
    
    // --- WHATSAPP BUTTON LOGIC ---
    contactSupport() {
      if(!this.trackingResult) return;
      const code = this.trackingResult.invoiceCode;
      
      const msg = `Halo Sinar Elektro Sejahtera, saya ingin bertanya proses barang saya dengan invoice ${code}`;
      
      const phone = '6289670308822'; 
      window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(msg)}`, '_blank');
    }
  }
}
</script>

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