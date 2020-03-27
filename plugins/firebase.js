import { firebase } from '@firebase/app';
import 'firebase/firestore';
import 'firebase/performance';
import 'firebase/auth';
import 'firebase/analytics';

export default async ({ $axios, isDev }, inject) => {
  if (!firebase.apps.length) {
    const config = {
      apiKey:
        process.env.FIREBASE_API_KEY ||
        'AIzaSyDG_OMeMaXVIHJqZpTzkY_DAWV9ylNwlXM',
      authDomain:
        process.env.FIREBASE_AUTH_DOMAIN ||
        'staging-pocketpasta.firebaseapp.com',
      databaseURL:
        process.env.FIREBASE_DATABASE_URL ||
        'https://staging-pocketpasta.firebaseio.com',
      projectId: process.env.FIREBASE_PROJECT_ID || 'staging-pocketpasta',
      storageBucket:
        process.env.FIREBASE_STORAGE_BUCKET ||
        'staging-pocketpasta.appspot.com',
      measurementId: 'G-M7TXCJEKSQ',
      messagingSenderId:
        process.env.FIREBASE_MESSAGE_SENDER_ID || '216453269763',
      appId:
        process.env.FIREBASE_API_ID || '1:216453269763:web:71a3fe1ca24500bb',
    };

    if (!isDev) {
      await $axios('/__/firebase/init.json')
        .then((response) => {
          firebase.initializeApp({
            ...(response.data || config),
            measurementId: 'G-M7TXCJEKSQ',
          });
        })
        .catch((error) => {
          console.log("Can't fetch firebase config: ", error);
          firebase.initializeApp(config);
        });
    } else {
      firebase.initializeApp(config);
    }
  }
  const firestore = firebase.firestore();
  // Initialize Performance Monitoring and get a reference to the service
  const performance = firebase.performance();
  const auth = firebase.auth;
  const analytics = firebase.analytics();

  // The default cache size threshold is 40 MB. Configure "cacheSizeBytes"
  // for a different threshold (minimum 1 MB) or set to "CACHE_SIZE_UNLIMITED"
  // to disable clean-up.
  firebase.firestore().settings({
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
  });

  firebase
    .firestore()
    .enablePersistence()
    .catch(function (err) {
      if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
      } else if (err.code === 'unimplemented') {
        // The current browser does not support all of the
        // features required to enable persistence
      }
    });

  const firebaseModules = { performance, analytics, auth, firestore };

  await inject('firebase', firebaseModules);
  return firebaseModules;
};
