<template>
  <div>
    <button @click="toggleModal" class="create_btn">Créer une publication</button>
    <p>{{post}}</p>
    <p>{{postUrl}}</p>
    <div class="modal_container" v-if="isModalOn">
      <div class="overlay" @click="toggleModal"></div>
      <div class="modal_card">
        <span @click="toggleModal">X</span>
        <p>Publiez quelque chose</p>
        <form action="" method="post" @submit.prevent = postData()>
          <textarea type="text" name="post" id="post" placeholder="Postez une histoire" v-model="post"></textarea><br>
          <input type="url" name="postUrl" id="postUrl" v-model="postUrl" placeholder="Placez les liens ici"><br>
          <button type="submit">Publier</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios');
//let userInfo = JSON.parse(localStorage.getItem('userInfo'));
//console.log(getToken.token);
//let getId = getToken.userId;
export default {
    name: 'SendPost',
    //props: ['isModalOn'],
    data() {
      return {
        post: '',
        postUrl: '',
        isModalOn: false
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
              postContent: this.post,
              postUrl: this.postUrl
          },
          headers: {
              'Authorization': `Bearer ${this.$userInfo.token}`
          }
        })
        .then((resp) => {
          console.log(resp)
          document.location.reload();
          //console.log(resp.status);
          // if(resp.status === 200) {
          //   localStorage.setItem('token', JSON.stringify(resp.data))
          //   this.$router.push('/home')
          // }
        })
        .catch((error) => console.log(error));
      },
      toggleModal() {
        this.isModalOn = !this.isModalOn
      }
    }
}
</script>

<style scoped lang='scss'>
  .create_btn {
    width: 90vw;
    background-color: #FD2D01;
    font-size: 1.4rem;
    border: solid 1px;
    padding: 10px;
    @media (min-width: 768px) {
      width: 50vw;
    }
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
    background: rgba(0,0,0,0.5);
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
    span {
      position: absolute;
      right: 5px;
      top: 5px;
      //border: solid ;
      background: #FD2D01;
      padding: 5px;
    }
    textarea, input {
      width: 300px;
    }
    textarea {
      height: 100px;
    }
    input {
      height: 40px;
    }
  }
</style>