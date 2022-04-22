import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((preState) => {
        return {
          count: preState.count + 1,
        };
      });
    }, 1000);
  }

  componentWillUnmount() {
    console.log('unmount');
    clearInterval(this.interval);
  }

  render() {
    return <div>{this.state.count}</div>;
  }
}

export default Clock;
