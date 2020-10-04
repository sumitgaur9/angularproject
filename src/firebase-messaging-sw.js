importScripts('https://www.gstatic.com/firebasejs/7.20.0/firebase-app.js');// should be same as version specified in package.json
importScripts('https://www.gstatic.com/firebasejs/7.20.0/firebase-messaging.js'); // should be same as version specified in package.json

firebase.initializeApp({
    apiKey: "AIzaSyClG70mchAMak7Y3iJi-RfZsOQWcG52oWw",
    authDomain: "healthcare-app-6025d.firebaseapp.com",
    databaseURL: "https://healthcare-app-6025d.firebaseio.com",
    projectId: "healthcare-app-6025d",
    storageBucket: "healthcare-app-6025d.appspot.com",
    messagingSenderId: "571179537480",
    appId: "1:571179537480:web:23ead2864f7c7933fc747d",
    measurementId: "G-LXVLR8JQ89"
});
const messaging = firebase.messaging();

//for testing message to specific user
messaging.getToken().then((currentToken) => {
    if (currentToken) {
      sendTokenToServer(currentToken);
      updateUIForPushEnabled(currentToken);
    } else {
      // Show permission request.
      console.log('No Instance ID token available. Request permission to generate one.');
      // Show permission UI.
      updateUIForPushPermissionRequired();
      setTokenSentToServer(false);
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    showToken('Error retrieving Instance ID token. ', err);
    setTokenSentToServer(false);
  });