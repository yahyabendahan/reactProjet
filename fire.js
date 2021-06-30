import firebase from 'firebase';

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyBo-vlOgWa9rAeFAQY8B-pvRwyIW_w0npE",
    authDomain: "firstreact1.firebaseapp.com",
    projectId: "firstreact1",
    storageBucket: "firstreact1.appspot.com",
    messagingSenderId: "163291580541",
    appId: "1:163291580541:web:edcea51494ce9b46230914"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

export default fire ;

