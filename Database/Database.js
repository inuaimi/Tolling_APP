import firebase from 'react-native-firebase';

export const db = firebase.firestore()

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