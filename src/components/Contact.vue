<script>
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageSquare,
  CheckCircle2,
  ChevronDown,
  Building2
} from 'lucide-vue-next'

export default {
  name: 'Contact',
  components: {
    MapPin, Phone, Mail, Clock, Send, MessageSquare, CheckCircle2, ChevronDown, Building2
  },
  data() {
    return {
      // --- DATA FORM ---
      contactForm: {
        name: '',       
        clientType: '', 
        companyName: '',
        phone: '',      
        service: '',    
        address: '',    
        message: '',    
      },
      // State Error
      contactErrors: {
        name: false,
        clientType: false,
        companyName: false,
        phone: false,
        service: false,
        address: false,
        message: false
      },
      
      // Sidebar Info
      contactInfo: [
        {
          icon: MapPin,
          title: 'Alamat Workshop',
          content: 'JL. Cendana II Gg. H.JANUR Jatimulyo Lampung Selatan, Lampung',
          color: 'bg-blue-600'
        },
        {
          icon: Phone,
          title: 'Telepon / WhatsApp',
          content: '0853-8312-0656',
          color: 'bg-green-600'
        },
        {
          icon: Mail,
          title: 'Email Resmi',
          content: 'siswoyo.pulsarian@gmail.com',
          color: 'bg-red-600'
        },
        {
          icon: Clock,
          title: 'Jam Operasional',
          content: 'Senin - Sabtu: 08.00 - 17.00 WIB',
          color: 'bg-purple-600'
        },
      ],
    }
  },

  mounted() {
    document.addEventListener('click', this.handleGlobalClick)
  },

  beforeUnmount() {
    document.removeEventListener('click', this.handleGlobalClick)
  },

  methods: {
    handleGlobalClick(event) {
      const interactiveTags = ['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON', 'LABEL'];
      const isInteractive = interactiveTags.includes(event.target.tagName) || event.target.closest('button');
      if (!isInteractive) {
        Object.keys(this.contactErrors).forEach(key => this.contactErrors[key] = false)
      }
    },

    validateField(field) {
      if (field === 'companyName') {
        this.contactErrors.companyName = this.contactForm.clientType === 'perusahaan' && !this.contactForm.companyName;
        return;
      }
      this.contactErrors[field] = !this.contactForm[field]
    },

    sanitizePhoneInput(e) {
      let value = e.target.value.replace(/\D/g, '')
      this.contactForm.phone = value
      this.validateField('phone')
      e.target.value = value
    },

    handleClientTypeChange() {
      this.validateField('clientType');
      if (this.contactForm.clientType === 'pribadi') {
        this.contactForm.companyName = '';
        this.contactErrors.companyName = false;
      }
    },

    // --- LOGIKA PESAN ---
    submitContact() {
      // 1. Validasi Input
      let hasError = false
      const fields = ['name', 'clientType', 'phone', 'service', 'address', 'message'];
      
      fields.forEach(field => {
        this.validateField(field)
        if (this.contactErrors[field]) hasError = true
      })

      if (this.contactForm.clientType === 'perusahaan') {
        this.validateField('companyName');
        if (this.contactErrors.companyName) hasError = true;
      }

      if (hasError) return

      // 2. Logic Format Pesan WhatsApp
      const whatsappNumber = '6289670308822';

      let text = `Halo Sinar Elektro Sejahtera,\n\n`;
      text += `Saya ingin berkonsultasi mengenai layanan Anda.\n\n`;
      
      text += `*DATA PENGIRIM*\n`;
      text += `Nama Lengkap: ${this.contactForm.name}\n`;
      text += `Kebutuhan: ${this.contactForm.clientType === 'perusahaan' ? 'Perusahaan' : 'Pribadi'}\n`;
      
      if (this.contactForm.clientType === 'perusahaan') {
        text += `Nama Perusahaan: ${this.contactForm.companyName}\n`;
      }
      
      text += `No. WhatsApp: ${this.contactForm.phone}\n`;
      text += `Alamat: ${this.contactForm.address}\n\n`;
      
      let serviceName = '';
      if (this.contactForm.service === 'pembelian') {
        serviceName = 'Pembelian Unit Baru';
      } else {
        serviceName = this.contactForm.service.charAt(0).toUpperCase() + this.contactForm.service.slice(1);
      }
      
      text += `*DETAIL KEBUTUHAN*\n`;
      text += `Layanan: ${serviceName}\n`;
      
      text += `----------------------------------\n`;
      text += `*Detail Pesan:*\n`;
      text += `${this.contactForm.message}\n`;
      text += `----------------------------------\n\n`;
      
      text += `Mohon informasinya lebih lanjut. Terima kasih.`;

      const encodedMessage = encodeURIComponent(text);
      window.open(`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`, '_blank')
    },
  }
}
</script>

