import { instance, instanceWithToken } from "./axios";
import { getCookie, removeCookie } from "../utils/cookie";

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

export const getUserInfo = async () => {
  const response = await instanceWithToken.get("/account/mypage/");
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
export const findId = async (data) => {
  const response = await instance.get("/account/findid/", {
    params: data,
  });
  try{
    return response;
  } catch (error) {
    console.error(error);
    return response;
  }
}
export const findPassword = async (data) => {
  const response = await instance.get("/account/findpassword/", {
    params: data,
  });
  try{
    return response;
  } catch (error) {
    console.error(error);
    return response;
  }
}

export const changePassword = async (data) => {
  const response = await instance.patch("/account/findpassword/", data);
  try{
    return response;
  } catch (error) {
    console.error(error);
    return response;
  }
}

export const refreshToken = async (token) => {
  const response = await instance.post("/account/refresh/", { refresh: token });
  if (response.status === 200) {
    console.log("REFRESH TOKEN SUCCESS");
  } else {
    console.log("[ERROR] error while refreshing token");
  }
};

export const logOut = async(token) => {
  const response = await instanceWithToken.post("/account/logout/",{
    "refresh" : token,
  });

  if (response.status === 204){
    console.log("REFRESH TOKEN SUCCESS");
    removeCookie("refresh_token");
    removeCookie("access_token");


  }else {
    console.log("[ERROR] error while refreshing token");
  }
};

export const patchUserInfo = async(data) => {
  const response = await instanceWithToken.patch("/account/mypage/",data );
  try{
    return response;
  } catch (error) {
      console.error(error);
      return response;
    }
}