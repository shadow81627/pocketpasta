<template>
  <v-container fluid class="fluid">
    <v-row justify="center" align="center" class="row">
      <v-col
        cols="6"
        sm="12"
        md="6"
        class="text-center teal darken-2 xs"
        style="height: 100vh"
      >
        <v-row justify="center" align="center" style="height: 80vh">
          <v-col>
            <h2 class="white--text">PocketPasta</h2>
          </v-col>
        </v-row>
      </v-col>

      <v-col
        cols="6"
        sm="12"
        md="6"
        class="text-center xs"
        style="height: 100vh"
      >
        <h1>Login</h1>
        <!-- <p>Please complete this form to create an account</p> -->
        <p>
          Welcome back! Please enter your email address and password below to
          sign in.
        </p>
        <v-form
          ref="form"
          v-model="valid"
          class="mx-2"
          lazy-validation
          novalidte
          @submit.prevent="submit"
        >
          <!-- <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="firstname"
                :rules="nameRules"
                label="First Name"
                required
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="lastname"
                :rules="nameRules"
                label="Last Name"
              />
            </v-col>
          </v-row> -->
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="form.email"
                type="email"
                :rules="emailRules"
                label="Email"
                required
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="form.password"
                type="password"
                :rules="passwordRules"
                label="Password"
                required
              />
            </v-col>
          </v-row>

          <!-- <v-checkbox
            v-model="firstcheckbox"
            :rules="[(v) => !!v || 'You must agree to continue!']"
            label="I agree with Terms and Conditions"
            required
          /> -->

          <!-- <v-checkbox
            v-model="seccheckbox"
            :rules="[(v) => !!v || 'You must agree to receive!']"
            label="I want to receive PocketPasta Emails"
            required
          /> -->
          <v-btn
            type="submit"
            class="teal darken-2 white--text mt-5"
            :loading="submitting"
          >
            Login
          </v-btn>
        </v-form>
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
import { mdiClose } from '@mdi/js';
export default {
  middleware: ['auth'],
  auth: 'guest',
  data: () => ({
    mdiClose,
    form: { password: '', email: '', rememberMe: false },
    valid: false,
    submitting: false,
    errorMessage: null,
    snackbar: true,
    // firstname: '',
    // lastname: '',
    // nameRules: [
    //   (v) => !!v || 'Name is required',
    //   (v) => (v && v.length <= 10) || 'Name must be less than 10 characters',
    // ],
    emailRules: [
      (v) => !!v || 'Email is required',
      (v) =>
        /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v,
        ) || 'Email must be valid',
    ],
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) =>
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) ||
        'Password must contain at least lowercase letter, one number, a special character and one uppercase letter',
    ],
    // firstcheckbox: false,
  }),
  head() {
    return {
      title: 'Login',
    };
  },
  methods: {
    async submit(event) {
      event.preventDefault();
      this.submitting = true;
      this.$refs.form.validate();
      if (this.valid) {
        try {
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
      }
      this.submitting = false;
    },
  },
};
</script>
