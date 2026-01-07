<script>
import { ArrowRight, ChevronLeft, ChevronRight, Tag, Loader2, AlertCircle } from 'lucide-vue-next'
import apiClient from '@/api/axios'

export default {
  name: 'Catalog',
  components: {
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Tag,
    Loader2,
    AlertCircle
  },

  data() {
    return {
      currentSlide: 0,
      products: [],
      isLoading: false,
      error: null,
    }
  },

  async mounted() {
    await this.fetchProducts()
  },

  computed: {
    totalSlides() {
      return 2
    },
    visibleProducts() {
      // Tampilkan hanya 4 produk pertama untuk homepage
      return this.products.slice(0, 4)
    }
  },

  methods: {
    async fetchProducts() {
      try {
        this.isLoading = true
        this.error = null
        const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
        
        const response = await apiClient.get('/api/public/products', {
          params: {
            page: 1,
            limit: 8 // Ambil 8 produk untuk rotasi
          }
        })
        
        if (response.data.meta.success) {
          this.products = response.data.data.map(product => {
            const spec = product.specifications?.[0] || {}
            
            return {
              id: product.uuid,
              uuid: product.uuid,
              title: product.title,
              brand: spec.brand || 'N/A',
              image: product.image 
                ? `${baseURL}/${product.image}` 
                : 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800',
              specs: [
                { label: 'Engine', value: spec.brand || 'N/A' },
                { label: 'Model', value: spec.model || 'N/A' },
                { label: 'Prime', value: spec.prime_power || 'N/A' },
              ],
              sellPrice: product.sell_price,
              rentPrice: product.rent_price,
              stock: product.stock,
              category: product.category?.name || 'Uncategorized'
            }
          })
        }
      } catch (error) {
        console.error('Error fetching products:', error)
        this.error = 'Gagal memuat produk'
        this.products = []
      } finally {
        this.isLoading = false
      }
    },

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
  <section id="katalog" class="py-12 sm:py-20 lg:py-24 bg-gray-50/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="flex flex-col items-center text-center justify-center mb-10 sm:mb-14">
        <h2 class="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
          Produk Genset Kami <span class="text-blue-600"> </span>
        </h2>
        <p class="text-sm sm:text-lg text-gray-600 max-w-xl mx-auto px-4">
          Pilihan genset yang siap bantu kebutuhan daya Anda.
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
        <Loader2 class="w-12 h-12 animate-spin text-blue-600 mb-4" />
        <p class="text-gray-500 font-medium">Memuat produk...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="flex flex-col items-center justify-center py-20">
        <div class="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md text-center">
          <AlertCircle class="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 class="text-lg font-bold text-red-900 mb-2">{{ error }}</h3>
          <p class="text-red-700 text-sm mb-4">Terjadi kesalahan saat memuat produk.</p>
          <button 
            @click="fetchProducts" 
            class="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="products.length === 0" class="flex flex-col items-center justify-center py-20">
        <div class="text-center">
          <Tag class="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 class="text-lg font-bold text-gray-900 mb-2">Belum Ada Produk</h3>
          <p class="text-gray-500 text-sm">Produk akan segera ditambahkan.</p>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        <div
          v-for="product in visibleProducts"
          :key="product.id"
          class="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
        >
          <!-- Product Image -->
          <div class="relative aspect-4/3 overflow-hidden bg-gray-100">
            <img 
              :src="product.image" 
              :alt="product.title"
              class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" 
              onerror="this.src='https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800'"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
            
            <!-- Stock Badge -->
            <div v-if="product.stock > 0" class="absolute top-3 right-3">
              <span class="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                Ready Stock
              </span>
            </div>
          </div>

          <!-- Product Info -->
          <div class="p-5 flex flex-col grow">
            <h3 class="text-base sm:text-[16px] font-bold text-gray-900 mb-4 transition-colors leading-snug group-hover:text-blue-600">
              {{ product.title }}
            </h3>

            <!-- Specs -->
            <div class="space-y-2 mb-6 grow">
              <div
                v-for="(spec, idx) in product.specs"
                :key="idx"
                class="flex items-center justify-between text-[12px] border-b border-gray-50 pb-1.5 last:border-0"
              >
                <span class="text-gray-500 font-medium">{{ spec.label }}</span>
                <span class="font-bold text-gray-800">{{ spec.value }}</span>
              </div>
            </div>

            <!-- CTA Button -->
            <router-link
              :to="`/catalog/${product.uuid}`"
              class="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gray-50 font-bold text-sm transition-all duration-300 text-gray-700 hover:bg-blue-600 hover:text-white group-hover:shadow-blue-200 group-hover:shadow-lg"
            >
              Lihat Detail <ArrowRight size="14"/>
            </router-link>
          </div>
        </div>
      </div>

      <!-- View All CTA -->
      <div v-if="products.length > 0" class="mt-12 flex flex-col items-center justify-center gap-6">
        <router-link 
          to="/catalog" 
          class="group inline-flex items-center gap-2 text-base font-bold text-gray-500 transition-colors hover:text-blue-600"
        >
          <span class="relative">
            Lihat Produk Lengkap
            <span class="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </span>
          <ArrowRight size="18" class="transition-transform duration-300 group-hover:translate-x-1"/>
        </router-link>
      </div>

    </div>
  </section>
</template>

<style scoped>
.aspect-4\/3 {
  aspect-ratio: 4 / 3;
}
</style>
