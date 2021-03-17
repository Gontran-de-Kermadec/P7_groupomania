<template>
  <div>
    <div class="post_like">
          <span><i class="far fa-thumbs-up"></i><span>0</span></span>
          <i class="far fa-thumbs-down"></i><span>0</span>
    </div>
  </div>
</template>

<script>
const axios = require('axios');
export default {
    name: 'Vote',
    data() {
        return {
            likeCounter: '',
            dislikeCounter: ''
        }
    },
    methods: {
        getVotes() {
            axios.get('http://localhost:3000/', { headers: {'Authorization': `Bearer ${this.$userInfo.token}`}})
                .then((res) => {
                    console.log(res.data);
                    //state.allPosts = res.data;
                    //console.log(state.allPosts);
                })
                .catch((error) => console.log(error));
        }
    }
}
</script>

<style>

</style>