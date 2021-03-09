<template>
    <div>
        <p>laisser un commentaire</p>
        <p>{{postId}}</p>
        <textarea type="text" name="comment" id="comment" v-model="post"></textarea>
        <button @click="sendComment">Commenter</button>
        <div v-for="comment in comments" :key="comment.id">
            <!-- <router-link :to="{name: 'Post', params: {id: post.id}}"> -->
            <p><span>{{ comment.userId }} </span>{{ comment.name }}</p>
            <p>{{ comment.comment }}</p>
            <!-- </router-link> -->
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
        id: this.postId
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
      }
    },
    mounted() {
      this.getComment();
    }
}
</script>

<style>

</style>