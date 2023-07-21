import React, { useState } from "react";
import "tailwindcss/tailwind.css";


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
        boxShadow: isSelected
          ? "0px 0px 6px 0 rgba(0, 0, 0, 0.40)"
          : "none",
      }}
      onClick={handleClick}
    />
  );
};

const TagDetailwithColor = (props) => {
  const initialTagName = "어쩌구";
  const [tagName, setTagName] = useState(initialTagName);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  return (
    <div className="box-border flex flex-col justify-start items-end flex-grow-0 flex-shrink-0 w-[350px] h-[260px] gap-[18px]">
      <div className="box-border flex flex-col justify-start items-start flex-grow-0 flex-shrink-0">
        <div className="box-border flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[350px] gap-[5px]">
          <div className="box-border flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2.5">
            <div className="box-border flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2.5 px-[5px]">
              <p className="whitespace-pre-wrap flex-grow-0 flex-shrink-0 font-['Pretendard'] text-[15px] leading-[19px] font-medium text-left text-black">
                태그 이름
              </p>
            </div>
            <div className="box-border flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-[50px] px-[15px] rounded-lg bg-white border-2 border-neutral-100">
              <div className="box-border flex flex-col justify-center items-start flex-grow basis-full h-[19px] gap-2.5">
                <div className="box-border flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5">
                  <input
                  type="text"
                  className="flex-grow-0 flex-shrink-0 font-['Pretendard'] text-[15px] leading-[19px] font-medium text-left text-black bg-transparent outline-none"
                  placeholder="태그 이름"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)} // Update the state as the user types
                />
                </div>
              </div>
            </div>
          </div>
          <div className="box-border flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5 px-[5px]">
            <p className="whitespace-pre-wrap flex-grow font-['Pretendard'] text-[13px] leading-[19px] text-left text-[#f19a37]">
              *같은 이름의 태그가 이미 있어요!
            </p>
          </div>
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
            {colors.slice(0, 6).map((color) => (
              <ColorChoose
                key={color}
                color={color}
                isSelected={selectedColor === color}
                onSelect={setSelectedColor}
              />
            ))}
          </div>
          <div className="box-border w-full flex justify-center items-center flex-grow-0 flex-shrink-0 gap-[25px]">
            {colors.slice(6).map((color) => (
              <ColorChoose
                key={color}
                color={color}
                isSelected={selectedColor === color}
                onSelect={setSelectedColor}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagDetailwithColor;