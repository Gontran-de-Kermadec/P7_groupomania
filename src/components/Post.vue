<template>
  <div>
    <Header />
    <!-- <p>{{route}} est la bonne</p> -->
    <div class="flex_container">
      <div v-for="post in posts" :key="post.id" class="eachPost">
        <div class="post_header">
          <p>Publié par <span class="post_name">{{ post.name }}</span>, <span>{{timePast(post.postDate)}}</span> le {{dateFormat(post.postDate)}}</p>
        </div>
        <div class="post_body">
          <p class="postContent">{{ post.postContent }}</p>
          <a :href="post.postUrl">{{post.postUrl}}</a><br>
          <button v-if="userId === post.userId">Modifier</button>
          <button @click="deletePost">Supprimer</button>
        </div>
      </div>
    </div>
    <Comment :post-id='id' />
  </div>
</template>

<script>
import Header from './Header.vue'
import Comment from './Comment.vue'
//import { mapGetters } from 'vuex';
const axios = require('axios');
// let postId = $route.params.id;
//console.log($route.params.id);
//let userInfo = JSON.parse(localStorage.getItem('userInfo'));
//console.log(getToken.token);
//let getId = getToken.userId;
export default {
    name: 'Post',
    components: {
      Header,
      Comment
    },
    data() {
      return {
        name: this.$userInfo.name,
        userId: this.$userInfo.userId,
        posts: [],
        id: parseInt(this.$route.params.id)
      }
    },
    // computed: {
    //   ...mapGetters(['dateFormat'])
    // },
    methods: {
      getMyPost() {
      // let uri = window.location.search.substring(1);
      // let params = new URLSearchParams(uri);
      // console.log(params.get(":id"));
      axios.get(`http://localhost:3000/post/${this.id}`, { headers: {'Authorization': `Bearer ${this.$userInfo.token}`}})
          .then((res) => {
              console.log(res.data);
              this.posts = res.data;
              //localStorage.setItem('postInfo', JSON.stringify(res.data))
          })
          .catch((error) => console.log(error));
      },
      deletePost() {
        // for (const {id: n} of this.posts) {
        // console.log(n);
        axios.delete(`http://localhost:3000/post/${this.id}`, {
          headers: {'Authorization': `Bearer ${this.$userInfo.token}`}
          })
          .then((resp) => {
            console.log(resp)
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
        let daysDiff = Math.floor(diff / (1000 * 3600 * 24));
        let hoursDiff = Math.floor(diff / (1000 * 3600));
        //let floorHours = Math.floor(hoursDiff);
        //let floorDays = Math.floor(daysDiff);
        if(hoursDiff > 24) {
          return `il y a ${daysDiff}j`
        } else {
          return `il y a ${hoursDiff}h`
        }
      }
    },
    mounted() {
      this.getMyPost();
    }
}
</script>

<style scoped lang='scss'>
.flex_container {
  display: flex;
  justify-content: center;
}
.eachPost {
  width: 90vw;
  border-radius: 10px;
  margin: 10px;
  padding: 5px;
  box-shadow: 1px 0px 10px 4px lightgray;
  .post_header {
    border-bottom: solid 2px #FFD7D7;
    .post_name {
      text-transform: capitalize;
      color: #FD2D01;
      font-weight: bolder;
    }
  }
  .postContent {
    font-size: 1.2rem;
    word-break: break-word;
  }
} 
</style>