import firebase from 'react-native-firebase';

export const db = firebase.firestore()

const config = {
  apiKey: "AIzaSyBidTQWLb2V9YekKSrn_iXpr5UqWgAybcQ",
  authDomain: "tolling-app.firebaseapp.com",
  databaseURL: "https://tolling-app.firebaseio.com",
  projectId: "tolling-app",
  storageBucket: "tolling-app.appspot.com",
  messagingSenderId: "671174856452"
};
firebase.initializeApp(config);

export const addItem = (item) => {
  db.collection('test').add({
    name: item
  });
}

export const createUser = (name, email, vehicle, license) => {
  db.collection('Users').add({
    name: name,
    email: email,
    vehicle: vehicle,
    licensePlate: license
  });
}