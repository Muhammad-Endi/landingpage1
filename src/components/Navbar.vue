<script>
import { 
  Menu, X, ShoppingCart, CircleAlert, CheckCircle,
  ShoppingBag, CalendarClock, XCircle, Lock, ChevronDown 
} from "lucide-vue-next";
import { useRoute } from "vue-router";

export default {
  name: "Navbar",
  components: { 
    Menu, X, ShoppingCart, CircleAlert, CheckCircle,
    ShoppingBag, CalendarClock, XCircle, Lock, ChevronDown
  },

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
      cartCount: 0,
      showEmptyAlert: false, 
      showSuccessAlert: false, 
      lastAddedProduct: '',    
      isModalOpen: false,
      isBuyMode: true,
      cartItems: [],
      selectedProductForRental: null,
      rentalForm: {
        type: '', name: '', companyName: '', whatsapp: '', duration: '', address: '', details: '' 
      },
      menuItems: [
        { label: "Beranda", href: "/" },
        { label: "Tentang", href: "/tentang" },
        { label: "Produk", href: "/produk" },
        { label: "Proyek", href: "/proyek" },
        { label: "Kontak", href: "/kontak" },
      ],
    };
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
    this.updateCartCount();
    window.addEventListener("cart-updated", this.updateCartCount);
    
    window.addEventListener("open-cart-modal", this.openCart);
    window.addEventListener("open-rental-modal", (e) => {
      this.handleOpenRentalFromExternal(e.detail);
    });
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("cart-updated", this.updateCartCount);
    window.removeEventListener("open-cart-modal", this.openCart);
  },

  methods: {
    handleScroll() { this.isScrolled = window.scrollY > 20; },
    toggleMobileMenu() { this.isMobileMenuOpen = !this.isMobileMenuOpen; },
    
    updateCartCount(event) {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      this.cartCount = cart.length;
      if (event?.detail?.productName) {
        this.lastAddedProduct = event.detail.productName;
        this.showSuccessAlert = true;
        this.showEmptyAlert = false;
        setTimeout(() => { this.showSuccessAlert = false; }, 3000);
      }
    },

    formatRupiah(amount) {
      if (!amount) return 'Hubungi Kami'
      return new Intl.NumberFormat('id-ID', {
        style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0
      }).format(amount);
    },

    openCart() {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      if (cart.length === 0) {
        this.showEmptyAlert = true;
        this.showSuccessAlert = false;
        setTimeout(() => { this.showEmptyAlert = false; }, 3000);
        return;
      }
      this.cartItems = cart;
      this.isBuyMode = true;
      this.isModalOpen = true;
    },

    handleOpenRentalFromExternal(product) {
      this.selectedProductForRental = product;
      this.resetForm();
      this.isBuyMode = false;
      this.isModalOpen = true;
    },

    closeModal() {
      this.isModalOpen = false;
      setTimeout(this.resetForm, 300);
    },

    resetForm() {
      this.rentalForm = { type: '', name: '', companyName: '', whatsapp: '', duration: '', address: '', details: '' };
    },

    updateQty(index, delta) {
      this.cartItems[index].quantity += delta;
      if (this.cartItems[index].quantity <= 0) {
        this.cartItems.splice(index, 1);
      }
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
      window.dispatchEvent(new CustomEvent('cart-updated'));
      if (this.cartItems.length === 0) this.closeModal();
    },

    calculateTotal() {
      const total = this.cartItems.reduce((sum, item) => sum + (item.rawPrice * item.quantity), 0);
      return this.formatRupiah(total);
    },

    filterPhone(e) { this.rentalForm.whatsapp = e.target.value.replace(/[^0-9]/g, ''); },

    submitBuyForm() {
      const phone = '6289670308822';
      const form = this.rentalForm;
      let message = `Halo Sinar Elektro Sejahtera,\n\n`;
      message += `Saya ingin Konsultasi untuk *MEMBELI UNIT BARU*. Berikut rincian pesanan saya:\n`;
      message += `--------------------------------\n`;
      this.cartItems.forEach((item, idx) => {
        message += `${idx + 1}. *${item.title}*\n`;
        message += `   Qty: ${item.quantity} x ${this.formatRupiah(item.rawPrice)}\n`;
        message += `   Subtotal: ${this.formatRupiah(item.rawPrice * item.quantity)}\n`;
      });
      message += `--------------------------------\n`;
      message += `*TOTAL ESTIMASI: ${this.calculateTotal()}*\n\n`;
      message += `DATA PEMBELI:\n`;
      message += `Nama: ${form.name}\n`;
      message += `Keperluan: ${form.type}\n`;
      if (form.type === 'Perusahaan') message += `Perusahaan: ${form.companyName}\n`;
      message += `WhatsApp: ${form.whatsapp}\n`;
      message += `Alamat: ${form.address}\n\n`;
      if (form.details) message += `CATATAN:\n${form.details}\n\n`;
      message += `Mohon informasi lebih lanjut ketersediaan stok dan prosedur pembayarannya. Terimakasih.`;
      window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`, '_blank');
      this.closeModal();
    },

    submitRentalForm() {
      const phone = '6289670308822';
      const form = this.rentalForm;
      const productTitle = this.selectedProductForRental?.title || 'Unit tidak spesifik';
      let message = `Halo Sinar Elektro Sejahtera,\n\nSaya ingin konsultasi sewa genset untuk unit: *${productTitle}*\n\n`;
      message += `DATA PENYEWA:\nNama: ${form.name}\nKeperluan: ${form.type}\n`;
      if (form.type === 'Perusahaan') message += `Perusahaan: ${form.companyName}\n`;
      message += `WhatsApp: ${form.whatsapp}\nAlamat: ${form.address}\nDurasi: ${form.duration}\n\n`;
      if (form.details) message += `DETAIL:\n${form.details}\n\n`;
      message += `Mohon informasinya. Terimakasih.`;
      window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`, '_blank');
      this.closeModal();
    }
  },
};
</script>

