const goals = [
  {
    id: 1,
    user_id: 1,
    tag_id: 1,
    title: "죽과이 중간고사",
    start_at: "2023-05-14",
    finish_at: "2023-05-27", //14일짜리 계획
    update_at: "2023-05-20",
    estimated_time: 24,
    cumulative_time: 10,
    progress_rate: 0.5,
    is_scheduled: 0,
    is_completed: 0,
    available_days: [0, 5, 6],
    exception_list: [0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0], //날짜가 추가되는거 array형태로-maxsize
    //available_days땜에 원래[0,1,1,1,0,0,0,0,1,1,1,0,0,0]
    //음 그럼 제외 날 말고 걍 available_days로 셋팅되어있는 이런 형태가 낫지 않나
  },
  {
    id: 2,
    user_id: 1,
    tag_id: 1,
    title: "죽과이 중간발표",
    start_at: "2023-06-14",
    finish_at: "2023-06-28", //14일짜리 계획
    update_at: "2023-06-20",
    estimated_time: 24,
    cumulative_time: 10,
    progress_rate: 0.7,
    is_scheduled: 1,
    is_completed: 0,
    available_days: [0, 5, 6],
    exception_list: [0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0],
    //available_days땜에 원래[0,1,1,1,0,0,0,0,1,1,1,0,0,0]
    //음 그럼 제외 날 말고 걍 available_days로 셋팅되어있는 이런 형태가 낫지 않나
  },
  {
    id: 3,
    user_id: 1,
    tag_id: 4,
    title: "콘크리트과제4",
    start_at: "2023-07-14",
    finish_at: "2023-08-16",
    update_at: "2023-07-16",
    estimated_time: 17,
    cumulative_time: 7,
    progress_rate: 0.85,
    is_scheduled: 1,
    is_completed: 0,
    available_days: [0, 5, 6],
    exception_list: [0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0],
    //available_days땜에 원래[0,1,1,1,0,0,0,0,1,1,1,0,0,0]
    //음 그럼 제외 날 말고 걍 available_days로 셋팅되어있는 이런 형태가 낫지 않나
  },
  {
    id: 4,
    user_id: 1,
    tag_id: 2,
    title: "심개 중간고사",
    start_at: "2023-09-14",
    finish_at: "2023-09-27", //14일짜리 계획
    update_at: "2023-09-16",
    estimated_time: 14,
    cumulative_time: 10,
    progress_rate: 0.9,
    is_scheduled: 1,
    is_completed: 0,
    available_days: [0, 5, 6],
    exception_list: [0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0],
    //available_days땜에 원래[0,1,1,1,0,0,0,0,1,1,1,0,0,0]
    //음 그럼 제외 날 말고 걍 available_days로 셋팅되어있는 이런 형태가 낫지 않나
  },
  {
    id: 5,
    user_id: 1,
    tag_id: 2,
    title: "심개 기말고사",
    start_at: "2023-10-1",
    finish_at: "2023-10-27",
    update_at: "2023-10-12",
    estimated_time: 104,
    cumulative_time: 60,
    progress_rate: 0.0,
    is_scheduled: 1,
    is_completed: 0,
    available_days: [0, 5, 6],
    exception_list: [0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0],
    //available_days땜에 원래[0,1,1,1,0,0,0,0,1,1,1,0,0,0]
    //음 그럼 제외 날 말고 걍 available_days로 셋팅되어있는 이런 형태가 낫지 않나
  },
  {
    id: 6,
    user_id: 1,
    tag_id: 3,
    title: "음속철 기말고사2",
    start_at: "2023-10-1",
    finish_at: "2023-10-27",
    update_at: "2023-10-12",
    estimated_time: 104,
    cumulative_time: 60,
    progress_rate: 0.0,
    is_scheduled: 1,
    is_completed: 0,
    available_days: [0, 5, 6],
    exception_list: [0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0],
  },
];

export default goals;