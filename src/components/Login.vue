<template>
  <div>
      <p>Veuillez vous connecter</p>
      <form @submit.prevent = postLogin()>
      <label for="email">Email</label><br>
      <input type="email" name="email" id="email" v-model="email" required/><br>
      <label for="password">Mot de passe</label><br>
      <input type="password" name="password" id="password" v-model="password" required/><br>
      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<script>
const axios = require('axios');
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        postLogin() {
            //e.preventDefault;
            axios({
                method: 'post',
                url: 'http://localhost:3000/login/',
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            // axios.post('http://localhost:3000/login/', {
            //     data: {
            //         email: this.email,
            //         password: this.password
            //     }
            // })
            .then((resp) => { console.log(resp)})
            .catch((error) => console.log(error));
            this.$router.push('/home')
        }
    }
}
</script>

<style>

</style>