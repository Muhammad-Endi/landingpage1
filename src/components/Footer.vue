<script>
import { MapPin, Phone, Mail } from 'lucide-vue-next'

export default {
  name: 'Footer',
  components: { MapPin, Phone, Mail },

  data() {
    return {
      currentYear: new Date().getFullYear(),
      quickLinks: [
        { label: 'Beranda', href: '/' },
        { label: 'Tentang', href: '/tentang' },
        { label: 'Produk', href: '/produk' },
        { label: 'Proyek', href: '/proyek' },
        { label: 'Kontak', href: '/kontak' },
      ],
      services: [
        'Service Rewinding Elektromotor 1 & 3 phase',
        'Service Genset',
        'Penjualan Genset',
        'Sewa Genset',
      ],
    }
  },

  methods: {
    handleNavigation(link) {
      if (link.href.startsWith('/#')) {
        if (this.$route.path === '/') {
          const id = link.href.replace('/#', '#');
          this.scrollToSection(id);
        } else {
          this.$router.push(link.href);
        }
      } else {
        this.$router.push(link.href);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },

    scrollToSection(id) {
      const element = document.querySelector(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
  },
}
</script>

<template>
  <footer class="bg-gray-900 text-gray-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        
        <div>
          <div class="flex items-center space-x-3 mb-4">
            <img 
              src="/logo.png" 
              alt="Logo Sinar Elektro Sejahtera" 
              class="h-12 w-auto object-contain"
            />
            <div>
              <h3 class="text-white font-bold text-lg leading-tight">Sinar Elektro</h3>
              <p class="text-sm text-gray-400">Sejahtera</p>
            </div>
          </div>
          <p class="text-gray-400 leading-relaxed mb-4 text-left">
            Spesialis Rewinding Elektromotor 1 & 3 phase dan layanan service, penjualan serta penyewaan genset.
          </p>
        </div>

        <div class="lg:pl-18">
          <h4 class="text-white font-bold text-lg mb-4">Menu</h4>
          <ul class="space-y-2">
            <li v-for="(link, index) in quickLinks" :key="index">
              <button
                @click="handleNavigation(link)"
                class="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-left"
              >
                {{ link.label }}
              </button>
            </li>
          </ul>
        </div>

        <div class="lg:pl-8">
          <h4 class="text-white font-bold text-lg mb-4">Layanan</h4>
          <ul class="space-y-2">
            <li v-for="(service, index) in services" :key="index" class="text-gray-400">
              {{ service }}
            </li>
          </ul>
        </div>

        <div class="lg:pl-8">
          <h4 class="text-white font-bold text-lg mb-4">Kontak</h4>
          <ul class="space-y-3">
            <li class="flex items-start space-x-3">
              <MapPin class="text-blue-400 shrink-0 mt-1" :size="18" />
              <span class="text-gray-400 text-sm">Lampung Selatan, Lampung Indonesia</span>
            </li>
            <li class="flex items-center space-x-3">
              <Phone class="text-blue-400 shrink-0" :size="18" />
              <a href="tel:+6285383120656" class="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                0853-8312-0656
              </a>
            </li>
            <li class="flex items-center space-x-3">
              <Mail class="text-blue-400 shrink-0" :size="18" />
              <a href="mailto:siswoyo.pulsarian@gmail.com" class="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                siswoyo.pulsarian@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>&copy; {{ currentYear }} Sinar Elektro Sejahtera. All rights reserved.</p>
        <p class="mt-2 md:mt-0">Designed for your electrical needs</p>
      </div>
    </div>
  </footer>
</template>