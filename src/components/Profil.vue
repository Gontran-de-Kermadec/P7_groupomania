<template>
  <div class="profil">
    <Header />
    <router-link to="/home">Page d'accueil</router-link>
    <div class="data_container">
      <div class="data_account">
        <p>{{ name }}</p>
        <button @click="deleteUser">Supprimer compte</button>
      </div>
      <div class="data_post">
        <p>Votre page profil est en cours de construction</p>
        <div v-for="post in posts" :key="post.id">
          <p>{{ post.postDate }}</p>
          <p>{{ post.postContent }}</p>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header'
const axios = require('axios');
//let getId = JSON.parse(localStorage.getItem('token'));
//let getUserId = JSON.parse(localStorage.token);
//console.log(getUserId);
export default {
    name: 'Profil',
    components: {
      Header
    },
    data() {
      return {
        name: this.$userInfo.name,
        posts: []
      }
    },
    methods: {
      deleteUser() {
        //alert('etes-vous sur de vouloir supprimer votre compte ?')
        axios.delete(`http://localhost:3000/${this.$userInfo.userId}`,
          // {
          //   headers: {
          //     'Content-Type': 'application/json',
          //     'Authorization': `Bearer ${this.$token}`
          //   }
          // }
      )
      .then((resp) => {
        console.log(resp)
      })
      .catch((error) => console.log(error));
      localStorage.removeItem('token');
      this.$router.push('/');
      // .then(localStorage.removeItem('user'))
      // .then(location.href = "/");
        //console.log(localStorage.token);
        // axios({
        //   method: 'delete',
        //   url: `http://localhost:3000/${getId.userId}/`,
        //   // data: {
        //   //     id: getId.userId
        //   // }
        // })
        // .then((resp) => {
        //   console.log(resp);
        // })
        // .catch((error) => console.log(error));
      },
      createAlert() {
        let alertBox = document.createElement('div');
        alertBox.classList.add('alert_container')
        let parent = document.querySelector('.profil');
        parent.appendChild(alertBox);
      },
      getMyPosts() {
        axios.get(`http://localhost:3000/${this.$userInfo.userId}`, { headers: {'Authorization': `Bearer ${this.$userInfo.token}`}})
            .then((res) => {
                console.log(res.data[0].postContent);
                this.posts = res.data;
            })
            .catch((error) => console.log(error));
      }
    },
    beforeMount() {
      this.getMyPosts()
    }
}
</script>

<style scoped lang='scss'>
  .data_container {
    display: flex;
    justify-content: center;
    .data_account {
      p {
        text-transform: capitalize;
      }
    }
  }
  .alert_container{
    position: absolute;
    top: 50%;
    left: 50%;
  }
</style>

