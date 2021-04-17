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
    //uri: apiUrl
    userId: '',
    admin: 0,
    //section post
    allPosts: [],
    myPosts: [],
    postId: '',
    singlePost: [],
    postContent: "",
    postUrl: "",
    updatePost: "",
		updateUrl: "",
    //section commentaire
    allComments: [],
    commentContent: "",
    //section vote
    likeCounter: 0,
		dislikeCounter: 0,
    islike: "false",
		isdislike: "false",
    disabDislike: false,
    disabLike: false,
    getVoteValue: []
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
    SEND_POST(state, payload) {
      state.postContent = payload.post;
      state.postUrl = payload.postUrl;
      console.log(state.postContent);
    },
    GET_MY_POSTS(state, data) {
      state.myPosts = data;
      //localStorage.setItem("postInfo", JSON.stringify(data));
			console.log(state.myPosts);
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
    },
    //section commentaire
    GET_ALL_COMMENTS(state, data) {
      state.allComments = data;
    },
    SEND_COMMENT(state, payload) {
      state.commentContent = payload;
      console.log(state.commentContent);
    },
    //section vote
    GET_VOTE_COUNT(state, data) {
      state.likeCounter = data.likes;
      state.dislikeCounter = data.dislikes;
      console.log(state.likeCounter);
    },
    ADD_LIKE_POST(state) {
      state.islike = "true";
      state.likeCounter = state.likeCounter + 1;
      state.disabDislike = true;
    },
    REMOVE_LIKE_POST(state) {
      state.islike = "false";
      state.likeCounter = state.likeCounter - 1;
      state.disabDislike = false;
    },
    ADD_DISLIKE_POST(state) {
      state.isdislike = "true"
      state.dislikeCounter = state.dislikeCounter + 1;
      state.disabLike = true;
    },
    REMOVE_DISLIKE_POST(state) {
      state.isdislike = "false"
      state.dislikeCounter = state.dislikeCounter - 1;
      state.disabLike = false;
    },
    GET_VOTE(state, data) {
      state.getVoteValue = data
      if(state.getVoteValue.length === 0) {
        state.islike = "false";
        state.isdislike = "false";
        state.disabDislike = false;
        state.disabLike = false;
      } else if(state.getVoteValue[0].votes === 1) {
        state.islike = "true"; 
        state.disabDislike = true; 
      } else if(state.getVoteValue[0].votes === -1) {
        state.isdislike = "true"; 
        state.disabLike = true; 
      }
    },
  },
  actions: {
    //section user
    getUserId({commit}) {
      axios.get(`http://localhost:3000/${userInfo.token}`, { headers: {'Authorization': `Bearer ${userInfo.token}`}})
      .then((res) => {
        //console.log(res.data);
        commit('GET_USER_ID', res.data);
      })
      .catch((error) => console.log(error));
    },
    deleteUser() {
      axios
        //.delete(`http://localhost:3000/${context.state.userId}`, {
        .delete(`http://localhost:3000/${userInfo.token}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        })
        .then((resp) => {
          console.log(resp);
        })
        .catch((error) => console.log(error));
      localStorage.removeItem("userInfo");
      window.location = "http://localhost:8080/";
    },
    //section post
    getAllPosts(context) {
      axios.get('http://localhost:3000/', { headers: {'Authorization': `Bearer ${userInfo.token}`}})
      .then((res) => {
        context.commit('GET_ALL_POSTS', res.data)
      })
      .catch((error) => console.log(error));
    },
    sendPost(context) {
      console.log(context.state.postUrl);
      console.log(userInfo.name);
      axios.post("http://localhost:3000/", {
        userId: context.state.userId,
        postName: userInfo.name,
        postContent: context.state.postContent,
        postUrl: context.state.postUrl,
      }, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      })
        .then((resp) => {
          console.log(resp);
          document.location.reload();
        })
        .catch((error) => console.log(error));
    },
    getMyPosts(context) {
      console.log(context);
      axios.get(`http://localhost:3000/${userInfo.token}`, { headers: {'Authorization': `Bearer ${userInfo.token}`}})
      .then((res) => {
        console.log(res.data.userId);
        let userId = res.data.userId;
     	  axios // eslint-disable-line no-mixed-spaces-and-tabs
				// 	//.get(`http://localhost:3000/${this.userId}/post`, {
				// 	//.get(`http://localhost:3000/${context.state.userId}/post`, {
					.get(`http://localhost:3000/${userId}/post`, {
						headers: { Authorization: `Bearer ${userInfo.token}` },
					})
          .then((res) => {
            console.log(res.data);
            context.commit('GET_MY_POSTS', res.data)
          })
          .catch((error) => console.log(error));
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
    //section commentaire
    getAllComments(context) {
      axios
        .get(`http://localhost:3000/comment/${context.state.postId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        })
      //apiCallToken.get(`/comment/${context.state.postId}`)
        .then((res) => {
          console.log(res.data);
          context.commit('GET_ALL_COMMENTS', res.data)
        })
        .catch((error) => console.log(error));
    },
    sendComment(context) {
      console.log(context.state.userId);
      console.log(context.state.postId);
      console.log(context.state.commentContent);
      axios.post("http://localhost:3000/comment", {
              userId: context.state.userId,
           commentName: userInfo.name,
           postId: context.state.postId,
           commentContent: context.state.commentContent
      },
      {
        headers: { Authorization: `Bearer ${userInfo.token}`}
          }
      )
      .then((resp) => {
        console.log(resp);
        document.location.reload();
      })
      .catch((error) => console.log(error)); 
    },
    deleteComment(context, commentId) {
      console.log(commentId);
          axios
            .delete(`http://localhost:3000/comment/${commentId}`, {
              headers: { Authorization: `Bearer ${userInfo.token}` },
            })
            .then((resp) => {
              console.log(resp);
              document.location.reload();
            })
            .catch((error) => console.log(error));
    },
    //section vote
    getVoteCount(context) {
      console.log(context.state.postId);
      axios
        .get(`http://localhost:3000/post/${context.state.postId}/like`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        })
        .then((res) => {
          console.log(res.data.likes);
          context.commit('GET_VOTE_COUNT', res.data)
        })
        .catch((error) => console.log(error));
    },
    sendVoteDb(context, payload) {
      console.log(typeof payload);
      if(payload === 'like') {
       axios
       .post(
         `http://localhost:3000/post/${context.state.postId}/${payload}`,
         {
           userId: context.state.userId,
           like_dislike: context.state.islike,
         },
         {
           headers: { Authorization: `Bearer ${userInfo.token}` },
         }
       )
       .then((resp) => {
         console.log(resp);
       })
       .catch((error) => console.log(error));
      } else if (payload === 'dislike') {
       axios
         .post(
           `http://localhost:3000/post/${context.state.postId}/${payload}`,
           {
             userId: context.state.userId,
             like_dislike: context.state.isdislike,
           },
           {
             headers: { Authorization: `Bearer ${userInfo.token}` },
           }
         )
         .then((resp) => {
           console.log(resp);
         })
         .catch((error) => console.log(error));
      }
     },
     getVoteValue(context) {
      //let id = await context.dispatch('getUserId');
      //console.log(id);
      console.log(context.state.userId);
      //context.commit('GET_VOTE', data)
      axios
        .get(`http://localhost:3000/post/${context.state.postId}/like/${context.state.userId}`, {
        //.get(`${this.$baseUrl}/post/${this.id}/like/${this.userId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        })
        .then((res) => {
          console.log(res.data);
          context.commit('GET_VOTE', res.data)
        })
  },
  },
  
  
 
})
