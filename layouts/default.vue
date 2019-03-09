<template>
  <div id="app">
    <div id="nav">
      <nuxt-link to="/" exact>Home</nuxt-link>|
      <nuxt-link to="/about">About</nuxt-link>|
      <nuxt-link to="/newsletter">Newsletter</nuxt-link>|
      <nuxt-link to="/recipes" exact>Recipes</nuxt-link>
    </div>
    <nuxt />
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

a {
  font-weight: bold;
  color: #2c3e50;
}

.nuxt-link-active {
  color: #59ecc0;
}
</style>
