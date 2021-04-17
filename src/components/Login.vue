<template>
	<div>
		<h1>Veuillez vous connecter</h1>
		<form @submit.prevent="postLogin()">
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
			<p class="unknown">{{ incorrect }}</p>
			<button type="submit" class="btn">Se connecter</button>
		</form>
	</div>
</template>

<script>
	import { apiCall } from "../axios";
	export default {
		name: "Login",
		data() {
			return {
				email: "",
				password: "",
				incorrect: "",
			};
		},
		methods: {
			isLogged() {
				if (localStorage.getItem("userInfo") !== null) {
					this.$router.push("/home");
				}
			},
			postLogin() {
				let regexEmail = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
				if (regexEmail.test(this.email)) {
					apiCall
						.post("/login/", {
							email: this.email,
							password: this.password,
						})
						.then((resp) => {
							console.log(resp.data);
							console.log(resp.status);
							if (resp.status === 200) {
								localStorage.setItem("userInfo", JSON.stringify(resp.data));
								window.location = "http://localhost:8080/home";
							} else if (resp.status === 404) {
								console.log(resp);
							}
						})
						.catch((error) => {
							console.log(error);
							this.incorrect = "Email inconnu ou mot de passe incorrect";
						});
				} else {
					console.log("probleme mot de passe ou mail");
				}
			},
		},
		mounted() {
			this.isLogged();
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
	.unknown {
		color: $primary;
		margin-bottom: 10px;
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
</style>
