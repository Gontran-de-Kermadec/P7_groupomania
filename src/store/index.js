import Vue from 'vue'
import Vuex from 'vuex'
const axios = require('axios');

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
    GET_ALL_POSTS(state, data) {
      state.allPosts = data;
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
  },
  modules: {
  }
})
