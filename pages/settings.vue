<template>
  <div class="container">
    <h1>{{ $t('settings.heading') }}</h1>
    <div class="card">
      <div class="card-header text-uppercase">Style</div>
      <ul class="list-group list-group-flush">
        <setting
          icon="style"
          label="Theme"
          description="Choose a bootstrap CSS theme to style the app your way."
        >
          <theme-selector />
        </setting>
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
