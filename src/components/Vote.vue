<template>
  <div>
    <div class="post_like">
          <span><button @click="likeP()" id="liked" :class="islike"><i class="far fa-thumbs-up"></i></button><span>{{likeCounter}}</span></span>
          <!-- <span><button @click="likeP()" id="liked" :class="islike"><i class="far fa-thumbs-up"></i></button><span>{{likeCounter}}</span></span> -->
          <span><button id="disliked" :disabled="disab"><i class="far fa-thumbs-down"></i></button><span>0</span></span>
    </div>
  </div>
</template>

<script>
    const axios = require('axios');
    //let liked = document.querySelector('#liked');
    export default {
        name: 'Vote',
        props: {
        postId: Number
        },
        data() {
            return {
                id: this.postId,
                userId: this.$userInfo.userId,
                likeCounter: '',
                dislikeCounter: '',
                islike: 'false',
                disab: false
            }
        },
        methods: {
            getVoteValue() {
                axios.get(`http://localhost:3000/post/${this.id}/like`, { headers: {'Authorization': `Bearer ${this.$userInfo.token}`}})
                    .then((res) => {
                        console.log(res.data);
                        this.likeCounter = res.data;
                        //console.log(state.allPosts);
                    })
                    .catch((error) => console.log(error));
            },
            likeP() {
                let liked = document.querySelector('#liked');
                //let disliked = document.querySelector('#disliked');
                if(liked.classList.contains('false')) {
                    this.islike = 'true';
                    this.likeCounter = this.likeCounter + 1;
                    this.disab = true;
                    axios.post(`http://localhost:3000/post/${this.id}/like`, 
                    {
                        userLiked: this.userId,
                        like: this.islike
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
                    this.islike = 'false';
                    this.likeCounter = this.likeCounter - 1;
                    this.disab = false;
                    axios.post(`http://localhost:3000/post/${this.id}/like`, 
                    {
                        userLiked: this.userId,
                        like: this.islike
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
            },
            // dislikePost() {
            //     let liked = document.querySelector('#liked');
            //     //let disliked = document.querySelector('#disliked');
            //     //disliked.disabled = true;
            //     if(liked.classList.contains('true')) {
            //         this.disab = true
            //     } else if(liked.classList.contains('false')){
            //          this.disab = false
            //     }
            // },
        //fonction pour maintenir classe au rafraichissement
            getV() {
                axios.get(`http://localhost:3000/post/${this.id}/like/${this.userId}`,
                { headers: {'Authorization': `Bearer ${this.$userInfo.token}`}})
                .then((res) => {
                    console.log(res.data);
                    //console.log(res.data[0].votes);
                    if(res.data.length === 0) {
                    //console.log('result vide');
                    this.islike = 'false';
                    this.disab = false;
                    }
                    else if(res.data[0].votes === 1) {
                    this.islike = 'true';
                    this.disab = true
                    } 
                })
                .catch((error) => console.log(error));
            },
        },
        mounted() {
            this.getVoteValue();
            this.getV();
            //this.dislikePost();
        }
    }
</script>

<style scoped lang='scss'>
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
</style>