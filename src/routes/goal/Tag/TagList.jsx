//goalmainpage에 보이는 태그버튼
import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";

import { TagDefault } from "../../../components/button/styled";

const TagList = ({ tags, onTagClick }) => {
  const [selectedTagId, setSelectedTagId] = useState(null);

  const handleTagClick = (tagId) => {
    setSelectedTagId(tagId);
    onTagClick(tagId);
  };

  const isSelected = (tag) => {
    return selectedTagId === tag.id;
  };

  return (
    <div className="flex justify-between items-start self-stretch flex-grow-0 flex-shrink-0 w-full h-full gap-[13px] mt-[13px] mx-[20px] overflow-x scrollbar-hide">
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