<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-[100] transition-all duration-500',
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
          isMobileMenuOpen ? 'border-b md:border-b-0' : 'border-b-0',
          (!isHome() || isScrolled) ? 'border-gray-200' : 'border-white/30'
        ]"
      >
        <div class="flex items-center space-x-3">
          <img src="/logo.png" alt="Logo" class="w-12 h-12 md:w-13.5 md:h-13.5 object-contain" />
          <h1 :class="[ 'text-lg font-bold leading-tight transition-colors duration-300', (!isHome() || isScrolled) ? 'text-[#074DA2]' : 'text-white' ]">
            Sinar Elektro Sejahtera
          </h1>
        </div>

        <div class="hidden md:flex items-center space-x-8">
          <router-link v-for="(item, index) in menuItems" :key="index" :to="item.href" 
            class="font-medium transition-all duration-300" :class="[isActive(item.href) ? 'text-[#155DFC]' : (!isHome() || isScrolled) ? 'text-gray-700 hover:text-[#155DFC]' : 'text-white hover:text-blue-600']">
            {{ item.label }}
          </router-link>

          <div class="relative flex items-center">
            <button @click="openCart" class="relative p-2 rounded-full transition-all duration-300 group" :class="(!isHome() || isScrolled) ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'">
              <ShoppingCart :size="24" />
              <span v-if="cartCount > 0" class="absolute -top-1 -right-1 bg-[#D92525] text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2" :class="(!isHome() || isScrolled) ? 'border-white' : 'border-[#074DA2]'">
                {{ cartCount }}
              </span>
            </button>
            
            <transition name="pop-alert">
              <div v-if="showEmptyAlert" class="absolute top-full right-0 mt-4 w-[210px] bg-white border border-red-100 shadow-xl rounded-lg p-3 z-[110] flex items-center gap-2 pointer-events-none text-left">
                <div class="absolute -top-1.5 right-4 w-3 h-3 bg-white border-t border-l border-red-100 transform rotate-45"></div>
                <CircleAlert class="text-red-500 shrink-0" :size="16" />
                <span class="text-red-500 text-[11px] font-bold leading-tight">Belum ada unit barang yang dipilih</span>
              </div>
            </transition>

            <transition name="pop-alert">
              <div v-if="showSuccessAlert" class="absolute top-full right-0 mt-4 w-[240px] bg-white border border-green-100 shadow-xl rounded-lg p-3 z-[110] flex items-center gap-2 pointer-events-none text-left">
                <div class="absolute -top-1.5 right-4 w-3 h-3 bg-white border-t border-l border-green-100 transform rotate-45"></div>
                <CheckCircle class="text-green-500 shrink-0" :size="18" />
                <div class="flex flex-col">
                  <span class="text-green-600 text-[11px] font-bold leading-tight">Berhasil Ditambahkan!</span>
                  <span class="text-gray-500 text-[10px] truncate w-[180px]">{{ lastAddedProduct }}</span>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <div class="flex items-center gap-2 md:hidden">
          <div class="relative">
            <button @click="openCart" class="relative p-2 rounded-lg transition-colors duration-300" :class="(!isHome() || isScrolled) ? 'text-gray-700' : 'text-white'">
              <ShoppingCart :size="24" />
              <span v-if="cartCount > 0" class="absolute top-0 right-0 bg-[#D92525] text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1">
                {{ cartCount }}
              </span>
            </button>

            <transition name="pop-alert">
              <div v-if="showEmptyAlert" class="absolute top-full right-0 mt-5 w-[210px] bg-white border border-red-100 shadow-xl rounded-lg p-3 z-[110] flex items-center gap-2 pointer-events-none text-left">
                <div class="absolute -top-1.5 right-4 w-3 h-3 bg-white border-t border-l border-red-100 transform rotate-45"></div>
                <CircleAlert class="text-red-500 shrink-0" :size="16" />
                <span class="text-red-500 text-[11px] font-bold leading-tight">Belum ada unit barang yang dipilih</span>
              </div>
            </transition>

            <transition name="pop-alert">
              <div v-if="showSuccessAlert" class="absolute top-full right-0 mt-5 w-[240px] bg-white border border-green-100 shadow-xl rounded-lg p-3 z-[110] flex items-center gap-2 pointer-events-none text-left">
                <div class="absolute -top-1.5 right-4 w-3 h-3 bg-white border-t border-l border-green-100 transform rotate-45"></div>
                <CheckCircle class="text-green-500 shrink-0" :size="18" />
                <div class="flex flex-col">
                  <span class="text-green-600 text-[11px] font-bold leading-tight">Berhasil Ditambahkan!</span>
                  <span class="text-gray-500 text-[10px] truncate w-[180px]">{{ lastAddedProduct }}</span>
                </div>
              </div>
            </transition>
          </div>

          <button @click="toggleMobileMenu" class="transition-colors duration-300 p-2 rounded-lg focus:outline-none" :class="(!isHome() || isScrolled) ? 'text-gray-700' : 'text-white'">
            <component :is="isMobileMenuOpen ? 'X' : 'Menu'" :size="24" />
          </button>
        </div>
      </div>
    </div>

    <transition name="slide-fade">
      <div v-if="isMobileMenuOpen" :class="['md:hidden transition-all duration-300', (!isHome() || isScrolled) ? 'bg-white shadow-lg' : 'bg-transparent']">
        <div class="px-6 py-4 space-y-1">
          <router-link v-for="(item, index) in menuItems" :key="index" :to="item.href" @click="isMobileMenuOpen = false"
            class="block font-medium py-2.5 px-4 rounded-xl transition-all" :class="[isActive(item.href) ? 'bg-[#155DFC] text-white' : (!isHome() || isScrolled) ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10']">
            {{ item.label }}
          </router-link>
        </div>
      </div>
    </transition>

    <div v-if="isModalOpen" class="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
       <div class="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
         <div class="px-6 py-4 border-b flex justify-between items-center" :class="isBuyMode ? 'bg-red-50 border-red-100' : 'bg-orange-50 border-orange-100'">
            <div class="text-left">
              <h3 class="text-lg font-bold flex items-center gap-2" :class="isBuyMode ? 'text-red-800' : 'text-orange-800'">
                <component :is="isBuyMode ? 'ShoppingBag' : 'CalendarClock'" class="w-5 h-5"/> 
                {{ isBuyMode ? 'Keranjang Pembelian' : 'Form Konsultasi Sewa' }}
              </h3>
              <p class="text-[11px] mt-0.5" :class="isBuyMode ? 'text-red-600/80' : 'text-orange-600/80'">
                {{ isBuyMode ? 'Kelola barang dan lengkapi data' : 'Silahkan lengkapi data kebutuhan Anda' }}
              </p>
            </div>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-700"><XCircle class="w-6 h-6" /></button>
         </div>

         <div class="p-6 overflow-y-auto flex-grow text-left">
            <div v-if="isBuyMode" class="mb-8 space-y-3">
              <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Daftar Unit Terpilih</label>
              <div v-for="(item, index) in cartItems" :key="index" class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <img :src="item.image" class="w-12 h-12 object-contain bg-white rounded-lg border border-gray-100 p-1" />
                <div class="flex-grow min-w-0">
                  <h4 class="text-[13px] font-bold text-gray-800 truncate">{{ item.title }}</h4>
                  <p class="text-[11px] text-[#004E93] font-extrabold flex items-center gap-1.5">
                    {{ formatRupiah(item.rawPrice * item.quantity) }}
                    <span class="bg-blue-100 text-[#004E93] px-1.5 py-0.5 rounded text-[9px] font-bold">x{{ item.quantity }}</span>
                  </p>
                </div>
                <div class="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
                  <button @click="updateQty(index, -1)" class="w-6 h-6 flex items-center justify-center bg-gray-50 hover:bg-red-50 rounded text-gray-500">-</button>
                  <span class="text-xs font-bold w-4 text-center">{{ item.quantity }}</span>
                  <button @click="updateQty(index, 1)" class="w-6 h-6 flex items-center justify-center bg-gray-50 hover:bg-green-50 rounded text-gray-500">+</button>
                </div>
              </div>
              <div class="pt-4 border-t border-dashed border-gray-200 flex justify-between items-center">
                <span class="text-sm font-bold text-gray-500">Total Pembayaran:</span>
                <span class="text-lg font-black text-[#D92525]">{{ calculateTotal() }}</span>
              </div>
            </div>

            <div v-else class="mb-6">
              <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Unit Referensi</label>
              <div class="relative w-full">
                  <div class="absolute top-1/2 left-3 transform -translate-y-1/2 pointer-events-none text-gray-400"><Lock class="w-4 h-4" /></div>
                  <input type="text" :value="selectedProductForRental?.title" readonly class="w-full border border-gray-200 bg-gray-50 text-gray-600 font-bold rounded px-3 py-2 text-sm pl-9 focus:outline-none">
              </div>
            </div>

            <hr class="border-gray-100 my-6">

            <form @submit.prevent="isBuyMode ? submitBuyForm() : submitRentalForm()" class="flex flex-col gap-5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="col-span-1">
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Nama Lengkap <span class="text-red-500">*</span></label>
                    <input v-model="rentalForm.name" required type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none" placeholder="Masukan nama lengkap">
                  </div>
                  <div class="col-span-1">
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Jenis Keperluan <span class="text-red-500">*</span></label>
                    <div class="relative">
                        <select v-model="rentalForm.type" required class="w-full border border-gray-300 rounded px-3 py-2 text-sm appearance-none bg-white">
                            <option value="" disabled selected>Pilih jenis kebutuhan</option> 
                            <option value="Pribadi">Pribadi</option>
                            <option value="Perusahaan">Perusahaan</option>
                        </select>
                        <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500"><ChevronDown class="w-4 h-4" /></div>
                    </div>
                  </div>

                  <div v-if="rentalForm.type === 'Perusahaan'" class="col-span-1">
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Nama Perusahaan <span class="text-red-500">*</span></label>
                    <input v-model="rentalForm.companyName" required type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none" placeholder="Contoh: PT Sinar Elektro">
                  </div>

                  <div class="col-span-1">
                    <label class="block text-sm font-semibold text-gray-700 mb-1">No. WhatsApp <span class="text-red-500">*</span></label>
                    <input v-model="rentalForm.whatsapp" @input="filterPhone" required type="tel" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none" placeholder="0812xxxxx">
                  </div>

                  <div v-if="!isBuyMode" class="col-span-1">
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Durasi Sewa <span class="text-red-500">*</span></label>
                    <input v-model="rentalForm.duration" required type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none" placeholder="Contoh: 3 Bulan">
                  </div>

                  <div :class="rentalForm.type === 'Perusahaan' ? 'col-span-1 md:col-span-2' : 'col-span-1'">
                     <label class="block text-sm font-semibold text-gray-700 mb-1">Alamat <span class="text-red-500">*</span></label>
                     <input v-model="rentalForm.address" required type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none" placeholder="Masukan alamat lengkap">
                  </div>

                  <div class="col-span-1 md:col-span-2">
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Detail Kebutuhan <span class="text-red-500">*</span></label>
                    <textarea v-model="rentalForm.details" required rows="3" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none" placeholder="Contoh: Untuk backup kantor, dll..."></textarea>
                  </div>
              </div>

              <button type="submit" class="mt-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 rounded shadow transition-all flex items-center justify-center gap-2">
                 <svg viewBox="0 0 24 24" class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                 Kirim ke WhatsApp
              </button>
            </form>
         </div>
       </div>
    </div>
  </nav>
</template>

<style scoped>
.slide-fade-enter-active, .slide-fade-leave-active { transition: all 0.3s ease-out; }
.slide-fade-enter-from, .slide-fade-leave-to { opacity: 0; transform: translateY(-10px); }
.pop-alert-enter-active { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.pop-alert-leave-active { transition: all 0.2s ease-in; }
.pop-alert-enter-from { opacity: 0; transform: translateY(15px) scale(0.95); }
.pop-alert-leave-to { opacity: 0; transform: translateY(5px); }
@keyframes zoom-in { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
.animate-in { animation: zoom-in 0.2s ease-out forwards; }
</style>