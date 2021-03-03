<template>
  <div class="hello">
      <Header />
      <h1>Veuillez vous inscrire</h1>
      <form @submit.prevent = postThing()>
        <label for="name">Nom</label><br>
        <input type="text" name="name" id="name" v-model="name" required/><br>
        <label for="email">Email</label><br>
        <input type="email" name="email" id="email" v-model="email" required/><br>
        <label for="password">Mot de passe</label><br>
        <input type="password" name="password" id="password" v-model="password" required/><br>
        <button type="submit" class="btn">S'incrire</button>
      </form>
      <p>{{ name }}, {{ email }},  {{ password }}</p>
      <div class="loginBtn">
        <p>Si vous avez déjà un compte</p>
        <router-link to="/">Login</router-link>
      </div>
  </div>
</template>

<script>
import Header from './Header.vue'
const axios = require('axios');

export default {
  name: 'Signup',
  components: {
    Header
  },
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    postThing() {
      let regexEmail = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
      //&& this.password.length > 8
      if(regexEmail.test(this.email)) {
        axios({
        method: 'post',
        url: 'http://localhost:3000/signup/',
        data: {
            name: this.name,
            email: this.email,
            password: this.password
        }
        })
        .then((response) => {
            console.log(response.status);
            if(response.status === 201) {
              this.$router.push('/')
            }
         
        })
        .catch((error) => console.log(error));
      } else {
        console.log('probleme mot de passe ou mail');
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
    // * {
    //     padding: 0;
    //     margin: 0;
    //     box-sizing: border-box;
    // }
    h1 {
        margin-bottom: 30px;
    }
    input {
        font-size: large;
    }
    .btn {
        background: #FD2D01;
        border: none;
        font-size: large;
        cursor: pointer;
    }
    input, .btn {
        width: 300px;
        height: 50px;
        margin-bottom: 20px;
        @media (min-width: 550px) {
            width: 500px;
        }
        @media (min-width: 1024px) {
            width: 700px;
        }
    }
    .loginBtn {
      a {
        color: #000;
      }
      p {
        margin-bottom: 10px;
      } 
    }
</style>
