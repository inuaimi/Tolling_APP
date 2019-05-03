import firebase from 'react-native-firebase';

export const db = firebase.firestore()

export const addItem = (item) => {
  db.collection('test').add({
    name: item
  });
}