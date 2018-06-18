import React, { Component } from 'react';
import { Tab,Segment } from 'semantic-ui-react'

import { documentLoader, 
  withDocumentFetch } from '..';

import 'react-datepicker/dist/react-datepicker.css';

import GeneralInfoForm from './GeneralInfoForm'
import BeneficiariesForm from './BeneficiariesForm'

class FormContent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      call:{}
    }
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.data.callId !== nextProps.data.callId) {
      documentLoader('/call',nextProps.token,nextProps.data.callId)
      .then(call => { 
        this.setState({call});
      });
    }
  }

  handleSave = () => this.props.onSave()

  handleRemove = () => this.props.onRemove()

  handleChange = (obj) => {
    console.log(obj);
    this.props.onDocumentChange(obj);
   // this.props.onSave();
  }

  render() {
    console.log('render');
    const panes = [
     { 
       menuItem: 'ข้อมูลโครงการ', 
       render: () => <Tab.Pane attached={false}><GeneralInfoForm {...this.props} {...this.state}/></Tab.Pane>
     },
     { 
       menuItem: 'กลุ่มเป้าหมายที่ได้รับผลประโยชน์', 
       render: () => ( 
         <Tab.Pane attached={false}>
          <BeneficiariesForm 
            {...this.props} 
            {...this.state}
            onChange={this.handleChange}/>
         </Tab.Pane> 
       )
     },
     { menuItem: 'Tab 3', render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane> },
    ]
    
    return (
     <Tab menu={{ attached: false }} panes={panes} />
    );
  }
}

export default withDocumentFetch('/proposal',{})(FormContent);
