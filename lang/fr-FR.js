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
            "Uwu Nous faisons un fucky wucky !! Un boingo fucko d'esprit! Les singes de code de notre siège travaillent avec VEWY HAWD pour résoudre ce problème!",
        },
      },

      layout: {
        login: "S'identifier",
        logout: 'Connectez - Out',
        navigation: {
          home: 'Accueil',
          about: 'Sur',
          newsletter: 'Bulletin',
          recipes: 'Recettes',
          products: 'Boutique',
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
      products: {
        heading: 'Des produits',
      },
      settings: {
        heading: 'Réglages',
        style: {
          heading: 'Style',
          'theme-label': {
            id: 'theme-label',
            icon: 'style',
            label: 'Thème',
            description:
              "Choisissez un thème CSS d'amorçage pour personnaliser l'application à votre façon.",
          },
        },
        content: {
          heading: 'Contenu',
          language: {
            icon: 'language',
            label: 'La Langue',
            description: 'Quelle langue parlez-vous?',
          },
        },
      },
    });
  });
};
