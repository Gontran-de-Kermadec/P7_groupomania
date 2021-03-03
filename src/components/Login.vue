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
            let regexEmail = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
            if(regexEmail.test(this.email)) {
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
                .then((resp) => {
                    console.log(resp)
                    console.log(resp.status);
                    if(resp.status === 200) {
                    this.$router.push('/home')
                }
                })
                .catch((error) => console.log(error));
            } else {
                console.log('probleme mot de passe ou mail');
            }

        }
    }
}
</script>

<style>

</style>