<template>
  <div class="about">
    <Header />
    <h1>Bonjour {{getStorage()}} !</h1>
    <button @click="disconnect">Déconnexion</button><br>
    <router-link to="/profil">Profil</router-link>
    <SendPost />
    <GetAllPosts />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import SendPost from '../components/SendPost.vue'
import GetAllPosts from '../components/GetAllPosts.vue'
let getId = JSON.parse(localStorage.getItem('userInfo'));
console.log(getId.name);
export default {
  name: 'Home',
  components: {
    Header,
    SendPost,
    GetAllPosts
  },
  methods: {
    disconnect() {
      localStorage.removeItem('userInfo');
      window.location = "http://localhost:8080/"
      //this.$router.push('/')
    },
    getStorage() {
      let getId = JSON.parse(localStorage.getItem('userInfo'));
      return getId.name
    }
  }
}
</script>

<style scoped>

</style>
