<template>
  <div class="container">
    <h1>{{ $t('settings.heading') }}</h1>
    <div class="card mb-3">
      <h2 class="subheading card-header text-uppercase">
        {{ $t('settings.style.heading') }}
      </h2>
      <ul class="list-group list-group-flush">
        <setting v-bind="$t('settings.style.theme-label')">
          <theme-selector aria-labelledby="theme-label" />
        </setting>
      </ul>
    </div>

    <div class="card mb-3">
      <h2 class="subheading card-header text-uppercase">
        {{ $t('settings.content.heading') }}
      </h2>
      <ul class="list-group list-group-flush">
        <setting v-bind="$t('settings.content.language')">
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
