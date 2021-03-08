<template>
  <div class="profil">
    <Header />
    <div class="data_container">
      <div class="data_account">
        <p>{{ name }}</p>
        <button @click="deleteUser">Supprimer compte</button>
        <!-- <div v-for="postid in findUserIdPost" :key="postid.id">
          <p>{{ postid.postDate }}</p>
          <p>{{ postid.postContent }}</p>
          <button>Supprimer post</button>
        </div> -->
      </div>
      <div class="data_post">
        <p>Vos publications</p>
        <div v-for="post in posts" :key="post.id" class="onePost">
          <router-link :to="{name: 'Post', params: {id: post.id}}">
          <p>{{ post.postDate }}</p>
          <p>{{ post.postContent }}</p>
          <p>{{ post.id }}</p>
          <button @click="deletePost">Supprimer post</button>
          </router-link>
          <!-- <router-link :to="{name: 'Post', params: {id: post.id}}">Voir ce post</router-link> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header'
//import Post from './Post'
import { mapGetters } from 'vuex'
const axios = require('axios');
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
    computed: {
        ...mapGetters(['findUserIdPost'])
    },
    methods: {
      deletePost() {
        for (const {id: n} of this.posts) {
        console.log(n);
        axios.delete(`http://localhost:3000/post/${n}`, {
          headers: {'Authorization': `Bearer ${this.$userInfo.token}`}
          })
          .then((resp) => {
            console.log(resp)
          })
          .catch((error) => console.log(error));
      }
        //localStorage.getItem('postInfo');
        //let postInfo = JSON.parse(localStorage.getItem('postInfo'));
        //console.log(postInfo[0].id);
        //for(let i = 0; i<postInfo.length; i++) {
          //console.log(postInfo[i].id);
          //axios.delete(`http://localhost:3000/${post.id}`, {
          // headers: {'Authorization': `Bearer ${this.$userInfo.token}`}
          // })
          // .then((resp) => {
          //   console.log(resp)
          // })
          // .catch((error) => console.log(error));
        //})
      },
      deleteUser() {
        //alert('etes-vous sur de vouloir supprimer votre compte ?')
        axios.delete(`http://localhost:3000/${this.$userInfo.userId}`, {
          headers: {'Authorization': `Bearer ${this.$userInfo.token}`}
        })
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
                console.log(res.data[0]);
                this.posts = res.data;
                localStorage.setItem('postInfo', JSON.stringify(res.data))
            })
            .catch((error) => console.log(error));
      }
    },
    mounted() {
      this.getMyPosts();
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
    .onePost {
      border: solid;
      margin: 5px;
    }
  }
  .alert_container{
    position: absolute;
    top: 50%;
    left: 50%;
  }
</style>

