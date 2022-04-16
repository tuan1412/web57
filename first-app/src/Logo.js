import React from 'react';
import logo from './logo.svg';
import './logo.css';

function LogoApp() {
  return (
    <div>
        <p className="LogoApp-p">Hello</p>
        <img src={logo} className="App-logo" alt="logo" />
    </div>
  )
}

export default LogoApp;