import { useUserStore } from '../stores/user-store';
import { boot } from 'quasar/wrappers';
import firebase from 'firebase/compat/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import 'firebase/compat/auth';
import { getFirestore } from 'firebase/firestore';
import { UserInterface } from 'src/models/user';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};
const fbApp = firebase.initializeApp(firebaseConfig);
const fbAuth = getAuth();
const fbUiConfig = {
  signInSuccessUrl: '/#/',
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
  ],
};
const fbUi = new firebaseui.auth.AuthUI(fbAuth);
const fbDb = getFirestore();

export default boot(({ app }) => {
  const userStore = useUserStore();
  onAuthStateChanged(
    fbAuth,
    (user) => {
      if (user) {
        const userData: UserInterface = {
          displayName: user.displayName,
          email: user.email,
          loggedIn: true,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          providerId: user.providerId,
          uid: user.uid,
        };
        userStore.user = userData;
      } else {
        userStore.$reset();
      }
    },
    function (error) {
      console.log(error);
    }
  );
  app.config.globalProperties.$firebase = fbApp;
});

export { fbApp, fbUi, fbUiConfig, fbAuth, fbDb };
