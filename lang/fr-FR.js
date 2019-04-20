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
          subheading: 'Manger des spaghettis pour oublier les regrettés',
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
      newsletter: {
        heading: 'Abonnez-vous à notre liste de diffusion',
        required: 'indique nécessaire',
        email: 'Adresse électronique',
        firstname: 'Prénom',
        lastname: 'Nom de famille',
        submit: 'Souscrire',
      },
    });
  });
};
