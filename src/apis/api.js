import { instance, instanceWithToken } from "./axios";

export const signIn = async (data) => {
  const response = await instance.post("/account/signin/", data);
  if (response.status === 201) {
    window.location.href = "today/";

  } return response;
};

export const signUp = async (data) => {
  const response = await instance.post("/account/signup/", data);
  if (response.status === 201) {
    window.location.href = "today/";

  }
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
}