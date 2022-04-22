import React, { Component } from 'react';
import clsx from 'clsx';
import './ColorPicker.css';

const colors = [
  "cornflowerblue",
  "blueviolet",
  "indianred",
  "deeppink",
  "forestgreen"
]

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   activeColor: colors[0]
    // }
  }

  onHandleChangeColor = (newColor) => {
    // this.setState()
    this.props.onChangeBackgroundColor(newColor, 'data ở con nè');
  }

  render() {
    // const { activeColor } = this.state;
    const { activeColor } = this.props;

    return (
      <div className="ColorPicker">
        {colors.map(color => {
          const clsName = clsx({
            'ColorPicker-item': true,
            'active': activeColor === color
          });

          return (
              <span
                key={color}
                onClick={() => this.onHandleChangeColor(color)}
                style={{ background: color }}
                className={clsName}
              />      
          )
        })}
      </div>
    )
  }
}

export default ColorPicker;
