# Glossary

Domain terms for this project. Maintained by `/domain-modeling` (reached via `/grill-with-docs`). Each entry: the term, what it means, and the words it explicitly disowns.

## Language

**PocketPasta**:
The lifestyle planner: this frontend plus the Laravel API in `pocketpasta-api`. The product, not the repo.
_Avoid_: the app, the site

**Recipe**:
A cooking recipe page: ingredients, steps, a nutrition fact table and a price, addressed by id under `/recipes/<id>`.
_Avoid_: meal, dish

**Product**:
A shop item with a price and one or more retailer offers, under `/products/<id>`.
_Avoid_: item (means a shopping-list line)

**Offer**:
A retailer price for a product. A product carries several; the comparison is the point.
_Avoid_: price (the money value itself)

**Shopping list**:
The user's aggregated buy-list at `/shoppinglist`, editable inline, grouped by category.
_Avoid_: cart, basket

**Note**:
A user's free-text note, attached to a recipe or a product.
_Avoid_: comment

**Organization**:
A business or team account at `/organizations`.
_Avoid_: company profile

**Theme**:
A colour scheme the user picks in settings, held in the Vuex store from `assets/themes`.
_Avoid_: skin, palette

**Frontend / API**:
This repo is the frontend. "The API" always means `pocketpasta-api`, reached at `API_URL`.
_Avoid_: backend, server (both name the host as often as the code)
