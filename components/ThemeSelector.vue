<template>
  <form>
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
    <!-- <button class="btn btn-primary">A Button</button> -->
  </form>
</template>

<script>
export default {
  data() {
    return {
      themes: [
        {
          value: 'cerulean',
          href: 'https://bootswatch.com/4/cerulean/bootstrap.min.css',
        },
        {
          value: 'cosmo',
          href: 'https://bootswatch.com/4/cosmo/bootstrap.min.css',
        },
        {
          value: 'cyborg',
          href: 'https://bootswatch.com/4/cyborg/bootstrap.min.css',
        },
        {
          value: 'darkly',
          href: 'https://bootswatch.com/4/darkly/bootstrap.min.css',
        },
        {
          value: 'flatly',
          href: 'https://bootswatch.com/4/flatly/bootstrap.min.css',
        },
        {
          value: 'journal',
          href: 'https://bootswatch.com/4/journal/bootstrap.min.css',
        },
        {
          value: 'litera',
          href: 'https://bootswatch.com/4/litera/bootstrap.min.css',
        },
        {
          value: 'lumen',
          href: 'https://bootswatch.com/4/lumen/bootstrap.min.css',
        },
        {
          value: 'lux',
          href: 'https://bootswatch.com/4/lux/bootstrap.min.css',
        },
        {
          value: 'materia',
          href: 'https://bootswatch.com/4/materia/bootstrap.min.css',
        },
        {
          value: 'minty',
          href: 'https://bootswatch.com/4/minty/bootstrap.min.css',
        },
        {
          value: 'pulse',
          href: 'https://bootswatch.com/4/pulse/bootstrap.min.css',
        },
        {
          value: 'sandstone',
          href: 'https://bootswatch.com/4/sandstone/bootstrap.min.css',
        },
        {
          value: 'simplex',
          href: 'https://bootswatch.com/4/simplex/bootstrap.min.css',
        },
        {
          value: 'sketchy',
          href: 'https://bootswatch.com/4/sketchy/bootstrap.min.css',
        },
        {
          value: 'slate',
          href: 'https://bootswatch.com/4/slate/bootstrap.min.css',
        },
        {
          value: 'solar',
          href: 'https://bootswatch.com/4/solar/bootstrap.min.css',
        },
        {
          value: 'spacelab',
          href: 'https://bootswatch.com/4/spacelab/bootstrap.min.css',
        },
        {
          value: 'superhero',
          href: 'https://bootswatch.com/4/superhero/bootstrap.min.css',
        },
        {
          value: 'untied',
          href: 'https://bootswatch.com/4/untied/bootstrap.min.css',
        },
        {
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
          href: getTheme.href,
          name: value,
        });
      },
    },
  },
};
</script>
