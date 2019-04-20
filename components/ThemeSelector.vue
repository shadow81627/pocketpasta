<template>
  <form
    @submit.prevent="
      $auth.$storage.setUniversal('theme', $store.state.theme, true)
    "
  >
    <h1>Settings</h1>
    <div class="form-group">
      <label for="theme">Select a theme</label>
      <select
        id="theme"
        v-model="currentTheme"
        name="theme"
        class="form-control"
      >
        <option disabled value="">Please select a theme</option>
        <option
          v-for="theme in themes"
          :key="theme.value"
          :value="theme.value"
          class="form-control"
        >
          {{ theme.value }}
        </option>
      </select>
    </div>
    <button class="btn btn-primary">
      Save theme
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      themes: [
        {
          dark: false,
          value: 'default',
          href:
            'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
        },
        {
          dark: false,
          value: 'cerulean',
          href: 'https://bootswatch.com/4/cerulean/bootstrap.min.css',
        },
        {
          dark: false,
          value: 'cosmo',
          href: 'https://bootswatch.com/4/cosmo/bootstrap.min.css',
        },
        {
          dark: true,
          value: 'cyborg',
          href: 'https://bootswatch.com/4/cyborg/bootstrap.min.css',
        },
        {
          dark: true,
          value: 'darkly',
          href: 'https://bootswatch.com/4/darkly/bootstrap.min.css',
        },
        {
          dark: false,
          value: 'flatly',
          href: 'https://bootswatch.com/4/flatly/bootstrap.min.css',
        },
        {
          dark: false,
          value: 'journal',
          href: 'https://bootswatch.com/4/journal/bootstrap.min.css',
        },
        {
          dark: false,
          value: 'litera',
          href: 'https://bootswatch.com/4/litera/bootstrap.min.css',
        },
        {
          dark: false,
          value: 'lumen',
          href: 'https://bootswatch.com/4/lumen/bootstrap.min.css',
        },
        {
          dark: false,
          value: 'lux',
          href: 'https://bootswatch.com/4/lux/bootstrap.min.css',
        },
        {
          dark: false,
          value: 'materia',
          href: 'https://bootswatch.com/4/materia/bootstrap.min.css',
        },
        {
          dark: false,
          value: 'minty',
          href: 'https://bootswatch.com/4/minty/bootstrap.min.css',
        },
        {
          dark: false,
          value: 'pulse',
          href: 'https://bootswatch.com/4/pulse/bootstrap.min.css',
        },
        {
          dark: false,
          value: 'sandstone',
          href: 'https://bootswatch.com/4/sandstone/bootstrap.min.css',
        },
        {
          dark: false,
          value: 'simplex',
          href: 'https://bootswatch.com/4/simplex/bootstrap.min.css',
        },
        {
          dark: false,
          value: 'sketchy',
          href: 'https://bootswatch.com/4/sketchy/bootstrap.min.css',
        },
        {
          dark: false,
          value: 'slate',
          href: 'https://bootswatch.com/4/slate/bootstrap.min.css',
        },
        {
          dark: false,
          value: 'solar',
          href: 'https://bootswatch.com/4/solar/bootstrap.min.css',
        },
        {
          dark: false,
          value: 'spacelab',
          href: 'https://bootswatch.com/4/spacelab/bootstrap.min.css',
        },
        {
          dark: false,
          value: 'superhero',
          href: 'https://bootswatch.com/4/superhero/bootstrap.min.css',
        },
        {
          dark: false,
          value: 'united',
          href: 'https://bootswatch.com/4/united/bootstrap.min.css',
        },
        {
          dark: false,
          value: 'yeti',
          href: 'https://bootswatch.com/4/yeti/bootstrap.min.css',
        },
      ],
    };
  },
  computed: {
    currentTheme: {
      get() {
        return this.$store.state.theme.name;
      },
      set(value) {
        const getTheme = this.themes.find((theme) => theme.value === value);
        this.$store.commit('setTheme', {
          dark: getTheme.dark,
          href: getTheme.href,
          name: value,
        });
      },
    },
  },
  head() {
    return {
      link: this.themes.map((theme) => ({
        hid: `theme-${theme.value}`,
        disabled: 'disabled',
        href: theme.href,
        rel: 'preload',
        as: 'style',
      })),
    };
  },
};
</script>
