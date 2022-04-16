import Logo from './Logo';
import './App.css';

const number = 10;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Logo />
        <p className="App-p">
          { 1 + 1 }
          Edit <code>src/App.js</code> and save to reload. Web57
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
      </header>
    </div>
  );
}

export default App;
