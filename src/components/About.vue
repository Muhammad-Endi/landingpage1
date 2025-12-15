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
        'Rewinding Elektro Motor (1 & 3 Phase)',
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
  <section id="perusahaan" class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        
        <Motion
          tag="div"
          :initial="{ opacity: 0, x: -50 }"
          :enter="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.8, type: 'spring' }"
          class="relative order-2 lg:order-1"
        >
          <div class="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
            <img 
              src="/workshop.jpg"
              alt="Teknisi Profesional Sinar Elektro"
              class="w-full h-auto object-cover transform group-hover:scale-105 transition duration-700"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
            <div class="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg border-l-4 border-blue-600">
              <div class="flex items-center gap-4">
                
                <div class="flex items-center justify-center shrink-0">
                  <img 
                    src="/logo.png" 
                    alt="Logo Sinar Elektro" 
                    class="w-12 h-12 object-contain"
                  />
                </div>
                
                <div>
                  <p class="text-xs text-gray-500 font-semibold uppercase tracking-wide">Kualitas Terjamin</p>
                  <p class="text-sm sm:text-base font-bold text-gray-900 leading-none mt-0.5">Sejak 2009</p>
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
          class="order-1 lg:order-2"
        >
          <h2 class="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">
            Tentang Kami
          </h2>
          <h3 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Solusi Energi & <span class="text-blue-600">Elektrikal Terpercaya</span>
          </h3>

          <p class="text-lg text-gray-600 mb-8 leading-relaxed">
            <strong class="text-gray-900">Sinar Elektro Sejahtera</strong> bukan sekadar Workshop, melainkan mitra strategis untuk kebutuhan energi industri Anda. 
            Dengan dedikasi selama lebih dari 15 tahun, kami memadukan keahlian teknis presisi dengan peralatan modern untuk memastikan operasional bisnis Anda tidak terganggu.
          </p>

          <div class="grid sm:grid-cols-2 gap-y-4 gap-x-2 mb-10">
            <Motion
              v-for="(service, index) in services"
              :key="index"
              tag="div"
              class="flex items-start space-x-3"
              :initial="{ opacity: 0, y: 10 }"
              :enter="{ opacity: 1, y: 0 }"
              :transition="{ delay: 0.3 + (index * 0.1) }"
            >
              <CheckCircle2 class="text-blue-600 shrink-0 mt-0.5" :size="20" />
              <span class="text-gray-700 font-medium text-sm sm:text-base">{{ service }}</span>
            </Motion>
          </div>

          <div class="pt-8 border-t border-gray-200 grid grid-cols-3 gap-4">
            <div v-for="(stat, idx) in stats" :key="idx" class="text-center sm:text-left">
              <component :is="stat.icon" class="w-6 h-6 mb-2 mx-auto sm:mx-0" :class="stat.color" />
              <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
              <p class="text-xs text-gray-500 uppercase tracking-wide">{{ stat.label }}</p>
            </div>
          </div>

        </Motion>
      </div>
    </div>
  </section>
</template>