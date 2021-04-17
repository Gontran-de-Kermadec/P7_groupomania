<template>
	<div>
		<Header />
		<div class="flex_container">
			<div v-for="post in singlePost" :key="post.id" class="eachPost">
				<div class="post_header">
					<p>
						Publié par <span class="post_name">{{ post.name }}</span
						>, <span>{{ timePast(post.postDate) }}</span> le
						{{ dateFormat(post.postDate) }}
					</p>
				</div>
				<div class="post_body">
					<p class="postContent">{{ post.postContent }}</p>
					<a :href="post.postUrl" target="_blank">{{ post.postUrl }}</a
					><br />
					<button
						class="anim_btn"
						v-if="userId === post.userId || admin === 1"
						@click="toggleUpdateModal"
					>
						<span>Modifier</span>
					</button>
					<button
						class="anim_btn btn"
						v-if="userId === post.userId || admin === 1"
						@click="toggleModal"
					>
						<span>Supprimer</span>
					</button>
				</div>
				<Vote :postId="postId" />
			</div>
		</div>
		<!-- modal delete post -->
		<transition name="flipinX">
			<div class="modal_container" v-if="isModalOn">
				<div class="modal_delete">
					<p>Vous confirmer la suppression ?</p>
					<button @click="deletePost" class="yes">Oui</button>
					<button @click="toggleModal" class="no">Non</button>
				</div>
			</div>
		</transition>
		<!--modal modif post-->
		<transition name="flipinX">
			<div class="modal_container" v-if="isUpdateModalOn">
				<div class="modal_update">
					<span @click="toggleUpdateModal">X</span>
					<p>Modifiez le commentaire</p>
					<form action="" method="put" @submit.prevent="sendUpdatePost()">
						<textarea
							type="text"
							name="post"
							id="post"
							placeholder="Ecrivez ici...."
							v-model="updatePost"
							required
						></textarea
						><br />
						<input
							type="url"
							name="postUrl"
							id="postUrl"
							v-model="updateUrl"
							placeholder="Placez les liens ici"
						/><br />
						<button type="submit">Modifier</button>
					</form>
				</div>
			</div>
		</transition>
		<Comment :post-id="postId" class="leaveComment" />
	</div>
</template>

<script>
	import Header from "./Header.vue";
	import Comment from "./Comment.vue";
	import Vote from "./Vote.vue";
	import { mapState } from "vuex";
	//const axios = require("axios");
	export default {
		name: "Post",
		components: {
			Header,
			Comment,
			Vote,
		},
		data() {
			return {
				name: this.$userInfo.name,
				postId: parseInt(this.$route.params.id),
				isModalOn: false,
				isUpdateModalOn: false,
				updatePost: "",
				updateUrl: "",
			};
		},
		computed: {
			//...mapState(["isModalOn", "userId", "admin", "singlePost"]),
			...mapState(["userId", "admin", "singlePost"]),
		},
		methods: {
			getOnePost() {
				this.$store.commit("GET_ONE_POST", this.postId);
				this.$store.dispatch("getOnePost");
			},
			deletePost() {
				this.$store.dispatch("deletePost");
			},
			sendUpdatePost() {
				let payload = {
					updatePost: this.updatePost,
					updateUrl: this.updateUrl,
				};
				this.$store.commit("UPDATE_POST", payload);
				this.$store.dispatch("sendUpdatePost");
			},
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
				let daysDiff = Math.floor(calculDays / (1000 * 3600 * 24));
				let hoursDiff = Math.floor(calculDays / (1000 * 3600));
				if (hoursDiff > 24) {
					return `il y a ${daysDiff}j`;
				} else {
					return `il y a ${hoursDiff}h`;
				}
			},
			toggleModal() {
				this.isModalOn = !this.isModalOn;
			},
			toggleUpdateModal() {
				this.isUpdateModalOn = !this.isUpdateModalOn;
			},
		},
		beforeMount() {
			this.$store.dispatch("getUserId");
			this.getOnePost();
		},
	};
</script>

<style scoped lang="scss">
	$primary: #fd2d01;
	$secondary: #ffd7d7;
	.flex_container {
		display: flex;
		justify-content: center;
	}
	.eachPost {
		width: 90vw;
		border-radius: 10px;
		margin: 10px;
		padding: 5px;
		box-shadow: 1px 0px 10px 4px lightgray;
		.post_header {
			border-bottom: solid 2px $secondary;
			.post_name {
				text-transform: capitalize;
				color: $primary;
				font-weight: bolder;
			}
		}
		.post_body {
			.postContent {
				font-size: 1.2rem;
				word-break: break-word;
				margin: 10px 0;
			}
			a {
				color: #00458b;
			}
		}
	}
	.modal_container {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.modal_update,
	.modal_delete {
		position: fixed;
		background: $secondary;
		width: 500px;
		height: auto;
		border-radius: 5px;
		border: solid 1px;
		@media (max-width: 768px) {
			width: 90vw;
		}
		p {
			font-size: 1.5rem;
			margin-bottom: 15px;
			font-weight: bolder;
		}
	}
	.modal_delete {
		padding: 20px;
		transform: translateY(-50%);
		button {
			all: unset;
			cursor: pointer;
			margin: 0 15px;
			padding: 10px;
		}
		.yes {
			background-color: #fff;
			border: solid 1px $primary;
		}
		.no {
			background-color: $primary;
			border: solid 1px $primary;
		}
	}
	.modal_update {
		padding: 10px;
		span {
			position: absolute;
			right: 5px;
			top: 5px;
			background: $primary;
			padding: 7px;
			border-radius: 5px;
			cursor: pointer;
		}
		textarea,
		input {
			all: unset;
			text-align: left;
			word-break: break-all;
			margin: 20px 0;
			border: solid 1px;
			background: #fff;
			width: 100%;
			height: 100px;
		}
		input {
			height: 40px;
		}
		button {
			all: unset;
			background: $primary;
			padding: 10px 15px;
			font-size: 1.3rem;
			cursor: pointer;
		}
	}
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
	//test animation
	.anim_btn {
		all: unset;
		position: relative;
		margin: 0 5px;
		padding: 19px 22px;
		cursor: pointer;
		transition: all 0.2s ease;
		&:before {
			content: "";
			position: absolute;
			top: 10px;
			left: 0;
			display: block;
			border-radius: 28px;
			background: rgba($primary, 0.5);
			width: 40px;
			height: 40px;
			transition: all 0.3s ease;
		}
		span {
			position: relative;
			font-size: 16px;
			font-weight: 900;
			vertical-align: middle;
		}
		&:hover {
			&:before {
				width: 100%;
				background: rgba($primary, 1);
				border: solid 1px;
			}
		}
		&:active {
			transform: scale(0.96);
		}
	}
	.leaveComment {
		margin-top: 20px;
	}
</style>
