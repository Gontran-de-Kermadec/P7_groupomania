<template>
	<div>
		<img src="../assets/logos/icon-above-font.svg" alt="Logo entreprise" />
		<div v-if="loggedIn" class="home">
			<!-- <router-link to="/home">Page d'accueil</router-link> -->
			<router-link to="/home" aria-label="page d'accueil"
				><i class="fas fa-home"></i
			></router-link>
			<router-link to="/profil" aria-label="profil"
				><i class="fas fa-user-circle"></i
			></router-link>
		</div>
		<div v-if="loggedIn" class="logout">
			<!-- <button @click="disconnect">Deconnexion</button> -->
			<p @click="logOut">Déconnexion</p>
		</div>
		<h1 v-if="loggedIn">
			Votre réseau social en entreprise !
		</h1>
	</div>
</template>

<script>
	console.log(localStorage.getItem("userInfo"));
	import { mapState } from "vuex";
	export default {
		name: "Header",
		// data() {
		//     return {
		//         loggedIn: true
		//     }
		// },
		computed: {
			...mapState(["loggedIn"]),
		},
		methods: {
			isLoggedIn() {
				this.$store.commit("CHANGE_LOG");
			},
			logOut() {
				localStorage.removeItem("userInfo");
				window.location = "http://localhost:8080/";
			},
		},
		beforeMount() {
			this.isLoggedIn();
		},
	};
</script>

<style scoped lang="scss">
	div {
		position: relative;
	}
	img {
		width: auto;
		height: 200px;
	}
	h1 {
		padding: 0 0 10px 0;
	}
	.logout {
		position: absolute;
		right: 0;
		top: 5px;
		color: #fd2d01;
		font-weight: bolder;
		@media (min-width: 768px) {
			top: 40%;
			transform: translateY(-50%);
			right: 15px;
		}
		p {
			transition: 0.5s;
			cursor: pointer;
			@media (min-width: 768px) {
				font-size: 1.2rem;
			}
			&:hover {
				transform: scale(1.2);
			}
		}
	}
	.home {
		position: absolute;
		left: 0;
		top: 15px;
		transform: translateY(-50%);
		@media (min-width: 768px) {
			left: 50px;
			top: 40%;
			transform: translateY(-50%);
		}
		a {
			color: #fd2d01;
			font-size: 1.3rem;
			margin: 5px;
			@media (min-width: 768px) {
				font-size: 2rem;
				margin: 20px;
			}
		}
		.fa-home,
		.fa-user-circle {
			transition: 0.5s;
			&:hover {
				transform: scale(1.2);
			}
		}
	}
</style>
