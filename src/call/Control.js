import React, { Component,Fragment } from 'react';
import { ProposalForm } from '../proposal'
import { documentAdder } from '../utils'
import { CallList, CallForm } from '.'

class Control extends Component {

  constructor(props) {
    super(props)
    this.state = {
      control:'form-list',
      proposeId:null
    }
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
      <CallList token={this.props.token} 
        body={query} 
        onPropose={this.handlePropose}
        onSelectForm={this.handleSelectForm}/>
    )

    if(control === 'form-edit') {
       content = (
         <CallForm docId={callId} 
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

export default Control;
