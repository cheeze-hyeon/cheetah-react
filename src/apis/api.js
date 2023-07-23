import { instance, instanceWithToken } from "./axios";

import { getCookie } from "../utils/cookie";

const handleSignUpSubmit = async (e) => {
  e.preventDefault();
  const response = await axios.post(
    "http://localhost:8000/api/account/signup/",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      withCredentials: true,
    }
  );
  console.log("Response: ", response);

  // console.log(formData);
  // alert(`${formData.email}로 회원가입 해 줘`);
  // add api call for sign up here
};

const handleSignInSubmit = async (e) => {
  e.preventDefault();
  const response = await axios.post(
    "http://localhost:8000/api/account/signin/",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      withCredentials: true,
    }
  );
  console.log(response);

  // console.log(formData);
  // alert("로그인 완 료!");
  // add api call for sign in here
};
