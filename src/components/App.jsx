import React, { Component } from 'react';
//import logo from './logo.svg';

import Fingerboard from './Fingerboard/Fingerboard';
import FingerboardButtons from './Fingerboard/FingerboardButtons';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Fingerboard />
        <FingerboardButtons />
      </div>
    );
  }
}

export default App;
