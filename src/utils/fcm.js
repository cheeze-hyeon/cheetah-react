import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useState, useEffect } from "react";
import { postFCMToken } from "../apis/api";
import vapidconfig from "../config";
const config = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
  //프로젝트 설정 > 일반 > 하단의 내앱에서 확인
};

const app = initializeApp(config);
const messaging = getMessaging();

//토큰값 얻기
const vapidKey = vapidconfig.vapidKey;
const token = getToken(messaging, {
  vapidKey: vapidKey,
  //"프로젝트설정 > 클라우드메시징 > 웹 구성의 웹푸시인증서 발급",
})
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // …
      console.log(currentToken);
      const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      };
    
      // AccessToken과 RefreshToken을 쿠키에서 가져옵니다.
      const accessToken = getCookie('accessToken');
      const refreshToken = getCookie('refreshToken');
    
      // AccessToken과 RefreshToken이 존재할 때만 postFCMToken 함수를 실행합니다.
      useEffect(() => {
        if (accessToken || refreshToken) {
          const currentToken = accessToken || refreshToken;
          postFCMToken({ token: currentToken });
        } else {
          console.log('AccessToken 또는 RefreshToken이 없습니다.');
        }
      }, [accessToken, refreshToken]);    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
      // …
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    // …
  });
//포그라운드 메시지 수신

onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  // …
});
