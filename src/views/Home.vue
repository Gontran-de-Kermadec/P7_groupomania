<template>
  <div class="about">
    <Header />
    <h1>Bonjour {{getStorage()}} !</h1>
    <button @click="disconnect">Déconnexion</button><br>
    <router-link to="/profil">Profil</router-link>
    <Post />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Post from '../components/Post.vue'
let getId = JSON.parse(localStorage.getItem('token'));
console.log(getId.name);
export default {
  name: 'Home',
  components: {
    Header,
    Post
  },
  methods: {
    disconnect() {
      localStorage.removeItem('token');
      this.$router.push('/')
    },
    getStorage() {
      let getId = JSON.parse(localStorage.getItem('token'));
      return getId.name
    }
  }
}
</script>

<style scoped>

</style>
