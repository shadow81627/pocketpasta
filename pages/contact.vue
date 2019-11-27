<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>Contact Us</h1>
      </div>
    </div>
    <form
      method="POST"
      action="https://formspree.io/damien.robinson@pocketpasta.com"
    >
      <div class="hpot d-none" style="display: none">
        <label>Leave this field empty: <input name="_gotcha"/></label>
      </div>
      <b-form-group
        label="Email address:"
        label-for="email"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Enter email"
        />
      </b-form-group>

      <b-form-group label="Your Name:" label-for="name">
        <b-form-input id="name" name="name" required placeholder="Enter name" />
      </b-form-group>

      <b-form-group label="Comments:" label-for="comments">
        <b-form-textarea
          id="comments"
          name="comments"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
        />
      </b-form-group>

      <b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form-group>
    </form>
  </div>
</template>
