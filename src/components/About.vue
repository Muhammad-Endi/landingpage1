<script>
import {
  CheckCircle2,
  Users,
  Clock,
  Zap
} from 'lucide-vue-next'

export default {
  name: 'About',

  components: {
    CheckCircle2,
    Users,
    Clock,
    Zap
  },

  data() {
    return {
      // Data Statistik
      stats: [
        { icon: 'Clock', label: 'Tahun Pengalaman', value: '15+', color: 'text-blue-600' },
        { icon: 'Users', label: 'Klien Puas', value: '100%', color: 'text-green-600' },
        { icon: 'Zap', label: 'Proyek Selesai', value: '100+', color: 'text-yellow-600' },
      ],
      services: [
        'Rewinding Elektromotor 1 & 3 Phase',
        'Sewa Genset Berbagai Kapasitas',
        'Penjualan Genset & Generator Baru',
        'Garansi Resmi & Transparan',
        'Service & Maintenance Genset Berkala',
        'Konsultasi Gratis',
      ]
    }
  }
}
</script>

<template>
  <section id="perusahaan" class="py-16 lg:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        <Motion
          tag="div"
          :initial="{ opacity: 0, x: -50 }"
          :enter="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.8, type: 'spring' }"
          class="relative hidden lg:block"
        >
          <div class="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
            <img 
              src="/mitra.jpeg"
              alt="Teknisi Profesional Sinar Elektro" 
              class="w-full h-auto object-cover transform group-hover:scale-105 transition duration-700"
            />
            <div class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
            <div class="absolute right-4 bottom-4 bg-white rounded-2xl p-4 shadow-xl flex items-center gap-4">
              <div class="flex items-center gap-3">
                <img src="/logo.png" alt="Logo" class="w-12 h-12 object-contain" />
                <div>
                  <p class="text-xs text-gray-500 font-bold uppercase tracking-wider">Kualitas Terjamin</p>
                  <p class="text-lg font-extrabold text-gray-900 leading-none mt-1">Sejak 2009</p>
                </div>
              </div>
            </div>
          </div>
        </Motion>

        <Motion
          tag="div"
          :initial="{ opacity: 0, x: 50 }"
          :enter="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.8, delay: 0.2 }"
        >
          <h2 class="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3 text-left">
            Tentang Kami
          </h2>
          <h3 class="text-[24px] sm:text-4xl lg:text-[40px] font-extrabold text-gray-900 mb-6 leading-tight text-left">
            Solusi Energi & <span class="text-blue-600">Elektrikal Terpercaya</span>
          </h3>

          <div class="block lg:hidden mb-10">
            <div class="relative rounded-2xl overflow-hidden shadow-xl border-2 border-white">
               <img 
                src="/mitra.jpeg"
                alt="Teknisi Profesional Sinar Elektro" 
                class="w-full h-72 object-cover"
              />
              <div class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
              <div class="absolute right-3 bottom-3 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg flex items-center gap-3 border border-gray-100">
                <img src="/logo.png" class="w-8 h-8 object-contain" alt="Logo Sinar Elektro" />
                <div class="flex flex-col">
                  <span class="text-[10px] leading-none font-bold text-gray-600 uppercase">Kualitas Terjamin</span>
                  <span class="text-[13px] font-black text-gray-900 uppercase mt-0.5">Sejak 2009</span>
                </div>
              </div>
            </div>
          </div>

          <p class="text-lg text-gray-600 leading-relaxed mb-6 text-justify">
            Berdiri sejak 2009, <strong>Sinar Elektro Sejahtera</strong> adalah workshop spesialis yang bergerak di bidang service <em>Rewinding</em> Elektromotor 1 & 3 Phase. Selain itu kami juga menyediakan layanan service genset, penjualan, serta penyewaan genset.
          </p>
          <p class="text-lg text-gray-600 leading-relaxed mb-8 text-justify">
            Melalui teknologi presisi dan teknisi ahli, kami menjamin mesin kembali ke performa maksimal pabrikan.
          </p>

          <div class="grid sm:grid-cols-2 gap-y-4 gap-x-2 mb-10">
            <div
              v-for="(service, index) in services"
              :key="index"
              class="flex items-start space-x-3"
            >
              <CheckCircle2 class="text-blue-600 shrink-0 mt-0.5" :size="20" />
              <span class="text-gray-700 font-medium text-sm sm:text-base text-left">{{ service }}</span>
            </div>
          </div>

          <div class="pt-8 border-t border-gray-200 grid grid-cols-3 gap-4">
            <div v-for="(stat, idx) in stats" :key="idx" class="text-center">
              <component 
                :is="stat.icon" 
                class="w-6 h-6 mb-2 mx-auto" 
                :class="stat.color" 
              />
              <p class="text-[22px] font-bold text-gray-900">{{ stat.value }}</p>
              <p class="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide font-semibold">
                {{ stat.label }}
              </p>
            </div>
          </div>

        </Motion>
      </div>
    </div>
  </section>
</template>