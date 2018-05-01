import React, { Component } from 'react';
//import logo from './logo.svg';

import Fingerboard from './Fingerboard/Fingerboard';
import FingerboardButtons from './Fingerboard/FingerboardButtons';
import FingerboardHeader from "./Fingerboard/FingerboardHeader";

class App extends Component {
  render() {
    return (
      <div className="main">
        <FingerboardHeader/>
        <Fingerboard />
        <FingerboardButtons />
      </div>
    );
  }
}

export default App;
