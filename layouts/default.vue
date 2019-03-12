<template>
  <div id="wrapper" class="d-flex" :class="{ toggled }">
    <!-- Sidebar -->
    <div id="sidebar-wrapper" class="bg-light">
      <div class="list-group list-group-flush">
        <nuxt-link
          v-for="item in nav"
          :key="item.link"
          :to="item.link"
          class="list-group-item list-group-item-action list-group-item-light"
          exact
        >
          {{ item.content }}
        </nuxt-link>
      </div>
    </div>
    <!-- /#sidebar-wrapper -->
    <!-- Page Content -->
    <div id="page-content-wrapper">
      <!-- Navigation -->
      <nav
        id="nav"
        class="navbar navbar-expand-lg navbar-light bg-light border-bottom fixed-top"
      >
        <span class="navbar-toggler-icon mx-1 px-3" @click="toggleNav" />
        <a class="navbar-brand" href="/">PocketPasta</a>
      </nav>

      <div class="container">
        <nuxt />
      </div>
    </div>
    <!-- /#page-content-wrapper -->
  </div>
  <!-- /#wrapper -->
</template>

<script>
export default {
  data() {
    return {
      toggled: false,
      nav: [
        {
          link: '/',
          content: 'Home',
        },
        {
          link: '/about',
          content: 'About',
        },
        {
          link: '/newsletter',
          content: 'Newsletter',
        },
        {
          link: '/recipes',
          content: 'Recipes',
        },
      ],
    };
  },
  methods: {
    toggleNav(event) {
      event.preventDefault();
      this.toggled = !this.toggled;
    },
  },
};
</script>

<style>
.nuxt-link-active {
  color: #59ecc0;
}

body {
  overflow-x: hidden;
  padding-top: 56px;
}

#sidebar-wrapper {
  min-height: 100vh;
  margin-left: -15rem;
  -webkit-transition: margin 0.25s ease-out;
  -moz-transition: margin 0.25s ease-out;
  -o-transition: margin 0.25s ease-out;
  transition: margin 0.25s ease-out;
}

#sidebar-wrapper .sidebar-heading {
  padding: 0.875rem 1.25rem;
  font-size: 1.2rem;
}

#sidebar-wrapper .list-group {
  width: 15rem;
}

#page-content-wrapper {
  min-width: 100vw;
}

#wrapper.toggled #sidebar-wrapper {
  margin-left: 0;
  /* Set border when displayed, leaving border on while hidden makes viewport 1px too large */
  border-right: 1px solid #dee2e6;
}

@media (min-width: 768px) {
  #sidebar-wrapper {
    margin-left: 0;
    /* Set border when displayed, leaving border on while hidden makes viewport 1px too large */
    border-right: 1px solid #dee2e6;
  }

  #page-content-wrapper {
    min-width: 0;
    width: 100%;
  }

  #wrapper.toggled #sidebar-wrapper {
    margin-left: -15rem;
  }
}
</style>
