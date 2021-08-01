<template>
  <v-container fluid class="fluid">
    <v-row justify="center" align="center" class="row">
      <v-col
        sm="12"
        md="6"
        class="text-center teal darken-2 d-sm-none d-md-block"
        style="height: 100vh"
      >
        <v-row justify="center" align="center" style="height: 100vh">
          <v-col>
            <v-avatar width="200" height="176" tile class="mx-auto">
              <v-img
                src="https://res.cloudinary.com/pocketpasta/image/upload/fl_progressive/c_fit,f_auto,q_auto,w_200,h_176,dpr_auto/v1560038491/logo_vlqvdr.png"
                srcset="
                https://res.cloudinary.com/pocketpasta/image/upload/fl_progressive/c_fit,f_auto,q_auto,w_200,h_176,dpr_auto/v1560038491/logo_vlqvdr.png 1x,
                https://res.cloudinary.com/pocketpasta/image/upload/fl_progressive/c_fit,f_auto,q_auto,w_200,h_176,dpr_2.0/v1560038491/logo_vlqvdr.png 2x,
                https://res.cloudinary.com/pocketpasta/image/upload/fl_progressive/c_fit,f_auto,q_auto,w_200,h_176,dpr_3.0/v1560038491/logo_vlqvdr.png 3x
              "
                alt="Pasta on a sheet of paper"
                width="200"
                height="176"
                center
                contain
              />
            </v-avatar>
            <h2 class="white--text">PocketPasta</h2>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="6" sm="12" md="6" class="text-center xs">
        <h1>Register</h1>
        <p>Please complete this form to create an account</p>
        <ValidationObserver ref="obs" v-slot="{ handleSubmit }">
          <v-form
            ref="form"
            class="mx-2"
            lazy-validation
            novalidte
            @submit.prevent="handleSubmit(submit)"
          >
            <v-row>
              <v-col cols="6">
                <TextField
                  v-model="form.firstname"
                  label="First Name"
                  name="firstname"
                  required
                  rules="required|max:255"
                />
              </v-col>
              <v-col cols="6">
                <TextField
                  v-model="form.lastname"
                  label="Last Name"
                  name="lastname"
                  required
                  rules="required|max:255"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <TextField
                  v-model="form.email"
                  type="email"
                  label="Email"
                  required
                  name="email"
                  rules="required|email|max:255"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <TextField
                  v-model="form.password"
                  type="password"
                  rules="required|password|confirmed:password_confirmation|max:255"
                  label="Password"
                  name="password"
                  required
                />
              </v-col>
              <v-col cols="6">
                <TextField
                  v-model="form.password_confirmation"
                  type="password"
                  rules="required|password|max:255"
                  label="Password Confirmation"
                  name="password_confirmation"
                  required
                  vid="password_confirmation"
                />
              </v-col>
            </v-row>
            <v-btn
              type="submit"
              class="teal darken-2 white--text mt-5"
              :loading="submitting"
            >
              Register
            </v-btn>
          </v-form>
        </ValidationObserver>
      </v-col>
    </v-row>
    <client-only>
      <v-snackbar
        :value="errorMessage"
        color="error"
        bottom
        right
        :timeout="-1"
      >
        {{ errorMessage }}
        <template #action="{ attrs }">
          <v-btn icon v-bind="attrs" @click="errorMessage = null">
            <v-icon>{{ mdiClose }}</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </client-only>
  </v-container>
</template>

<script>
// https://blog.logrocket.com/how-to-implement-form-validation-with-vuetify-in-a-vue-js-app/
import TextField from '@/components/TextField';
import { ValidationObserver, extend } from 'vee-validate';
import { messages } from 'vee-validate/dist/locale/en.json';
import { required, email, max, confirmed } from 'vee-validate/dist/rules';
import { mdiClose } from '@mdi/js';
const rules = { required, email, max, confirmed };
for (const [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation,
    message: messages[rule],
  });
}
extend('password', {
  validate: (v) => {
    return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v);
  },
  message:
    'Password must contain at least lowercase letter, one number, a special character and one uppercase letter.',
});
export default {
  components: {
    ValidationObserver,
    TextField,
  },
  middleware: ['auth'],
  auth: 'guest',
  data: () => ({
    mdiClose,
    form: { password: '', email: '', rememberMe: false },
    valid: false,
    submitting: false,
    errorMessage: null,
    snackbar: true,
  }),
  head() {
    return {
      title: 'Register',
    };
  },
  methods: {
    async submit() {
      this.submitting = true;
      try {
        await this.$axios.get('/sanctum/csrf-cookie');
        await this.$axios.post('/register', {
          name: `${this.form.firstname} ${this.form.firstname}`,
          ...this.form,
        });
        await this.$auth.loginWith('laravelSanctum', {
          data: this.form,
        });
      } catch (error) {
        if (error.response && error.response.status !== 422) {
          this.$nuxt.error({
            statusCode: error.response.status,
            message: error.message,
          });
        } else if (error.response && error.response.status === 422) {
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = error.message ?? error;
        }
      }
      this.submitting = false;
    },
  },
};
</script>
