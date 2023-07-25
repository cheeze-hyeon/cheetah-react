import { HeaderBack } from "../../components/header/styled";
import today_cheetah from "../../asset/images/today_cheetah.png";
import clock from "../../asset/images/clock.png"
import { TitleHeavy, TitleNormal } from "../../components/text/styled";
import { MySlimButtonActive } from "./styled";


const MyPage = () => {
  return (
    <div className="h-full bg-[#f5f5f5]">
      <HeaderBack text="마이 페이지"></HeaderBack>
      <div className="py-[20px] px-[50px] flex flex-col gap-[25px]">
        <div className="flex flex-row m-auto">
          <TitleNormal>오민</TitleNormal>
          <TitleNormal>님의 치타</TitleNormal>
        </div>
        <img src={today_cheetah} alt="face" className="w-[216px] m-auto" />
        <div className="flex flex-row m-auto">
          <TitleNormal>이번 달 치타가</TitleNormal>
          <TitleNormal className="text-[#f19a37]"> 25h</TitleNormal>
          <TitleNormal> 달렸어요!</TitleNormal>
        </div>
        <div>

        </div>
        <MySlimButtonActive color="#FFE39A" text="치타 꾸미러 가기😎"></MySlimButtonActive>
      </div>
      <div className="py-[20px] px-[50px] flex flex-col gap-[25px]">
        <img src={clock} alt="face" className="w-[93px] m-auto" />
        <div className="flex flex-row m-auto">
          <TitleNormal>현재 제한속도</TitleNormal>
          <TitleNormal className="text-[#f19a37]"> 6h/day</TitleNormal>
        </div>
        <div>
        </div>
        <MySlimButtonActive color="#EAEEF1" text="내 정보 수정하기" to="/edit"></MySlimButtonActive>
      </div>
    </div>
  );
};

export default MyPage;
