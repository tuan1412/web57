import React from 'react';
import logo from './logo.svg';
import './logo.css';

// React.Fragment
// <></>
function LogoApp() {
  return (
    <>
      <p className="LogoApp-p">4</p>
      <img src={logo} className="App-logo" alt="logo" />
    </>
  )
}

export default LogoApp;