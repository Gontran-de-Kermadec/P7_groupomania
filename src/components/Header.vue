<template>
  <div>
      <img src="../assets/logos/icon-above-font.svg" alt="Logo entreprise">
      <div v-if="loggedIn" class="home">
          <router-link to="/home">Page d'accueil</router-link>
      </div>
      <div v-if="loggedIn" class="logout">
          <button>Deconnexion</button>
      </div>
  </div>
</template>

<script>
console.log(localStorage.getItem('userInfo'));
import { mapState } from 'vuex'
export default {
    name: 'Header',
    // data() {
    //     return {
    //         loggedIn: true
    //     }
    // },
    computed: {
        ...mapState(['loggedIn'])
    },
    methods: {
        isLoggedIn(){
            this.$store.commit('CHANGE_LOG')
        }
    },
    beforeMount() {
        this.isLoggedIn();
    }
}
</script>

<style scoped>
    div {
        /* display: flex;
        justify-content: center; */
        position: relative;
    }
    img {
        width: auto;
        height: 200px;
    }
    .logout {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }
    .home {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }
</style>