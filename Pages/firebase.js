// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
   apiKey: "AIzaSyAWcSmTcNZ22h8iZaBFxav3tMhA-UqalAo",
   authDomain: "clone-two-f110c.firebaseapp.com",
   projectId: "clone-two-f110c",
   storageBucket: "clone-two-f110c.appspot.com",
   messagingSenderId: "786093445139",
   appId: "1:786093445139:web:49decb6f8121ec7f9b6fe6",
   measurementId: "G-ZY2K7RK2N3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// db = Data Base
var db = firebase.firestore();