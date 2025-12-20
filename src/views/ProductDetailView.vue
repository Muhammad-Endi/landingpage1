<template>
  <div class="min-h-screen bg-white text-slate-800">
    
    <!-- Hero Section -->
    <section class="relative flex flex-col justify-center items-center text-center py-20 mt-20 bg-[#1F65E2] overflow-hidden">
        <div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div class="relative z-10 flex flex-col items-center px-4 max-w-4xl">
          <h1 class="font-bold mb-4 text-3xl md:text-[40px] leading-snug text-white drop-shadow-sm tracking-wide">
            Produk <span class="text-[#FCCC4D]">Terlengkap</span>
          </h1>
          <p class="text-blue-50 text-base md:text-lg font-light leading-relaxed max-w-3xl">
            Solusi daya industri terpercaya. Jaminan unit baru bergaransi resmi untuk investasi jangka panjang bisnis Anda.
          </p>
        </div>
    </section>

    <!-- Loading State -->
    <div v-if="isLoading" class="min-h-[50vh] flex flex-col items-center justify-center">
      <Loader2 class="animate-spin w-10 h-10 text-[#004E93] mb-4" />
      <p class="text-gray-500 font-medium">Memuat data produk...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="fetchError" class="min-h-[50vh] flex flex-col items-center justify-center px-4">
      <div class="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md text-center">
        <XCircle class="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 class="text-xl font-bold text-red-900 mb-2">Produk Tidak Ditemukan</h3>
        <p class="text-red-700 mb-6">{{ fetchError }}</p>
        <button 
          @click="$router.push('/catalog')" 
          class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
        >
          Kembali ke Katalog
        </button>
      </div>
    </div>

    <!-- Product Detail Content -->
    <div v-else-if="product" class="max-w-[1440px] mx-auto px-4 md:px-8 py-12">
      
      <div class="mb-8 border-b-2 border-gray-100 pb-4">
        <h2 class="text-2xl md:text-3xl font-extrabold text-[#004E93] uppercase tracking-tight">
          SPESIFIKASI PRODUK
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
        
        <!-- Product Card -->
        <div class="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-col h-full relative">
           
           <div class="absolute top-4 left-4 z-20">
             <span class="bg-[#004E93]/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm tracking-wide flex items-center gap-1">
               <span class="w-1.5 h-1.5 bg-[#FCCC4D] rounded-full animate-pulse"></span>
               NEW UNIT
             </span>
           </div>

           <!-- Stock Badge -->
           <div v-if="product.stock > 0" class="absolute top-4 right-4 z-20">
             <span class="bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
               Ready Stock
             </span>
           </div>

           <div class="relative w-full aspect-[5/4] bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-6 overflow-hidden">
             <img 
               :src="product.image" 
               :alt="product.title" 
               class="w-full h-full object-contain mix-blend-multiply drop-shadow-lg"
               onerror="this.src='https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=800'"
             />
           </div>

           <div class="p-5 flex flex-col flex-grow">
             <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
               {{ product.brand }}
             </div>

             <h3 class="text-lg font-bold text-slate-800 leading-tight mb-2">
               {{ product.title }}
             </h3>

             <div class="mb-4">
                <span class="inline-block bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-1 rounded border border-slate-200">
                  Model: {{ product.model }}
                </span>
             </div>

             <!-- Category Badge -->
             <div v-if="product.category" class="mb-4">
                <span class="inline-block bg-blue-50 text-blue-600 text-[10px] font-semibold px-2 py-1 rounded border border-blue-200">
                  {{ product.category }}
                </span>
             </div>

             <div class="mt-auto pt-4 border-t border-dashed border-slate-200">
                <div class="flex justify-between items-end mb-3">
                   <div>
                     <p class="text-[10px] text-slate-400 font-medium">Harga Unit Baru</p>
                     <p class="text-xl font-extrabold text-[#004E93] tracking-tight">{{ product.purchasePrice }}</p>
                   </div>
                </div>
                
                <button 
                  @click="openBuyModal"
                  class="w-full bg-[#D92525] hover:bg-red-700 text-white text-sm font-bold py-2.5 px-4 rounded-lg shadow-md shadow-red-100 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                   <ShoppingBag class="w-4 h-4" />
                   <span>Beli Unit Baru</span>
                </button>
                
                <p class="text-[10px] text-center text-slate-400 mt-3">
                  *Garansi resmi & support teknis.
                </p>
             </div>
           </div>
        </div>

        <!-- Engine Data -->
        <div class="flex flex-col shadow-sm rounded-sm overflow-hidden border border-gray-100">
          <div class="bg-slate-100 text-slate-700 font-bold px-4 py-3 text-sm tracking-wide uppercase flex items-center gap-2 border-b border-gray-200">
            <Settings class="w-4 h-4 text-slate-500"/> Engine Data
          </div>
          <div class="bg-white">
             <table class="w-full text-sm">
              <tbody>
                <tr v-for="(val, key) in product.details.engine" :key="key" class="border-b border-gray-100 last:border-0 hover:bg-blue-50/20 transition-colors">
                  <td class="px-3 py-3 text-gray-500 font-medium whitespace-nowrap w-[40%] bg-gray-50/30 border-r border-gray-100 capitalize text-xs">{{ formatKey(key) }}</td>
                  <td class="px-3 py-3 text-gray-800 font-semibold pl-4 text-xs">{{ val }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Fuel & Power -->
        <div class="flex flex-col gap-6">
           <!-- Fuel Consumption -->
           <div class="flex flex-col shadow-sm rounded-sm overflow-hidden border border-gray-100">
            <div class="bg-slate-100 text-slate-700 font-bold px-4 py-3 text-sm tracking-wide uppercase flex items-center gap-2 border-b border-gray-200">
               <Droplet class="w-4 h-4 text-blue-500"/> Fuel Consumption
            </div>
            <div class="bg-white">
               <table class="w-full text-sm">
                <tbody>
                  <tr v-for="(val, key) in product.details.fuel" :key="key" class="border-b border-gray-100 last:border-0 hover:bg-blue-50/20">
                    <td class="px-3 py-3 text-gray-500 font-medium whitespace-nowrap w-[40%] bg-gray-50/30 border-r border-gray-100 capitalize text-xs">{{ formatKey(key) }}</td>
                    <td class="px-3 py-3 text-gray-800 font-semibold pl-4 text-xs">{{ val }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Power Ratings -->
          <div class="flex flex-col shadow-sm rounded-sm overflow-hidden border border-gray-100">
            <div class="bg-slate-100 text-slate-700 font-bold px-4 py-3 text-sm tracking-wide uppercase flex items-center gap-2 border-b border-gray-200">
               <Zap class="w-4 h-4 text-yellow-500"/> Power Ratings
            </div>
            <div class="bg-white">
              <table class="w-full text-sm">
                <tbody>
                  <tr v-for="(val, key) in product.details.power" :key="key" class="border-b border-gray-100 last:border-0 hover:bg-blue-50/20">
                    <td class="px-3 py-3 text-gray-500 font-medium whitespace-nowrap w-[40%] bg-gray-50/30 capitalize border-r border-gray-100 text-xs">{{ formatKey(key) }}</td>
                    <td class="px-3 py-3 text-gray-800 font-semibold pl-4 text-xs">{{ val }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Dimension & Rental Info -->
        <div class="flex flex-col gap-6">
           
           <!-- Dimension -->
           <div class="flex flex-col shadow-sm rounded-sm overflow-hidden border border-gray-100">
            <div class="bg-slate-100 text-slate-700 font-bold px-4 py-3 text-sm tracking-wide uppercase flex items-center gap-2 border-b border-gray-200">
               <Box class="w-4 h-4 text-indigo-500"/> Dimension
            </div>
            <div class="bg-white text-sm">
              <div class="bg-gray-50 px-3 py-2 font-bold text-gray-600 text-[10px] border-b border-gray-100 uppercase tracking-wider">Open Type</div>
              <div class="px-4 py-3 border-b border-gray-100">
                <div class="flex justify-between items-center mb-1">
                   <span class="text-gray-400 whitespace-nowrap text-xs">Size</span>
                   <span class="font-bold text-gray-700 text-right ml-2 text-xs">{{ product.details.dimension.openType.size }}</span>
                </div>
                <div class="flex justify-between items-center">
                   <span class="text-gray-400 text-xs">Weight</span>
                   <span class="font-bold text-gray-700 text-xs">{{ product.details.dimension.openType.weight }}</span>
                </div>
              </div>
              <div class="bg-gray-50 px-3 py-2 font-bold text-gray-600 text-[10px] border-b border-gray-100 uppercase tracking-wider">Silent Type</div>
              <div class="px-4 py-3">
                <div class="flex justify-between items-center mb-1">
                   <span class="text-gray-400 whitespace-nowrap text-xs">Size</span>
                   <span class="font-bold text-gray-700 text-right ml-2 text-xs">{{ product.details.dimension.silentType.size }}</span>
                </div>
                <div class="flex justify-between items-center">
                   <span class="text-gray-400 text-xs">Weight</span>
                   <span class="font-bold text-gray-700 text-xs">{{ product.details.dimension.silentType.weight }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Rental Info Box -->
          <div class="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-lg border border-orange-200 p-5 relative overflow-hidden group">
            <CalendarDays class="absolute -right-4 -bottom-4 w-24 h-24 text-orange-200/50 transform rotate-12 group-hover:rotate-0 transition-all duration-500" />
            
            <div class="relative z-10">
               <div class="flex items-center gap-2 mb-2">
                 <div class="bg-orange-500 text-white p-1 rounded">
                   <CalendarClock class="w-4 h-4" />
                 </div>
                 <h4 class="font-bold text-orange-800 text-sm uppercase tracking-wide">Layanan Sewa</h4>
               </div>
               
               <p class="text-xs text-orange-900/80 font-medium leading-relaxed mb-4">
                 Butuh untuk proyek jangka pendek? Sinar Elektro juga menyediakan <strong>Sewa Genset</strong> (menggunakan armada rental terpisah).
               </p>

               <button 
                 @click="openRentalModal"
                 class="w-full bg-white border border-orange-300 text-orange-700 hover:bg-orange-600 hover:text-white hover:border-orange-600 font-bold py-2.5 px-4 rounded shadow-sm text-xs flex items-center justify-center gap-2 transition-all duration-300"
               >
                 <Headset class="w-4 h-4" />
                 <span>Konsultasi Sewa</span>
               </button>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Modal Form (Buy/Rental) -->
    <div v-if="isModalOpen" class="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
       <div class="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
         
         <div 
           class="px-6 py-4 border-b flex justify-between items-center sticky top-0 z-10 transition-colors duration-300"
           :class="isBuyMode ? 'bg-red-50 border-red-100' : 'bg-orange-50 border-orange-100'"
         >
            <div>
              <h3 
                class="text-lg font-bold flex items-center gap-2"
                :class="isBuyMode ? 'text-red-800' : 'text-orange-800'"
              >
                <CalendarClock class="w-5 h-5"/> 
                {{ isBuyMode ? 'Form Pembelian Unit Baru' : 'Form Konsultasi Sewa' }}
              </h3>
              <p 
                class="text-[11px] mt-0.5"
                :class="isBuyMode ? 'text-red-600/80' : 'text-orange-600/80'"
              >
                Silahkan lengkapi data kebutuhan Anda
              </p>
            </div>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-700 transition-colors">
              <XCircle class="w-6 h-6" />
            </button>
         </div>

         <div class="p-6">
            <form @submit.prevent="isBuyMode ? submitBuyForm() : submitRentalForm()" class="flex flex-col gap-5">
              
              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Unit yang Dipilih</label>
                <div class="relative w-full">
                    <div class="absolute top-1/2 left-3 transform -translate-y-1/2 pointer-events-none text-gray-400">
                        <Lock class="w-4 h-4" />
                    </div>
                    <input 
                      type="text" 
                      :value="product.title" 
                      readonly 
                      class="w-full border border-gray-200 bg-gray-100 text-gray-600 font-bold rounded px-3 py-2.5 text-sm pl-9 focus:outline-none cursor-not-allowed select-none shadow-inner"
                    >
                </div>
                <p class="text-[10px] text-gray-400 mt-1 italic">
                  *{{ isBuyMode ? 'Harga: ' + product.purchasePrice : 'Spesifikasi sewa akan menyesuaikan spek unit ini.' }}
                </p>
              </div>

              <hr class="border-gray-100 dashed">

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Nama Lengkap <span class="text-red-500">*</span></label>
                    <input 
                      v-model="rentalForm.name" 
                      required 
                      oninvalid="this.setCustomValidity('Mohon lengkapi nama lengkap')" 
                      oninput="this.setCustomValidity('')"
                      type="text" 
                      class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2" 
                      :class="isBuyMode ? 'focus:ring-red-500' : 'focus:ring-orange-500'"
                      placeholder="Masukan nama lengkap"
                    >
                  </div>

                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Jenis Keperluan <span class="text-red-500">*</span></label>
                    <div class="relative">
                        <select 
                          v-model="rentalForm.type" 
                          required 
                          oninvalid="this.setCustomValidity('Mohon pilih jenis keperluan')" 
                          oninput="this.setCustomValidity('')"
                          class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 appearance-none bg-white cursor-pointer" 
                          :class="[{'text-gray-400': rentalForm.type === ''}, isBuyMode ? 'focus:ring-red-500' : 'focus:ring-orange-500']"
                        >
                            <option value="" disabled selected hidden>Pilih jenis kebutuhan</option> 
                            <option value="Pribadi" class="text-gray-800">Pribadi</option>
                            <option value="Perusahaan" class="text-gray-800">Perusahaan</option>
                        </select>
                        <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                            <ChevronDown class="w-4 h-4" />
                        </div>
                    </div>
                  </div>

                  <div v-if="rentalForm.type === 'Perusahaan'" class="col-span-1 animate-in slide-in-from-top-2 duration-300">
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Nama Perusahaan <span class="text-red-500">*</span></label>
                    <input 
                      v-model="rentalForm.companyName" 
                      required 
                      oninvalid="this.setCustomValidity('Mohon lengkapi nama perusahaan')" 
                      oninput="this.setCustomValidity('')"
                      type="text" 
                      class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2" 
                      :class="isBuyMode ? 'focus:ring-red-500' : 'focus:ring-orange-500'"
                      placeholder="Contoh: PT Sinar Elektro"
                    >
                  </div>

                  <div class="col-span-1">
                    <label class="block text-sm font-semibold text-gray-700 mb-1">No. WhatsApp <span class="text-red-500">*</span></label>
                    <input 
                      v-model="rentalForm.whatsapp" 
                      @input="filterPhone" 
                      required 
                      oninvalid="this.setCustomValidity('Mohon lengkapi nomor WhatsApp')" 
                      oninput="this.setCustomValidity('')"
                      type="tel" 
                      class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2" 
                      :class="isBuyMode ? 'focus:ring-red-500' : 'focus:ring-orange-500'"
                      placeholder="Contoh: 0812xxxxx"
                    >
                  </div>

                  <div v-if="!isBuyMode">
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Durasi Sewa <span class="text-red-500">*</span></label>
                    <input 
                      v-model="rentalForm.duration" 
                      required 
                      oninvalid="this.setCustomValidity('Mohon lengkapi durasi sewa')" 
                      oninput="this.setCustomValidity('')"
                      type="text" 
                      class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" 
                      placeholder="Contoh: 3 Bulan"
                    >
                  </div>
                  
                   <div :class="{
                       'col-span-1': (isBuyMode && (rentalForm.type === '' || rentalForm.type === 'Pribadi')) || (!isBuyMode && rentalForm.type === 'Perusahaan'),
                       'col-span-2': (isBuyMode && rentalForm.type === 'Perusahaan') || (!isBuyMode && (rentalForm.type === '' || rentalForm.type === 'Pribadi'))
                   }">
                     <label class="block text-sm font-semibold text-gray-700 mb-1">Alamat <span class="text-red-500">*</span></label>
                     <input 
                      v-model="rentalForm.address" 
                      required 
                      oninvalid="this.setCustomValidity('Mohon lengkapi alamat')" 
                      oninput="this.setCustomValidity('')"
                      type="text" 
                      class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2" 
                      :class="isBuyMode ? 'focus:ring-red-500' : 'focus:ring-orange-500'"
                      placeholder="Masukan alamat lengkap"
                    >
                  </div>

              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Detail Kebutuhan <span class="text-red-500">*</span></label>
                <textarea 
                  v-model="rentalForm.details" 
                  required 
                  oninvalid="this.setCustomValidity('Mohon lengkapi detail kebutuhan')" 
                  oninput="this.setCustomValidity('')"
                  rows="3" 
                  class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2" 
                  :class="isBuyMode ? 'focus:ring-red-500' : 'focus:ring-orange-500'"
                  :placeholder="isBuyMode ? 'Contoh: Saya butuh 1 unit untuk pabrik di Jakarta, mohon info metode pembayaran dan pengiriman...' : 'Contoh: untuk backup kebutuhan kantor, dll...'"
                ></textarea>
              </div>

              <button 
                type="submit" 
                class="mt-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 rounded shadow transition-colors flex items-center justify-center gap-2"
              >
                 <svg viewBox="0 0 24 24" class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                 Kirim ke WhatsApp
              </button>

            </form>
         </div>
       </div>
    </div>

  </div>
</template>

<script>
import { Loader2, Settings, Droplet, Zap, Box, CalendarDays, Headset, XCircle, Lock, ArrowRight, ChevronDown, CalendarClock, ShoppingBag } from 'lucide-vue-next'
import apiClient from '@/api/axios'

export default {
  name: 'ProductDetailView',
  components: { 
    Loader2, Settings, Droplet, Zap, Box, CalendarDays, Headset, XCircle, Lock, ArrowRight, ChevronDown, CalendarClock, ShoppingBag
  },
  data() {
    return {
      baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
      product: null,
      isLoading: false,
      fetchError: null,
      isModalOpen: false, 
      isBuyMode: false, 
      
      // State Form
      rentalForm: {
        type: '', 
        name: '',
        companyName: '',
        whatsapp: '',
        duration: '',
        address: '', 
        details: '' 
      }
    }
  },
  async mounted() {
    const productUuid = this.$route.params.id
    await this.fetchProduct(productUuid)
    window.scrollTo(0, 0)
  },
  methods: {
    // Format Rupiah
    formatRupiah(amount) {
      if (!amount) return 'Hubungi Kami'
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount)
    },

    // Fetch Product from API
    async fetchProduct(uuid) {
      try {
        this.isLoading = true
        this.fetchError = null
        
        const response = await apiClient.get(`/api/public/products/${uuid}`)
        
        if (response.data.meta.success) {
          const data = response.data.data
          const spec = data.specifications?.[0] || {}
          
          this.product = {
            uuid: data.uuid,
            title: data.title,
            brand: spec.brand || 'N/A',
            model: spec.model || 'N/A',
            purchasePrice: this.formatRupiah(data.sell_price),
            category: data.category?.name || null,
            stock: data.stock,
            image: data.image 
              ? `${this.baseURL}/${data.image}` 
              : 'https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=800',
            details: {
              power: {
                prime: spec.prime_power || '-',
                standby: spec.standby_power || '-',
                voltage: spec.voltage || '-',
                alternator: spec.alternator || '-'
              },
              engine: {
                brand: spec.brand || '-',
                model: spec.model || '-',
                cylinder: spec.cylinder || '-',
                pistonDispl: spec.piston_displ || '-',
                ratedSpeed: spec.rated_speed || '-',
                boreXStroke: spec.bore_stroke || '-',
                governor: spec.governor || '-',
                aspiration: spec.aspiration || '-',
                oilCapacity: spec.oil_capacity || '-',
                coolingSystem: spec.cooling_system || '-'
              },
              fuel: {
                load100: spec.load_100 || '-',
                load75: spec.load_75 || '-',
                load50: spec.load_50 || '-'
              },
              dimension: {
                openType: {
                  size: spec.dimension_open || '- x - x - mm',
                  weight: spec.weight_open || '- Kg'
                },
                silentType: {
                  size: spec.dimension_silent || '- x - x - mm',
                  weight: spec.weight_silent || '- Kg'
                }
              }
            }
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        if (error.response?.status === 404) {
          this.fetchError = 'Produk tidak ditemukan'
        } else {
          this.fetchError = 'Gagal memuat data produk'
        }
      } finally {
        this.isLoading = false
      }
    },

    formatKey(key) {
      if (key === 'boreXStroke') return 'Bore x Stroke'
      if (key === 'pistonDispl') return 'Piston Displ.'
      if (key.includes('load')) return key.replace('load', 'Load ') + '%'
      return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim()
    },
    
    // --- LOGIC FORM & MODAL ---
    resetForm() {
      this.rentalForm = {
        type: '', 
        name: '',
        companyName: '',
        whatsapp: '',
        duration: '', 
        address: '', 
        details: ''
      }
    },
    closeModal() {
      this.isModalOpen = false
      setTimeout(this.resetForm, 300)
    },
    openRentalModal() {
      this.resetForm()
      this.isBuyMode = false
      this.isModalOpen = true
    },
    openBuyModal() {
      this.resetForm()
      this.isBuyMode = true
      this.isModalOpen = true
    },
    filterPhone(event) {
      this.rentalForm.whatsapp = event.target.value.replace(/[^0-9]/g, '')
      event.target.setCustomValidity('')
    },

    // --- WHATSAPP LOGIC ---
    submitRentalForm() {
      const phone = '6289670308822'
      const form = this.rentalForm
      const productTitle = this.product.title

      let message = `Halo Sinar Elektro Sejahtera,\n\n`
      message += `Saya ingin konsultasi untuk sewa genset. Berikut adalah referensi produk yang dipilih dari website: *${productTitle}*\n\n`
      
      message += `DATA PENYEWA\n`
      message += `--------------------------------\n`
      message += `Nama Lengkap: ${form.name}\n`
      message += `Jenis Keperluan: ${form.type}\n`
      
      if (form.type === 'Perusahaan') {
        message += `Nama Perusahaan: ${form.companyName}\n`
      }
      
      message += `No. WhatsApp: ${form.whatsapp}\n`
      message += `Alamat Lokasi: ${form.address}\n`
      message += `Durasi Sewa: ${form.duration}\n\n`
      
      if (form.details) {
        message += `DETAIL KEBUTUHAN:\n${form.details}\n\n`
      }

      message += `Mohon informasinya mengenai ketersediaan unit dan penawaran harga finalnya. Terimakasih.`

      window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`, '_blank')
      
      this.closeModal()
    },
    submitBuyForm() {
      const phone = '6289670308822'
      const form = this.rentalForm
      const product = this.product

      let message = `Halo Sinar Elektro Sejahtera,\n\n`
      message += `Saya ingin *membeli unit baru*. Berikut adalah detail pesanan saya dari website:\n`
      message += `--------------------------------\n`
      message += `*UNIT:* ${product.title}\n`
      message += `*MODEL:* ${product.model}\n`
      message += `*HARGA WEB:* ${product.purchasePrice}\n`
      message += `--------------------------------\n\n`
      
      message += `DATA PEMBELI\n`
      message += `--------------------------------\n`
      message += `Nama Lengkap: ${form.name}\n`
      message += `Jenis Keperluan: ${form.type}\n`
      
      if (form.type === 'Perusahaan') {
        message += `Nama Perusahaan: ${form.companyName}\n`
      }
      
      message += `No. WhatsApp: ${form.whatsapp}\n`
      message += `Alamat Pengiriman: ${form.address}\n\n`
      
      if (form.details) {
        message += `DETAIL PERMINTAAN:\n${form.details}\n\n`
      }

      message += `Mohon konfirmasi stok, total harga, dan proses pembelian selanjutnya. Terima kasih.`

      window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`, '_blank')
      
      this.closeModal()
    }
  }
}
</script>

<style scoped>
td {
  vertical-align: middle;
}

@keyframes zoom-in {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
@keyframes slide-down {
  from { transform: translateY(-10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-in {
  animation: zoom-in 0.2s ease-out forwards;
}

.slide-in-from-top-2 {
  animation: slide-down 0.2s ease-out forwards;
}
</style>
