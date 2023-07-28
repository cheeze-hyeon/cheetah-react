import React from "react";
import TagModalHeader from "./TagModalheader";
import TagDetailwithColor from "./TagDetailwithColor";
import { SlimButtonActive } from "../../../../components/button/styled";
import { createTag, updateTag } from "../../../../apis/api_calendar";
import { useState } from "react";
import { TagModalContainer } from "../styled";

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
    <TagModalContainer>
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
    </TagModalContainer>
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
    <TagModalContainer>
      <TagModalHeader onClose={onClose} title="태그 수정" />
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
    </TagModalContainer>
  );
};
