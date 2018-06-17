import React, { Component,Fragment } from 'react';
import { Call,Proposal } from '../lib'

class CallFormPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      control:'proposal-list',
      proposeId:null
    }
  }

  handleCallUpdated = () => {
    if(this.props.onUpdate) this.props.onUpdate();
  }

  handleSelectProposal = (proposeId) => this.setState({proposeId,control:'proposal-edit'});
  handleProposalUpdate = () => this.setState({control:'proposal-list'});


  render() {
    const { callId } = this.props;
    const { control,proposeId } = this.state;
    const query = {query:{callId:callId}};

    let content = (
      <Proposal.List body={query} 
        onSelect={this.handleSelectProposal}
        token={this.props.token}/>
    )

    if(control === 'proposal-edit') {
      content = <Proposal.Form callId={callId} docId={proposeId} 
        onUpdate={this.handleProposalUpdate}/>
    }

    return (
      <Fragment>
       <Call.Form docId={callId} 
         onUpdate={this.handleCallUpdated}/>
       {content}
      </Fragment>
    );
  }
}

export default CallFormPage;
