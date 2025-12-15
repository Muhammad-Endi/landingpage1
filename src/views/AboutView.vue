<script>
import {
  CheckCircle2, Zap, Wrench, ShoppingCart, Truck, Factory,
  Building2, Hammer, TrendingUp, Briefcase, Award, Clock,
  Shield, HeadsetIcon, Smile, ArrowRight, Users, MessageCircle
} from 'lucide-vue-next'

export default {
  name: 'AboutView',

  components: {
    CheckCircle2, Zap, Wrench, ShoppingCart, Truck, Factory,
    Building2, Hammer, TrendingUp, Briefcase, Award, Clock,
    Shield, HeadsetIcon, Smile, ArrowRight, Users, MessageCircle
  },

  data() {
    return {
      mainServices: [
        { icon: Zap, title: 'Rewinding Elektro Motor 1 Phase & 3 Phase' },
        { icon: Wrench, title: 'Service dan Maintenance Genset' },
        { icon: ShoppingCart, title: 'Penjualan Genset & Generator Baru' },
        { icon: Truck, title: 'Sewa Genset Berbagai Kapasitas' },
        { icon: Truck, title: 'Garansi Resmi & Transparan' },
        { icon: Truck, title: 'Konsultasi Gratis' },
      ],

      companyImage: {
        url: "/workshop.jpg"
      },

      stats: [
        { value: '15+', label: 'TAHUN PENGALAMAN', icon: Clock, color: 'text-blue-600' },
        { value: '100+', label: 'KLIEN PUAS', icon: Users, color: 'text-green-600' },
        { value: '100+', label: 'PROYEK SELESAI', icon: Zap, color: 'text-yellow-500' },
      ],

      // Data Client
      clients: [
        { icon: Factory, name: 'Industri & Pabrik' },
        { icon: Building2, name: 'Perusahaan Swasta' },
        { icon: Hammer, name: 'Proyek Konstruksi' },
        { icon: TrendingUp, name: 'Retail & Perdagangan' },
        { icon: Zap, name: 'Pembangkit Listrik' }, 
        { icon: Truck, name: 'Logistik & Transport' },
        { icon: ShoppingCart, name: 'Pusat Perbelanjaan' },
        { icon: Briefcase, name: 'Perkantoran' }
      ],

      whyChooseUs: [
        { icon: Award, title: 'Pengalaman Teruji', description: 'Rekam jejak sempurna sejak 2009 dalam menangani berbagai masalah elektro industri.' },
        { icon: Clock, title: 'Respon Cepat 24/7', description: 'Tim darurat kami siap sedia kapanpun mesin atau genset Anda mengalami masalah.' },
        { icon: Shield, title: 'Bergaransi Resmi', description: 'Setiap perbaikan dan suku cadang dilindungi garansi untuk ketenangan pikiran Anda.' },
        { icon: Wrench, title: 'Teknisi Berkompeten', description: 'Dikerjakan oleh tenaga ahli yang berkompetensi dalam bidang elektro.' },
        { icon: ShoppingCart, title: 'Sparepart Original', description: 'Kami hanya menggunakan suku cadang asli dan berkualitas tinggi untuk daya tahan maksimal.' },
        { icon: HeadsetIcon, title: 'Konsultasi Gratis', description: 'Diskusi teknis gratis untuk menemukan solusi paling efisien dan hemat biaya.' }
      ],

      whatsappNumber: '6281234567890'
    }
  },

  methods: {
    openWhatsApp(type) {
      let text = '';
      if (type === 'konsultasi') {
        text = 'Halo Sinar Elektro, saya ingin berkonsultasi mengenai kebutuhan listrik/genset saya.';
      } else if (type === 'perbaiki') {
        text = 'Halo Sinar Elektro, saya membutuhkan layanan perbaikan/service untuk mesin saya.';
      } else {
        text = 'Halo Sinar Elektro, saya ingin bertanya mengenai layanan anda.';
      }
      
      const message = encodeURIComponent(text);
      window.open(`https://wa.me/${this.whatsappNumber}?text=${message}`, '_blank');
    }
  }
}
</script>

