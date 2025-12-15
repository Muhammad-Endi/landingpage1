<script>
import { Menu, X } from "lucide-vue-next";
import { useRoute } from "vue-router";

export default {
  name: "Navbar",
  components: { Menu, X },

  setup() {
    const route = useRoute();

    // halaman aktif
    const isActive = (path) => route.path === path;

    // cek halaman home
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
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      !isHome()
        ? 'bg-white shadow-lg'
        : isScrolled
        ? 'bg-white/90 backdrop-blur-lg shadow-lg'
        : 'bg-transparent',
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <div class="flex items-center space-x-4">
          <img
            src="/logo.png"
            alt="Logo Sinar Elektro Sejahtera"
            class="w-14 h-14 object-contain"
          />
          
          <div>
            <h1
              :class="[
                'text-xl font-bold transition-colors duration-300',
                (!isHome() || isScrolled) ? 'text-[#074DA2]' : 'text-white'
              ]"
            >
              Sinar Elektro Sejahtera
            </h1>
          </div>
        </div>

        <div class="hidden md:flex items-center space-x-8">
          <router-link
            v-for="(item, index) in menuItems"
            :key="index"
            :to="item.href"
            class="font-medium transition-all duration-300"
            :class="[
              isActive(item.href)
                ? 'text-[#155DFC]'   // warna menu aktif
                : (!isHome() || isScrolled)
                  ? 'text-gray-700 hover:text-[#155DFC]'
                  : 'text-white hover:text-[#155DFC]'
            ]"
          >
            {{ item.label }}
          </router-link>
        </div>

        <button
          @click="toggleMobileMenu"
          :class="[
            'md:hidden transition-colors duration-300',
            (!isHome() || isScrolled)
              ? 'text-gray-700 hover:text-[#155DFC]'
              : 'text-white hover:text-[#155DFC]'
          ]"
        >
          <component :is="isMobileMenuOpen ? 'X' : 'Menu'" :size="28" />
        </button>
      </div>
    </div>

    <transition name="slide-fade">
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden bg-white border-t border-gray-200"
      >
        <div class="px-4 py-6 space-y-4">
          <router-link
            v-for="(item, index) in menuItems"
            :key="index"
            :to="item.href"
            class="block font-medium py-2"
            :class="[
              isActive(item.href) ? 'text-[#155DFC]'
              : 'text-gray-700 hover:text-[#155DFC]'
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
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>