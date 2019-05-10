<template>
  <div class="container">
    <div class="recipes">
      <h1>{{ $t('recipes.heading') }}</h1>
      <div class="row justify-content-end">
        <ViewSwitcher v-model="layout" />
      </div>
      <div class="row">
        <div class="col-12">
          <div class="card-layout" :class="layoutClass">
            <RecipeCard
              v-for="recipe in recipes"
              :key="recipe.id"
              v-bind="recipe"
              :layout="layout"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ViewSwitcher from '@/components/List/ViewSwitcher';
import RecipeCard from '@/components/Recipe/RecipeCard';
export default {
  components: {
    ViewSwitcher,
    RecipeCard,
  },
  data: () => ({
    layout: null,
  }),
  computed: {
    recipes() {
      return this.$store.state.recipes;
    },
    layoutClass() {
      // list layout is no class
      return {
        'card-group': this.layout === 'group',
        'card-deck': this.layout === 'deck',
        'card-columns': this.layout === 'columns',
      };
    },
  },
  head() {
    return {
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Easy pasta recipes made with simple ingredients.',
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://pocketpasta.com/recipes',
        },
      ],
    };
  },
};
</script>
