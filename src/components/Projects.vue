<script>
import {
  Building2, Factory, ShoppingBag, Hotel, MapPin,
  Gauge, ArrowRight 
} from 'lucide-vue-next'

export default {
  name: 'Projects',
  components: {
    Building2, Factory, ShoppingBag, Hotel, MapPin,
    Gauge, ArrowRight
  },

  data() {
    return {
      projects: [
        {
          title: 'Rewinding Motor Blower Palka',
          category: 'perbaikan',
          capacity: '5,5 KW / 1500 Rpm',
          location: 'Bandar Lampung',
          image: 'https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=800',
        },
        {
          title: 'Instalasi Genset Pabrik',
          category: 'instalasi',
          capacity: '3x3000 kVA',
          location: 'Jakarta Industrial Park',
          image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
        },
        {
          title: 'Maintenance Generator Mall',
          category: 'perbaikan',
          capacity: 'KOHLER, 5x200 kVA',
          location: 'Surabaya Center',
          image: 'https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=800',
        },
        {
          title: 'Overhaul Mesin Kapal',
          category: 'perbaikan',
          capacity: 'Nigata, 2x5000 kW',
          location: 'Pelabuhan Lopana',
          image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800',
        },
        {
          title: 'Service Genset Hotel',
          category: 'perbaikan',
          capacity: 'Deutz, 2x500 kVA',
          location: 'Cilacap',
          image: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=800',
        },
        {
          title: 'Instalasi Power Plant',
          category: 'instalasi',
          capacity: 'Cummins, 1x3000 kVA',
          location: 'Pasuruan',
          image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800',
        },
        {
          title: 'Sewa Genset Proyek Tol',
          category: 'penyewaan',
          capacity: 'Perkins, 4x1500 kVA',
          location: 'Bandung',
          image: 'https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=800',
        },
        {
          title: 'Genset Resort Bali',
          category: 'instalasi',
          capacity: 'CAT, 2x2000 kVA',
          location: 'Nusa Dua, Bali',
          image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
        },
      ],
    }
  },
}
</script>

<template>
  <section id="proyek" class="py-12 sm:py-24 bg-white overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="text-center mb-10 sm:mb-16 relative">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10"></div>
        <h2 class="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4 tracking-tight">
          Rekam Jejak <span class="text-blue-600">Proyek Kami</span>
        </h2>
        <p class="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
          Kepercayaan industri yang telah kami bangun melalui hasil kerja berkualitas.
        </p>
      </div>

      <div class="relative mb-12">
        <transition-group 
            tag="div" 
            class="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
            enter-active-class="transition duration-500 ease-out"
            enter-from-class="opacity-0 translate-y-8"
            enter-to-class="opacity-100 translate-y-0"
        >
          <div
            v-for="(project, index) in projects.slice(0, 4)"
            :key="index"
            class="group bg-white rounded-2xl overflow-hidden shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
          >
            <div class="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
            </div>

            <div class="p-4 sm:p-5 flex flex-col flex-grow bg-white relative z-20">
              <h3 class="font-bold text-[16px] sm:text-[17px] mb-4 leading-snug text-gray-900 line-clamp-2 transition-colors group-hover:text-blue-600">
                {{ project.title }}
              </h3>

              <div class="space-y-2.5 mb-0 flex-grow">
                <div class="flex items-center justify-between text-[11px] sm:text-xs border-b border-gray-50 pb-2 last:border-0">
                  <span class="text-gray-500 flex items-center gap-1.5"><Gauge size="13" class="text-blue-400 font-medium"/> Kapasitas</span>
                  <span class="font-bold text-gray-700 text-right ml-2">{{ project.capacity }}</span>
                </div>
                <div class="flex items-center justify-between text-[11px] sm:text-xs border-b border-gray-50 pb-2 last:border-0">
                  <span class="text-gray-500 flex items-center gap-1.5"><MapPin size="13" class="text-red-400 font-medium"/> Lokasi</span>
                  <span class="font-bold text-gray-700 text-right ml-2">{{ project.location }}</span>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>

      <div class="mt-8 sm:mt-10 flex flex-col items-center justify-center">
        <router-link 
          to="/projects" 
          class="group inline-flex items-center gap-2 text-base font-bold text-gray-500 transition-colors hover:text-blue-600"
        >
          <span class="relative">
            Lihat Proyek Lengkap
            <span class="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </span>
          <ArrowRight size="18" class="transition-transform duration-300 group-hover:translate-x-1"/>
        </router-link>
      </div>
    </div>
  </section>
</template>