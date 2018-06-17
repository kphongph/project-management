import React, { Component } from 'react';
import { Button,Form,Icon,Segment } from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { documentLoader, 
  withDocumentFetch } from '..';

import 'react-datepicker/dist/react-datepicker.css';

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

  handleChangeStartDate = (date) => {
    let tmp = { ...this.props.data };
    tmp.startDate = date;
    this.props.onDocumentChange(tmp);
  }

  handleChangeEndDate = (date) => {
    let tmp = { ...this.props.data };
    tmp.endDate = date;
    this.props.onDocumentChange(tmp);
  }

  handleChangeText = (e, {name,value}) => {
    let tmp = { ...this.props.data };
    tmp[name] = value;
    this.props.onDocumentChange(tmp);
  }

  handleSave = () => this.props.onSave()

  handleRemove = () => this.props.onRemove()

  render() {
    const { data } = this.props;
    const { call } = this.state;
    
    return (
     <Segment>
      <Form>
        <Form.Input label='ชื่อชุดโครงการ' placeholder='ชื่อชุดโครงการ' readOnly
          value={call.name || ''} />
        <Form.Group inline>
          <label>ประเภทโครงการ</label>
          <Form.Radio label='โครงการเดี่ยว' 
            value='s' name='type'
            checked={data.type === 's'} 
            onChange={this.handleChangeText}/>
          <Form.Radio label='โครงการกลุ่ม' 
            value='m' name='type'
            checked={data.type === 'm'} 
            onChange={this.handleChangeText}/>
        </Form.Group>

        <Form.Group inline>
          <label>รูปแบบสัญญา</label>
          <Form.Radio label='จัดจ้าง' 
            value='hire' name='contract'
            checked={data.contract === 'hire'} 
            onChange={this.handleChangeText}/>
          <Form.Radio label='ให้ทุน' 
            value='fund' name='contract'
            checked={data.contract === 'fund'} 
            onChange={this.handleChangeText}/>
        </Form.Group>

        <Form.Input label='ชื่อโครงการ' placeholder='ชื่อโครงการ' 
          name='nameTh'
          onChange={this.handleChangeText}
          value={data.nameTh || ''} />
        <Form.Group >
          <Form.Field fluid 
            label='วันที่เริ่มโครงการ' 
            control={DatePicker} 
            selected={moment(data.startDate)}
            onChange={this.handleChangeStartDate}/>
          <Form.Field fluid 
            label='วันที่สิ้นสุดโครงการ' 
            control={DatePicker} 
            selected={moment(data.endDate)}
            onChange={this.handleChangeEndDate}/>
        </Form.Group>
        
   
        <Form.Group >
          <Form.Input label='งบประมาณที่ขอ' placeholder='หน่วยบาท' 
            name='requestAmount'
            onChange={this.handleChangeText}
            value={data.requestAmount || ''} />
        </Form.Group>
        <Form.Group inline >
         <Form.Field control={Button} icon labelPosition='left' onClick={this.handleSave}>
          <Icon name='pencil' /> ปรับแก้
         </Form.Field>
         <Form.Field control={Button} icon labelPosition='left' onClick={this.handleRemove}>
          <Icon name='trash' /> ลบทิ้ง
         </Form.Field>
        </Form.Group>
      </Form>
     </Segment>
    );
  }
}

export default withDocumentFetch('/proposal',{})(FormContent);
