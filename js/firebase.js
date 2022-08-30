const firebaseConfig = {
  apiKey: "AIzaSyCNH8cBxeb_jPLyjfIPWxG_he4DkumhSx0",
  authDomain: "to-do-live-f60e9.firebaseapp.com",
  projectId: "to-do-live-f60e9",
  storageBucket: "to-do-live-f60e9.appspot.com",
  messagingSenderId: "161673846819",
  appId: "1:161673846819:web:319ecdf6b7098817829196"
};

firebase.initializeApp(firebaseConfig)

let db = firebase.firestore()
