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
	import { mapState } from "vuex";
	export default {
		name: "Vote",
		props: {
			postId: Number,
		},
		computed: {
			...mapState([
				"likeCounter",
				"dislikeCounter",
				"islike",
				"isdislike",
				"disabDislike",
				"disabLike",
			]),
		},
		methods: {
			likePost() {
				let liked = document.querySelector("#liked");
				document.querySelector(".fa-thumbs-up").classList.add("animation");
				if (liked.classList.contains("false")) {
					this.$store.commit("ADD_LIKE_POST");
					let payload = "like";
					this.$store.dispatch("sendVoteDb", payload);
				} else if (liked.classList.contains("true")) {
					this.$store.commit("REMOVE_LIKE_POST");
					let payload = "like";
					this.$store.dispatch("sendVoteDb", payload);
				}
			},
			dislikePost() {
				let disliked = document.querySelector("#disliked");
				let animation = document.querySelector(".fa-thumbs-down");
				animation.classList.add("animation");
				if (disliked.classList.contains("false")) {
					this.$store.commit("ADD_DISLIKE_POST");
					let payload = "dislike";
					this.$store.dispatch("sendVoteDb", payload);
				} else if (disliked.classList.contains("true")) {
					this.$store.commit("REMOVE_DISLIKE_POST");
					let payload = "dislike";
					this.$store.dispatch("sendVoteDb", payload);
				}
			},
			//fonction pour maintenir classe sur l'élement au rafraichissement
			getVoteValue() {
				this.$store.dispatch("getVoteValue");
			},
		},
		beforeMount() {
			this.getVoteValue();
		},
		mounted() {
			this.$store.dispatch("getVoteCount");
		},
	};
</script>

<style scoped lang="scss">
	$primary: #fd2d01;
	.post_like {
		text-align: right;
		button {
			all: unset;
		}
		.fa-thumbs-up,
		.fa-thumbs-down {
			color: $primary;
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
