import React, { Component } from 'react';
import ProjectList from './project/List'
import ProjectForm from './project/ProjectForm'
import './App.css';
import 'semantic-ui-css/semantic.min.css';

const token = '1234';

class App extends Component {
  render() {
    const query = {query:{}};
    return (
      <div className="App">
        <ProjectList token={token} body={query}/>
        <ProjectForm docId='e79f55b0704a11e8a8c5bf5c579b972f'/>
      </div>
    );
  }
}

export default App;
