import { HeaderTagModal } from "../../../components/header/styled";
import { TagCreateModalContainer } from "../Tag/styled";
import { TextNormal } from "../../../components/text/styled";
import {
  InputTextFieldActive,
  AlertLabel,
} from "../../../components/input/styled";
import { useState } from "react";
import {
  ColorBtnDefault,
  LargeButtonActive,
} from "../../../components/button/styled";

export const TagCreateModal = (onClose) => {
  const [newTagTitle, setNewTagTitle] = useState("");
  const [tagDuplicationCheck, setTagDuplicationCheck] = useState(false);

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

  const [selectedColor, setSelectedColor] = useState(null);
  const handleColorClick = (color) => {
    console.log("클릭!");
    setSelectedColor(color);
  };

  return (
    <TagCreateModalContainer className="flex flex-col gap-[30px]">
      <HeaderTagModal
        text="태그 추가"
        className="mt-[20px]"
        onClose={onClose}
      ></HeaderTagModal>
      <div className="flex flex-col gap-y-[18px] m-auto">
        <div className="flex flex-col gap-y-[10px]">
          <TextNormal className="px-[5px]">태그 이름</TextNormal>
          <InputTextFieldActive
            placeholder="태그 이름"
            type="text"
            value={newTagTitle}
            onChange={(e) => setNewTagTitle(e.target.value)}
          ></InputTextFieldActive>
          {tagDuplicationCheck ? (
            <AlertLabel>*같은 이름의 태그가 이미 있어요!</AlertLabel>
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-col gap-y-[10px] m-atuo">
          <TextNormal className="px-[5px]">태그 색상</TextNormal>
          <div className="flex flex-wrap gap-x-[18px] gap-y-[10px] px-[23px]">
            {colors.map((color) => (
              <ColorBtnDefault
                color={color}
                onClick={() => handleColorClick(color)}
                isSelected={color.isSelected}
              />
            ))}
          </div>
        </div>
      </div>
      <LargeButtonActive text="추가하기" backgroundColor="#F19A37" />
    </TagCreateModalContainer>
  );
};

export const TagUpdateModal = (onClose) => {
  const [newTagTitle, setNewTagTitle] = useState("");
  const [tagDuplicationCheck, setTagDuplicationCheck] = useState(false);

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

  const [selectedColor, setSelectedColor] = useState(null);
  const handleColorClick = (color) => {
    console.log("클릭!");
    setSelectedColor(color);
  };

  return (
    <TagCreateModalContainer className="flex flex-col gap-[30px]">
      <HeaderTagModal
        text="태그 수정"
        className="mt-[20px]"
        onClose={onClose}
      ></HeaderTagModal>
      <div className="flex flex-col gap-y-[18px] m-auto">
        <div className="flex flex-col gap-y-[10px]">
          <TextNormal className="px-[5px]">태그 이름</TextNormal>
          <InputTextFieldActive
            placeholder="태그 이름"
            // defaultvalue={} // api로 받아오기
            type="text"
            value={newTagTitle}
            onChange={(e) => setNewTagTitle(e.target.value)}
          ></InputTextFieldActive>
          {tagDuplicationCheck ? (
            <AlertLabel>*같은 이름의 태그가 이미 있어요!</AlertLabel>
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-col gap-y-[10px] m-atuo">
          <TextNormal className="px-[5px]">태그 색상</TextNormal>
          <div className="flex flex-wrap gap-x-[18px] gap-y-[10px] px-[23px]">
            {colors.map((color) => (
              <ColorBtnDefault
                color={color}
                onClick={() => handleColorClick(color)}
                isSelected={color.isSelected}
              />
            ))}
          </div>
        </div>
      </div>
      <LargeButtonActive text="추가하기" backgroundColor="#F19A37" />
    </TagCreateModalContainer>
  );
};
