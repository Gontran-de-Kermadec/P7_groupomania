import Vue from 'vue'
import Vuex from 'vuex'
const axios = require('axios');

// if(localStorage.getItem('userInfo') !== undefined) {
//   Vue.prototype.$userInfo = ;
// }
let userInfo = JSON.parse(localStorage.getItem('userInfo'));

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    allPosts: [],
    liked: 'false'
  },
  getters: {
    findUserIdPost(state) {
      // for (let i = 0; i < state.allPosts.length; i++) {
      //   return state.allPosts[i].userId === this.$userInfo.userId
      // }
      const teston = state.allPosts.filter(post => post.userId === userInfo.userId)
      console.log(teston);
      for (const {id: n} of teston) {
        console.log(n);
      }
      return teston
    },
  },
  mutations: {
    CHANGE_LOG(state) {
      if(localStorage.getItem('userInfo') !== null) {
        state.loggedIn = true;
      } else {
        state.loggedIn = false;
      }
      //console.log(state.loggedIn);
    },
    // CHECK_LIKE(state) {
    //   console.log(state.liked);
    //   let userLiked = (JSON.parse(localStorage.getItem('like')));
    //   if(localStorage.getItem('like') === null) {
    //     state.liked = false;
    //     //localStorage.setItem('like', JSON.stringify(this.liked)); 
    //   } else if(userLiked.user !== userInfo.userId) {
    //     state.liked = false;
    //   } else {
    //     state.liked = true;
    //   }
    //   // console.log(state.liked);
    //   // state.liked = !state.liked;
      
    //   // console.log(item.user);
    //   // console.log(JSON.parse(localStorage.getItem('like')));
    //   // console.log(state.liked);
    //   // }
    //   //let thumbsup = document.querySelector('.fa-thumbs-up');
    //   // if(localStorage.getItem('like') !== null) {
    //   //   console.log(state.liked); 
    //   //   state.liked = false;
    //   //   localStorage.removeItem('like');     
    //   // } else {
    //   //   console.log(state.liked);
    //   //   state.liked = true;
    //   //   localStorage.setItem('like', 'true'); 
    //   // }
    // },
    GET_ALL_POSTS(state, data) {
      state.allPosts = data;
      // console.log(state.allPosts);
      //console.log(date);
      // axios.get('http://localhost:3000/', { headers: {'Authorization': `Bearer ${userInfo.token}`}})
      // .then((res) => {
      //     console.log(res.data[0].postContent);
      //     state.allPosts = res.data;
      //     console.log(state.allPosts);
      // })
      // .catch((error) => console.log(error));
    }
  },
  actions: {
    getAllPosts(context) {
      axios.get('http://localhost:3000/', { headers: {'Authorization': `Bearer ${userInfo.token}`}})
      .then((res) => {
        //console.log(res.data[0]);
        //state.allPosts = res.data;
        context.commit('GET_ALL_POSTS', res.data)
        //console.log(state.allPosts);
      })
      .catch((error) => console.log(error));
    },
    // checkLogged(context) {
    //   context.commit('CHANGE_LOG')
    // }
  },
  modules: {
  }
})
