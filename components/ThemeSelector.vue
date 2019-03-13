<template>
  <form>
    <h1>Settings</h1>
    <div class="form-group">
      <label for="theme">Select a theme</label>
      <select id="theme" name="theme" v-model="theme">
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
      <p>Current theme: {{ theme }}</p>
    </div>
    <button class="btn btn-primary">A Button</button>
  </form>
</template>

<script>
const ThemeHelper = function() {
  const preloadTheme = (href) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);

    return new Promise((resolve, reject) => {
      link.onload = (e) => {
        const sheet = e.target.sheet;
        sheet.disabled = true;
        resolve(sheet);
      };
      link.onerror = reject;
    });
  };

  const selectTheme = (themes, name) => {
    if (name && !themes[name]) {
      throw new Error(`"${name}" has not been defined as a theme.`);
    }
    Object.keys(themes).forEach((n) => (themes[n].disabled = n !== name));
  };

  const themes = { darkly: true };

  return {
    add(name, href) {
      return preloadTheme(href).then((s) => (themes[name] = s));
    },
    set theme(name) {
      selectTheme(themes, name);
    },
    get theme() {
      return Object.keys(themes).find((n) => !themes[n].disabled);
    },
  };
};

export default {
  data() {
    return {
      themes: [
        {
          value: 'darkly',
          href: 'https://bootswatch.com/4/darkly/bootstrap.min.css',
        },
        {
          value: 'flatly',
          href: 'https://bootswatch.com/4/flatly/bootstrap.min.css',
        },
        {
          value: 'materia',
          href: 'https://bootswatch.com/4/materia/bootstrap.min.css',
        },
        {
          value: 'solar',
          href: 'https://bootswatch.com/4/solar/bootstrap.min.css',
        },
      ],
      themeHelper: new ThemeHelper(),
    };
  },
  computed: {
    theme: {
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
