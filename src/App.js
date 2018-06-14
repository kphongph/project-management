import React, { Component } from 'react';
import ProjectRegister from './project/Register'
import ProjectList from './project/List'
import './App.css';
import 'semantic-ui-css/semantic.min.css';

const token = '1234';

class App extends Component {
  render() {
    const query = {query:{}};
    return (
      <div className="App">
        <ProjectRegister/>
        <ProjectList token={token} body={query}/>
      </div>
    );
  }
}

export default App;
