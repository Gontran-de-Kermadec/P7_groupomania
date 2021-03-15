<template>
  <div>
      <button @click="toggleModal" class="create_btn">Laisser un commentaire</button>
      <!-- <p>{{postId}}</p> -->
    <transition name="flipinX">
      <div class="modal_container" v-if="isModalOn">
        <!-- <div class="overlay" @click="toggleModal"></div> -->
          <div class="modal_card">
            <span @click="toggleModal">X</span>
            <p>Votre commentaire</p>
            <form action="" method="post" @submit.prevent = sendComment()>
              <textarea type="text" name="post" id="post" placeholder="Commentez..." v-model="post"></textarea><br>
              <button type="submit">Commenter</button>
            </form>
          </div>
      </div>
    </transition>  
      <!-- <textarea type="text" name="comment" id="comment" v-model="post"></textarea>
      <button @click="sendComment">Commenter</button> -->
    <!-- <div class="comment_container">
      <div>
        <div v-for="comment in comments" :key="comment.id" class="eachComment">
          <div class="comment_header">
            <p>Commentaire de <span class="comment_name">{{ comment.name }}</span></p>
            <p>Commenté par <span class="comment_name">{{ comment.name }}</span>, <span>{{timePast(post.postDate)}}</span> le {{dateFormat(post.postDate)}}</p>
          </div>
          <div class="comment_body">
            <p class="commentContent">{{ comment.comment }}</p>
          <a :href="post.postUrl">{{post.postUrl}}</a><br> 
            <button v-if="userId === post.userId">Modifier</button>
            <button @click="deletePost">Supprimer</button> 
          </div>
          <div class="comment_separate"></div>
           <router-link :to="{name: 'Post', params: {id: post.id}}"> 
         <p><span>{{ comment.userId }} </span>{{ comment.name }}</p>
            <p>{{ comment.comment }}</p> 
            </router-link> 
        </div>
      </div>
    </div> -->
    <div class="comment_container">
      <div class="comment_subcontainer">
        <p>Commentaires</p>
        <div v-for="comment in comments" :key="comment.id" class="eachComment">
          <div class="comment_header">
            <!-- <p>Commentaire de <span class="comment_name">{{ comment.name }}</span></p> -->
            <p>Commentaire de <span class="comment_name">{{ comment.name }}</span>, <span>{{timePast(comment.commentDate)}}</span> le {{dateFormat(comment.commentDate)}}</p>
          </div>
          <div class="comment_body">
            <p class="commentContent">{{ comment.comment }}</p>
          </div>
          <div class="comment_like">
            <i class="far fa-thumbs-up"></i><span>0</span>
            <i class="far fa-thumbs-down"></i><span>0</span>
          </div>
          <div class="comment_separate"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios');
export default {
    name: 'Comment',
    props: {
      postId: Number
    },
    data() {
      return {
        post: '',
        comments: '',
        id: this.postId,
        isModalOn: false
      }
    },
    methods: {
      sendComment() {
        // let postContent = this.post;
        // axios.post('http://localhost:3000/', 
        // {
        //   getId,
        //   postContent
        // })
        axios({
          method: 'post',
          url: 'http://localhost:3000/comment',
          data: {
              userId: this.$userInfo.userId,
              commentName: this.$userInfo.name,
              postId: this.id,
              commentContent: this.post
          },
          headers: {
              'Authorization': `Bearer ${this.$userInfo.token}`
          }
        })
        .then((resp) => {console.log(resp)})
        .catch((error) => console.log(error));
      },
      getComment() {
        axios.get(`http://localhost:3000/comment/${this.postId}`, { headers: {'Authorization': `Bearer ${this.$userInfo.token}`}})
          .then((res) => {
              console.log(res.data);
              this.comments = res.data;
              //localStorage.setItem('postInfo', JSON.stringify(res.data))
          })
          .catch((error) => console.log(error));
      },
      toggleModal() {
        this.isModalOn = !this.isModalOn
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
      this.getComment();
    }
}
</script>

<style scoped lang='scss'>
  .flipinX-enter-active {
    animation: flipin .5s;
  }
  .flipinX-leave-active {
    animation: flipout .5s;
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
    //background: rgba(0,0,0,0.5);
    background: rgba(255, 215, 215, 0.5);
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
    border: solid;
    //height: 400px;
    height: auto;
    padding: 20px 0;
    @media (max-width: 768px) {
      width: 100vw;
      border: solid 1px;
    }
    span {
      position: absolute;
      right: 10px;
      top: 5px;
      border-radius: 5px;
      background: #FD2D01;
      padding: 7px;
      cursor: pointer;
    }
    p {
      font-weight: bolder;
      font-size: 1.5rem;
    }
    textarea {
      all: unset;
      //border: solid;
      text-align: left;
      word-break: break-all;
      margin: 20px 0;
      border-bottom: solid 2px #FFD7D7;
      border-top: solid 2px #FFD7D7;
      width: 100%;
      height: 100px;
    }
    button {
      all: unset;
      background: #FD2D01;
      padding: 10px 15px;
      font-size: 1.3rem;
    }
  }
  .create_btn {
    width: 90vw;
    background-color: #FD2D01;
    font-size: 1.4rem;
    border: solid 1px;
    padding: 10px;
    cursor: pointer;
    @media (min-width: 768px) {
      width: 50vw;
    }
  }
  // .comment_container {
  //   display: flex;
  //   justify-content: center;
  //   padding: 10px 0;
  //   .eachComment {
  //     border-left: solid #FD2D01;
  //     width: 90vw;
  //     padding: 5px 0;
  //   }
  //   .comment_separate {
  //     position: relative;
  //     left: 50%;
  //     transform: translateX(-50%);
  //     //border: solid 1px;
  //     background: #000;
  //     width: 150px;
  //     height: 1px;
  //     margin-top: 5px;
  //   }
  // }
  .comment_container {
    display: flex;
    justify-content: center;
    padding: 10px 0;
    .comment_subcontainer {
      text-align: left;
    }
    .eachComment {
      border-left: solid #FD2D01;
      width: 90vw;
      padding: 11px;
      div {
        margin: 15px 0;
      }
    }
    .comment_header {
      font-size: 0.8rem;
      .comment_name {
        text-transform: capitalize;
        color: #FD2D01;
      }
    }
    .commentContent {
      font-size: 1.2rem;
    }
    .fa-thumbs-up, .fa-thumbs-down {
      color: #FD2D01;
      margin: 0 1px 0 10px;
      //background: #FD2D01;
    }
    .comment_separate {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      //border: solid 1px;
      background: #000;
      width: 70%;
      height: 0.5px;
      margin-top: 5px;
    }
  }
  @keyframes flipin {
    0% {
      transform: perspective(400px) rotateX(90deg); 
      opacity: 0;
    }
    // 40% {
    //   transform: perspective(400px) rotateX(-10deg);
    // }
    // 70% {
    //   transform: perspective(400px) rotateX(10deg);
    // }
    100% {
      transform: perspective(400px) rotateX(0deg);
      opacity: 1;
    }
  }
   @keyframes flipout {
    0% {
      transform: perspective(400px) rotateX(0deg); 
      opacity: 1;
    }
    // 40% {
    //   transform: perspective(400px) rotateX(-10deg);
    // }
    // 70% {
    //   transform: perspective(400px) rotateX(10deg);
    // }
    100% {
      transform: perspective(400px) rotateX(90deg);
      opacity: 0;
    }
  }
</style>