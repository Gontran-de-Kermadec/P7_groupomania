<template>
	<div class="about">
		<Header />
		<div class="home_container">
			<div>
				<div class="flex">
					<p id="username">
						Bonjour <span class="title_name">{{ getStorage() }}</span> !
					</p>
					<SendPost class="sendPost" />
				</div>
				<SearchBar class="searchBar" />
				<div v-for="post in allPosts" :key="post.id" class="eachPost">
					<router-link :to="{ name: 'Post', params: { id: post.id } }">
						<div class="post_header">
							<p>
								Publié par <span class="post_name">{{ post.name }}</span
								>, <span>{{ timePast(post.postDate) }}</span> le
								{{ dateFormat(post.postDate) }}
							</p>
						</div>
						<div class="post_body">
							<p class="postContent">{{ post.postContent }}</p>
						</div>
						<div class="post_like">
							<i class="far fa-thumbs-up"></i><span>{{ post.likes }}</span>
							<i class="far fa-thumbs-down"></i><span>{{ post.dislikes }}</span>
						</div>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	//import Fuse from "fuse.js";
	import Header from "../components/Header.vue";
	import SendPost from "../components/SendPost.vue";
	import SearchBar from "../components/SearchBar.vue";
	//import Vote from '../components/Vote.vue'
	//import GetAllPosts from '../components/GetAllPosts.vue'
	import { mapState } from "vuex";
	export default {
		name: "Home",
		components: {
			Header,
			SendPost,
			SearchBar,
			//Vote
			// GetAllPosts
		},
		data() {
			return {
				isModalOn: false,
			};
		},
		computed: {
			...mapState(["allPosts"]),
		},
		methods: {
			getStorage() {
				let getId = JSON.parse(localStorage.getItem("userInfo"));
				return getId.name;
			},
			getAllPosts() {
				this.$store.dispatch("getAllPosts");
				console.log(this.$route);
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
				//let pastDateForm = Date.parse(pastDate.toLocaleDateString('fr-FR'));
				const currentDate = new Date();
				//let currentDateForm = Date.parse(currentDate.toLocaleDateString('fr-FR'));
				let diff = currentDate - pastDate;
				let daysDiff = diff / (1000 * 3600 * 24);
				let hoursDiff = diff / (1000 * 3600);
				let floorHours = Math.floor(hoursDiff);
				let floorDays = Math.floor(daysDiff);
				if (hoursDiff > 24) {
					return `il y a ${floorDays}j`;
				} else {
					return `il y a ${floorHours}h`;
				}
			},
		},
		mounted() {
			this.getAllPosts();
		},
	};
</script>

<style scoped lang="scss">
	.home_container {
		display: flex;
		justify-content: center;
		.flex {
			@media (min-width: 1024px) {
				display: flex;
				justify-content: space-around;
				align-items: center;
			}
		}
		.title_name {
			text-transform: capitalize;
		}
		#username {
			padding: 15px 0 5px 0;
			font-size: 1.2rem;
			font-weight: bolder;
			@media (min-width: 1024px) {
				font-size: 1.5rem;
				width: 200px;
			}
		}
		.sendPost {
			margin: 30px 0;
			@media (min-width: 1024px) {
			}
		}
		.eachPost {
			width: 90vw;
			border-radius: 10px;
			margin: 10px;
			padding: 5px;
			box-shadow: 1px 0px 10px 4px lightgray;
			transition: 0.5s;
			@media (min-width: 768px) {
				width: 60vw;
			}
			.post_header {
				border-bottom: solid 2px #ffd7d7;
				.post_name {
					text-transform: capitalize;
					color: #fd2d01;
					font-weight: bolder;
				}
			}
			.post_body {
				padding: 20px 0;
			}
			.post_like {
				text-align: right;
				.fa-thumbs-up,
				.fa-thumbs-down {
					color: #fd2d01;
					margin: 0 1px 0 10px;
				}
			}
			.postContent {
				font-size: 1.2rem;
				word-break: break-word;
			}
			&:hover {
				transform: scale(1.1);
			}
		}
	}
</style>
