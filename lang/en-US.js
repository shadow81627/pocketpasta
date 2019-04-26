export default () => {
  return new Promise(function(resolve) {
    resolve({
      error: {
        404: {
          heading: 'Page Not Found',
          description:
            'The specified file was not found on this website. Please check the URL for mistakes and try again.',
        },
        500: {
          heading: 'OOPSIE WOOPSIE!!',
          description:
            'Uwu We make a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!',
        },
      },

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
