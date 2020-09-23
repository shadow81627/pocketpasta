<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Contact Us</h1>
      </v-col>
    </v-row>
    <form
      method="POST"
      action="https://formspree.io/damien.robinson@pocketpasta.com"
    >
      <div class="hpot d-none" style="display: none">
        <label>Leave this field empty: <input name="_gotcha" /></label>
      </div>
      <v-text-field
        id="email"
        name="email"
        type="email"
        required
        label="Email address"
        hint="We'll never share your email with anyone else."
        persistent-hint
        solo-inverted
      />

      <v-text-field
        id="name"
        name="name"
        required
        label="Your Name"
        solo-inverted
      />

      <v-textarea
        id="comments"
        name="comments"
        label="Comments"
        rows="3"
        max-rows="6"
        solo-inverted
      />
      <v-btn type="submit" color="primary">Submit</v-btn>
    </form>
  </v-container>
</template>
