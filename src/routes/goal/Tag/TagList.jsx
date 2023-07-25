import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const TagList = ({ tags, goal, onTagClick }) => {
  const [selectedTagId, setSelectedTagId] = useState(null);
  console.log("태그리스트 안에서",goal)// 왜 goal.tag_id 하면 오류가 뜰까
  const handleTagClick = (tagId) => {
    setSelectedTagId((prevSelectedTagId) => {
      // 이미 선택된 태그를 다시 클릭한 경우, 선택을 해제합니다.
      // 이때 selectedTagId를 null로 설정합니다.
      return prevSelectedTagId === tagId ? null : tagId;
    });
    onTagClick(tagId);
  };
  console.log(selectedTagId)

  return (
    <div className="flex justify-between items-start self-stretch flex-grow-0 flex-shrink-0 w-full h-full gap-2.5 p-5 mr-5 overflow-x scrollbar-hidden">
      <div
        className={`flex justify-center items-center flex-grow-0 flex-shrink-0 px-3 py-2 rounded-[20px] ${
          selectedTagId === null ? "bg-gray-200 border-4" : "bg-[#ddd] border-2"
        } border-white`}
        style={{
          boxShadow: "0px 0px 6px 0 rgba(0,0,0,0.2)",
        }}
        onClick={() => handleTagClick(null)}
      >
        <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2.5">
          <p className="whitespace-pre-wrap flex-grow-0 flex-shrink-0 font-Pretendard text-[15px] leading-[19px] font-medium text-left text-black">
            전체
          </p>
        </div>
      </div>

      {tags.map((tag) => (
        <div
          key={tag.id}
          className={`flex justify-center items-center flex-grow-0 flex-shrink-0 px-3 py-2 rounded-[20px] border-${selectedTagId === tag.id ? 4 : 2} border-white`}
          style={{
            backgroundColor: tag.color,
            boxShadow: "0px 0px 6px 0 rgba(0,0,0,0.2)",
          }}
          onClick={() => handleTagClick(tag.id)}
        >
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2.5">
            <p className="whitespace-pre-wrap flex-grow-0 flex-shrink-0 font-Pretendard text-[15px] leading-[19px] font-medium text-left text-black">
              {tag.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TagList;
