import firebase from "react-native-firebase";

export const db = firebase.firestore();

const config = {
  apiKey: "AIzaSyBidTQWLb2V9YekKSrn_iXpr5UqWgAybcQ",
  authDomain: "tolling-app.firebaseapp.com",
  databaseURL: "https://tolling-app.firebaseio.com",
  projectId: "tolling-app",
  storageBucket: "tolling-app.appspot.com",
  messagingSenderId: "671174856452"
};
firebase.initializeApp(config);

export const addItem = item => {
  db.collection("test").add({
    name: item
  });
};

// Should be 2 params, user and vehicle to delete. User will be signed in.
export const deleteUserVehicle = vehicle => {
  db.collection("Users")
    .doc("XO5lwKAyI3PaEpGQ2bZ4")
    .update({
      vehicles: firebase.firestore.FieldValue.arrayRemove(vehicle)
    });
};

export const addUserVehicle = (licensePlate, type) => {
  db.collection("Users")
    .doc("XO5lwKAyI3PaEpGQ2bZ4")
    .update({
      vehicles: firebase.firestore.FieldValue.arrayUnion({
        licensePlate: licensePlate,
        type: type
      })
    });
};

export const createUser = (name, email, vehicle, license, balance) => {
  db.collection("Users").add({
    name: name,
    email: email,
    vehicle: vehicle,
    licensePlate: license,
    balance: balance
  });
};

// export const getMoneyBalance = async id => {
//   let balance;
//   const ref = db.collection("Users").doc(id);
//   const getDoc = ref
//     .get()
//     .then(doc => {
//       if (doc.exists) {
//         console.log("_application, Document exist!: ", doc.data());
//         balance = doc.data().balance;
//         console.log("_application balance var 1sec after:", balance);
//       }
//       console.log("No such document");
//     })
//     .catch(err => {
//       console.log("Error getting document: ", err);
//     });
//   console.log("_application, balance var: ", balance);
// };
