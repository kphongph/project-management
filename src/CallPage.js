import React, { Component,Fragment } from 'react';
import { ProposalForm } from './proposal'
import { documentAdder } from './lib'
import { Call } from './lib'

class CallPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      control:'form-list',
      proposeId:null
    }
  }

  handleRegister = () => {
    documentAdder('/call',this.props.token,{})
    .then((result) => {
      this.setState({control:'form-edit',callId:result.key});
    });
  }

  handleSelectForm = (callId) => {
    this.setState({control:'form-edit',callId});
  }

  handlePropose = (callId) => {
    documentAdder('/proposal',this.props.token,{'callId':callId})
    .then((result) => {
      this.setState({control:'propose',proposeId:result.key});
    });
  }

  handleCallUpdated = () => this.setState({control:'form-list'})

  render() {
    const { control,callId } = this.state;
    const query = {query:{}};
    let content = (
      <Call.List token={this.props.token} 
        body={query} 
        onRegister={this.handleRegister}
        onPropose={this.handlePropose}
        onSelectForm={this.handleSelectForm}/>
    )

    if(control === 'form-edit') {
       content = (
         <Call.Form docId={callId} 
           onRemoved={this.handleCallUpdated}
           onSaveSuccess={this.handleCallUpdated}/>
       )
    }

    if(control === 'propose') {
       content = (
         <ProposalForm 
           token={this.props.token}
           docId={this.state.proposeId}/>
       )
    
    }

    return (
      <Fragment>{content}</Fragment>
    );
  }
}

export default CallPage;
