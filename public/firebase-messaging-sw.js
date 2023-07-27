importScripts("https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js"
);

const config = {
  apiKey: "AIzaSyDz_W39ss-3RtifjYX_wxcrK87P6U58-Ao",
  authDomain: "cheetah-54f27.firebaseapp.com",
  projectId: "cheetah-54f27",
  storageBucket: "cheetah-54f27.appspot.com",
  messagingSenderId: "152855262054",
  appId: "1:152855262054:web:9dbcf78dab7a4e662e4ea7",
  measurementId: "G-6H7E7HQMK0"
};

// Initialize Firebase
firebase.initializeApp(config);

const messaging = firebase.messaging();

//백그라운드 서비스워커 설정
messaging.onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: payload,
    icon: "/firebase-logo.png",
  };
  
  self.registration.showNotification(notificationTitle, notificationOptions);
});