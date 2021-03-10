<template>
  <div>
      <button @click="toggleModal" class="create_btn">Laisser un commentaire</button>
      <p>{{postId}}</p>
      <div class="modal_container" v-if="isModalOn">
        <div class="overlay" @click="toggleModal"></div>
        <div class="modal_card">
          <span @click="toggleModal">X</span>
          <p>Votre commentaire</p>
          <form action="" method="post" @submit.prevent = sendComment()>
            <textarea type="text" name="post" id="post" placeholder="Commentez..." v-model="post"></textarea><br>
            <button type="submit">Commenter</button>
          </form>
        </div>
      </div>
      <!-- <textarea type="text" name="comment" id="comment" v-model="post"></textarea>
      <button @click="sendComment">Commenter</button> -->
    <div class="comment_container">
      <div>
        <div v-for="comment in comments" :key="comment.id" class="eachComment">
          <div class="comment_header">
            <p>Commenté par <span class="comment_name">{{ comment.name }}</span></p>
            <!-- <p>Commenté par <span class="comment_name">{{ comment.name }}</span>, <span>{{timePast(post.postDate)}}</span> le {{dateFormat(post.postDate)}}</p> -->
          </div>
          <div class="comment_body">
            <p class="commentContent">{{ comment.comment }}</p>
            <!-- <a :href="post.postUrl">{{post.postUrl}}</a><br> -->
            <!-- <button v-if="userId === post.userId">Modifier</button>
            <button @click="deletePost">Supprimer</button> -->
          </div>
            <!-- <router-link :to="{name: 'Post', params: {id: post.id}}"> -->
            <!-- <p><span>{{ comment.userId }} </span>{{ comment.name }}</p>
            <p>{{ comment.comment }}</p> -->
            <!-- </router-link> -->
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
      }
    },
    mounted() {
      this.getComment();
    }
}
</script>

<style scoped lang='scss'>
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
    //height: 400px;
    height: auto;
    padding: 10px;
  //   span {
  //     position: absolute;
  //     right: 5px;
  //     top: 5px;
  //     //border: solid ;
  //     background: #FD2D01;
  //     padding: 5px;
  //   }
  //   textarea, input {
  //     width: 300px;
  //   }
  //   textarea {
  //     height: 100px;
  //   }
  //   input {
  //     height: 40px;
  //   }
  }
  .comment_container {
    display: flex;
    justify-content: center;
    .eachComment {
      border-left: solid #FD2D01;
    }
  }
  
</style>