<template>
  <div class="home">
    <Header />
    <div id="nav">
      <!-- <router-link to="/">Login</router-link>  -->
      <router-link to="/signup">S'inscrire</router-link>
    </div>
    <!-- <router-view/> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Login />
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import Login from '@/components/Login.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'Connection',
  components: {
    //HelloWorld,
    Login,
    Header
  }
}
</script>
