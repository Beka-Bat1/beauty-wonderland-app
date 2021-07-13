import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
   apiKey: 'AIzaSyCMCH-brUV4-ltdKG3MYL0u7whCLp-p7Dc',
   authDomain: 'beauty-wonderland-e913c.firebaseapp.com',
   databaseURL: 'https://beauty-wonderland-e913c-default-rtdb.firebaseio.com',
   projectId: 'beauty-wonderland-e913c',
   storageBucket: 'beauty-wonderland-e913c.appspot.com',
   messagingSenderId: '721197410279',
   appId: '1:721197410279:web:ade87a3ec2a5e4c0803f42',
};

if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
}


export {firebase};
