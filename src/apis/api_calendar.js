import { instance, instanceWithToken } from "./axios";

//calendar 관련 API들
//해당하는 month에 속한 goals를 가져온다.
export const getGoalsinmonth = async (year, currentMonth) => {
  const response = await instanceWithToken.get("/goal/?month=" + currentMonth);
  if (response.status === 200) {
    console.log("GET GOALS WITH THE MONTH SUCCESS");
  } else {
    console.log("[ERROR] error while getting goals with the month");
  }
  return response.data;
};

// Mypage 관련 API들
export const getUserPage = async () => {
  const response = await instanceWithToken.get("/account/mypage/");
  if (response.status === 200) {
    console.log("GET USERPAGE SUCCESS");
  } else {
    console.log("[ERROR] error while updating comment");
  }
  return response.data;
};

export const updateUserPage = async (data) => {
  const response = await instanceWithToken.patch("/account/mypage/", data);
  if (response.status === 200) {
    console.log("UPDATE USERPAGE SUCCESS");
  } else {
    console.log("[ERROR] error while updating comment");
  }
  return response.data;
};

export const getUserPost = async () => {
  const response = await instanceWithToken.get("/post/mypage/");
  if (response.status === 200) {
    console.log("GET USERPOST SUCCESS");
  } else {
    console.log("[ERROR] error while getting userpost");
  }
  return response.data;
};

// Post 관련 API들
export const getPosts = async () => {
  const response = await instance.get("/post/");
  return response.data;
};

export const getPost = async (id) => {
  const response = await instance.get(`/post/${id}/`);
  return response.data;
};

export const createPost = async (data, navigate) => {
  const response = await instanceWithToken.post("/post/", data);
  if (response.status === 201) {
    console.log("POST SUCCESS");
    navigate("/");
  } else {
    console.log("[ERROR] error while creating post");
  }
};

export const updatePost = async (id, data, navigate) => {
  const response = await instanceWithToken.patch(`/post/${id}/`, data);
  if (response.status === 200) {
    console.log("POST UPDATE SUCCESS");
    navigate("/");
  } else {
    console.log("[ERROR] error while updating post");
  }
};

//과제!!
export const deletePost = async (postId) => {
  const response = await instanceWithToken.delete(`/post/${postId}/`);
  if (response.status === 204) {
    console.log("Delete success");
  } else {
    console.log("[ERROR] error while deleting post");
  }
};
//과제!!
export const likePost = async (postId) => {
  const response = await instanceWithToken.post(`/post/${postId}/like/`);
  if (response.status === 200) {
    console.log("likepost success");
  } else {
    console.log("[ERROR] error while liking post");
  }
  return response.data;
};

// Tag 관련 API들
export const getTags = async () => {
  const response = await instance.get("/tag/");
  return response.data;
};

export const createTag = async (data) => {
  const response = await instanceWithToken.post("/tag/", data);
  if (response.status === 201) {
    console.log("TAG SUCCESS");
  } else {
    console.log("[ERROR] error while creating tag");
  }
  return response; // response 받아서 그 다음 처리
};

// Comment 관련 API들
export const getComments = async (postId) => {
  const response = await instance.get(`/comment/?post=${postId}`);
  return response.data;
};

export const createComment = async (data) => {
  const response = await instanceWithToken.post("/comment/", data);
  if (response.status === 201) {
    console.log("COMMENT SUCCESS");
  } else {
    console.log("[ERROR] error while creating comment");
  }
  return response.data;
};

export const updateComment = async (id, data) => {
  const response = await instanceWithToken.patch(`/comment/${id}/`, data);
  if (response.status === 200) {
    console.log("COMMENT UPDATE SUCCESS");
    window.location.reload();
  } else {
    console.log("[ERROR] error while updating comment");
  }
};

//과제!!
export const deleteComment = async (id) => {
  const response = await instanceWithToken.delete(`/comment/${id}/`);
  if (response.status === 204) {
    console.log("Comment delete success");
  } else {
    console.log("[ERROR] error while deleting comment");
  }
};
