<script>
import { ArrowRight, ChevronLeft, ChevronRight, Tag } from 'lucide-vue-next'

export default {
  name: 'Catalog',
  components: {
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Tag
  },

  data() {
    return {
      currentSlide: 0,
      products: [
        {
          id: 1,
          title: 'PJPS-13 WP',
          brand: 'JERBINDO',
          image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800',
          specs: [
            { label: 'Engine', value: 'PERKINS' },
            { label: 'Model', value: '403A-15G1' },
            { label: 'Prime', value: '13 kVA' },
          ],
        },
        {
          id: 2,
          title: 'PJPS-15 WP',
          brand: 'JERBINDO',
          image: 'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=800',
          specs: [
            { label: 'Engine', value: 'PERKINS' },
            { label: 'Model', value: '403A-15G2' },
            { label: 'Prime', value: '15 kVA' },
          ],
        },
        {
          id: 3,
          title: 'VOLTRA-15',
          brand: 'VOLTRAGEN',
          image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800',
          specs: [
            { label: 'Engine', value: 'FAW' },
            { label: 'Model', value: '4DW81-23D' },
            { label: 'Prime', value: '15 kVA' },
          ],
        },
        {
          id: 4,
          title: 'BJPS-18 WP',
          brand: 'BAUDOUIN',
          image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800',
          specs: [
            { label: 'Engine', value: 'Baudouin' },
            { label: 'Model', value: '4M06G20/5' },
            { label: 'Prime', value: '18 kVA' },
          ],
        },
      ],
    }
  },

  computed: {
    totalSlides() {
      return 2
    },
    visibleProducts() {
      if (this.currentSlide === 0) return this.products
      if (this.currentSlide === 1) {
        return [
          this.products[2],
          this.products[0],
          this.products[3],
          this.products[1],
        ]
      }
      return this.products
    }
  },

  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides
    },
    goToSlide(index) {
      this.currentSlide = index
    },
  },
}
</script>

<template>
  <section id="katalog" class="py-24 bg-gray-50/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="flex flex-col items-center text-center justify-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
          Produk Genset <span class="text-blue-600">Terbaik Kami</span>
        </h2>
        <p class="text-lg text-gray-600 max-w-xl mx-auto">
          Pilihan genset yang siap bantu kebutuhan daya Anda.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="product in products"
          :key="product.id"
          class="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
        >
          <div class="relative aspect-[4/3] overflow-hidden bg-gray-100">
            <img 
              :src="product.image" 
              class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" 
              alt="Product Image"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
          </div>

          <div class="p-5 flex flex-col flex-grow">
            <h3 class="text-[16px] font-bold text-gray-900 mb-3 transition-colors leading-snug group-hover:text-blue-600">
              {{ product.title }}
            </h3>

            <div class="space-y-2 mb-6 flex-grow">
              <div
                v-for="(spec, idx) in product.specs"
                :key="idx"
                class="flex items-center justify-between text-[12px] border-b border-gray-50 pb-1.5 last:border-0"
              >
                <span class="text-gray-500">{{ spec.label }}</span>
                <span class="font-medium text-gray-800">{{ spec.value }}</span>
              </div>
            </div>

            <router-link
              to="/catalog"
              class="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gray-50 font-semibold text-sm transition-all duration-300 text-gray-700 hover:bg-blue-500 hover:text-white group-hover:shadow-blue-200 group-hover:shadow-lg"
            >
              Lihat Detail <ArrowRight size="14"/>
            </router-link>
          </div>
        </div>
      </div>

      <div class="mt-10 flex flex-col items-center justify-center gap-6">
        <router-link 
          to="/catalog" 
          class="group inline-flex items-center gap-2 text-base font-medium text-gray-500 transition-colors hover:text-blue-600"
        >
          <span class="relative">
            Lihat Produk Lengkap
            <span class="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </span>
          <ArrowRight size="18" class="transition-transform duration-300 group-hover:translate-x-1"/>
        </router-link>
      </div>

    </div>
  </section>
</template>