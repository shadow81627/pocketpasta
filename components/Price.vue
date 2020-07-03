<template>
  <span>
    {{
      new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
      }).format(price)
    }}
  </span>
</template>

<script>
export default {
  props: {
    price: { type: [Number, String], required: true },
    locale: { type: String, default: 'en-AU' },
    currency: { type: String, default: 'AUD' },
  },
};
</script>
