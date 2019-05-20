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
export const deleteUserVehicle = (vehicle, uid) => {
  db.collection("Users")
    .doc(uid)
    .update({
      vehicles: firebase.firestore.FieldValue.arrayRemove(vehicle)
    });
};

export const editUserEmail = (email, uid) => {
  db.collection("Users")
    .doc(uid)
    .update({
      email: email
    });
};

export const addUserVehicle = (licensePlate, type, uid) => {
  db.collection("Users")
    .doc(uid)
    .update({
      vehicles: firebase.firestore.FieldValue.arrayUnion({
        licensePlate: licensePlate,
        type: type
      })
    });
};

export const createUser = (uid, name, email, vehicle, license, balance) => {
  var userIdRef = db.collection("Users").doc(uid);
  userIdRef.set({
    uid: uid,
    name: name,
    email: email,
    vehicles: [
      {
        type: vehicle,
        licensePlate: license
      }
    ],
    balance: balance
  });
};

export const addUserMoney = (amount, uid) => {
  db.collection('Users').doc(uid).update({
    balance: amount
  });
}

export const addUserTransaction = (gantry, uid) => {
  const date = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const hours = new Date().getHours();
  const min = new Date().getMinutes();
  const sec = new Date().getSeconds();
  const dateTime = {
    date: date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec
  }
  db.collection('Users').doc(uid).update({
    transactions: firebase.firestore.FieldValue.arrayUnion({
      cost: gantry.cost,
      date: dateTime.date,
      gantry: gantry.title
    })
  });
};
