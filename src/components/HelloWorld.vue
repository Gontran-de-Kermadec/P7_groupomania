<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <form>
      <label for="name">Nom:</label>
      <input type="text" name="name" id="name" v-model="name" required/>
      <label for="email">Email:</label>
      <input type="email" name="email" id="email" v-model="email"/>
      <label for="password">Mot de passe:</label>
      <input type="password" name="password" id="password" v-model="password"/>
      <button type="submit" @click="postThing">S'incrire</button>
    </form>
    <p>{{ name }}, {{ email }},  {{ password }}</p>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router" target="_blank" rel="noopener">router</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
  </div>
</template>

<script>
const axios = require('axios');
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    postThing() {
      axios({
        method: 'post',
        url: 'http://localhost:3000/signup/',
        data: {
            name: this.name,
            email: this.email,
            password: this.password
        }
      })
      .then((response) => {
          console.log(response);
      })
      .catch((error) => console.log(error));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
