<template>
  <div class="about">
    <Header />
    <div class="home_container">
      <div>
       
        <!-- <button @click="disconnect">Déconnexion</button><br> -->
        <!-- <router-link to="/profil">Profil</router-link> -->
      </div>
      <div>
         <h1>Bonjour {{getStorage()}} !</h1>
        <SendPost />
        <GetAllPosts />
      </div>
    </div> 
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
  data() {
    return {
      isModalOn: false
    }
  },
  methods: {
    // disconnect() {
    //   localStorage.removeItem('userInfo');
    //   window.location = "http://localhost:8080/"
    //   //this.$router.push('/')
    // },
    getStorage() {
      let getId = JSON.parse(localStorage.getItem('userInfo'));
      return getId.name
    }
  }
}
</script>

<style scoped>
  .home_container {
    display: flex;
  }
</style>
