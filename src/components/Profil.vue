<template>
	<div class="profil">
		<Header />
		<div class="data_container">
			<div class="data_account">
				<p>{{ name }}</p>
				<button @click="toggleModal">Supprimer compte</button>
			</div>
			<transition name="flipinX">
				<div class="modal_container" v-if="isModalOn">
					<div class="modal_card">
						<p>Vous confirmez la suppression ?</p>
						<button @click="deleteUser" class="yes">Oui</button>
						<button @click="toggleModal" class="no">Non</button>
					</div>
				</div>
			</transition>
			<div class="data_post">
				<div class="container">
					<SendPost />
					<p class="title">Vos publications</p>
					<div v-for="post in myPosts" :key="post.id" class="onePost">
						<router-link :to="{ name: 'Post', params: { id: post.id } }">
							<div class="post_header">
								<p>
									Publié {{ timePast(post.postDate) }},le
									{{ dateFormat(post.postDate) }}
								</p>
							</div>
							<div class="post_body">
								<p class="postContent">{{ post.postContent }}</p>
							</div>
							<div class="post_like">
								<i class="far fa-thumbs-up"></i><span>{{ post.likes }}</span>
								<i class="far fa-thumbs-down"></i
								><span>{{ post.dislikes }}</span>
							</div>
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from "./Header";
	import SendPost from "./SendPost.vue";
	//const axios = require("axios");
	//import axiosUrl from "../../axios_config";
	import { mapState } from "vuex";
	export default {
		name: "Profil",
		components: {
			Header,
			SendPost,
		},
		data() {
			return {
				name: this.$userInfo.name,
				//posts: [],
				isModalOn: false,
			};
		},
		computed: {
			//...mapState(["isModalOn", "userId", "myPosts"]),
			...mapState(["userId", "myPosts"]),
		},
		methods: {
			// deletePost() {
			// 	for (const { id: n } of this.posts) {
			// 		console.log(n);
			// 		axios
			// 			.delete(`http://localhost:3000/post/${n}`, {
			// 				headers: { Authorization: `Bearer ${this.$userInfo.token}` },
			// 			})
			// 			.then((resp) => {
			// 				console.log(resp);
			// 			})
			// 			.catch((error) => console.log(error));
			// 	}
			// },
			deleteUser() {
				this.$store.dispatch("deleteUser");
				// axios
				// 	.delete(`http://localhost:3000/${this.$userInfo.userId}`, {
				// 		headers: { Authorization: `Bearer ${this.$userInfo.token}` },
				// 	})
				// 	.then((resp) => {
				// 		console.log(resp);
				// 	})
				// 	.catch((error) => console.log(error));
				// localStorage.removeItem("userInfo");
				// window.location = "http://localhost:8080/";
			},
			// getMyPosts() {
			// 	console.log(this.$getBaseUrl);
			// 	//axios
			// 	axiosUrl
			// 		//.get(`http://localhost:3000/${this.$userInfo.userId}`, {
			// 		.get(`${this.$userInfo.userId}`, {
			// 			headers: { Authorization: `Bearer ${this.$userInfo.token}` },
			// 		})
			// 		.then((res) => {
			// 			console.log(res.data[0]);
			// 			this.posts = res.data;
			// 			localStorage.setItem("postInfo", JSON.stringify(res.data));
			// 		})
			// 		.catch((error) => console.log(error));
			// },
			dateFormat(date) {
				const event = new Date(date);
				const options = {
					year: "numeric",
					month: "long",
					day: "numeric",
					hour: "numeric",
					minute: "numeric",
				};
				return event.toLocaleDateString("fr-FR", options);
			},
			timePast(date) {
				const pastDate = new Date(date);
				const currentDate = new Date();
				let calculDays = currentDate - pastDate;
				let hoursDiff = calculDays / (1000 * 3600);
				let floorHours = Math.floor(calculDays / (1000 * 3600));
				let floorDays = Math.floor(calculDays / (1000 * 3600 * 24));
				if (hoursDiff > 24) {
					return `il y a ${floorDays}j`;
				} else {
					return `il y a ${floorHours}h`;
				}
			},
			toggleModal() {
				this.isModalOn = !this.isModalOn;
			},
		},
		mounted() {
			//this.getMyPosts();
			this.$store.dispatch("getMyPosts");
		},
	};
</script>

<style scoped lang="scss">
	$primary: #fd2d01;
	$secondary: #ffd7d7;
	.data_container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-top: 25px;
		@media (min-width: 768px) {
			flex-direction: row;
			justify-content: left;
		}
	}
	.data_account {
		@media (max-width: 768px) {
			margin: 0 0 30px 0;
		}
		@media (min-width: 768px) {
			border-right: solid $primary;
			width: 20%;
		}
		p {
			text-transform: capitalize;
			font-size: 1.5rem;
			margin-bottom: 10px;
		}
		button {
			all: unset;
			border: solid 1px;
			background-color: $primary;
			padding: 10px;
			cursor: pointer;
		}
	}
	.modal_container {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		.modal_card {
			position: fixed;
			background: $secondary;
			width: 500px;
			border: solid 1px;
			border-radius: 5px;
			height: auto;
			padding: 20px;
			@media (max-width: 768px) {
				width: 100vw;
				border: solid 1px;
			}
			p {
				font-size: 1.5rem;
				margin-bottom: 15px;
			}
			button {
				all: unset;
				margin: 0 15px;
				padding: 10px 15px;
				cursor: pointer;
			}
			.yes {
				border: solid 1px $primary;
				background: #fff;
			}
			.no {
				border: solid 1px $primary;
				background-color: $primary;
			}
		}
	}
	.data_post {
		display: flex;
		justify-content: center;
		@media (min-width: 768px) {
			width: 80%;
		}
		.title {
			font-size: 2rem;
			margin: 15px 0;
		}
	}
	.onePost {
		width: 90vw;
		border-radius: 10px;
		margin: 10px;
		padding: 5px;
		box-shadow: 1px 0px 10px 4px lightgray;
		word-break: break-all;
		transition: 0.5s;
		@media (min-width: 768px) {
			width: 50vw;
		}
		.post_header {
			border-bottom: solid 2px #ffd7d7;
			.post_name {
				text-transform: capitalize;
				color: $primary;
				font-weight: bolder;
			}
		}
		.post_body {
			padding: 20px 0;
		}
		.postContent {
			font-size: 1.2rem;
			word-break: break-word;
		}
		.post_like {
			text-align: right;
			.fa-thumbs-up,
			.fa-thumbs-down {
				color: $primary;
				margin: 0 1px 0 10px;
			}
		}
		&:hover {
			transform: scale(1.1);
		}
	}
	//animation au clic sur btn supprimer
	.flipinX-enter-active {
		animation: flipin 0.5s;
	}
	.flipinX-leave-active {
		animation: flipout 0.5s;
	}
	@keyframes flipin {
		0% {
			transform: perspective(400px) rotateX(90deg);
			opacity: 0;
		}
		100% {
			transform: perspective(400px) rotateX(0deg);
			opacity: 1;
		}
	}
	@keyframes flipout {
		0% {
			transform: perspective(400px) rotateX(0deg);
			opacity: 1;
		}
		100% {
			transform: perspective(400px) rotateX(90deg);
			opacity: 0;
		}
	}
</style>
