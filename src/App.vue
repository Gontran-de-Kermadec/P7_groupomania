<template>
	<div id="app">
		<router-view />
	</div>
</template>

<style lang="scss">
	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
	a {
		text-decoration: none;
		color: #000;
	}
	$title-color: #fd2d01;
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
	}
</style>
