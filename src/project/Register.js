import React, { Component } from 'react';
import { Button,Form,Icon } from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { serviceUrl, Dbs } from '../Config'

import 'react-datepicker/dist/react-datepicker.css';


class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name:'',
      startDate:moment(),
      endDate:moment(),
    }
  }

  handleChangeStartDate = (date) => this.setState({startDate:date});

  handleChangeEndDate = (date) => this.setState({endDate:date});

  handleChangeName = (e, {value}) => this.setState({name:value});

  handleSave = () => {
    const { startDate, endDate, name } = this.state;
    fetch(serviceUrl+'/'+Dbs.main.name+'/'+Dbs.main.collections.project+'/data', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name:name,
        startDate:startDate,
        endDate:endDate
      })
    })
    .then(response => response.json())
    .then(result => {
      console.log(result);
    })
  }

  render() {
    const { startDate, endDate, name } = this.state;
    return (
      <Form>
        <Form.Input label='ชื่อชุดโครงการ' placeholder='ชื่อชุดโครงการ' 
          onChange={this.handleChangeName}
          value={name} />
        <Form.Group >
          <Form.Field fluid 
            label='วันที่เปิดรับโครงการ' 
            control={DatePicker} 
            selected={startDate}
            onChange={this.handleChangeStartDate}/>
          <Form.Field fluid 
            label='วันที่ปิดรับโครงการ' 
            control={DatePicker} 
            selected={endDate}
            onChange={this.handleChangeEndDate}/>
        </Form.Group>
        <Form.Field control={Button} icon labelPosition='left' onClick={this.handleSave}>
          <Icon name='add' />
          เพิ่ม
        </Form.Field>
      </Form>
    );
  }
}

export default Register;
