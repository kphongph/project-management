import React, { Component } from 'react';
import { Button,Form,Icon,Segment } from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class BeneficiariesForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      list:[]
    }
  }

  componentDidMount() {
    const { beneficiaries } = this.props.data;
    if(beneficiaries) this.setState({list:beneficiaries});
    else this.setState({list:[]});
  }

  handleChangeText = (e, {name,value,index}) => {
    let list = this.state.list.slice();
    list[index][name] = value;
    this.setState({list});
  }

  handleAdd = () => {
    let list = this.state.list.slice();
    console.log(list);
    list.push({name:'',count:0});
    this.setState({list});
  }

  handleSave = () => {
    let tmp = { ...this.props.data };
    tmp['beneficiaries'] = this.state.list;
    this.props.onChange(tmp);
  }


  render() {
    const { list } = this.state;
    
    return (
      <Form>
         {list.map((item,idx) => (
          <Form.Group key={idx}>
           <Form.Input label='ชื่อผู้ได้รับผลประโยชน์' placeholder='รายชื่อ'
             onChange={this.handleChangeText}
             name='name' index={idx} value={item.name || ''}/>
           <Form.Input label='จำนวน' placeholder='คน'
             onChange={this.handleChangeText}
             name='count' index={idx} value={item.count || ''}/>
          </Form.Group>
         ))}

        <Form.Group inline >
         <Form.Field control={Button} icon labelPosition='left' onClick={this.handleAdd}>
          <Icon name='add' /> เพิ่ม
         </Form.Field>
         <Form.Field control={Button} icon labelPosition='left' onClick={this.handleSave}>
          <Icon name='save' /> บันทึก
         </Form.Field>
        </Form.Group>
      </Form>
    );
  }
}

export default BeneficiariesForm;
