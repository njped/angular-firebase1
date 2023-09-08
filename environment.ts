// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAYYLv3cuK4p1hkx3xkh67_Wfg2ZhjRZ-4",
//   authDomain: "angular-firebase-example-70a8c.firebaseapp.com",
//   projectId: "angular-firebase-example-70a8c",
//   storageBucket: "angular-firebase-example-70a8c.appspot.com",
//   messagingSenderId: "492197946838",
//   appId: "1:492197946838:web:07bd108dad3bb607637077",
//   measurementId: "G-0WMNLK00T4"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const environment = {
  production: false,
  firebase: {
    apiKey:  "AIzaSyAYYLv3cuK4p1hkx3xkh67_Wfg2ZhjRZ-4",
    authDomain: "angular-firebase-example-70a8c.firebaseapp.com",
    projectId: "angular-firebase-example-70a8c",
    storageBucket:  "angular-firebase-example-70a8c.appspot.com",
    messagingSenderId: "492197946838",
  }
};