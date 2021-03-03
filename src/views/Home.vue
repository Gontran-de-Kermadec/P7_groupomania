<template>
  <div class="about">
    <Header />
    <h1>Bonjour toi !</h1>
    <button @click="disconnect">Déconnexion</button>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
export default {
  name: 'Home',
  components: {
    Header
  },
  methods: {
    disconnect() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
