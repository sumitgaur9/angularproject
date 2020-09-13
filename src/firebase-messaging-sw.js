importScripts('https://www.gstatic.com/firebasejs/7.20.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.20.0/firebase-messaging.js');

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