import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import { TextLight } from "../../../../components/text/styled";
import { getAllTags } from "../../../../apis/api_calendar";
const colors = [
  "#dc8686",
  "#eda855",
  "#edc845",
  "#73b269",
  "#65a4bf",
  "#8a73b8",
  "#dc575e",
  "#b77d54",
  "#c9b25f",
  "#bdcc60",
  "#7295ef",
  "#b164b8",
];

const ColorChoose = ({ color, onSelect, isSelected }) => {
  const handleClick = () => {
    onSelect(color);
  };

  return (
    <button
      className={`flex-grow-0 flex-shrink-0 w-[27px] h-[27px] rounded-sm ${
        isSelected ? "border-2 border-white" : "border-0"
      }`}
      style={{
        backgroundColor: color,
        borderRadius: isSelected ? "2px" : "0",
        boxShadow: isSelected ? "0px 0px 6px 0 rgba(0, 0, 0, 0.40)" : "none",
      }}
      onClick={handleClick}
    />
  );
};

const TagDetailwithColor = ({
  setTitle,
  setColor,
  setIs_used,
  title,
  color,
  is_used,
}) => {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const getAllTagsAPI = async () => {
      const response = await getAllTags();
      console.log("tag", response);
      setTags(response);
    };
    getAllTagsAPI();
  }, []);

  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const isDuplicate = checkForDuplicateTag(title);
      setShowDuplicateWarning(isDuplicate);
    }
  };

  const checkForDuplicateTag = (name) => {
    // tag 데이터의 태그 이름과 입력된 태그 이름을 비교하여 중복을 체크합니다.
    if (tags.length === 0) return false;
    return tags.some((tag) => tag.title === name);
  };

  return (
    <div className="box-border flex flex-col justify-start items-end flex-grow-0 flex-shrink-0 w-[350px] h-[260px] gap-[18px]">
      <div className="box-border flex flex-col justify-start items-start flex-grow-0 flex-shrink-0">
        <div className="box-border flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[350px] gap-[5px]">
          <div className="box-border flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2.5">
            <div className="box-border flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2.5 px-[5px]">
              <p className="whitespace-pre-wrap flex-grow-0 flex-shrink-0 font-['Pretendard'] text-[15px] leading-[19px] font-normal text-left text-black">
                태그 이름
              </p>
            </div>
            <div className="box-border flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-[50px] px-[15px] rounded-lg bg-white border-2 border-neutral-100">
              <div className="box-border flex flex-col justify-center items-start flex-grow basis-full h-[19px] gap-2.5">
                <div className="box-border flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5">
                  <input
                    type="text"
                    className="flex-grow-0 flex-shrink-0 font-['Pretendard'] text-[15px] leading-[19px] font-normal text-left text-black bg-transparent outline-none"
                    placeholder="태그 이름"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={
                      handleKeyDown
                    } /* 이제 handleKeyDown 함수를 사용하여 엔터 키 이벤트 처리 */
                  />
                </div>
              </div>
            </div>
          </div>
          {/* 경고 메시지를 보여주기 위한 요소 */}
          {showDuplicateWarning && (
            <div className="box-border flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5 px-[5px]">
              <TextLight className="text-[#f19a37]">
                *같은 이름의 태그가 이미 있어요!
              </TextLight>
            </div>
          )}
        </div>
      </div>
      <div className="box-border flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2.5">
        <div className="box-border flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2.5 px-[5px]">
          <p className="whitespace-pre-wrap flex-grow-0 flex-shrink-0 font-['Pretendard'] text-[15px] leading-[19px] font-medium text-left text-black">
            태그 색상
          </p>
        </div>
        <div className="box-border flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 gap-4 py-2.5 bg-white">
          <div className="box-border w-full flex justify-center items-center flex-grow-0 flex-shrink-0 gap-[25px]">
            {/* Render the color options in two rows */}
            {colors.slice(0, 6).map((color_) => (
              <ColorChoose
                key={color_}
                color={color_}
                isSelected={color === color_}
                onSelect={setColor}
              />
            ))}
          </div>
          <div className="box-border w-full flex justify-center items-center flex-grow-0 flex-shrink-0 gap-[25px]">
            {colors.slice(6).map((color_) => (
              <ColorChoose
                key={color_}
                color={color_}
                isSelected={color === color_}
                onSelect={setColor}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagDetailwithColor;
