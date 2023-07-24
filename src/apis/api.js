import { instance, instanceWithToken } from "./axios";
import { getCookie } from "../utils/cookie";

export const signIn = async (data) => {
  const response = await instance.post("/account/signin/", data,
  {
    headers: {
      "Content-Type": "application/json",
      "X-CRSFToken": getCookie("crsftoken")
    },
    withCredentials: true
  }
  );
  if (response.status === 201) {
    console.log(response)
    window.location.href = "today/";
  } return response;
};

export const signUp = async (data) => {
  const response = await instance.post("/account/signup/", data,
  {
    headers: {
      "Content-Type": "application/json",
      "X-CRSFToken": getCookie("crsftoken")
    },
    withCredentials: true
  }
  );
  if (response.status === 201) {
    window.location.href = "today/";
  }
  return response;
};

export const getUserInfo = async (data) => {
  const response = await instanceWithToken.get("/account/mypage/", data);
  return response;
}

export const idDuplicationCheck = async (data) => {
  console.log(data);
  try {
    const response = await instance.get("/account/idduplicationcheck/", {
      params: data,
    });

    if (response.status === 200) {
      return false;
    } else if (response.status === 400) {
      console.log("중복된 아이디입니다.");
      return true;
    } else {
      console.log("Error");
      return true;
    }
  } catch (error) {
    console.error(error);
    return true;
  }
};

export const sendSMSAuth = async (data) => {
  const response = await instance.post("/account/smsauth/", data);
  try{
    return response;
  } catch (error) {
      console.error(error);
      return response;
    }
};

export const SMSAuthCheck = async (data) => {
  if(data.auth_number === "") data.auth_number = 0
  const response = await instance.get("/account/smsauth/", {
    params: data,
  });
  try{
    return response;
  } catch (error) {
    console.error(error);
    return response;
  }
};
