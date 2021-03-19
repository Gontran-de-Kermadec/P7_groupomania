<template>
	<div>
		<Header />
		<!-- <p>{{route}} est la bonne</p> -->
		<div class="flex_container">
			<div v-for="post in posts" :key="post.id" class="eachPost">
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
					<button class="cta" v-if="userId === post.userId || admin === 1">
						<span>Modifier</span>
					</button>
					<button
						class="cta btn"
						v-if="userId === post.userId || admin === 1"
						@click="toggleModal"
					>
						<span>Supprimer</span>
					</button>
					<!-- <button v-if="userId === post.userId || admin === 1">Modifier</button> -->
					<!-- <button @click="deletePost" v-if="userId === post.userId || admin === 1">Supprimer</button> -->
					<!-- <button v-if="userId === post.userId || admin === 1" class="btn" @click="toggleModal">Supprimer</button> -->
				</div>
				<Vote :postId="id" />
			</div>
		</div>
		<div class="modal_container" v-if="isModalOn">
			<div class="overlay" @click="toggleModal"></div>
			<div class="modal_card">
				<p>Confirmer la suppression ?</p>
				<button @click="deletePost">Oui</button>
				<button @click="toggleModal">Non</button>
			</div>
		</div>
		<Comment :post-id="id" />
	</div>
</template>

<script>
import Header from "./Header.vue";
import Comment from "./Comment.vue";
import Vote from "./Vote.vue";
import { mapState } from "vuex";
const axios = require("axios");
// let postId = $route.params.id;
//console.log($route.params.id);
//let userInfo = JSON.parse(localStorage.getItem('userInfo'));
//console.log(getToken.token);
//let getId = getToken.userId
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
			userId: this.$userInfo.userId,
			admin: this.$userInfo.admin,
			posts: [],
			id: parseInt(this.$route.params.id),
			isModalOn: false,
			isliked: "false",
			//nbr: 2
		};
	},
	computed: {
		...mapState(["liked"]),
	},
	methods: {
		getMyPost() {
			let stringy = JSON.stringify({ like: this.liked, user: this.userId });
			console.log(stringy);
			axios
				.get(`http://localhost:3000/post/${this.id}`, {
					headers: { Authorization: `Bearer ${this.$userInfo.token}` },
				})
				.then((res) => {
					console.log(res.data);
					this.posts = res.data;
				})
				.catch((error) => console.log(error));
		},
		deletePost() {
			// for (const {id: n} of this.posts) {
			// console.log(n);
			axios
				.delete(`http://localhost:3000/post/${this.id}`, {
					headers: { Authorization: `Bearer ${this.$userInfo.token}` },
				})
				.then((resp) => {
					console.log(resp);
					this.$router.push("/home");
				})
				.catch((error) => console.log(error));
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
			//let currentDateForm = Date.parse(currentDate.toLocaleDateString('fr-FR'));
			let diff = currentDate - pastDate;
			let daysDiff = Math.floor(diff / (1000 * 3600 * 24));
			let hoursDiff = Math.floor(diff / (1000 * 3600));
			//let floorHours = Math.floor(hoursDiff);
			//let floorDays = Math.floor(daysDiff);
			if (hoursDiff > 24) {
				return `il y a ${daysDiff}j`;
			} else {
				return `il y a ${hoursDiff}h`;
			}
		},
		toggleModal() {
			this.isModalOn = !this.isModalOn;
		},
	},
	mounted() {
		this.getMyPost();
	},
};
</script>

<style scoped lang="scss">
$color: #111;
$primary: #fd2d01;
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
		border-bottom: solid 2px #ffd7d7;
		.post_name {
			text-transform: capitalize;
			color: #fd2d01;
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
.overlay {
	background: rgba(0, 0, 0, 0.5);
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
}
.modal_card {
	position: fixed;
	background: #fff;
	width: 500px;
	//height: 200px;
	height: auto;
	padding: 10px;
	animation: fadein 0.5s forwards;
	transform: translateY(-50%);
}
@keyframes fadein {
	0% {
		opacity: 0;
		top: 45%;
	}
	100% {
		opacity: 1;
		top: 50%;
	}
}
//test animation
.cta {
	all: unset;
	position: relative;
	margin: 0 5px;
	padding: 19px 22px;
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
</style>
