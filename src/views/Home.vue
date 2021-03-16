<template>
  <div class="about">
    <Header />
    <div class="home_container">
      <div>
        <h1>Bonjour <span class="title_name">{{getStorage()}}</span> !</h1>
        <SendPost class="sendPost"/>
        <div v-for="post in allPosts" :key="post.id" class="eachPost">
            <router-link :to="{name: 'Post', params: {id: post.id}}">
            <div class="post_header">
              <p>Publié par <span class="post_name">{{ post.name }}</span>, <span>{{timePast(post.postDate)}}</span> le {{dateFormat(post.postDate)}}</p>
            </div>
            <div class="post_body">
              <p class="postContent">{{ post.postContent }}</p>
            </div>
            <div class="post_like">
              <i class="far fa-thumbs-up"></i><span>{{post.likes}}</span>
              <i class="far fa-thumbs-down"></i><span>0</span>
            </div>
            </router-link>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import SendPost from '../components/SendPost.vue'
//import GetAllPosts from '../components/GetAllPosts.vue'
import { mapState } from 'vuex'
//let getId = JSON.parse(localStorage.getItem('userInfo'));
export default {
  name: 'Home',
  components: {
    Header,
    SendPost,
    // GetAllPosts
  },
  data() {
    return {
      isModalOn: false
    }
  },
  computed: {
        ...mapState(['allPosts'])
  },
  methods: {
    getStorage() {
      let getId = JSON.parse(localStorage.getItem('userInfo'));
      return getId.name
    },
    getAllPosts(){
      //this.$store.commit('GET_ALL_POSTS');
      this.$store.dispatch('getAllPosts');
      console.log(this.$route);
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
      //console.log(pastDateForm);
      //console.log(currentDateForm);
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
    this.getAllPosts();
    //this.timePast
  }
}
</script>

<style scoped lang='scss'>
  .home_container {
    display: flex;
    justify-content: center;
    .title_name {
      text-transform: capitalize;
    }
    .sendPost {
      margin: 30px 0;
    }
    .eachPost {
      width: 90vw;
      border-radius: 10px;
      margin: 10px;
      padding: 5px;
      box-shadow: 1px 0px 10px 4px lightgray;
      @media (min-width: 768px) {
        width: 60vw;
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
      .post_like {
        text-align: right;
         .fa-thumbs-up, .fa-thumbs-down {
          color: #FD2D01;
          margin: 0 1px 0 10px;
        }
      }
      .postContent {
        font-size: 1.2rem;
        word-break: break-word;
      }
    }
  }
</style>
