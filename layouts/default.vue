<template>
  <div class="d-flex" id="wrapper" :class="{ toggled }">
    <!-- Sidebar -->
    <div class="bg-light border-right" id="sidebar-wrapper">
      <div class="sidebar-heading">PocketPasta</div>
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
        class="navbar navbar-expand-lg navbar-light bg-light border-bottom"
      >
        <button
          class="navbar-toggler"
          id="menu-toggle"
          @click="toggleNav"
          aria-label="Toggle navigation"
          style="display: block;"
        >
          <span class="navbar-toggler-icon" />
        </button>
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
}

@media (min-width: 768px) {
  #sidebar-wrapper {
    margin-left: 0;
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
