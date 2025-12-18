<script>
import { Menu, X } from "lucide-vue-next";
import { useRoute } from "vue-router";

export default {
  name: "Navbar",
  components: { Menu, X },

  setup() {
    const route = useRoute();
    const isActive = (path) => route.path === path;
    const isHome = () => route.path === "/";

    return { isActive, isHome };
  },

  data() {
    return {
      isScrolled: false,
      isMobileMenuOpen: false,
      menuItems: [
        { label: "Beranda", href: "/" },
        { label: "Tentang", href: "/about" },
        { label: "Produk", href: "/catalog" },
        { label: "Proyek", href: "/projects" },
        { label: "Kontak", href: "/contact" },
      ],
    };
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 20;
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
  },
};
</script>

<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      // Efek blur hanya di Beranda saat di Hero Section
      (!isHome() || isScrolled)
        ? 'bg-white shadow-sm'
        : isMobileMenuOpen
          ? 'bg-transparent backdrop-blur-md' 
          : 'bg-transparent'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="flex justify-between items-center h-20 transition-all duration-300"
        :class="[
          // 1. Munculkan border-b hanya saat menu mobile terbuka
          // 2. Tetap paksa border-0 di tampilan desktop (md:border-b-0)
          isMobileMenuOpen ? 'border-b md:border-b-0' : 'border-b-0',
          
          // Warna garis menyesuaikan kondisi halaman/scroll
          (!isHome() || isScrolled) ? 'border-gray-200' : 'border-white/30'
        ]"
      >
        <div class="flex items-center space-x-3">
          <img src="/logo.png" alt="Logo" class="w-12 h-12 md:w-13.5 md:h-13.5 object-contain" />
          <h1
            :class="[
              'text-lg font-bold leading-tight transition-colors duration-300',
              (!isHome() || isScrolled) ? 'text-[#074DA2]' : 'text-white'
            ]"
          >
            Sinar Elektro Sejahtera
          </h1>
        </div>

        <div class="hidden md:flex items-center space-x-8">
          <router-link
            v-for="(item, index) in menuItems"
            :key="index"
            :to="item.href"
            class="font-medium transition-all duration-300"
            :class="[
              isActive(item.href)
                ? 'text-[#155DFC]'
                : (!isHome() || isScrolled)
                  ? 'text-gray-700 hover:text-[#155DFC]'
                  : 'text-white hover:text-blue-200'
            ]"
          >
            {{ item.label }}
          </router-link>
        </div>

        <button
          @click="toggleMobileMenu"
          :class="[
            'md:hidden transition-colors duration-300 p-2 rounded-lg focus:outline-none',
            (!isHome() || isScrolled) ? 'text-gray-700' : 'text-white'
          ]"
        >
          <component :is="isMobileMenuOpen ? 'X' : 'Menu'" :size="24" />
        </button>
      </div>
    </div>

    <transition name="slide-fade">
      <div
        v-if="isMobileMenuOpen"
        :class="[
          'md:hidden transition-all duration-300',
          (!isHome() || isScrolled) ? 'bg-white' : 'bg-transparent'
        ]"
      >
        <div class="px-6 py-4 space-y-1">
          <router-link
            v-for="(item, index) in menuItems"
            :key="index"
            :to="item.href"
            class="block font-medium py-2.5 px-4 rounded-xl transition-all"
            :class="[
              isActive(item.href)
                ? 'bg-[#155DFC] text-white' 
                : (!isHome() || isScrolled)
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
            ]"
            @click="isMobileMenuOpen = false"
          >
            {{ item.label }}
          </router-link>
        </div>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>