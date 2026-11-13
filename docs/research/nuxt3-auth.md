# Nuxt 3 auth: what replaces `@nuxtjs/auth-next`

Research for pocketpasta#2294, against `origin/feat/nuxt3`. Checked 2026-11-14.

## Recommendation

Use **`nuxt-auth-sanctum`** v3.1.5 (published 2026-10-21) in its default `cookie` mode.

- Its defaults are the old module's defaults, endpoint for endpoint: `/sanctum/csrf-cookie`, `POST /login`, `POST /logout`, `GET /api/user`, cookie `XSRF-TOKEN` → header `X-XSRF-TOKEN` ([config table](https://github.com/manchenkoff/nuxt-auth-sanctum/blob/main/docs/content/2.usage/1.configuration.md); `nuxt.config.js:213-221` plus the `laravelSanctum` default block in `node_modules/@nuxtjs/auth-next/dist/module.js`). [high]
- Middleware maps 1:1: `sanctum:auth` replaces `middleware: ['auth']`, `sanctum:guest` replaces `auth: 'guest'` ([sanctum:auth](https://github.com/manchenkoff/nuxt-auth-sanctum/blob/main/docs/content/4.middleware/1.sanctum-auth.md), [sanctum:guest](https://github.com/manchenkoff/nuxt-auth-sanctum/blob/main/docs/content/4.middleware/2.sanctum-guest.md)). [high]
- Cost: 4 lines in `nuxt.config.ts`, 1 line of `definePageMeta` per guarded page, and rewriting the four `$auth` consumers the port already deleted (`pages/login.vue`, `pages/register.vue`, `components/UserMenu.vue`, `components/Profile.vue`). Laravel: no change. [high; Nuxt 3.8.2 fit unverified]
- Alternative it beat: a hand-written composable plus two middleware files, ~90 lines we own and test (`composables/useAuth.ts` 60-70, `middleware/auth.ts` ~12, `middleware/guest.ts` ~8). Take it only if the module will not run on the pinned Nuxt.

## Options

| Option                                       | Backend assumption                                                                                                                                                                                                                                            | Needs Laravel change                                                        | Maintenance                                                                                      |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `nuxt-auth-sanctum` [high]                   | Sanctum cookie SPA: csrf-cookie, `POST /login`, `GET /api/user`, `stateful` domain + credentialed CORS ([cookie guide](https://github.com/manchenkoff/nuxt-auth-sanctum/blob/main/docs/content/2.usage/2.cookie.md))                                          | No                                                                          | 286 stars, 1 open issue, 46.5k downloads/mo, 24 releases since 2025-11, v3.1.5 2026-10-21 [high] |
| Hand-written composable + middleware [high]  | Whatever we write: `$fetch` with `credentials: 'include'`, read `XSRF-TOKEN`, forward `useRequestHeaders(['cookie'])` on SSR                                                                                                                                  | No                                                                          | Ours                                                                                             |
| `@sidebase/nuxt-auth` [high]                 | Its `local` provider expects the sign-in endpoint to **return an access token**, stored in a cookie and sent as `Authorization: Bearer`; posts to its own `/api/auth/*` server routes ([local quick-start](https://auth.sidebase.io/guide/local/quick-start)) | Yes — Sanctum would have to issue tokens                                    | 1.4.0, 2026-09-25; 1.5k stars, 75 open issues, 172k downloads/mo [high]                          |
| `nuxt-auth-utils` [high]                     | Sealed Nuxt-side session cookie; only works with a Nuxt server running (`nuxt build`), login is a `server/api/*` route we write ([README](https://github.com/atinux/nuxt-auth-utils#requirements))                                                            | No, but duplicates the session: Laravel's cookie still has to reach the API | 0.6.2, 2026-11-06; 1.6k stars, 23 open issues, 616k downloads/mo [high]                          |
| `@qirolab/nuxt-sanctum-authentication` [med] | Sanctum cookie SPA                                                                                                                                                                                                                                            | No                                                                          | Last publish 2024-11-03 — stale                                                                  |

`@bg-dev/nuxt-auth` (3.1.1, 2026-03) exists but targets Directus/custom backends and is not Sanctum-aware. [med]

## Sanctum's documented flow versus NextAuth-style token flows

Sanctum SPA auth uses **no token at all**: the SPA and API share a top-level domain, the client calls `GET /sanctum/csrf-cookie`, Laravel sets a JS-readable `XSRF-TOKEN` cookie (httpOnly `false`, `VerifyCsrfToken::newCookie`), the client posts credentials to `/login`, and Laravel answers with a session cookie. Requests need `Accept: application/json` plus `Referer`/`Origin`, and the domain must be in the `stateful` list with `statefulApi()` middleware enabled ([Sanctum SPA authentication](https://laravel.com/docs/12.x/sanctum#spa-authentication)). [high]

The mismatch: `@sidebase/nuxt-auth`'s local provider wants a JSON token pointer in the login response and turns it into a `Bearer` header, and its only Laravel recipe is Passport OAuth2 ([Passport recipe](https://auth.sidebase.io/recipes/community/laravel-passport)). Sanctum SPA login returns 204 with a cookie, so the token pointer never resolves — the library would need token mode, which means changing the API. `nuxt-auth-utils` has the same shape from the other side: it owns a sealed session cookie and never carries Sanctum's session cookie to the API. [high]

## SSR

Nuxt 3.8.2 with no `ssr: false` in `nuxt.config.ts`, and `server/` exists, so pages render on the server by default. [high]

Auth state is client-side only today: the ported pages contain one `useAsyncData` (`pages/recipes/[id]/index.vue:229`) and it reads local content via `queryContent`, not the API; `pages/shoppinglist.vue` reads RxDB through the client-only plugin `plugins/02.rxdb.client.ts`; `pages/settings.vue` uses `useCookie` for DB settings. No page reads `$auth` or fetches an authenticated API resource during SSR. [high]

So SSR cookie forwarding is not needed for parity, only for future authed `useAsyncData`. Once one appears, `$fetch` does not forward cookies on the server by default; Nuxt proxies headers only for `useFetch` on a relative URL, otherwise via `useRequestHeaders(['cookie'])` or `useRequestFetch` ([Nuxt data fetching](https://nuxt.com/docs/4.x/getting-started/data-fetching#passing-headers-and-cookies)). `nuxt-auth-sanctum` already forwards headers and cookies from CSR to SSR ([cookie guide](https://github.com/manchenkoff/nuxt-auth-sanctum/blob/main/docs/content/2.usage/2.cookie.md)). [high]

## Shape of the recommendation

```ts
// nuxt.config.ts
modules: ['nuxt-auth-sanctum'],
sanctum: { baseUrl: env.API_URL }, // + optional redirect.onAuthOnly: '/login'
```

```vue
<!-- pages/login.vue -->
definePageMeta({ middleware: ['sanctum:guest'] }) const { login } =
useSanctumAuth() await login({ email, password, rememberMe }) // throws
RequestError with the 422 message
```

```vue
<!-- any page that needs a session -->
definePageMeta({ middleware: ['sanctum:auth'] })
```

- `loggedIn` → `const { isAuthenticated } = useSanctumAuth()` (also `user`, `refreshIdentity`).
- `login` → `login(credentials)`; `logout` → `await logout()`; both redirect per `redirect.onLogin` / `redirect.onLogout` and return the raw `RequestError` for the 422 branch already in `pages/login.vue:146-160`.
- Global guard, if preferred over per-page: `sanctum.globalMiddleware.enabled: true`, with `definePageMeta({ auth: false })` for public pages.
- New `components/UserMenu.vue` / `Profile.vue` take `user` and `isAuthenticated` from the same composable instead of `this.$auth`.
- Hand-written fallback: `composables/useAuth.ts` wrapping `$fetch.create({ credentials: 'include', baseURL: API_URL })`, reading `XSRF-TOKEN` from the csrf-cookie response (not `document.cookie` — the API is a different subdomain unless `SESSION_DOMAIN` is `.pocketpasta.com`), plus `middleware/auth.ts` and `middleware/guest.ts` with `defineNuxtRouteMiddleware` + `navigateTo` ([Nuxt middleware](https://nuxt.com/docs/4.x/guide/directory-structure/app/middleware)). ~90 lines, no dependency.

## What breaks, API untouched

- **Nothing in the API contract.** Same four endpoints, same cookie names, same user payload (`user.property: false` in the old strategy, so `$auth.user` was already the raw `/api/user` body). [high]
- **CORS / stateful config is the failure mode.** If the port's dev or preview origin (e.g. `localhost:3000`, a Vercel preview host) is not in `SANCTUM_STATEFUL_DOMAINS` and `config/cors.php` `allowed_origins` with `supports_credentials: true`, login fails 419/401 with no client-side cause. Config-only, no code change. [high]
- **`useAsyncData`/`$fetch` calls bypass the module.** Anything authenticated must use `useSanctumFetch`; a raw `$fetch` in SSR gets 401. No such call exists on the branch today. [high]
- **`pages/register.vue`'s manual `GET /sanctum/csrf-cookie`** (`pages/register.vue:173`) becomes redundant before `login`, but `POST /register` itself still needs `useSanctumFetch('/register')`. [high]
- **Two pages and two components must be written** (login, register, UserMenu, Profile) — port debt that exists whichever option wins. [high]

## Unverified

- **Nuxt 3.8.2 compatibility.** The module's repo pins Nuxt `^4.6.4` in devDependencies and declares no peer range or engines field; the docs use the Nuxt 4 `app/` layout. Verify with one `pnpm add nuxt-auth-sanctum` + dev-server login against the pinned 3.8.2 before committing to it; if it fails, bump Nuxt, or fall back to the ~90-line composable. [low confidence either way]
- **The API's `SESSION_DOMAIN` and `SANCTUM_STATEFUL_DOMAINS` values** are not in this repo, so cross-subdomain cookie readability is inferred from the working Nuxt 2 app. [med]
- The module's `client.initialRequest: true` default means one `GET /api/user` on first load; whether that is acceptable on the static-ish Vercel deployment was not measured. [med]

## Sources

- Laravel Sanctum SPA flow: https://laravel.com/docs/12.x/sanctum#spa-authentication
- `VerifyCsrfToken::newCookie` (httpOnly `false`): https://github.com/laravel/framework/blob/12.x/src/Illuminate/Foundation/Http/Middleware/VerifyCsrfToken.php
- `nuxt-auth-sanctum` docs and config: https://sanctum.manchenkoff.me, source of the pages cited above under `docs/content/`
- `@sidebase/nuxt-auth` local provider: https://auth.sidebase.io/guide/local/quick-start
- `nuxt-auth-utils` requirements: https://github.com/atinux/nuxt-auth-utils#requirements
- Nuxt SSR header/cookie forwarding: https://nuxt.com/docs/4.x/getting-started/data-fetching#passing-headers-and-cookies
- Version and download figures: npm registry `registry.npmjs.org/{nuxt-auth-sanctum,@sidebase/nuxt-auth,nuxt-auth-utils}`, `api.npmjs.org/downloads/point/last-month/*`, GitHub API, read 2026-11-14
