<template>
	<div>
		<!--composant barre de recherche-->
		<div class="relative">
			<div class="search_container">
				<input
					placeholder="Cherchez une publication"
					type="search"
					name="searchbar"
					id="searchbar"
					v-model="query"
					@focus="searchVisible = true"
					@keydown="searchPost"
					@blur="searchVisible = false"
				/>
				<div class="fas_container">
					<i class="fas fa-search"></i>
				</div>
			</div>

			<div class="absolute" v-if="query.length > 0 && searchVisible">
				<div class="result" v-for="post in searchResults" :key="post.item.id">
					<router-link
						:to="{ name: 'Post', params: { id: post.item.id } }"
						@mousedown.prevent.native="searchVisible = true"
					>
						<p class="name">{{ post.item.name }}</p>
						<p class="content">{{ post.item.postContent }}</p>
					</router-link>
				</div>
				<div class="result" id="no_result" v-if="searchResults.length === 0">
					<p>Pas de résultats pour {{ query }}</p>
				</div>
			</div>
		</div>
		<!--composant barre de recherche-->
	</div>
</template>

<script>
	import Fuse from "fuse.js";
	import { mapState } from "vuex";
	export default {
		name: "SearchBar",
		data() {
			return {
				query: "",
				searchVisible: false,
				searchResults: [],
				options: {
					includeMatches: true,
					shouldSort: true,
					threshold: 0.4,
					minMatchCharLength: 2,
					keys: ["name", "postContent"],
				},
			};
		},
		computed: {
			...mapState(["allPosts"]),
		},
		methods: {
			searchPost() {
				console.log(this.allPosts);
				const fuse = new Fuse(this.allPosts, this.options);
				const pattern = this.query;
				this.searchResults = fuse.search(pattern);
				console.log(this.searchResults[0]);
			},
		},
	};
</script>

<style lang="scss" scoped>
	$primary: #fd2d01;
	.relative {
		position: relative;
		padding: 20px 0;
		.search_container {
			position: relative;
			.fas_container {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				font-size: 1rem;
				left: 26%;
				width: 20px;
				@media (max-width: 768px) {
					left: 2%;
					width: 20px;
				}
				@media (min-width: 768px) and (max-width: 1024px) {
					left: 12%;
				}
			}
			input {
				all: unset;
				width: 50%;
				height: 40px;
				border: solid $primary;
				@media (max-width: 768px) {
					width: 100%;
				}
				@media (min-width: 768px) and (max-width: 1024px) {
					width: 80%;
				}
			}
		}
		.absolute {
			position: absolute;
			left: 50%;
			top: 70px;
			transform: translateX(-50%);
			border: solid $primary;
			background: #fff;
			width: 60%;
			z-index: 100;
			@media (max-width: 768px) {
				width: 100%;
			}
		}
		.result {
			border-bottom: solid 1px $primary;
			padding: 10px 0;
			&:hover {
				background: #ffd7d7;
			}
		}
		#no_result {
			background: transparent;
			&:hover {
				background: transparent;
			}
		}
		.name {
			text-transform: capitalize;
			font-size: 1.3rem;
			font-weight: bolder;
		}
		.content {
			word-break: break-word;
		}
	}
</style>
