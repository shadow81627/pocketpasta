<template>
  <div class="container">
    <h1>{{ $t('settings.heading') }}</h1>
    <div class="card mb-3">
      <h2 class="subheading card-header text-uppercase">Style</h2>
      <ul class="list-group list-group-flush">
        <setting
          id="theme-label"
          icon="style"
          label="Theme"
          description="Choose a bootstrap CSS theme to style the app your way."
        >
          <theme-selector aria-labelledby="theme-label" />
        </setting>
      </ul>
    </div>
    <div class="card mb-3">
      <h2 class="subheading card-header text-uppercase">Content</h2>
      <ul class="list-group list-group-flush">
        <setting
          icon="language"
          label="Language"
          description="What language do you speak?"
        >
          <LangSwitcher />
        </setting>
      </ul>
    </div>
  </div>
</template>

<script>
import ThemeSelector from '@/components/ThemeSelector.vue';
import LangSwitcher from '@/components/Layout/LangSwitcher';
import setting from '@/components/settings/setting';

export default {
  components: {
    ThemeSelector,
    LangSwitcher,
    setting,
  },
  head() {
    return {
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://pocketpasta.com/settings',
        },
      ],
    };
  },
};
</script>
