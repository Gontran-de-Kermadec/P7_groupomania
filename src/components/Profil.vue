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
        <div class="container">
          <SendPost />
          <p class="title">Vos publications</p>
          <div v-for="post in posts" :key="post.id" class="onePost">
            <router-link :to="{name: 'Post', params: {id: post.id}}">
              <div class="post_header">
                <p>Publié {{ timePast(post.postDate) }},le {{ dateFormat(post.postDate) }}</p>
              </div>
              <div class="post_body">
                <p class="postContent">{{ post.postContent }}</p>
              </div>
              <div class="post_like">
                <i class="far fa-thumbs-up"></i><span>0</span>
                <i class="far fa-thumbs-down"></i><span>0</span>
              </div>
              <!-- <p>{{ post.id }}</p> -->
          <!-- <button @click="deletePost">Supprimer post</button> -->
            </router-link>
          <!-- <router-link :to="{name: 'Post', params: {id: post.id}}">Voir ce post</router-link> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header'
//import SendPost from './SendPost'
//import Post from './Post'
import { mapGetters } from 'vuex'
import SendPost from './SendPost.vue';
const axios = require('axios');
export default {
    name: 'Profil',
    components: {
      Header,
      SendPost
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
      },
      dateFormat(date) {
      const event = new Date(date);
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return event.toLocaleDateString('fr-FR', options);
    },
    timePast(date) {
      const pastDate = new Date(date);
      //let pastDateForm = Date.parse(pastDate.toLocaleDateString('fr-FR'));
      const currentDate = new Date();
      //let currentDateForm = Date.parse(currentDate.toLocaleDateString('fr-FR'));
      let diff = currentDate - pastDate;
      let daysDiff = diff / (1000 * 3600 * 24);
      let hoursDiff = diff / (1000 * 3600);
      let floorHours = Math.floor(hoursDiff);
      let floorDays = Math.floor(daysDiff);
      // console.log(daysDiff);
      // console.log(hoursDiff);
      // //console.log(pastDateForm);
      // //console.log(currentDateForm);
      // console.log(currentDateForm - pastDateForm);
      // console.log(currentDate - pastDate);
      if(hoursDiff > 24) {
        return `il y a ${floorDays}j`
      } else {
        return `il y a ${floorHours}h`;
      }
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
    flex-direction: column;
    justify-content: center; 
    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: left;
    }
  }
  .data_account {
    @media (max-width: 768px) {
      margin: 0 0 30px 0;
    }
    @media (min-width: 768px) {
      border-right: solid #FD2D01;
      width: 20%;
      //flex-shrink: 2;
    }
    p {
      text-transform: capitalize;
      font-size: 1.5rem;
      margin-bottom: 10px;
    }
    button {
      all: unset;
      border: solid 1px;
      background-color: #FD2D01;
      padding: 10px;
      cursor: pointer;
    }
  }
  .data_post {
    display: flex;
    justify-content: center;
    @media (min-width: 768px) {
      //border-right: solid #FD2D01;
      width: 80%;
      //flex-shrink: 2;
    }
    .title {
      font-size: 2rem;
      margin: 15px 0;
    }
  }
  // .onePost {
  //   border: solid;
  //   margin: 5px;
  // }
  .onePost {
    width: 90vw;
    border-radius: 10px;
    margin: 10px;
    padding: 5px;
    box-shadow: 1px 0px 10px 4px lightgray;
    word-break: break-all;
    @media (min-width: 768px) {
      width: 50vw;
    }
    .post_header {
      border-bottom: solid 2px #FFD7D7;
      .post_name {
        text-transform: capitalize;
        color: #FD2D01;
        font-weight: bolder;
      }
    }
    .post_body {
        padding: 20px 0;
    }
    .postContent {
      font-size: 1.2rem;
      word-break: break-word;
    }
    .post_like {
      text-align: right;
      .fa-thumbs-up, .fa-thumbs-down {
        color: #FD2D01;
        margin: 0 1px 0 10px;
      }
    }
  }
  // .alert_container{
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  // }
</style>

