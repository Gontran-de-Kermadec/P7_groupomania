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
          <button v-if="userId === post.userId || admin === 1">Modifier</button>
          <!-- <button v-if="admin === 0">Changer</button> -->
          <!-- <button @click="deletePost" v-if="userId === post.userId || admin === 1">Supprimer</button> -->
          <button v-if="userId === post.userId || admin === 1" class="btn" @click="toggleModal">Supprimer</button>
        </div>
        <div class="post_like">
          <span @click="likePost()" id="liked" :class="isliked"><i class="far fa-thumbs-up"></i><span>{{post.likes}}</span></span>
          <i class="far fa-thumbs-down"></i><span>0</span>
        </div>
      </div>
    </div>
    <div class="modal_container" v-if="isModalOn">
      <div class="overlay" @click="toggleModal"></div>
      <div class="modal_card">
        <p>Confirmer la suppression ?</p>
        <button @click="deletePost">Oui</button>
        <button @click="toggleModal">Non</button>
      </div>
    </div>
    <Comment :post-id='id' />
  </div>
</template>

<script>
import Header from './Header.vue'
import Comment from './Comment.vue'
import { mapState } from 'vuex'
const axios = require('axios');
// let postId = $route.params.id;
//console.log($route.params.id);
//let userInfo = JSON.parse(localStorage.getItem('userInfo'));
//console.log(getToken.token);
//let getId = getToken.userId
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
        admin: this.$userInfo.admin,
        posts: [],
        id: parseInt(this.$route.params.id),
        isModalOn: false,
        isliked: 'false',
        //nbr: 2
      }
    },
    computed: {
        ...mapState(['liked'])
    },
    methods: {
      getMyPost() {
        let stringy = JSON.stringify({like:this.liked, user:this.userId});
        console.log(stringy);
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
            console.log(resp);
            this.$router.push('/home')
          })
          .catch((error) => console.log(error));
      },
      // modifyLikeValue(value) {
      //   console.log(value + 'voila');
      //   this.nbr = value + 1;
      //   //return value ++;
      //   // let liked = document.querySelector('#liked');
      //   // if(liked.classList.contains('false')) {
      //   //   console.log(value + 1);
      //   //  return value + 1;
      //   // } else if (liked.classList.contains('true')) {
      //   //   console.log(value - 1);
      //   //  return value - 1;
      //   //}
      // },
      likePost() {
        let liked = document.querySelector('#liked');
        console.log(liked.classList.contains('liked'));
        if(liked.classList.contains('false')) {
          this.isliked = 'true';
          axios.post(`http://localhost:3000/post/${this.id}/like`, 
          {
            userLiked: this.userId,
            like: this.isliked
          }, 
          {
            headers: {'Authorization': `Bearer ${this.$userInfo.token}`}
          })
          .then((resp) => {
            console.log(resp);
            //console.log(resp.data[0].votes);
            // if(resp.data[0].votes === 1) {
            //   console.log('un like');
            //   this.isliked = 'true'
            // } else {
            //   this.isliked = 'false'
            // }
          })
          .catch((error) => console.log(error));
        } else if(liked.classList.contains('true')) {
          this.isliked = 'false';
          axios.post(`http://localhost:3000/post/${this.id}/like`, 
          {
            userLiked: this.userId,
            like: this.isliked
          }, 
          {
            headers: {'Authorization': `Bearer ${this.$userInfo.token}`}
          })
          .then((resp) => {
            console.log(resp);
            //console.log(resp.votes);
          })
          .catch((error) => console.log(error));
        }
        //   thumbsup.classList.add('active')
        // } else {
        //   thumbsup.classList.remove('active')
        // }
        // axios.post(`http://localhost:3000/post/${this.id}/like`, 
        // {
        //   userLiked: this.userId,
        //   like: !this.liked
        //   //data: {userLiked: this.userId}
        // }, 
        // {
        //   headers: {'Authorization': `Bearer ${this.$userInfo.token}`}
        // })
        // .then((resp) => {
        //   console.log(resp);
        // })
        // .catch((error) => console.log(error));
      },
      getVote() {
        axios.get(`http://localhost:3000/post/${this.id}/like/${this.userId}`,
        { headers: {'Authorization': `Bearer ${this.$userInfo.token}`}})
        .then((res) => {
            console.log(res.data);
            //console.log(res.data[0].votes);
            if(res.data.length === 0) {
              //console.log('result vide');
              this.isliked = 'false';
            }
            else if(res.data[0].votes === 1) {
              this.isliked = 'true';
            } 
            //this.posts = res.data;
            //localStorage.setItem('postInfo', JSON.stringify(res.data))
        })
        .catch((error) => console.log(error));
        // if(localStorage.getItem('like') !== null) {
        //   thumbsup.classList.add('active')
        // } else {
        //   thumbsup.classList.remove('active')
        // }
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
      },
      toggleModal() {
        this.isModalOn = !this.isModalOn
      },
      clickedValue() {
        console.log(this.clicked);
        this.clicked = 1;
        return this.clicked
      }
    },
    mounted() {
      this.getMyPost();
      this.getVote();
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
.modal_container {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .overlay {
    background: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .modal_card {
    position: fixed;
    background: #fff;
    width: 500px;
    //height: 200px;
    height: auto;
    padding: 10px;
    animation: fadein 0.5s forwards;
    transform: translateY(-50%);
    // span {
    //   position: absolute;
    //   right: 5px;
    //   top: 5px;
    //   background: #FD2D01;
    //   padding: 5px;
    // }
  }
  .post_like {
    text-align: right;
    .fa-thumbs-up, .fa-thumbs-down {
      color: #FD2D01;
      margin: 0 1px 0 10px;
    }
    .true {
      background: blue;
    }
  }
  @keyframes fadein {
    0% {
      opacity: 0;
      top: 45%;
    }
    100% {
      opacity: 1;
      top: 50%;
    }
  }
</style>