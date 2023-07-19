const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyCwND8__eDdRcXCEv-gPkYjDQvlM2CVgOk",
  authDomain: "next-community-e1012.firebaseapp.com",
  databaseURL: "https://next-community-e1012-default-rtdb.firebaseio.com",
  projectId: "next-community-e1012",
  storageBucket: "next-community-e1012.appspot.com",
  messagingSenderId: "83359403964",
  appId: "1:83359403964:web:63b663fdeac5c41ddf25b9",
  measurementId: "G-BTMQR4WJC5",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

module.exports = { storage };
