import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import {apiCallToken} from '../axios'

let userInfo = JSON.parse(localStorage.getItem('userInfo'));

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
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
    //section post
    GET_ALL_POSTS(state, data) {
      state.allPosts = data;
    },
    SEND_POST(state, payload) {
      state.postContent = payload.post;
      state.postUrl = payload.postUrl;
    },
    GET_MY_POSTS(state, data) {
      state.myPosts = data;
			console.log(state.myPosts);
    },
    GET_ONE_POST(state, data) {
      state.postId = data;
    },
    SINGLE_POST(state, data) {
      state.singlePost = data;
    },
    UPDATE_POST(state, payload) {
      state.updatePost = payload.updatePost;
      state.updateUrl = payload.updateUrl;
    },
    //section commentaire
    GET_ALL_COMMENTS(state, data) {
      state.allComments = data;
    },
    SEND_COMMENT(state, payload) {
      state.commentContent = payload;
    },
    //section vote
    GET_VOTE_COUNT(state, data) {
      state.likeCounter = data.likes;
      state.dislikeCounter = data.dislikes;
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
      apiCallToken.get(`/${userInfo.token}`)
      .then((res) => {
        commit('GET_USER_ID', res.data);
      })
      .catch((error) => console.log(error));
    },
    deleteUser() {
      apiCallToken.delete(`/${userInfo.token}`)
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => console.log(error));
      localStorage.removeItem("userInfo");
      window.location = "http://localhost:8080/";
    },
    //section post
    getAllPosts(context) {
      apiCallToken.get('/')
      .then((res) => {
        context.commit('GET_ALL_POSTS', res.data)
      })
      .catch((error) => console.log(error));
    },
    sendPost(context) {
      apiCallToken.post("/", {
        userId: context.state.userId,
        postName: userInfo.name,
        postContent: context.state.postContent,
        postUrl: context.state.postUrl,
      })
        .then((resp) => {
          console.log(resp);
          document.location.reload();
        })
        .catch((error) => console.log(error));
    },
    getMyPosts(context) {
      apiCallToken.get(`/${userInfo.token}`)
      .then((res) => {
        let userId = res.data.userId;
        apiCallToken.get(`/${userId}/post`)
          .then((res) => {
            context.commit('GET_MY_POSTS', res.data)
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
    },
    getOnePost({commit, state}) {
      apiCallToken.get(`/post/${state.postId}`)
      .then((res) => {
        commit('SINGLE_POST', res.data);
      })
      .catch((error) => console.log(error));
    },
    deletePost(context) {
      apiCallToken.delete(`/post/${context.state.postId}`)
      .then((resp) => {
        console.log(resp);
        router.push("/home");
      })
      .catch((error) => console.log(error));
    },
    sendUpdatePost(context) {
      console.log(context.state.updateUrl);
        apiCallToken.put(`/post/${context.state.postId}`, {
          postContent: context.state.updatePost,
          postUrl: context.state.updateUrl
        })
        .then((resp) => {
          console.log(resp);
          document.location.reload();
        })
        .catch((error) => console.log(error));
    },
    //section commentaire
    getAllComments(context) {
      apiCallToken.get(`/comment/${context.state.postId}`)
        .then((res) => {
          context.commit('GET_ALL_COMMENTS', res.data)
        })
        .catch((error) => console.log(error));
    },
    sendComment(context) {
      apiCallToken.post("/comment", {
        userId: context.state.userId,
        commentName: userInfo.name,
        postId: context.state.postId,
        commentContent: context.state.commentContent
      })
      .then((resp) => {
        console.log(resp);
        document.location.reload();
      })
      .catch((error) => console.log(error)); 
    },
    deleteComment(context, commentId) {
      console.log(context);
      apiCallToken.delete(`/comment/${commentId}`)
        .then((resp) => {
          console.log(resp);
          document.location.reload();
        })
        .catch((error) => console.log(error));
    },
    //section vote
    getVoteCount(context) {
      apiCallToken.get(`/post/${context.state.postId}/like`)
        .then((res) => {
          context.commit('GET_VOTE_COUNT', res.data)
        })
        .catch((error) => console.log(error));
    },
    sendVoteDb(context, payload) {
      if(payload === 'like') {
        apiCallToken.post(`/post/${context.state.postId}/${payload}`, {
          userId: context.state.userId,
          like_dislike: context.state.islike,
        })
        .then((resp) => {
         console.log(resp);
         })
        .catch((error) => console.log(error));
      } else if (payload === 'dislike') {
        apiCallToken.post(`/post/${context.state.postId}/${payload}`, {
          userId: context.state.userId,
          like_dislike: context.state.isdislike,
        })
        .then((resp) => {
          console.log(resp);
        })
        .catch((error) => console.log(error));
      }
     },
     getVoteValue(context) {
      apiCallToken.get(`/post/${context.state.postId}/like/${context.state.userId}`)
        .then((res) => {
          context.commit('GET_VOTE', res.data)
        })
    },
  },
})
