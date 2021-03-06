<template>
  <div>
      <p @click="getAllPost()">voir tous les posts</p>
      <div v-for="post in posts" :key="post.id">
          <p><span>{{ post.userId }} </span>{{ post.postDate }}</p>
          <p>{{ post.postContent }}</p>
      </div>
  </div>
</template>

<script>
const axios = require('axios');
//let userInfo = JSON.parse(localStorage.getItem('userInfo'));

export default {
    name: 'GetAllPosts',
    data() {
        return {
            posts: []
        }
    },
    methods: {
        getAllPost() {
            console.log(this.$userInfo);
            axios.get('http://localhost:3000/', { headers: {'Authorization': `Bearer ${this.$userInfo.token}`}})
            .then((res) => {
                console.log(res.data[0].postContent);
                this.posts = res.data;
            })
            .catch((error) => console.log(error));
        }
    }
}
</script>

<style scoped lang="scss">

</style>