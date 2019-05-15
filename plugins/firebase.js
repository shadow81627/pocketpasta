import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/performance';
if (!firebase.apps.length) {
  const config = {
    apiKey:
      process.env.FIREBASE_API_KEY || 'AIzaSyDG_OMeMaXVIHJqZpTzkY_DAWV9ylNwlXM',
    authDomain:
      process.env.FIREBASE_AUTH_DOMAIN || 'staging-pocketpasta.firebaseapp.com',
    databaseURL:
      process.env.FIREBASE_DATABASE_URL ||
      'https://staging-pocketpasta.firebaseio.com',
    projectId: process.env.FIREBASE_PROJECT_ID || 'staging-pocketpasta',
    storageBucket:
      process.env.FIREBASE_STORAGE_BUCKET || 'staging-pocketpasta.appspot.com',
    messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID || '216453269763',
    appId: process.env.FIREBASE_API_ID || '1:216453269763:web:71a3fe1ca24500bb',
  };
  firebase.initializeApp(config);
}
const firestore = firebase.firestore();
// Initialize Performance Monitoring and get a reference to the service
const performance = firebase.performance();
export { firestore, performance };
