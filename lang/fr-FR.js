export default () => {
  return new Promise(function(resolve) {
    resolve({
      layout: {
        login: "S'identifier",
        logout: 'Connectez - Out',
        navigation: {
          home: 'Accueil',
          about: 'Sur',
          newsletter: 'Bulletin',
          recipes: 'Recettes',
          settings: 'Réglages',
        },
      },
      landing: {
        banner: {
          subheading: 'Mangez des spaghettis pour oublier vos regrettés',
        },
        contact: {
          heading: 'Contactez nous',
          location: 'Brisbane, Australie',
          email: 'damien.robinson@pocketpasta.com',
        },
        info: {
          heading: "Information d'entreprise",
        },
      },
      about: {
        heading: 'Sur PocketPasta',
      },
      newsletter: {
        heading: 'Abonnez-vous à notre liste de diffusion',
        required: 'indique nécessaire',
        email: {
          label: 'Adresse électronique',
          placeholder: 'john.smith@example.com',
        },
        firstname: { label: 'Prénom', placeholder: 'John' },
        lastname: { label: 'Nom de famille', placeholder: 'Smith' },
        submit: 'Souscrire',
      },
      recipes: {
        heading: 'Recettes',
      },
      settings: {
        heading: 'Réglages',
      },
    });
  });
};
