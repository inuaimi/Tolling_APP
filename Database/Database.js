import firebase from 'react-native-firebase';

export const db = firebase.database()

export const addItem = (item) => {
  db.ref('/test').push({
    name: item
  });
}