<template>
	<div>
		<div class="post_like">
			<span>
				<button
					@click="likePost"
					id="liked"
					:class="islike"
					:disabled="disabLike"
					aria-label="like"
				>
					<i class="far fa-thumbs-up"></i>
				</button>
				<span>{{ likeCounter }}</span>
			</span>
			<span
				><button
					@click="dislikePost"
					id="disliked"
					:class="isdislike"
					:disabled="disabDislike"
					aria-label="dislike"
				>
					<i class="far fa-thumbs-down"></i></button
				><span>{{ dislikeCounter }}</span></span
			>
		</div>
	</div>
</template>

<script>
	const axios = require("axios");
	//let liked = document.querySelector('#liked');
	export default {
		name: "Vote",
		props: {
			postId: Number,
		},
		data() {
			return {
				id: this.postId,
				userId: this.$userInfo.userId,
				likeCounter: "",
				dislikeCounter: "",
				islike: "false",
				isdislike: "false",
				disabDislike: false,
				disabLike: false,
			};
		},
		methods: {
			getVoteValue() {
				axios
					.get(`http://localhost:3000/post/${this.id}/like`, {
						headers: { Authorization: `Bearer ${this.$userInfo.token}` },
					})
					.then((res) => {
						console.log(res.data.likes);
						this.likeCounter = res.data.likes;
						this.dislikeCounter = res.data.dislikes;
						//console.log(state.allPosts);
					})
					.catch((error) => console.log(error));
			},
			//fonction qui contient les infos du chemin pour l'envoi d'un vote
			sendVoteDb(value, data) {
				axios
					.post(
						`http://localhost:3000/post/${this.id}/${value}`,
						{
							userId: this.userId,
							like_dislike: data,
						},
						{
							headers: { Authorization: `Bearer ${this.$userInfo.token}` },
						}
					)
					.then((resp) => {
						console.log(resp);
					})
					.catch((error) => console.log(error));
			},
			likePost() {
				let liked = document.querySelector("#liked");
				//let disliked = document.querySelector('#disliked');
				document.querySelector(".fa-thumbs-up").classList.add("animation");
				if (liked.classList.contains("false")) {
					this.islike = "true";
					this.likeCounter = this.likeCounter + 1;
					this.disabDislike = true;
					this.sendVoteDb("like", this.islike);
					// axios
					// 	.post(
					// 		`http://localhost:3000/post/${this.id}/like`,
					// 		{
					// 			userLiked: this.userId,
					// 			like: this.islike,
					// 		},
					// 		{
					// 			headers: { Authorization: `Bearer ${this.$userInfo.token}` },
					// 		}
					// 	)
					// 	.then((resp) => {
					// 		console.log(resp);
					// 		//console.log(resp.data[0].votes);
					// 		// if(resp.data[0].votes === 1) {
					// 		//   console.log('un like');
					// 		//   this.isliked = 'true'
					// 		// } else {
					// 		//   this.isliked = 'false'
					// 		// }
					// 	})
					// 	.catch((error) => console.log(error));
				} else if (liked.classList.contains("true")) {
					this.islike = "false";
					this.likeCounter = this.likeCounter - 1;
					this.disabDislike = false;
					this.sendVoteDb("like", this.islike);
					// axios
					// 	.post(
					// 		`http://localhost:3000/post/${this.id}/like`,
					// 		{
					// 			userId: this.userId,
					// 			like_dislike: this.islike,
					// 		},
					// 		{
					// 			headers: { Authorization: `Bearer ${this.$userInfo.token}` },
					// 		}
					// 	)
					// 	.then((resp) => {
					// 		console.log(resp);
					// 		//console.log(resp.votes);
					// 	})
					// 	.catch((error) => console.log(error));
				}
			},
			dislikePost() {
				let disliked = document.querySelector("#disliked");
				let animation = document.querySelector(".fa-thumbs-down");
				animation.classList.add("animation");
				if (disliked.classList.contains("false")) {
					this.isdislike = "true";
					this.dislikeCounter = this.dislikeCounter + 1;
					this.disabLike = true;
					this.sendVoteDb("dislike", this.isdislike);
					// axios
					// 	.post(
					// 		`http://localhost:3000/post/${this.id}/dislike`,
					// 		{
					// 			userId: this.userId,
					// 			dislike: this.isdislike,
					// 		},
					// 		{
					// 			headers: { Authorization: `Bearer ${this.$userInfo.token}` },
					// 		}
					// 	)
					// 	.then((resp) => {
					// 		console.log(resp);
					// 	})
					// 	.catch((error) => console.log(error));
				} else if (disliked.classList.contains("true")) {
					this.isdislike = "false";
					this.dislikeCounter = this.dislikeCounter - 1;
					this.disabLike = false;
					this.sendVoteDb("dislike", this.isdislike);
					// axios
					// 	.post(
					// 		`http://localhost:3000/post/${this.id}/dislike`,
					// 		{
					// 			userId: this.userId,
					// 			dislike: this.isdislike,
					// 		},
					// 		{
					// 			headers: { Authorization: `Bearer ${this.$userInfo.token}` },
					// 		}
					// 	)
					// 	.then((resp) => {
					// 		console.log(resp);
					// 	})
					// 	.catch((error) => console.log(error));
				}
			},
			//fonction pour maintenir classe au rafraichissement
			getVote() {
				axios
					.get(`http://localhost:3000/post/${this.id}/like/${this.userId}`, {
						headers: { Authorization: `Bearer ${this.$userInfo.token}` },
					})
					.then((res) => {
						console.log(res.data);
						//console.log(res.data[0].votes);
						if (res.data.length === 0) {
							this.islike = "false";
							this.isdislike = "false";
							this.disab = false;
							this.disabLike = false;
						} else if (res.data[0].votes === 1) {
							this.islike = "true";
							this.disab = true;
						} else if (res.data[0].votes === -1) {
							this.isdislike = "true";
							this.disabLike = true;
						}
					})
					.catch((error) => console.log(error));
			},
		},
		mounted() {
			this.getVoteValue();
			this.getVote();
		},
	};
</script>

<style scoped lang="scss">
	.post_like {
		text-align: right;
		button {
			all: unset;
		}
		.fa-thumbs-up,
		.fa-thumbs-down {
			color: #fd2d01;
			margin: 0 1px 0 10px;
			cursor: pointer;
			transition: 0.5s;
		}
		.animation {
			animation: scaler 0.5s;
			animation-delay: 0.2s;
		}
		.true {
			font-size: 1.5rem;
		}
	}
	@keyframes scaler {
		0% {
			transform: rotate(0);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
