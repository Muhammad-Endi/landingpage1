<template>
  <div>
    <Navbar />

    <!-- Semua halaman akan muncul di sini -->
    <router-view />

    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default { components: { Navbar, Footer } }
</script>
