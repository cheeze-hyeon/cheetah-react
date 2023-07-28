import React from "react";
import "tailwindcss/tailwind.css";
import TagModalHeader from "./TagModalheader";
import TagDetailwithColor from "./TagDetailwithColor";
import { SlimButtonActive } from "../../../../components/button/styled";
import { createTag, updateTag } from "../../../../apis/api_calendar";
import { useState } from "react";
import { TextLight } from "../../../../components/text/styled";
import * as s from "../../../calendar/goal-create/styled";

export const TagCreateModal = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#F19A37");
  const [is_used, setIs_used] = useState(true); // 추가: 숨기는 상태를 추가합니다.
  const [titleError, setTitleError] = useState("");

  const createTagAPI = async () => {
    if (title === "") {
      console.log("title is empty");
      setTitleError("*제목을 입력해주세요"); // title이 비어있는 경우 오류 멘트 설정
      return false;
    }
    const response = await createTag({
      title: title,
      color: color,
      is_used: is_used,
    });
    return true;
  };

  const handleCreateTag = () => {
    const response = createTagAPI();
    if (title !== "") {
      onClose();
      window.location.reload();
    }
  };
  console.log("title", title);

  return (
    <div className="fixed left-0 w-[390px] h-full flex justify-center items-center z-50">
      <div
        className="fixed bottom-0 left-0 box-border flex flex-col justify-center items-center w-[390px] pt-5 pb-10 pl-10 pr-10 gap-10 rounded-t-2xl bg-white shadow-xl"
        style={{
          borderTopLeftRadius: "25px",
          borderTopRightRadius: "25px",
          boxShadow: "0px 3px 30px 0px rgba(0, 0, 0, 0.16)",
        }}
      >
        <TagModalHeader onClose={onClose} title="태그추가" />
        <TagDetailwithColor
          title={title}
          color={color}
          is_used={is_used}
          setTitle={setTitle}
          setColor={setColor}
          setIs_used={setIs_used}
          titleError={titleError}
        />
        <SlimButtonActive
          to="/tag-detail"
          text="추가하기"
          bg="#F19A37"
          color="#fff"
          onClick={handleCreateTag}
        />
      </div>
    </div>
  );
};

// TagUpdateModal.js
export const TagUpdateModal = ({ onClose, tag }) => {
  const [title, setTitle] = useState(tag.title);
  const [color, setColor] = useState(tag.color);

  const updateTagAPI = async () => {
    const response = await updateTag(tag.id, {
      ...tag,
      title: title,
      color: color,
    });
    console.log("updateTagAPI", response);
  };

  const handleUpdateTag = () => {
    updateTagAPI();
    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed left-0 w-full h-full flex justify-center items-center z-50">
      <div
        className="fixed bottom-0 left-0 box-border flex flex-col justify-center items-center w-full pt-5 pb-10 pl-10 pr-10 gap-10 rounded-t-2xl bg-white shadow-xl"
        style={{
          borderTopLeftRadius: "25px",
          borderTopRightRadius: "25px",
          boxShadow: "0px 3px 30px 0px rgba(0, 0, 0, 0.16)",
        }}
      >
        <TagModalHeader onClose={onClose} title="태그수정" />
        <TagDetailwithColor
          tag={tag}
          title={title}
          color={color}
          setTitle={setTitle}
          setColor={setColor}
        />
        <SlimButtonActive
          to="/tag-detail"
          text="저장하기"
          bg="#F19A37"
          color="#fff"
          onClick={handleUpdateTag}
        />
      </div>
    </div>
  );
};
