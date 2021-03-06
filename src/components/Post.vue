<template>
  <div>
    <form action="" method="post" @submit.prevent = postData()>
      <textarea type="text" name="post" id="post" placeholder="Postez une histoire" v-model="post"></textarea>
      <button type="submit">Publier</button>
    </form>
      <p>{{post}}</p>
  </div>
</template>

<script>
const axios = require('axios');
//let userInfo = JSON.parse(localStorage.getItem('userInfo'));
//console.log(getToken.token);
//let getId = getToken.userId;
export default {
    name: 'Post',
    data() {
      return {
        post: ''
      }
    },
    methods: {
      postData() {
        // let postContent = this.post;
        // axios.post('http://localhost:3000/', 
        // {
        //   getId,
        //   postContent
        // })
        axios({
          method: 'post',
          url: 'http://localhost:3000/',
          data: {
              getId: this.$userInfo.userId,
              postName: this.$userInfo.name,
              postContent: this.post
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