//goalmainpage에 보이는 태그버튼
import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";

import { TagDefault } from "../../../components/button/styled";

const TagList = ({ tags, goal, onTagClick, exceptAll }) => {
  const [selectedTagId, setSelectedTagId] = useState(
    Number(localStorage.getItem("filtered_tag_id")) || null
  );
  useEffect(() => {
    if (goal) {
      setSelectedTagId(goal.tag.id);

    }
  }, []);

  const handleTagClick = (tagId) => {
    setSelectedTagId((prevSelectedTagId) => {
      // 이미 선택된 태그를 다시 클릭한 경우, 선택을 해제합니다.
      // 이때 selectedTagId를 null로 설정합니다.
      return prevSelectedTagId === tagId ? null : tagId;
    });
    onTagClick(tagId);
  };
  console.log(selectedTagId);

  const isSelected = (tag) => {
    return selectedTagId === tag.id;
  };

  const is_ex = exceptAll === undefined ? true : false;
  console.log("is_ex", is_ex);
  console.log("exceptAll", exceptAll);

  return (
    <div className="flex items-start self-stretch flex-grow-0 flex-shrink-0 w-full h-full gap-[13px] mt-[13px] mb-1 mx-[20px] overflow-x scrollbar-hide">
      {is_ex && (
        <div>
          {selectedTagId == null ? (
            <TagDefault
              text="전체"
              color="#DDDDDD"
              isSelected="true"
              onClick={() => handleTagClick(null)}
            />
          ) : (
            <TagDefault
              text="전체"
              color="#DDDDDD"
              onClick={() => handleTagClick(null)}
            />
          )}
        </div>

      )}
      {tags.map((tag) => (
        <TagDefault
          key={tag.id}
          color={tag.color}
          onClick={() => handleTagClick(tag.id)}
          text={tag.title}
          isSelected={isSelected(tag)}
        />
      ))}
    </div>
  );
};

export default TagList;
