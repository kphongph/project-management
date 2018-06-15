import React, { Component } from 'react';
import { Button,Form,Icon,Segment } from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import withDocumentFetch from '../withDocumentFetch'
import { Dbs } from '../Config'


class ProjectForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name:'',
      startDate:moment(),
      endDate:moment(),
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

  handleChangeName = (e, {value}) => {
    let tmp = { ...this.props.data };
    tmp.name = value;
    this.props.onDocumentChange(tmp);
  }

  handleSave = () => this.props.onSave()

  handleRemove = () => this.props.onRemove()


  render() {
    const { data } = this.props;
    return (
     <Segment>
      <Form>
        <Form.Input label='ชื่อชุดโครงการ' placeholder='ชื่อชุดโครงการ' 
          onChange={this.handleChangeName}
          value={data.name || ''} />
        <Form.Group >
          <Form.Field fluid 
            label='วันที่เปิดรับโครงการ' 
            control={DatePicker} 
            selected={moment(data.startDate)}
            onChange={this.handleChangeStartDate}/>
          <Form.Field fluid 
            label='วันที่ปิดรับโครงการ' 
            control={DatePicker} 
            selected={moment(data.endDate)}
            onChange={this.handleChangeEndDate}/>
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

export default withDocumentFetch('/'+Dbs.main.name+'/'+Dbs.main.collections.project,{})(ProjectForm);
