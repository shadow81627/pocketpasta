import damien from '@/assets/link-data/damien.json';
import products from '@/assets/link-data/products';
import themes from '@/assets/themes';

export const state = () => ({
  themes,
  products,
  damien,
});

export const getters = {
  getProductById: (state) => (id) =>
    state.products.find((product) => product.id === id),
  getThemeById: (state) => (value) =>
    state.themes.find((theme) => theme.value === value),
};
