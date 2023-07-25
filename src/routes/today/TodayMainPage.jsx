import * as s from "./style";

import { TodayTabBar } from "../../components/tabBar";
import TodayPage from "./TodayPage";

const TodayMainPage = () => {
  return (
    <s.main>
        <TodayPage />
        <TodayTabBar />
    </s.main>
  );
};

export default TodayMainPage;
