<template>
  <div>
    <img src="../assets/logos/icon-above-font.svg" alt="Logo entreprise">
    <div v-if="loggedIn" class="home">
        <!-- <router-link to="/home">Page d'accueil</router-link> -->
        <router-link to="/home"><i class="fas fa-home"></i></router-link>
        <router-link to="/profil"><i class="fas fa-user-circle"></i></router-link>
    </div>
      <div v-if="loggedIn" class="logout">
          <!-- <button @click="disconnect">Deconnexion</button> -->
          <p @click="logOut">Déconnexion</p>
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
        },
        logOut() {
            localStorage.removeItem('userInfo');
            window.location = "http://localhost:8080/"
        },
    },
    beforeMount() {
        this.isLoggedIn();
    }
}
</script>

<style scoped lang="scss">
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
        top: 0;
        color: #FD2D01;
        @media (min-width: 768px) {
            top: 50%;
            transform: translateY(-50%);
        }
    }
    .home {
        position: absolute;
        left: 0;
        top: 10px;
        transform: translateY(-50%);
        @media (min-width: 768px) {
            top: 50%;
            transform: translateY(-50%);
        }
        a {
            color: #FD2D01;
        }
        // i {
        //     color: #FD2D01;
        // }
    }
</style>