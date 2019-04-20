export default () => {
  return new Promise(function(resolve) {
    resolve({
      layout: {
        login: 'Login',
        logout: 'Logout',
        navigation: {
          home: 'Home',
          about: 'About',
          newsletter: 'Newsletter',
          recipes: 'Recipes',
          settings: 'Settings',
        },
      },
      landing: {
        banner: {
          subheading: 'Eat spagetti to forgetti your regretti',
        },
        contact: {
          heading: 'Contact us',
          location: 'Brisbane, Australia',
          email: 'damien.robinson@pocketpasta.com',
        },
        info: {
          heading: 'Company info',
        },
      },
      about: {
        heading: 'About PocketPasta',
      },
      newsletter: {
        heading: 'Subscribe to our mailing list',
        required: 'indicates required',
        email: {
          label: 'Email Address',
          placeholder: 'john.smith@example.com',
        },
        firstname: { label: 'First Name', placeholder: 'John' },
        lastname: { label: 'Last Name', placeholder: 'Smith' },
        submit: 'Subscribe',
      },
      recipes: {
        heading: 'Recipes',
      },
      settings: {
        heading: 'Settings',
      },
    });
  });
};
