<script>
import { MapPin, Phone, Mail } from 'lucide-vue-next'

export default {
  name: 'Footer',
  components: { MapPin, Phone, Mail },

  data() {
    return {
      currentYear: new Date().getFullYear(),

      quickLinks: [
        { label: 'Beranda', href: '#beranda' },
        { label: 'Perusahaan', href: '#perusahaan' },
        { label: 'Katalog Produk', href: '#katalog' },
        { label: 'Proyek', href: '#proyek' },
        { label: 'Kontak', href: '#kontak' },
      ],

      services: [
        'Rewinding Motor 1 Phase',
        'Rewinding Motor 3 Phase',
        'Service Genset',
        'Penjualan Genset',
        'Sewa Genset',
      ],
    }
  },

  methods: {
    scrollToSection(href) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    },
  },
}
</script>

<template>
  <footer class="bg-gray-900 text-gray-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      <!-- GRID -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

        <!-- Perusahaan -->
        <div>
          <div class="flex items-center space-x-3 mb-4">
            <div
              class="w-12 h-12 bg-linear-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center"
            >
              <span class="text-white font-bold text-xl">SE</span>
            </div>

            <div>
              <h3 class="text-white font-bold text-lg">Sinar Elektro</h3>
              <p class="text-sm text-gray-400">Sejahtera</p>
            </div>
          </div>

          <p class="text-gray-400 leading-relaxed mb-4">
            Spesialis rewinding elektro motor dan layanan genset profesional dengan pengalaman lebih dari 15 tahun.
          </p>
        </div>

        <!-- Menu -->
        <div>
          <h4 class="text-white font-bold text-lg mb-4">Menu</h4>
          <ul class="space-y-2">
            <li 
              v-for="(link, index) in quickLinks" 
              :key="index"
            >
              <button
                @click="scrollToSection(link.href)"
                class="text-gray-400 hover:text-blue-400 transition-colors duration-200"
              >
                {{ link.label }}
              </button>
            </li>
          </ul>
        </div>

        <!-- Layanan -->
        <div>
          <h4 class="text-white font-bold text-lg mb-4">Layanan</h4>
          <ul class="space-y-2">
            <li 
              v-for="(service, index) in services" 
              :key="index"
              class="text-gray-400"
            >
              {{ service }}
            </li>
          </ul>
        </div>

        <!-- Kontak -->
        <div>
          <h4 class="text-white font-bold text-lg mb-4">Kontak</h4>
          <ul class="space-y-3">
            
            <li class="flex items-start space-x-3">
              <MapPin class="text-blue-400 shrink-0 mt-1" :size="18" />
              <span class="text-gray-400 text-sm">
                Jl. Industri Raya No. 123, Kawasan Industri, Surabaya 60291
              </span>
            </li>

            <li class="flex items-center space-x-3">
              <Phone class="text-blue-400 shrink-0" :size="18" />
              <a 
                href="tel:+628123456789"
                class="text-gray-400 hover:text-blue-400 transition-colors text-sm"
              >
                +62 812-3456-7890
              </a>
            </li>

            <li class="flex items-center space-x-3">
              <Mail class="text-blue-400 shrink-0" :size="18" />
              <a 
                href="mailto:info@sinarelektro.co.id"
                class="text-gray-400 hover:text-blue-400 transition-colors text-sm"
              >
                info@sinarelektro.co.id
              </a>
            </li>

          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-gray-800 pt-8">
        <div
          class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <p class="text-gray-400 text-sm text-center md:text-left">
            &copy; {{ currentYear }} Sinar Elektro Sejahtera. All rights reserved.
          </p>

          <p class="text-gray-400 text-sm text-center md:text-right">
            Designed with excellence for your electrical needs
          </p>
        </div>
      </div>

    </div>
  </footer>
</template>
