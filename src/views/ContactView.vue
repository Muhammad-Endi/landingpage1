<script>
import { 
  MessageSquare, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle, 
  Send,
  ChevronDown
} from 'lucide-vue-next'

export default {
  name: 'ContactView',
  components: {
    MessageSquare,
    MapPin, 
    Phone,
    Mail, 
    Clock,
    CheckCircle,
    Send,
    ChevronDown
  },
  data() {
    return {
      form: {
        customerType: '', 
        companyName: '',
        name: '',
        phone: '',
        address: '', 
        service: '',
        message: ''
      },
      // State error
      errors: {
        customerType: false,
        companyName: false,
        name: false,
        phone: false,
        address: false,
        service: false,
        message: false
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleGlobalClick);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleGlobalClick);
  },
  methods: {
    resetAllErrors() {
      Object.keys(this.errors).forEach(key => {
        this.errors[key] = false;
      });
    },

    handleGlobalClick(event) {
      const submitBtn = this.$refs.submitBtn;
      if (submitBtn && (submitBtn === event.target || submitBtn.contains(event.target))) {
        return;
      }
      this.resetAllErrors();
    },

    clearError(field) {
      this.errors[field] = false;
    },

    submitForm() {
      // 1. Reset Error
      this.resetAllErrors();
      let isValid = true;

      // 2. Validasi Field
      if (!this.form.name) { this.errors.name = true; isValid = false; }
      if (!this.form.customerType) { this.errors.customerType = true; isValid = false; }
      if (this.form.customerType === 'perusahaan' && !this.form.companyName) { this.errors.companyName = true; isValid = false; }
      if (!this.form.phone) { this.errors.phone = true; isValid = false; }
      if (!this.form.service) { this.errors.service = true; isValid = false; }
      if (!this.form.address) { this.errors.address = true; isValid = false; }
      if (!this.form.message) { this.errors.message = true; isValid = false; }

      if (!isValid) return;

      // 3. Logic Pesan WhatsApp
      const whatsappNumber = '6289670308822';

      let text = `Halo Sinar Elektro Sejahtera,\n\n`;
      text += `Saya ingin berkonsultasi mengenai layanan Anda.\n\n`;
      
      text += `*DATA PENGIRIM*\n`;
      text += `Nama Lengkap: ${this.form.name}\n`;
      text += `Kebutuhan: ${this.form.customerType === 'perusahaan' ? 'Perusahaan' : 'Pribadi'}\n`;
      
      if (this.form.customerType === 'perusahaan') {
        text += `Nama Perusahaan: ${this.form.companyName}\n`;
      }
      
      text += `No. WhatsApp: ${this.form.phone}\n`;
      text += `Alamat: ${this.form.address}\n\n`;
      
      let serviceName = '';
      if (this.form.service === 'pembelian') {
        serviceName = 'Pembelian Unit Baru';
      } else {
        serviceName = this.form.service.charAt(0).toUpperCase() + this.form.service.slice(1);
      }
      
      text += `*DETAIL KEBUTUHAN*\n`;
      text += `Layanan: ${serviceName}\n`;
      
      text += `----------------------------------\n`;
      text += `*Detail Pesan:*\n`;
      text += `${this.form.message}\n`;
      text += `----------------------------------\n\n`;
      
      text += `Mohon informasinya lebih lanjut. Terima kasih.`;
      
      const encodedMessage = encodeURIComponent(text);
      const waUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

      window.open(waUrl, '_blank');
    }
  }
}
</script>

