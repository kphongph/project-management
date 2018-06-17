import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Tab } from 'semantic-ui-react'
import CallPage from './CallPage'

const token = '1234';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeIndex:0,
    }
  }

  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })

  render() {
    const { activeIndex } = this.state;
    const panes = [
      { menuItem: 'ชุดโครงการ', render: () => (
        <CallPage token={token}/>
      )},
      { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
      { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
    ]

    return (
      <div className="App">
        <Tab menu={{ fluid: true, vertical: true }} 
          activeIndex={activeIndex} 
          onTabChange={this.handleTabChange}
          menuPosition='left' panes={panes} />
      </div>
    );
  }
}

export default App;
