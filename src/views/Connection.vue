<template>
	<div class="home">
		<Header />
		<Login />
		<div class="signupBtn">
			<p>Si vous n'avez pas encore de compte</p>
			<router-link to="/signup">S'inscrire</router-link>
		</div>
	</div>
</template>

<script>
	import Login from "@/components/Login.vue";
	import Header from "@/components/Header.vue";

	export default {
		name: "Connection",
		components: {
			Login,
			Header,
		},
	};
</script>

<style scoped lang="scss">
	.signupBtn {
		margin-top: 50px;
		a {
			color: #000;
		}
		p {
			margin-bottom: 10px;
		}
	}
</style>
