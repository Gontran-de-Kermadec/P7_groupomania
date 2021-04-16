import Vue from 'vue'
import Vuex from 'vuex'
//import apiUrl from '../../axios_config'
const axios = require('axios');

let userInfo = JSON.parse(localStorage.getItem('userInfo'));

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    allPosts: [],
    //uri: apiUrl
    userId: '',
    admin: 0,
  },
  mutations: {
    CHANGE_LOG(state) {
      if(localStorage.getItem('userInfo') !== null) {
        state.loggedIn = true;
      } else {
        state.loggedIn = false;
      }
    },
    GET_USER_ID(state, data) {
      state.userId = data.userId;
      state.admin = data.admin;
      console.log(state.userId);
    },
    GET_ALL_POSTS(state, data) {
      state.allPosts = data;
    }
  },
  actions: {
    getUserId({commit}) {
      axios.get(`http://localhost:3000/${userInfo.token}`, { headers: {'Authorization': `Bearer ${userInfo.token}`}})
      .then((res) => {
        //console.log(res.data);
        commit('GET_USER_ID', res.data);
        //return res.data;
      })
      .catch((error) => console.log(error));
    },
    getAllPosts(context) {
      axios.get('http://localhost:3000/', { headers: {'Authorization': `Bearer ${userInfo.token}`}})
      .then((res) => {
        context.commit('GET_ALL_POSTS', res.data)
      })
      .catch((error) => console.log(error));
    },
  },
})
