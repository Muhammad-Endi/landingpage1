<template>
  <div>
    <Hero />
    <About />
    <Catalog />
    <Projects />
    <Contact />
  </div>
</template>

<script>
import Hero from '../components/Hero.vue'
import About from '../components/About.vue'
import Catalog from '../components/Catalog.vue'
import Projects from '../components/Projects.vue'
import Contact from '../components/Contact.vue'

export default {
  components: {
    Hero,
    About,
    Catalog,
    Projects,
    Contact,
  },
}
</script>
