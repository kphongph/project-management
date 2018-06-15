import React, { Component,Fragment } from 'react';
import ProjectList from './List'
import ProjectForm from './ProjectForm'

class Control extends Component {

  constructor(props) {
    super(props)
    this.state = {
      control:'form-list',
      formId:null,
    }
  }

  handleSelectForm = (formId) => {
    this.setState({control:'form-edit',formId});
  }

  handleProjectUpdated = () => this.setState({control:'form-list'})

  render() {
    const { control,formId } = this.state;
    const query = {query:{}};
    let content = (
      <ProjectList token={this.props.token} 
        body={query} 
        onSelectForm={this.handleSelectForm}/>
    )
    if(control === 'form-edit') {
       content = (
         <ProjectForm docId={formId} 
           onRemoved={this.handleProjectUpdated}
           onSaveSuccess={this.handleProjectUpdated}/>
       )
    }

    return (
      <Fragment>{content}</Fragment>
    );
  }
}

export default Control;
