import themes from '@/assets/themes';

export const state = () => ({
  themes,
});

export const getters = {
  getThemeById: (state) => (value) =>
    state.themes.find((theme) => theme.value === value),
};
