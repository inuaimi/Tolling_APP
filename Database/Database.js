import firebase from 'react-native-firebase';

export const db = firebase.firestore()

export const addItem = (item) => {
  db.collection('test').add({
    name: item
  });
}

// export const getItem = (collection) => {
//   // db.collection(collection).get().then((doc) => {
//   //   if(doc.)
//   // })
//   try {
//     const doc = db.doc.(collection).get();
    
//     if(doc.exists) {
//       return doc.data();
//     } else {
//       console.log("No such document.")
//     }
//   } catch {
//     console.log("Error getting document.")
//   }
// }