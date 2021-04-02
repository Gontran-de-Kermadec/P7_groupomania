<template>
	<div>
		<button @click="toggleModal" class="create_btn">
			Laisser un commentaire
		</button>
		<transition name="flipinX">
			<div class="modal_container" v-if="isModalOn">
				<div class="modal_card">
					<span @click="toggleModal">X</span>
					<p>Votre commentaire</p>
					<form action="" method="post" @submit.prevent="sendComment()">
						<textarea
							type="text"
							name="post"
							id="post"
							placeholder="Commentez..."
							v-model="post"
						></textarea
						><br />
						<button type="submit">Commenter</button>
					</form>
				</div>
			</div>
		</transition>
		<div class="comment_container">
			<div class="comment_subcontainer">
				<p>Commentaires</p>
				<div v-for="comment in comments" :key="comment.id" class="eachComment">
					<div class="comment_header">
						<p>
							Commentaire de <span class="comment_name">{{ comment.name }}</span
							>, <span>{{ timePast(comment.commentDate) }}</span> le
							{{ dateFormat(comment.commentDate) }}
						</p>
					</div>
					<div class="comment_body">
						<p class="commentContent">{{ comment.comment }}</p>
					</div>
					<div class="comment_separate"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	const axios = require("axios");
	export default {
		name: "Comment",
		props: {
			postId: Number,
		},
		data() {
			return {
				post: "",
				comments: [],
				id: this.postId,
				isModalOn: false,
			};
		},
		methods: {
			sendComment() {
				axios({
					method: "post",
					url: "http://localhost:3000/comment",
					data: {
						userId: this.$userInfo.userId,
						commentName: this.$userInfo.name,
						postId: this.id,
						commentContent: this.post,
					},
					headers: {
						Authorization: `Bearer ${this.$userInfo.token}`,
					},
				})
					.then((resp) => {
						console.log(resp);
						document.location.reload();
					})
					.catch((error) => console.log(error));
			},
			getComment() {
				axios
					.get(`http://localhost:3000/comment/${this.postId}`, {
						headers: { Authorization: `Bearer ${this.$userInfo.token}` },
					})
					.then((res) => {
						console.log(res.data);
						this.comments = res.data;
					})
					.catch((error) => console.log(error));
			},
			toggleModal() {
				this.isModalOn = !this.isModalOn;
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
		},
		mounted() {
			this.getComment();
		},
	};
</script>

<style scoped lang="scss">
	$primary: #fd2d01;
	.flipinX-enter-active {
		animation: flipin 0.5s;
	}
	.flipinX-leave-active {
		animation: flipout 0.5s;
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
	.modal_card {
		position: fixed;
		background: #fff;
		width: 500px;
		border: solid 1px;
		border-radius: 5px;
		height: auto;
		padding: 20px 0;
		@media (max-width: 768px) {
			width: 100vw;
			border: solid 1px;
		}
		span {
			position: absolute;
			right: 10px;
			top: 5px;
			border-radius: 5px;
			background: $primary;
			padding: 7px;
			cursor: pointer;
		}
		p {
			font-weight: bolder;
			font-size: 1.5rem;
		}
		textarea {
			all: unset;
			text-align: left;
			word-break: break-all;
			margin: 20px 0;
			border-bottom: solid 2px #ffd7d7;
			border-top: solid 2px #ffd7d7;
			width: 100%;
			height: 100px;
		}
		button {
			all: unset;
			background: $primary;
			padding: 10px 15px;
			font-size: 1.3rem;
			cursor: pointer;
		}
	}
	.create_btn {
		width: 90vw;
		background-color: $primary;
		font-size: 1.4rem;
		border: solid 1px;
		padding: 10px;
		cursor: pointer;
		@media (min-width: 768px) {
			width: 50vw;
		}
	}
	.comment_container {
		display: flex;
		justify-content: center;
		padding: 10px 0;
		.comment_subcontainer {
			text-align: left;
		}
		.eachComment {
			border-left: solid $primary;
			width: 90vw;
			padding: 11px 11px 0 11px;
			.comment_header,
			.comment_body {
				margin: 15px 0;
			}
		}
		.comment_header {
			font-size: 0.8rem;
			.comment_name {
				text-transform: capitalize;
				color: $primary;
			}
		}
		.commentContent {
			font-size: 1.2rem;
		}
		.fa-thumbs-up,
		.fa-thumbs-down {
			color: $primary;
			margin: 0 1px 0 10px;
		}
		.comment_separate {
			position: relative;
			left: 50%;
			transform: translateX(-50%);
			background: #000;
			width: 70%;
			height: 0.5px;
			margin-top: 25px;
		}
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
