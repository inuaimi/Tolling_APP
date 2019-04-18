import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDx0yskaCRk_k1oTeOOvNBWofMuq20Vlu8",
    authDomain: "tolling-app-49aef.firebaseapp.com",
    databaseURL: "https://tolling-app-49aef.firebaseio.com",
    projectId: "tolling-app-49aef",
    storageBucket: "tolling-app-49aef.appspot.com",
    messagingSenderId: "286771929477"
  };

  export default class Firebase {
      static auth;

      static registrationInfo = {
          displayName: '',
          email: ''
      }

      static init(){
        firebase.initializeApp(config);
        Firebase.auth = firebase.auth();
      }
  }

  export { Firebase };