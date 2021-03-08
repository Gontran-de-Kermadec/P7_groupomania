<template>
  <div>
    <Header />
    <p>{{route}} est la bonne</p>
     <div v-for="post in posts" :key="post.id">
          <p>{{ post.name }}</p>
          <p><span>{{ post.userId }} </span>{{ post.postDate }}</p>
          <p>{{ post.postContent }}</p>
          <button v-if="userId === post.userId">Modifier</button>
          <button @click="deletePost">Supprimer</button>
      </div>
    <Comment :post-id='id' />
  </div>
</template>

<script>
import Header from './Header.vue'
import Comment from './Comment.vue'
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
      }
    },
    mounted() {
      this.getMyPost();
    }
}
</script>

<style>

</style>