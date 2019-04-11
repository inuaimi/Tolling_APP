import firebase from 'react-native-firebase';

// firebase.auth()
//   .signInAnonymously()
//   .then(credential => {
//     if(credential) {
//       alert('default app user')
//     }
//   })

const databaseConfig = {
  apiKey: "AIzaSyBidTQWLb2V9YekKSrn_iXpr5UqWgAybcQ",
  authDomain: "",
  databaseURL: "https://tolling-app.firebaseio.com",
  projectId: "tolling-app",
  storageBucket: "tolling-app.appspot.com",
  messagingSenderId: "671174856452"

}

const db = firebase.database()

export const addItem = (item) => {
  db.ref('/test').push({
    name: item
  });
}