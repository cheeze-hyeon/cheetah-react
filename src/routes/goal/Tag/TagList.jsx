//goalmainpage에 보이는 태그버튼

import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const TagList = ({ tags, onTagClick }) => {
  const [selectedTagId, setSelectedTagId] = useState(null);

  const handleTagClick = (tagId) => {
    setSelectedTagId(tagId);
    onTagClick(tagId);
  };

  return (
    <div className="flex justify-between items-start self-stretch flex-grow-0 flex-shrink-0 w-full h-full gap-2.5 p-5 mx-5 mr-5 overflow-x-auto">
      <div
        className={`flex justify-center items-center flex-grow-0 flex-shrink-0 px-3 py-2 rounded-[20px] ${
          selectedTagId === null ? "bg-gray-200" : "bg-[#ddd]"
        } border-2 border-white`}
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
          className={`flex justify-center items-center flex-grow-0 flex-shrink-0 px-3 py-2 rounded-[20px] ${
            selectedTagId === tag.id ? "bg-gray-200" : ""
          } border-2 border-white`}
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