<template>
  <section id="kontak" class="py-20 lg:py-28 bg-slate-50 border-t border-gray-200 relative overflow-hidden">
    
    <div class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
    <div class="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-30 pointer-events-none"></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Hubungi <span class="text-blue-600">Kami</span>
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Siap memberikan solusi terbaik untuk kebutuhan elektrikal dan mekanikal industri Anda.
        </p>
      </div>

      <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        <div 
          class="lg:col-span-7"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 0.6 } }"
        >
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 relative">
            <div class="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-indigo-600"></div>
            <div class="p-8 md:p-10">
              <div class="flex items-center space-x-3 mb-8">
                <div class="p-3 bg-blue-50 rounded-lg text-blue-600">
                  <MessageSquare :size="28" />
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900">Kirim Pesan</h3>
                  <p class="text-gray-500 text-sm">Konsultasi gratis & respon cepat via WhatsApp</p>
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-6">

                <div class="space-y-2">
                  <label class="text-sm font-semibold text-gray-700">Nama Lengkap</label>
                  <input
                    v-model="contactForm.name"
                    @input="validateField('name')"
                    type="text"
                    placeholder="Nama Anda"
                    class="w-full px-4 py-3 rounded-xl border transition-all outline-none"
                    :class="contactErrors.name ? 'border-red-500 bg-red-50 focus:ring-red-200' : 'bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'"
                  />
                  <p v-if="contactErrors.name" class="text-red-500 text-xs mt-1 font-medium">Nama wajib diisi</p>
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-semibold text-gray-700">Skala Kebutuhan</label>
                  <div class="relative">
                    <select
                      v-model="contactForm.clientType"
                      @change="handleClientTypeChange"
                      class="w-full px-4 py-3 rounded-xl border transition-all outline-none appearance-none cursor-pointer pr-10"
                      :class="contactErrors.clientType ? 'border-red-500 bg-red-50 focus:ring-red-200' : 'bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'"
                    >
                      <option value="" disabled selected>Pilih Skala</option>
                      <option value="pribadi">Pribadi</option>
                      <option value="perusahaan">Perusahaan</option>
                    </select>
                    <ChevronDown class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size="20" />
                  </div>
                  <p v-if="contactErrors.clientType" class="text-red-500 text-xs mt-1 font-medium">Wajib dipilih</p>
                </div>

                <template v-if="contactForm.clientType === 'perusahaan'">
                  
                  <div class="space-y-2 animate-fade-in-up">
                    <label class="text-sm font-semibold text-gray-700">Nama Perusahaan</label>
                    <div class="relative">
                      <input
                        v-model="contactForm.companyName"
                        @input="validateField('companyName')"
                        type="text"
                        placeholder="Nama Perusahaan"
                        class="w-full px-4 py-3 pl-11 rounded-xl border transition-all outline-none"
                        :class="contactErrors.companyName ? 'border-red-500 bg-red-50 focus:ring-red-200' : 'bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'"
                      />
                      <Building2 class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size="18" />
                    </div>
                    <p v-if="contactErrors.companyName" class="text-red-500 text-xs mt-1 font-medium">Wajib diisi</p>
                  </div>

                  <div class="space-y-2 animate-fade-in-up">
                    <label class="text-sm font-semibold text-gray-700">Layanan</label>
                    <div class="relative">
                      <select
                        v-model="contactForm.service"
                        @change="validateField('service')"
                        class="w-full px-4 py-3 rounded-xl border transition-all outline-none appearance-none cursor-pointer pr-10"
                        :class="contactErrors.service ? 'border-red-500 bg-red-50 focus:ring-red-200' : 'bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'"
                      >
                        <option value="" disabled selected>Pilih Layanan</option>
                        <option value="Pembelian Unit Baru">Pembelian Unit Baru</option>
                        <option value="Penyewaan">Penyewaan</option>
                        <option value="Perbaikan">Perbaikan</option>
                      </select>
                      <ChevronDown class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size="20" />
                    </div>
                    <p v-if="contactErrors.service" class="text-red-500 text-xs mt-1 font-medium">Wajib dipilih</p>
                  </div>

                  <div class="space-y-2 animate-fade-in-up">
                    <label class="text-sm font-semibold text-gray-700">No. WhatsApp</label>
                    <input
                      :value="contactForm.phone"
                      @input="sanitizePhoneInput"
                      type="tel"
                      placeholder="0812xxxx"
                      class="w-full px-4 py-3 rounded-xl border transition-all outline-none"
                      :class="contactErrors.phone ? 'border-red-500 bg-red-50 focus:ring-red-200' : 'bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'"
                    />
                    <p v-if="contactErrors.phone" class="text-red-500 text-xs mt-1 font-medium">Nomor wajib diisi</p>
                  </div>

                  <div class="space-y-2 animate-fade-in-up">
                    <label class="text-sm font-semibold text-gray-700">Alamat</label>
                    <input
                      v-model="contactForm.address"
                      @input="validateField('address')"
                      type="text"
                      placeholder="Alamat Lengkap"
                      class="w-full px-4 py-3 rounded-xl border transition-all outline-none"
                      :class="contactErrors.address ? 'border-red-500 bg-red-50 focus:ring-red-200' : 'bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'"
                    />
                    <p v-if="contactErrors.address" class="text-red-500 text-xs mt-1 font-medium">Alamat wajib diisi</p>
                  </div>

                </template>

                <template v-else>
                  
                  <div class="space-y-2">
                    <label class="text-sm font-semibold text-gray-700">No. WhatsApp</label>
                    <input
                      :value="contactForm.phone"
                      @input="sanitizePhoneInput"
                      type="tel"
                      placeholder="0812xxxx"
                      class="w-full px-4 py-3 rounded-xl border transition-all outline-none"
                      :class="contactErrors.phone ? 'border-red-500 bg-red-50 focus:ring-red-200' : 'bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'"
                    />
                    <p v-if="contactErrors.phone" class="text-red-500 text-xs mt-1 font-medium">Nomor wajib diisi</p>
                  </div>

                  <div class="space-y-2">
                    <label class="text-sm font-semibold text-gray-700">Layanan</label>
                    <div class="relative">
                      <select
                        v-model="contactForm.service"
                        @change="validateField('service')"
                        class="w-full px-4 py-3 rounded-xl border transition-all outline-none appearance-none cursor-pointer pr-10"
                        :class="contactErrors.service ? 'border-red-500 bg-red-50 focus:ring-red-200' : 'bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'"
                      >
                        <option value="" disabled selected>Pilih Layanan</option>
                        <option value="Pembelian Unit Baru">Pembelian Unit Baru</option>
                        <option value="Penyewaan">Penyewaan</option>
                        <option value="Perbaikan">Perbaikan</option>
                      </select>
                      <ChevronDown class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size="20" />
                    </div>
                    <p v-if="contactErrors.service" class="text-red-500 text-xs mt-1 font-medium">Wajib dipilih</p>
                  </div>

                  <div class="md:col-span-2 space-y-2">
                    <label class="text-sm font-semibold text-gray-700">Alamat</label>
                    <input
                      v-model="contactForm.address"
                      @input="validateField('address')"
                      type="text"
                      placeholder="Alamat Lengkap"
                      class="w-full px-4 py-3 rounded-xl border transition-all outline-none"
                      :class="contactErrors.address ? 'border-red-500 bg-red-50 focus:ring-red-200' : 'bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'"
                    />
                    <p v-if="contactErrors.address" class="text-red-500 text-xs mt-1 font-medium">Alamat wajib diisi</p>
                  </div>

                </template>

                <div class="md:col-span-2 space-y-2">
                  <label class="text-sm font-semibold text-gray-700">Detail Pesan</label>
                  <textarea
                    v-model="contactForm.message"
                    @input="validateField('message')"
                    rows="4"
                    placeholder="Jelaskan kebutuhan atau kendala Anda..."
                    class="w-full px-4 py-3 rounded-xl border transition-all outline-none resize-none"
                    :class="contactErrors.message ? 'border-red-500 bg-red-50 focus:ring-red-200' : 'bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'"
                  ></textarea>
                  <p v-if="contactErrors.message" class="text-red-500 text-xs mt-1 font-medium">Pesan wajib diisi</p>
                </div>

                <div class="md:col-span-2 mt-4">
                  <button
                    @click="submitContact"
                    class="w-full group bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-300 cursor-pointer"
                  >
                    <div class="flex items-center justify-center space-x-2">
                      <span>Kirim via WhatsApp</span>
                      <Send class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </div>

              </div>
              </div>
          </div>
        </div>

        <div class="lg:col-span-5 space-y-6">
          <div 
            v-motion
            :initial="{ opacity: 0, x: 50 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } }"
            class="space-y-4"
          >
            <div 
              v-for="(info, index) in contactInfo" 
              :key="index"
              class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-start space-x-4 hover:shadow-md hover:border-blue-200 transition-all duration-300 group"
            >
              <div :class="`shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300 ${info.color}`">
                <component :is="info.icon" :size="22" />
              </div>
              <div>
                <h4 class="font-bold text-gray-800 text-sm uppercase tracking-wide mb-1">{{ info.title }}</h4>
                <p class="text-gray-600 text-sm font-medium whitespace-pre-line leading-relaxed">{{ info.content }}</p>
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
                  <h4 class="text-xl font-bold flex items-center gap-2">
                    <CheckCircle2 class="text-green-400" /> Layanan Darurat
                  </h4>
                  <p class="text-blue-200 text-sm mt-1 font-medium">Siap Siaga Setiap Saat</p>
                </div>
                <div class="bg-white/10 backdrop-blur-md border border-white/10 rounded-lg px-3 py-1 flex flex-col items-center justify-center">
                  <span class="text-2xl font-black text-white leading-none">24</span>
                  <span class="text-[10px] font-bold text-blue-200 uppercase tracking-wider">Jam/7</span>
                </div>
              </div>
              <p class="text-gray-300 text-sm mb-6 leading-relaxed">
                Mesin breakdown tiba-tiba? Tim teknisi emergency kami siap meluncur ke lokasi Anda.
              </p>
              
              <a href="https://wa.me/6289670308822" target="_blank"
                class="w-full bg-white text-blue-900 font-bold text-center py-3 rounded-lg hover:bg-blue-50 transition-colors shadow-lg flex items-center justify-center gap-2 duration-300">
                <Phone size="18" class="text-blue-600" />
                Hubungi Emergency
              </a>

            </div>
          </div>

          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.5 } }"
            class="bg-white p-2 rounded-2xl shadow-lg border border-gray-100 h-[280px]"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.4972535151687!2d105.27873157474339!3d-5.3407915946378095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40c5003a371e59%3A0x358535c0e42e44fa!2sBengkel%20Sinar%20Elektro%20Sejahtera!5e0!3m2!1sen!2sid!4v1765885656369!5m2!1sen!2sid" 
              width="100%" 
              height="100%" 
              style="border:0; border-radius: 0.75rem;" 
              allowfullscreen="" 
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              class="grayscale hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>