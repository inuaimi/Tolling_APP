import firebase from 'react-native-firebase';

export const db = firebase.firestore()

export const addItem = (item) => {
  db.collection('test').add({
    name: item
  });
}

// Should be 2 params, user and vehicle to delete. User will be signed in.
export const deleteUserVehicle = (vehicle) => {
  db.collection('Users').doc('XO5lwKAyI3PaEpGQ2bZ4').update({
    vehicles: firebase.firestore.FieldValue.arrayRemove(vehicle)
  });
}

// Skall kallas på ifrån profilsidan. Knapp(Add Car) -> AddCarScreen ?

export const addUserVehicle = (regnumber, type) => {
  db.collection('Users').doc('XO5lwKAyI3PaEpGQ2bZ4').update({
    vehicles: firebase.firestore.FieldValue.arrayUnion({
      regnumber: regnumber,
      type: type
     })
  });
}