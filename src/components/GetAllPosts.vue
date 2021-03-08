<template>
  <div>
       <div v-for="post in allPosts" :key="post.id">
            <router-link :to="{name: 'Post', params: {id: post.id}}">
            <p><span>{{ post.userId }} </span>{{ post.postDate }}</p>
            <p>{{ post.postContent }}</p>
            </router-link>
      </div>
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
import { mapState } from 'vuex'
export default {
    name: 'GetAllPosts',
    data() {
        return {
            posts: []
        }
    },
    computed: {
        ...mapState(['allPosts'])
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
        },
        getAllPosts(){
            //this.$store.commit('GET_ALL_POSTS');
            this.$store.dispatch('getAllPosts');
            console.log(this.$route);
        }
    },
    mounted() {
      this.getAllPosts();
    }
}
</script>

<style scoped lang="scss">

</style>