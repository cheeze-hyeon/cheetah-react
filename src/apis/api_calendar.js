import { instance, instanceWithToken } from "./axios";

//calendar 관련 API들
//GET
//해당하는 month에 속한 goals를 가져온다.
export const getGoalsinmonth = async (currentMonth) => {
  const response = await instanceWithToken.get("/goal/?month=" + currentMonth); //e.g /goal/?month=2023-07
  if (response.status === 200) {
    console.log("GET GOALS WITH THE MONTH SUCCESS");
  } else {
    console.log("[ERROR] error while getting goals with the month");
  }
  return response.data;
};

//해당하는 month 중에서 과거의 days들 중 사용자의 기록이 담긴 날들을 가져온다.

export const getHistoryinmonth = async (currentMonth) => {
  const response = await instanceWithToken.get(
    "/goal/history/?month=" + currentMonth
  ); //e.g /goal/history/?month=2023-07
  if (response.status === 200) {
    console.log("GET RECORDED DAYS WITH THE MONTH SUCCESS");
  } else {
    console.log("[ERROR] error while getting recorded days with the month");
  }
  return response.data;
};

//POST
//캘린더에는 추가하지 않을 새로운 goal을 생성한다.

/* model of goal
user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
tag = models.ForeignKey(Tag, on_delete=models.CASCADE, null=False)
title = models.CharField(max_length=200, null=False)

start_at = models.DateField(null=True, blank=True)
finish_at = models.DateField(null=True, blank=True)
update_at = models.DateField(null=True, blank=True)
prev_update_at = models.DateField(null=True, blank=True)  # for backup

estimated_time = models.FloatField(null=True, blank=True)
residual_time = models.FloatField(null=True, blank=True)
prev_residual_time = models.FloatField(null=True, blank=True)  # for backup
cumulative_time = models.FloatField(null=True, blank=True)
prev_cumulative_time = models.FloatField(null=True, blank=True)  # for backup

progress_rate = models.FloatField(null=True, blank=True)
prev_progress_rate = models.FloatField(null=True, blank=True)  # for backup
is_scheduled = models.BooleanField(default=False, blank=True)
is_completed = models.BooleanField(default=False, blank=True)


*/
export const createGoal = async (data) => {
  const response = await instanceWithToken.post("/goal/", data);
  if (response.status === 201) {
    console.log("CREATE GOAL SUCCESS");
  } else {
    console.log("[ERROR] error while creating goal");
  }
  return response.data;
};

//캘린더에 추가할 goal을 생성한다.
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
//goal의 정보를 수정한다.
export const updateGoal = async (goal_id, data) => {
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
