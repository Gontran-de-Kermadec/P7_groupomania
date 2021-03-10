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
    allPosts: []
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
    // dateFormat(date) {
    //   const event = new Date(date);
    //   const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    //   return event.toLocaleDateString('fr-FR', options);
    // }
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
