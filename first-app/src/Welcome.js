import React from "react";

class Welcome extends React.Component {
  // renderWelcome = () => {
  //   const { isHidden } = this.props;

  //   if (isHidden) {
  //     return <div style={{ display: 'none'}}></div>
  //   }

  //   return <div>{this.props.message ? this.props.message.toUpperCase() : ''}</div>
  // }
  /*
    [1, 2, 3, 4] => { 1, 2, 3, 4}

    [1, 2, 4 ] =>  [1, 2, 3]
  */
  
  
  render() {
    const isShow = !this.props.isHidden;

    return (
      <div
        style={{
          color: this.props.color || "blue",
          textAlign: "center",
        }}
      >
        {isShow ? (
          <div>
            {this.props.message ? this.props.message.toUpperCase() : ""}
          </div>
        ) : null}

        {this.props.names.map((name, idx) => <input key={name} value={name}/>)}
      </div>
    );
  }
}

export default Welcome;
