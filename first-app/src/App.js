import Logo from './Logo';
import './App.css';
import React from 'react';
import Button from './Button';
import Welcome from './Welcome';
import Clock from './Clock';
import AudioPlayer from './components/AudioPlayer';
const number = 10;

// A
// Welcome()
function App() {
  // const [names, setNames] = React.useState(['Tuan', 'Anh', 'Nguyen', 'Web57'])
  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setNames(['Tuan', 'Nguyen', 'Tuan', 'Web57'])
  //   }, 10000)
  // }, []);

  return (
    <div className="App">
      <AudioPlayer src="https://res.cloudinary.com/vector998/video/upload/v1654092250/audio/Unstoppable_v5b74z.mp3" id={1} />
      {/* <Button /> */}
      {/* <Welcome message="Welcome 1" color="red" isHidden={true} />
      <Welcome message="Welcome 2" handleClick={() => console.log('hi')}/> */}
      {/* <Welcome message="Welcome 3" names={names} isHidden={false}/> */}
      {/* <Clock /> */}
      {/* <header className="App-header">
        <Logo />
        <p className="App-p" style={{
          marginTop: 50
        }}>
          { 1 + 1 + 1}
          Edit <code>src/App.js</code> and save to reload. Web57123
          {number}
        </p>
        <Logo />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