<template>
  <div class="w-full bg-gray-50 min-h-screen">
    
    <section class="relative flex flex-col items-center justify-center text-center py-20 mt-20 bg-[#1F65E2] overflow-hidden">
      <div class="absolute inset-0 opacity-10 bg-radial from-white via-transparent to-transparent"></div>
      <div class="relative z-10 container mx-auto px-4 flex flex-col items-center max-w-4xl">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
          <span class="relative flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span class="text-white text-sm font-semibold md:text-[13px] tracking-wide">Layanan Emergency 24/7 Tersedia</span>
        </div>
        <h1 class="font-bold mb-6 text-3xl md:text-[40px] leading-tight text-white drop-shadow-sm tracking-wide">
          Hubungi <span class="text-[#FCCC4D]">Kami</span>
        </h1>
        <p class="text-blue-50 text-base md:text-lg font-light leading-relaxed max-w-2xl">
          Solusi terbaik untuk Elektro Motor dan Genset industri Anda.
        </p>
      </div>
    </section>

    <section class="py-16 lg:py-24 px-4">
      <div class="container mx-auto max-w-7xl">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          <div class="lg:col-span-7 bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] overflow-hidden p-6 md:p-8 lg:p-10 border border-gray-100">
            <div class="flex items-center gap-3 mb-8">
              <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <MessageSquare size="20" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900">Kirim Pesan</h3>
                <p class="text-sm text-gray-500">Konsultasi gratis & respon cepat via WhatsApp</p>
              </div>
            </div>

            <form @submit.prevent="submitForm" class="space-y-6" novalidate>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div class="space-y-2">
                  <label class="text-sm font-semibold text-gray-700">Nama Lengkap</label>
                  <input 
                    type="text" 
                    v-model="form.name"
                    @input="clearError('name')"
                    placeholder="Nama Anda"
                    class="w-full px-4 py-3 rounded-lg border outline-none transition-all text-gray-700 placeholder-gray-400"
                    :class="errors.name ? 'border-red-500 bg-red-50 focus:ring-red-200' : 'bg-gray-50 border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100'"
                  />
                  <p v-if="errors.name" class="text-red-500 text-xs mt-1 font-medium animate-pulse">Wajib diisi</p>
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-semibold text-gray-700">Skala Kebutuhan</label>
                  <div class="relative">
                    <select 
                      v-model="form.customerType"
                      @change="clearError('customerType')"
                      class="w-full px-4 py-3 rounded-lg border outline-none transition-all text-gray-700 appearance-none cursor-pointer pr-10"
                      :class="errors.customerType ? 'border-red-500 bg-red-50 focus:ring-red-200' : 'bg-gray-50 border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100'"
                    >
                      <option value="" disabled selected>Pilih Skala Kebutuhan</option>
                      <option value="pribadi">Pribadi</option>
                      <option value="perusahaan">Perusahaan</option>
                    </select>
                    <ChevronDown class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size="20" />
                  </div>
                  <p v-if="errors.customerType" class="text-red-500 text-xs mt-1 font-medium animate-pulse">Wajib diisi</p>
                </div>

                <div v-if="form.customerType === 'perusahaan'" class="md:col-span-2 space-y-2 animate-fadeIn">
                  <label class="text-sm font-semibold text-gray-700">Nama Perusahaan</label>
                  <input 
                    type="text" 
                    v-model="form.companyName"
                    @input="clearError('companyName')"
                    placeholder="PT. Contoh Abadi"
                    class="w-full px-4 py-3 rounded-lg border outline-none transition-all text-gray-700 placeholder-gray-400"
                    :class="errors.companyName ? 'border-red-500 bg-red-50 focus:ring-red-200' : 'bg-gray-50 border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100'"
                  />
                  <p v-if="errors.companyName" class="text-red-500 text-xs mt-1 font-medium animate-pulse">Wajib diisi</p>
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-semibold text-gray-700">No. WhatsApp</label>
                  <input 
                    type="tel" 
                    v-model="form.phone"
                    @input="clearError('phone')"
                    placeholder="0812xxxx"
                    class="w-full px-4 py-3 rounded-lg border outline-none transition-all text-gray-700 placeholder-gray-400"
                    :class="errors.phone ? 'border-red-500 bg-red-50 focus:ring-red-200' : 'bg-gray-50 border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100'"
                  />
                  <p v-if="errors.phone" class="text-red-500 text-xs mt-1 font-medium animate-pulse">Wajib diisi</p>
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-semibold text-gray-700">Layanan</label>
                  <div class="relative">
                    <select 
                      v-model="form.service"
                      @change="clearError('service')"
                      class="w-full px-4 py-3 rounded-lg border outline-none transition-all text-gray-700 appearance-none cursor-pointer pr-10"
                      :class="errors.service ? 'border-red-500 bg-red-50 focus:ring-red-200' : 'bg-gray-50 border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100'"
                    >
                      <option value="" disabled selected>Pilih Layanan</option>
                      <option value="pembelian">Pembelian Unit Baru</option>
                      <option value="penyewaan">Penyewaan</option>
                      <option value="perbaikan">Perbaikan</option>
                      <option value="konsultasi">Konsultasi Umum</option>
                    </select>
                    <ChevronDown class="absolute right-4 top-1/2 -translate-y-1/2 text-black pointer-events-none" size="20" />
                  </div>
                  <p v-if="errors.service" class="text-red-500 text-xs mt-1 font-medium animate-pulse">Wajib diisi</p>
                </div>

                <div 
                  class="space-y-2" 
                  :class="form.customerType === 'pribadi' || form.customerType === '' ? 'md:col-span-2' : ''"
                >
                  <label class="text-sm font-semibold text-gray-700">Alamat</label>
                  <input 
                    type="text" 
                    v-model="form.address"
                    @input="clearError('address')"
                    placeholder="Masukan Alamat Lengkap"
                    class="w-full px-4 py-3 rounded-lg border outline-none transition-all text-gray-700 placeholder-gray-400"
                    :class="errors.address ? 'border-red-500 bg-red-50 focus:ring-red-200' : 'bg-gray-50 border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100'"
                  />
                  <p v-if="errors.address" class="text-red-500 text-xs mt-1 font-medium animate-pulse">Wajib diisi</p>
                </div>

              </div>

              <div class="space-y-2">
                <label class="text-sm font-semibold text-gray-700">Detail Pesan</label>
                <textarea 
                  v-model="form.message"
                  @input="clearError('message')"
                  rows="4"
                  placeholder="Jelaskan kebutuhan atau kendala Anda..."
                  class="w-full px-4 py-3 rounded-lg border outline-none transition-all text-gray-700 placeholder-gray-400 resize-none"
                  :class="errors.message ? 'border-red-500 bg-red-50 focus:ring-red-200' : 'bg-gray-50 border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100'"
                ></textarea>
                 <p v-if="errors.message" class="text-red-500 text-xs mt-1 font-medium animate-pulse">Wajib diisi</p>
              </div>

              <button 
                ref="submitBtn"
                type="submit"
                class="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-xl shadow-lg shadow-green-500/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                Chat via WhatsApp <Send size="18" />
              </button>
            </form>
          </div>

          <div class="lg:col-span-5 space-y-6">
            <div class="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 border border-gray-100 space-y-6">
              <div class="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <MapPin size="20" />
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Alamat Workshop</h4>
                  <p class="text-gray-600 text-sm leading-relaxed">JL. Cendana II Gg. H.JANUR Jatimulyo Lampung Selatan, Lampung</p>
                </div>
              </div>
              <hr class="border-gray-100" />
              <div class="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div class="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                  <Phone size="20" />
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Telepon / WhatsApp</h4>
                  <p class="text-gray-600 text-sm font-medium">0853-8312-0656</p>
                </div>
              </div>
              <hr class="border-gray-100" />
              <div class="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div class="w-10 h-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0">
                  <Mail size="20" />
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Email Resmi</h4>
                  <p class="text-gray-600 text-sm">siswoyo.pulsarian@gmail.com</p>
                </div>
              </div>
               <hr class="border-gray-100" />
               <div class="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div class="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                  <Clock size="20" />
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Jam Operasional</h4>
                  <p class="text-gray-600 text-sm">Senin - Sabtu: 08.00 - 17.00 WIB</p>
                </div>
              </div>
            </div>

            <div
                v-motion
                  :initial="{ opacity: 0, scale: 0.9 }"
                  :enter="{ opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.4 } }"
                  class="bg-linear-to-br from-gray-900 via-blue-900 to-gray-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">

              <div class="absolute -right-6 -top-6 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/30 transition-all duration-500"></div>
              <div class="relative z-10">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h4 class="text-xl font-bold flex items-center gap-2"><CheckCircle class="text-green-400" /> Layanan Darurat</h4>
                    <p class="text-blue-200 text-sm mt-1 font-medium">Siap Siaga Setiap Saat</p>
                  </div>
                  <div class="bg-white/10 backdrop-blur-md border border-white/10 rounded-lg px-3 py-1 flex flex-col items-center justify-center">
                    <span class="text-2xl font-black text-white leading-none">24</span>
                    <span class="text-[10px] font-bold text-blue-200 uppercase tracking-wider">Jam/7</span>
                  </div>
                </div>
                <p class="text-gray-300 text-sm mb-6 leading-relaxed">Mesin breakdown tiba-tiba? Tim teknisi emergency kami siap meluncur ke lokasi Anda.</p>
                
                <a
                  href="https://wa.me/6289670308822"
                  target="_blank"
                  class="w-full bg-white text-blue-900 font-bold text-center py-3 rounded-lg hover:bg-blue-50 transition-colors shadow-lg flex items-center justify-center gap-2 duration-300">
                  <Phone size="18" class="text-blue-600" /> Hubungi Emergency
                </a>

              </div>
            </div>

             <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden h-64 relative">
               <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.4972535151687!2d105.27873157474339!3d-5.3407915946378095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40c5003a371e59%3A0x358535c0e42e44fa!2sBengkel%20Sinar%20Elektro%20Sejahtera!5e0!3m2!1sen!2sid!4v1765885656369!5m2!1sen!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}
</style>