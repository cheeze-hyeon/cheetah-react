import { instance, instanceWithToken } from "./axios";
import { getCookie, removeCookie } from "../utils/cookie";

export const signIn = async (data) => {
  const response = await instance.post("/account/signin/", data, {
    headers: {
      "Content-Type": "application/json",
      "X-CRSFToken": getCookie("crsftoken"),
    },
    withCredentials: true,
  });
  if (response.status === 201) {
    console.log(response);
    window.location.href = "today/";
  }
  return response;
};

export const signUp = async (data) => {
  const response = await instance.post("/account/signup/", data, {
    headers: {
      "Content-Type": "application/json",
      "X-CRSFToken": getCookie("crsftoken"),
    },
    withCredentials: true,
  });
  if (response.status === 201) {
    window.location.href = "today/";
  }
  return response;
};

export const getUserInfo = async () => {
  //계정 정보 받아옴(HomePage, MyPage)
  const response = await instanceWithToken.get("/account/mypage/");
  return response;
};

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
  try {
    return response;
  } catch (error) {
    console.error(error);
    return response;
  }
};

export const SMSAuthCheck = async (data) => {
  //인증번호 발송
  if (data.auth_number === "") data.auth_number = 0;
  const response = await instance.get("/account/smsauth/", {
    params: data,
  });
  try {
    return response;
  } catch (error) {
    console.error(error);
    return response;
  }
};
export const findId = async (data) => {
  //전화번호, 인증번호 보내서 해당하는 계정 있으면 아이디 받아옴
  const response = await instance.get("/account/findid/", {
    params: data,
  });
  try {
    return response;
  } catch (error) {
    console.error(error);
    return response;
  }
};
export const findPassword = async (data) => {
  //전화번호, 인증번호, 아이디 보내서 해당하는 계정 있는지 확인
  const response = await instance.get("/account/findpassword/", {
    params: data,
  });
  try {
    return response;
  } catch (error) {
    console.error(error);
    return response;
  }
};

export const changePassword = async (data) => {
  //특정 계정의 비밀번호 변경(비밀번호 찾기에서)
  const response = await instance.patch("/account/findpassword/", data);
  try {
    return response;
  } catch (error) {
    console.error(error);
    return response;
  }
};

export const refreshToken = async (token) => {
  //토큰 재발급
  const response = await instance.post("/account/refresh/", { refresh: token });
  if (response.status === 200) {
    console.log("REFRESH TOKEN SUCCESS");
  } else {
    console.log("[ERROR] error while refreshing token");
  }
};

export const logOut = async (token) => {
  //로그아웃
  const response = await instanceWithToken.post("/account/logout/", {
    refresh: token,
  });

  if (response.status === 204) {
    console.log("REFRESH TOKEN SUCCESS");
    removeCookie("refresh_token");
    removeCookie("access_token");
  } else {
    console.log("[ERROR] error while refreshing token");
  }
  localStorage.removeItem("filtered_tag_id");
};

export const patchUserInfo = async (data) => {
  //계정 정보 변경
  const response = await instanceWithToken.patch("/account/mypage/", data);
  try {
    return response;
  } catch (error) {
    console.error(error);
    return response;
  }
};
