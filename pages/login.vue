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
            <h1 class="white--text">PocketPasta</h1>
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
        <h1>Welcome to PocketPasta</h1>
        <!-- <p>Please complete this form to create an account</p> -->
        <p>Please complete this form to login</p>
        <v-form ref="form" class="mx-2" lazy-validation>
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
                v-model="email"
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
                v-model="password"
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
          <v-btn class="teal darken-2 white--text mt-5" @click="submitForm">
            Login
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// https://blog.logrocket.com/how-to-implement-form-validation-with-vuetify-in-a-vue-js-app/
export default {
  data: () => ({
    // firstname: '',
    // lastname: '',
    // nameRules: [
    //   (v) => !!v || 'Name is required',
    //   (v) => (v && v.length <= 10) || 'Name must be less than 10 characters',
    // ],
    email: '',
    emailRules: [
      (v) => !!v || 'Email is required',
      (v) =>
        /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v,
        ) || 'Email must be valid',
    ],
    password: '',
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) =>
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) ||
        'Password must contain at least lowercase letter, one number, a special character and one uppercase letter',
    ],
    // firstcheckbox: false,
  }),
  methods: {
    submitForm() {
      this.$refs.form.validate();
      this.$auth.loginWith('laravelSanctum', {
        data: {
          email: this.email,
          password: this.password,
        },
      });
    },
  },
};
</script>
