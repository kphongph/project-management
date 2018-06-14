import React, { Component } from 'react';
import logo from './logo.svg';
import ProjectRegister from './ProjectRegister'
import './App.css';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ProjectRegister/>
      </div>
    );
  }
}

export default App;
