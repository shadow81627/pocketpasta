<template>
  <div>
    <!-- Navigation -->
    <nav
      id="nav"
      class="navbar navbar-expand-lg navbar-light bg-light border-bottom sticky-top"
    >
      <span class="navbar-toggler-icon mx-1 px-3" @click="toggleNav" />
      <a class="navbar-brand mr-auto" href="/">
        <img
          src="/images/icons/icon-32x32.png"
          width="32"
          height="32"
          class="d-inline-block align-top rounded"
          alt="PocketPasta"
        />
        <span class="mx-1">PocketPasta</span>
      </a>
    </nav>
    <div id="wrapper" class="d-flex" :class="{ toggled }">
      <!-- Sidebar -->
      <div id="sidebar-wrapper" class="bg-light">
        <div class="list-group list-group-flush $sticky-top">
          <nuxt-link
            v-for="item in nav"
            :key="item.link"
            :to="item.link"
            class="list-group-item list-group-item-action list-group-item"
            exact
          >
            {{ item.label }}
          </nuxt-link>
        </div>
      </div>
      <!-- /#sidebar-wrapper -->
      <!-- Page Content -->
      <div id="page-content-wrapper">
        <div class="container">
          <nuxt />
        </div>
      </div>
      <!-- /#page-content-wrapper -->
    </div>
    <!-- /#wrapper -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      toggled: false,
      nav: [
        {
          link: '/',
          label: 'Home',
        },
        {
          link: '/about',
          label: 'About',
        },
        {
          link: '/newsletter',
          label: 'Newsletter',
        },
        {
          link: '/recipes',
          label: 'Recipes',
        },
        {
          link: '/settings',
          label: 'Settings',
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
  head() {
    return {
      link: [this.$store.getters.getCurrentTheme()],
    };
  },
};
</script>

<style>
.nuxt-link-active {
  color: #59ecc0;
}

body {
  overflow-x: hidden;
  /* padding-top: 67px; */
  /* padding-top: 4.5rem; */
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