<template>
  <div class="antialiased text-gray-800 overflow-x-hidden">
    
    <section class="relative flex flex-col justify-center items-center text-center py-20 mt-20 bg-[#1F65E2] overflow-hidden">
      <div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
      <div class="relative z-10 flex flex-col items-center px-4 max-w-4xl">
        <h1 class="font-bold mb-4 text-3xl md:text-[40px] leading-snug text-white drop-shadow-sm tracking-wide">
          Tentang <span class="text-[#FCCC4D]">Sinar Elektro</span>
        </h1>
        <p class="text-blue-50 text-base md:text-lg font-light leading-relaxed max-w-3xl">
          Mitra strategis terpercaya untuk solusi perbaikan motor listrik, genset, dan kebutuhan energi industri Anda sejak 2009.
        </p>
      </div>
    </section>

    <section id="perusahaan" class="py-20 lg:py-28 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-16 items-start">
          
          <div class="order-2 lg:order-1">
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Solusi Energi & Mekanikal <br>
              <span class="text-blue-600 relative">
                Profesional
                <svg class="absolute w-full h-3 -bottom-1 left-0 text-yellow-400 opacity-60" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C25.7501 2.99991 74.8047 -1.49999 198 3.5" stroke="currentColor" stroke-width="3"/></svg>
              </span>
            </h2>
            <p class="text-lg text-gray-600 leading-relaxed mb-6 text-justify">
              Berdiri sejak 2009, <strong>Sinar Elektro Sejahtera</strong> adalah workshop spesialis yang bergerak di bidang <em>rewinding</em> elektro motor dan layanan genset terintegrasi. Kami memahami bahwa waktu adalah uang dalam industri, itulah sebabnya kami berkomitmen pada kecepatan dan ketepatan.
            </p>
            <p class="text-lg text-gray-600 leading-relaxed mb-8">
              Dilengkapi peralatan <em>winding</em> digital dan teknisi senior, kami menjamin output kinerja mesin kembali ke performa pabrikan.
            </p>
            <div class="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
              <h3 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Zap class="text-yellow-500" size="20"/> Layanan Unggulan Kami:
              </h3>
              <ul class="space-y-3">
                <li v-for="(service, index) in mainServices" :key="index" class="flex items-start gap-3">
                  <CheckCircle2 class="text-blue-600 shrink-0 mt-0.5" :size="20" />
                  <span class="text-gray-700 font-medium">{{ service.title }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="order-1 lg:order-2 relative">
            <div class="relative rounded-2xl overflow-hidden shadow-2xl group mb-8">
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
              <img :src="companyImage.url" alt="Workshop Sinar Elektro" class="w-full h-[300px] lg:h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out" onerror="this.src='https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800';" />
              <div class="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg border-l-4 border-blue-600">
                <div class="flex items-center gap-4">
                  <div class="flex items-center justify-center shrink-0">
                    <img src="/logo.png" alt="Logo Workshop" class="w-12 h-12 object-contain" onerror="this.style.display='none'" />
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 font-semibold">Workshop Modern</p>
                    <p class="text-xs text-gray-400">Peralatan Lengkap & Terkalibrasi</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="grid grid-cols-3 gap-4 border-t border-gray-100 pt-6">
              <div v-for="(stat, index) in stats" :key="index" class="text-center">
                <div class="flex justify-center mb-2">
                  <component :is="stat.icon" class="w-6 h-6" :class="stat.color" stroke-width="2.5" />
                </div>
                <div class="text-2xl font-extrabold text-gray-900 leading-none mb-1">{{ stat.value }}</div>
                <div class="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">{{ stat.label }}</div>
              </div>
            </div>
            <div class="absolute -z-10 top-10 -right-10 text-gray-200">
              <svg width="100" height="100" fill="currentColor" viewBox="0 0 100 100">
                <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="2"></circle></pattern>
                <rect width="100" height="100" fill="url(#dots)"></rect>
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section class="py-16 bg-gray-50 border-y border-gray-200 overflow-hidden">
      <div class="w-full">
        
        <div class="text-center mb-10 px-4">
          <h2 class="text-[16px] font-bold text-slate-500 tracking-widest uppercase">
            DIPERCAYA OLEH BERBAGAI SEKTOR
          </h2>
        </div>
        
        <div class="relative w-full mask-linear-fade">
          
          <div class="flex w-max animate-marquee hover:[animation-play-state:paused] items-center py-4">
            
            <div v-for="i in 3" :key="i" class="flex gap-6 px-3">
              
              <div v-for="(client, index) in clients" :key="index" 
                class="group relative flex items-center gap-5 p-5 min-w-[300px] bg-white border border-slate-200/80 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_-5px_rgba(37,99,235,0.15)] hover:border-blue-300 transition-all duration-300 cursor-default">
                
                <div class="w-14 h-14 shrink-0 rounded-xl flex items-center justify-center transition-all duration-300
                            bg-slate-50 text-slate-400 border border-slate-100
                            group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/30">
                  <component :is="client.icon" :size="26" stroke-width="1.5" />
                </div>
                
                <div class="flex flex-col">
                   <h3 class="text-[16px] font-bold text-slate-700 group-hover:text-blue-700 transition-colors">
                      {{ client.name }}
                   </h3>
                </div>

                <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div class="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>

    <section class="py-24 bg-white relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 max-w-3xl mx-auto">
          <h2 class="text-[30px] font-bold text-gray-900 mb-4 teks-center">
            Mengapa Memilih <span class="text-blue-600">Kami?</span>
          </h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(item, index) in whyChooseUs" :key="index" 
            class="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-blue-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out relative overflow-hidden">
            <div class="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300 blur-xl"></div>
            <div class="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
              <component :is="item.icon" :size="30" stroke-width="1.5" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{{ item.title }}</h3>
            <p class="text-gray-600 leading-relaxed text-sm">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="relative py-24 bg-gradient-to-r from-[#F0F9FF] to-[#FFFBF0] border-t border-blue-50/50 overflow-hidden">
      <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-[32px] font-extrabold text-[#0F172A] mb-4 tracking-tight">Butuh Konsultasi dan Perbaikan ?</h2>
        <p class="text-gray-500 text-lg mb-10 max-w-xl mx-auto font-normal leading-relaxed">Dapatkan konsultasi terbaik dan perbaikan dengan teknisi berpengalaman kami.</p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button @click="openWhatsApp('konsultasi')" class="w-full sm:w-auto px-8 py-3.5 bg-white text-orange-600 font-bold rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.03)] border border-gray-200 hover:shadow-md hover:-translate-y-0.5 hover:border-orange-200 transition-all duration-300 flex items-center justify-center gap-2">
            <MessageCircle class="w-5 h-5" /> Konsultasi
          </button>
          <button @click="openWhatsApp('perbaiki')" class="w-full sm:w-auto px-8 py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
            <Wrench class="w-5 h-5" /> Perbaikan
          </button>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-33.33%); } /* Bergerak 1/3 karena ada 3 duplikasi */
}

.animate-marquee {
  animation: marquee 50s linear infinite;
  width: max-content;
}

.w-max {
  width: max-content;
}

/* Teknik Masking untuk efek fade out di kiri dan kanan */
.mask-linear-fade {
  mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
}
</style>