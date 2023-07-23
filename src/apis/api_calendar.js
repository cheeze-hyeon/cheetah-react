import { instance, instanceWithToken } from "./axios";

//calendar 관련 API들

//------------------------------------------------------GOAL------------------------------------------------------//

//GET (활성화된 TAG에 한해서 Goal을 가져온다.)

//GOAL_LIST CalendarMainpage에서 해당하는 월에 속한 목표를 가져온다. month=2021-07
export const getGoalsinmonth = async (currentMonth) => {
  const response = await instanceWithToken.get("/goal/?month=" + currentMonth); //e.g /goal/?month=2023-07
  if (response.status === 200) {
    console.log("GET GOALS WITH THE MONTH SUCCESS");
  } else {
    console.log("[ERROR] error while getting goals with the month");
  }
  return response.data;
};

//GOAL_LIST CalendarDetailpage에서 해당하는 날짜에 속한 목표를 가져온다. date=2021-07-01
export const getGoalsindate = async (selectedDate) => {
  const response = await instanceWithToken.get("/goal/?date=" + selectedDate); //e.g /goal/?date=2023-07-01
  if (response.status === 200) {
    console.log("GET GOALS WITH THE DATE SUCCESS");
  } else {
    console.log("[ERROR] error while getting goals with the date");
  }
  return response.data;
};

//GOAL_LIST 서랍장 페이지에서 사용할 API. 사용자의 활성화된 태그에 담긴 모든 목표를 가져온다.

export const getAllGoals = async () => {
  const response = await instanceWithToken.get("/goal/");
  if (response.status === 200) {
    console.log("GET ALL GOALS SUCCESS");
  } else {
    console.log("[ERROR] error while getting all goals");
  }
  return response.data;
};

//GOAL_DETAIL 목표의 상세 정보를 가져온다.
export const getGoaldetail = async (goal_id) => {
  const response = await instanceWithToken.get("/goal/" + goal_id + "/");
  if (response.status === 200) {
    console.log("GET GOAL DETAIL SUCCESS");
  } else {
    console.log("[ERROR] error while getting goal detail");
  }
  return response.data;
};

//POST
// 캘린더에 추가하지 않을 일반 목표 생성.
export const createGoal = async (data) => {
  const response = await instanceWithToken.post("/goal/", data);
  if (response.status === 201) {
    console.log("CREATE GOAL SUCCESS");
  } else {
    console.log("[ERROR] error while creating goal");
  }
  return response.data;
};

//캘린더에 추가할 일정을 생성
export const createGoalwithCalendar = async (data) => {
  const response = await instanceWithToken.post(
    "/goal/?add_calendar=true",
    data
  );
  if (response.status === 201) {
    console.log("CREATE GOAL WITH CALENDAR SUCCESS");
  } else {
    console.log("[ERROR] error while creating goal with calendar");
  }
  return response.data;
};

//PATCH
//goal의 정보를 수정한다. 1. daily_check 2. add_calendar 3. roll_back.

//1. daily_check 하루에 배당된 목표를 완료한 사람이 발바닥을 클릭한 경우 daily_check를 true로 goal을 업데이트한다.
export const updateGoaldaily = async (goal_id, data) => {
  const response = await instanceWithToken.patch(
    "/goal/" + goal_id + "/",
    data
  );
  if (response.status === 200) {
    console.log("UPDATE GOAL SUCCESS");
  } else {
    console.log("[ERROR] error while updating goal");
  }
  return response.data;
};

//2. 목표를 새롭게 calendar에 추가하는 경우
export const updateGoalwithCalendar = async (goal_id, data) => {
  const response = await instanceWithToken.patch(
    "/goal/" + goal_id + "/?add_calendar=true",
    data
  );
  if (response.status === 200) {
    console.log("UPDATE GOAL WITH CALENDAR SUCCESS");
  } else {
    console.log("[ERROR] error while updating goal with calendar");
  }
  return response.data;
};

//3. roll_back해서 최근 데이터로 goal의 상세정보를 수정하고 싶을때 쓰인다. 체크 표시를 풀었을 때가 그 예시이다.
export const updateGoalwithRollback = async (goal_id, data) => {
  const response = await instanceWithToken.patch(
    "/goal/" + goal_id + "/?rollback=true",
    data
  );
  if (response.status === 200) {
    console.log("UPDATE GOAL WITH ROLLBACK SUCCESS");
  } else {
    console.log("[ERROR] error while updating goal with rollback");
  }
  return response.data;
};

//4. 목표 상세페이지에서 목표의 세부 내용을 수정하는 경우
export const updateGoalwithDetail = async (goal_id, data) => {
  const response = await instanceWithToken.patch(
    "/goal/" + goal_id + "/",
    data
  );
  if (response.status === 200) {
    console.log("UPDATE GOAL WITH DETAIL SUCCESS");
  } else {
    console.log("[ERROR] error while updating goal with detail");
  }
  return response.data;
};

//DELETE
//1. calendar에서만 빼내는 경우.
export const deleteGoal = async (goal_id) => {
  const response = await instanceWithToken.delete(
    "/goal/" + goal_id + "/?calendar_only=true"
  );
  if (response.status === 204) {
    console.log("TAKE OUT GOAL IN CALENDAR SUCCESS");
  } else {
    console.log("[ERROR] error while taking out the goal");
  }
  return response.data;
};

