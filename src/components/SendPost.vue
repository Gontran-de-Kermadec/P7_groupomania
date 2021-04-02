<template>
	<div class="sendPost_container">
		<button @click="toggleModal" class="create_btn">
			Créer une publication
		</button>
		<transition name="flipinX">
			<div class="modal_container" v-if="isModalOn">
				<!-- <div class="overlay" @click="toggleModal"></div> -->
				<div class="modal_card">
					<span @click="toggleModal">X</span>
					<p>Publiez quelque chose</p>
					<form action="" method="post" @submit.prevent="postData()">
						<textarea
							type="text"
							name="post"
							id="post"
							placeholder="Ecrivez ici...."
							v-model="post"
							required
						></textarea
						><br />
						<input
							type="url"
							name="postUrl"
							id="postUrl"
							v-model="postUrl"
							placeholder="Placez les liens ici"
						/><br />
						<button type="submit">Publier</button>
					</form>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	const axios = require("axios");
	export default {
		name: "SendPost",
		data() {
			return {
				post: "",
				postUrl: "",
				isModalOn: false,
			};
		},
		methods: {
			postData() {
				axios({
					method: "post",
					url: "http://localhost:3000/",
					data: {
						getId: this.$userInfo.userId,
						postName: this.$userInfo.name,
						postContent: this.post,
						postUrl: this.postUrl,
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
			toggleModal() {
				this.isModalOn = !this.isModalOn;
			},
		},
	};
</script>

<style scoped lang="scss">
	$primary: #fd2d01;
	.create_btn {
		background-color: $primary;
		font-size: 1.4rem;
		border: solid 1px;
		padding: 10px 40px;
		cursor: pointer;
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
	}
	.modal_card {
		position: fixed;
		background: #fff;
		width: 500px;
		border: solid 1px;
		border-radius: 5px;
		height: auto;
		padding: 10px;
		@media (max-width: 768px) {
			width: 100vw;
			border: solid 1px;
		}
		p {
			font-weight: bolder;
			font-size: 1.5rem;
		}
		span {
			position: absolute;
			right: 5px;
			top: 5px;
			background: $primary;
			padding: 5px;
		}
		textarea,
		input {
			all: unset;
			text-align: left;
			word-break: break-all;
			margin: 20px 0;
			border: solid 2px #ffd7d7;
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
	//animation modal
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
