import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
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
    //section post
    postId: '',
    singlePost: [],
    postContent: "",
    postUrl: "",
    updatePost: "",
		updateUrl: "",
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
    },
    GET_ONE_POST(state, data) {
      state.postId = data;
			console.log(state.postId);
    },
    SINGLE_POST(state, data) {
      state.singlePost = data;
      console.log(state.singlePost);
    },
    UPDATE_POST(state, payload) {
      state.updatePost = payload.updatePost;
      state.updateUrl = payload.updateUrl;
      console.log(state.updatePost);
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
    //section post
    getAllPosts(context) {
      axios.get('http://localhost:3000/', { headers: {'Authorization': `Bearer ${userInfo.token}`}})
      .then((res) => {
        context.commit('GET_ALL_POSTS', res.data)
      })
      .catch((error) => console.log(error));
    },
    getOnePost({commit, state}) {
      console.log(state.postId);
      axios
      .get(`http://localhost:3000/post/${state.postId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      })
      .then((res) => {
        console.log(res.data);
        commit('SINGLE_POST', res.data);
      })
      .catch((error) => console.log(error));
    },
    deletePost(context) {
      axios
        .delete(`http://localhost:3000/post/${context.state.postId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        })
        .then((resp) => {
          console.log(resp);
          router.push("/home");
        })
        .catch((error) => console.log(error));
    },
    sendUpdatePost(context) {
      axios
        .put(
          `http://localhost:3000/post/${context.state.postId}`,
          {
            postContent: context.state.updatePost,
            postUrl: context.state.updateUrl
          },
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        )
        .then((resp) => {
          console.log(resp);
          document.location.reload();
        })
        .catch((error) => console.log(error));
    },
  },
})
