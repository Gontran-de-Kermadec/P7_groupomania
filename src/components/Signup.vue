<template>
	<div class="hello">
		<Header />
		<h1>Veuillez vous inscrire</h1>
		<form @submit.prevent="postThing()">
			<label for="name">Nom</label><br />
			<input type="text" name="name" id="name" v-model="name" required /><br />
			<label for="email">Email</label><br />
			<input
				type="email"
				name="email"
				id="email"
				v-model="email"
				required
			/><br />
			<label for="password">Mot de passe</label><br />
			<input
				type="password"
				name="password"
				id="password"
				v-model="password"
				required
			/><br />
			<p class="invalidInput">{{ invalidInput }}</p>
			<button type="submit" class="btn">S'incrire</button>
		</form>
		<div class="loginBtn">
			<p>Si vous avez déjà un compte</p>
			<router-link to="/">Login</router-link>
		</div>
	</div>
</template>

<script>
	import Header from "./Header.vue";
	const axios = require("axios");

	export default {
		name: "Signup",
		components: {
			Header,
		},
		data() {
			return {
				name: "",
				email: "",
				password: "",
				invalidInput: "",
			};
		},
		methods: {
			postThing() {
				let regexName = /^[A-Za-z'\s.-]+$/;
				let regexEmail = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
				let passwordLength = 8;
				if (this.password.length < passwordLength) {
					this.invalidInput =
						"Le mot de passe nécessite au moins 8 caractères !";
				} else {
					if (regexEmail.test(this.email) && regexName.test(this.name)) {
						axios({
							method: "post",
							url: "http://localhost:3000/signup/",
							data: {
								name: this.name,
								email: this.email,
								password: this.password,
							},
						})
							.then((response) => {
								console.log(response);
								if (response.status === 201) {
									this.$router.push("/");
								}
							})
							.catch((error) => {
								this.invalidInput = error.response.data;
							});
					} else {
						console.log("Format champ incorrect");
					}
				}
			},
		},
	};
</script>

<style scoped lang="scss">
	$primary: #fd2d01;
	h1 {
		margin-bottom: 30px;
	}
	input {
		font-size: large;
	}
	.btn {
		background: $primary;
		border: none;
		font-size: large;
		cursor: pointer;
	}
	input,
	.btn {
		width: 300px;
		height: 50px;
		margin-bottom: 20px;
		@media (min-width: 550px) {
			width: 500px;
		}
		@media (min-width: 1024px) {
			width: 700px;
		}
	}
	.invalidInput {
		color: $primary;
		margin-bottom: 10px;
	}
	.loginBtn {
		a {
			color: #000;
		}
		p {
			margin-bottom: 10px;
		}
	}
</style>
