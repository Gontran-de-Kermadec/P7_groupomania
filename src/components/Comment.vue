<template>
    <div>
        <p>laisser un commentaire</p>
        <p>{{postId}}</p>
        <textarea type="text" name="comment" id="comment" v-model="post"></textarea>
        <button @click="sendComment">Commenter</button>
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
        .then((resp) => {
          console.log(resp)
          //this.$router.push('/home')
          //console.log(resp.status);
          // if(resp.status === 200) {
          //   localStorage.setItem('token', JSON.stringify(resp.data))
          //   this.$router.push('/home')
          // }
        })
        .catch((error) => console.log(error));
      }
    }
}
</script>

<style>

</style>