//2. 목표 자체룰 삭제하는 경우.
export const deleteGoalwithCalendar = async (goal_id) => {
  const response = await instanceWithToken.delete("/goal/" + goal_id + "/");
  if (response.status === 204) {
    console.log("DELETE GOAL SUCCESS");
  } else {
    console.log("[ERROR] error while deleting goal");
  }
  return response.data;
};

//-----------------------------------------------------History------------------------------------------------------//

//과거의 goal 별 기록을 가지고 있는다.

export const getHistoryinmonth = async (currentMonth) => {
  const response = await instanceWithToken.get(
    "/goal/history/?month=" + currentMonth //e.g /goal/history/?month=2023-07
  ); //e.g /goal/history/?month=2023-07
  if (response.status === 200) {
    console.log("GET RECORDED DAYS WITH THE MONTH SUCCESS");
  } else {
    console.log("[ERROR] error while getting recorded days with the month");
  }
  return response.data;
};

//------------------------------------------------------Impossible_dates------------------------------------------------------//

//GET
export const getImpossibleDates = async (goal_id) => {
  const response = await instanceWithToken.get(
    "goal/impossible_dates/" + goal_id + "/"
  );
  if (response.status === 200) {
    console.log("GET IMPOSSIBLE DATES SUCCESS");
  } else {
    console.log("[ERROR] error while getting impossible dates");
  }
  return response.data;
};

//POST
export const createImpossibleDate = async (goal_id, data) => {
  const response = await instanceWithToken.post(
    "/goal/impossible_dates/" + goal_id + "/",
    data
  );
  if (response.status === 201) {
    console.log("CREATE IMPOSSIBLE DATE SUCCESS");
  } else {
    console.log("[ERROR] error while creating impossible date");
  }
  return response.data;
};

//DELETE
export const deleteImpossibleDate = async (goal_id, data) => {
  const response = await instanceWithToken.delete(
    "/goal/impossible_dates/" + goal_id + "/",
    data
  );
  if (response.status === 204) {
    console.log("DELETE IMPOSSIBLE DATE SUCCESS");
  } else {
    console.log("[ERROR] error while deleting impossible date");
  }
  return response.data;
};

//------------------------------------------------------TODO------------------------------------------------------//

//POST
export const createTodo = async (data) => {
  const response = await instanceWithToken.post("/todo/", data);
  if (response.status === 201) {
    console.log("CREATE TODO SUCCESS");
  } else {
    console.log("[ERROR] error while creating todo");
  }
  return response.data;
};

//GET
//DELETE
export const deleteTodo = async (todo_id) => {
  const response = await instanceWithToken.delete("/todo/" + todo_id + "/");
  if (response.status === 204) {
    console.log("DELETE TODO SUCCESS");
  } else {
    console.log("[ERROR] error while deleting todo");
  }
  return response.data;
};

//PATCH

export const updateTodo = async (todo_id, data) => {
  const response = await instanceWithToken.patch(
    "/todo/" + todo_id + "/",
    data
  );
  if (response.status === 200) {
    console.log("UPDATE TODO SUCCESS");
  } else {
    console.log("[ERROR] error while updating todo");
  }
  return response.data;
};

//------------------------------------------------------TAG------------------------------------------------------//

//POST data={user,title,color,is_used}
export const createTag = async (data) => {
  const response = await instanceWithToken.post("/tag/", data);
  if (response.status === 201) {
    console.log("CREATE TAG SUCCESS");
  } else {
    console.log("[ERROR] error while creating tag");
  }
  return response.data;
};
//GET
export const getFilteredTags = async (data) => {
  const response = await instanceWithToken.get(
    "/tag/?filtered_tags=true",
    data
  );
  if (response.status === 200) {
    console.log("GET FILTERED TAGS SUCCESS");
  } else {
    console.log("[ERROR] error while getting filtered tags");
  }
  return response.data;
};

export const getAllTags = async () => {
  const response = await instanceWithToken.get("/tag/");
  if (response.status === 200) {
    console.log("GET ALL TAGS SUCCESS");
  } else {
    console.log("[ERROR] error while getting all tags");
  }
  return response.data;
};

export const getTagdetail = async (tag_id) => {
  const response = await instanceWithToken.get("/tag/" + tag_id + "/");
  if (response.status === 200) {
    console.log("GET TAG DETAIL SUCCESS");
  } else {
    console.log("[ERROR] error while getting tag detail");
  }
  return response.data;
};

//DELETE

export const deleteTag = async (tag_id) => {
  const response = await instanceWithToken.delete("/tag/" + tag_id + "/");
  if (response.status === 204) {
    console.log("DELETE TAG SUCCESS");
  } else {
    console.log("[ERROR] error while deleting tag");
  }
  return response.data;
};

//PATCH

export const updateTag = async (tag_id, data) => {
  const response = await instanceWithToken.patch("/tag/" + tag_id + "/", data);
  if (response.status === 200) {
    console.log("UPDATE TAG SUCCESS");
  } else {
    console.log("[ERROR] error while updating tag");
  }
  return response.data;
};
