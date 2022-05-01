import React from "react";
import clsx from "clsx";
import "./ColorPicker.css";

const colors = [
  "cornflowerblue",
  "blueviolet",
  "indianred",
  "deeppink",
  "forestgreen",
];

function ColorPicker(props) {
  const onHandleChangeColor = (newColor) => {
    // this.setState()
    props.onChangeBackgroundColor(newColor, "data ở con nè");
  };

  const { activeColor } = props;

  return (
    <div className="ColorPicker">
      {colors.map((color) => {
        const clsName = clsx({
          "ColorPicker-item": true,
          active: activeColor === color,
        });

        return (
          <span
            key={color}
            onClick={() => onHandleChangeColor(color)}
            style={{ background: color }}
            className={clsName}
          />
        );
      })}
    </div>
  );
}

export default ColorPicker;
