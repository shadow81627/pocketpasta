<template>
  <div id="app">
    <!-- Navigation -->
    <nav id="nav" class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <nuxt-link to="/" class="navbar-brand" exact>
          PocketPasta
        </nuxt-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <nuxt-link to="/" tag="li" class="nav-item" exact>
              <a class="nav-link">
                Home<span class="sr-only">(current)</span>
              </a>
            </nuxt-link>
            <nuxt-link tag="li" to="/about" class="nav-item">
              <a class="nav-link">About</a>
            </nuxt-link>
            <nuxt-link tag="li" to="/newsletter" class="nav-item">
              <a class="nav-link">Newsletter</a>
            </nuxt-link>
            <nuxt-link tag="li" to="/recipes" class="nav-item" exact>
              <a class="nav-link">Recipes</a>
            </nuxt-link>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Page Content -->
    <div class="container">
      <nuxt />
    </div>
  </div>
</template>

<style>
body {
  /* font-family: 'Lato', 'sans-serif'; */
  padding-top: 56px;
}

.nuxt-link-active {
  color: #59ecc0;
}
</style>
