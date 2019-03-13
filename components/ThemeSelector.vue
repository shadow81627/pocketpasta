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
