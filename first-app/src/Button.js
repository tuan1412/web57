import React from "react";

// function event () { }

class Button extends React.Component {
  state = { color: "red" };

  handleChange = (option) => {
    // console.log('trigger', e);
    if (option == "toggle") {
      const color = this.state.color === "red" ? "blue" : "red";
      this.setState({ color });
    } else {
      alert("Hiiiii")
    }
    
  };

  render() {
    return (
      <div>
        <input onChange={e => console.log(e.target.value)} />
        <button
          style={{ color: this.state.color } }
          onClick={() => this.handleChange("toggle")}
        >
          Toogle
        </button>
        <button
          onClick={() => this.handleChange("notify")}
        >
          Notify
        </button>
      </div>
    );
  }
}

export default Button;