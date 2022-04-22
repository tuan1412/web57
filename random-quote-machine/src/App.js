import React, { Component } from 'react';
import './App.css';
import Clock from './components/Clock/Clock';
import ColorPicker from './components/ColorPicker/ColorPicker';
import QuoteBox from './components/QuoteBox/QuoteBox';

// QuoteBox()
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowClock: true,
      activeColor: 'cornflowerblue'
    }
  }

  toggleShowClock = () => {
    this.setState(preState => ({ isShowClock: !preState.isShowClock }));
  }

  onChangeBackgroundColor = (newColor, message) => {
    console.log(message);
    this.setState({ activeColor: newColor })
  }

  render() {
    const { isShowClock, activeColor } = this.state;

    return (
      <div className="App" style={{ background: activeColor }}>
        <div className="App-header">
          Random Quote Machine
        </div>
        <div>
          <span>Show clock</span>
          <input type="checkbox" checked={isShowClock} onChange={this.toggleShowClock} />
        </div>
        { isShowClock ? <Clock/> : null}
        <div className="App-content">
          <QuoteBox isShowClock={isShowClock} activeColor={activeColor} />
        </div>
        <div className="App-picker">
          <ColorPicker 
            onChangeBackgroundColor={this.onChangeBackgroundColor} 
            activeColor={activeColor}
          />
        </div>
      </div>
    );
  }
}

export default App;
