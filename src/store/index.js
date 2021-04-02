import Vue from 'vue'
import Vuex from 'vuex'
const axios = require('axios');

let userInfo = JSON.parse(localStorage.getItem('userInfo'));

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    allPosts: [],
    //liked: 'false'
  },
  mutations: {
    CHANGE_LOG(state) {
      if(localStorage.getItem('userInfo') !== null) {
        state.loggedIn = true;
      } else {
        state.loggedIn = false;
      }
    },
    GET_ALL_POSTS(state, data) {
      state.allPosts = data;
    }
  },
  actions: {
    getAllPosts(context) {
      axios.get('http://localhost:3000/', { headers: {'Authorization': `Bearer ${userInfo.token}`}})
      .then((res) => {
        context.commit('GET_ALL_POSTS', res.data)
      })
      .catch((error) => console.log(error));
    },
  },
  modules: {
  }
})
