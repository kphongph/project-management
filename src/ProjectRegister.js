import React, { Component } from 'react';
import { Button,Form,Icon } from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';


class ProjectRegister extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate:moment(),
      endDate:moment(),
    }
  }

  handleChangeStartDate = (date) => this.setState({startDate:date});

  handleChangeEndDate = (date) => this.setState({endDate:date});

  handleSave = () => {
    
  }

  render() {
    const { startDate, endDate } = this.state;
    return (
      <Form>
        <Form.Input label='ชื่อชุดโครงการ' placeholder='ชื่อชุดโครงการ' />
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
        <Form.Field control={Button} icon labelPosition='left'>
          <Icon name='add' />
          เพิ่ม
        </Form.Field>
      </Form>
    );
  }
}

export default ProjectRegister;
