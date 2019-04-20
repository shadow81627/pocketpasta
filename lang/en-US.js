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
          subheading: 'Eat spagetti to forgetti the regretti',
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
      newsletter: {
        heading: 'Subscribe to our mailing list',
        required: 'indicates required',
        email: 'Email Address',
        firstname: 'First Name',
        lastname: 'Last Name',
        submit: 'Subscribe',
      },
    });
  });
};
