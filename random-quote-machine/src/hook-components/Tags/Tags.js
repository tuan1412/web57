import React from "react";
import clsx from "clsx";

import "./Tag.css";

const tags = ["business", "education", "faith"];
function Tags(props) {
  const handleChangeTag = (tagName) => {
    props.handleChangeTag(tagName);
  };

  const { activeTags } = props;

  return (
    <div className="Tags">
      {tags.map((tagName) => {
        const cls = clsx("Tag", { active: activeTags.includes(tagName) });
        return (
          <span
            key={tagName}
            className={cls}
            onClick={() => handleChangeTag(tagName)}
          >
            {tagName}
          </span>
        );
      })}
    </div>
  );
}

export default Tags;
