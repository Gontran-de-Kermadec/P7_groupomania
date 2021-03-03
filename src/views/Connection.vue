<template>
  <div class="home">
    <Header />
    <Login />
    <div class="signupBtn">
      <p>Si vous n'avez pas encore de compte</p>
      <router-link to="/signup">S'inscrire</router-link>
    </div>
    <!-- <div>
      <img src="../assets/logos/icon.svg" alt="Logo entreprise" class="bgImg">
  </div> -->
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

<style scoped lang='scss'>
  // * {
  //   padding: 0;
  //   margin: 0;
  //   box-sizing: border-box;
  //   }
  .signupBtn {
    margin-top: 50px;
    a {
      color: #000;
    }
    p {
      margin-bottom: 10px;
    }
  }
  // .bgImg {
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   z-index: -100;
  //   width: 100px;
  //   height: auto;
  // }
</style>
