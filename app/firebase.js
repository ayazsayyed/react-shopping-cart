import firebase from 'firebase/app';
import 'firebase/firestore';
const config = {
  apiKey: 'AIzaSyAqhatImN9P17Bn_U3QEP5R11cTANZSX-M',
  authDomain: 'shopping-cart-6889a.firebaseapp.com',
  databaseURL: 'https://shopping-cart-6889a.firebaseio.com',
  projectId: 'shopping-cart-6889a',
  storageBucket: 'shopping-cart-6889a.appspot.com',
  messagingSenderId: '154903647077',
  appId: '1:154903647077:web:c67a8ae6cc9c8f8f76478c',
  measurementId: 'G-QX0YDLN10C',
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });
export default firebase;
