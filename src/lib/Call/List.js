import React, { Component,Fragment } from 'react';
import moment from 'moment';
import { Table, Header, Button, Icon } from 'semantic-ui-react'

// import ProjectRegister from './Register';
import { withDocumentQuery } from '..';

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      registerOpen:false
    }
  }

  handleUpdate = () => {
    this.setState({registerOpen:false},() => {
      this.props.onRefresh();
    });
  }
  
  handleRegister = () => { 
    if(this.props.onRegister) this.props.onRegister();
    // this.({registerOpen:true});
  }
 //  handleClose = () => this.setState({registerOpen:false});

  handleUpdateForm = (event,{name}) => { 
    if(this.props.onSelectForm) this.props.onSelectForm(name);
  }

  handlePropose = (event,{name}) => {
    if(this.props.onPropose) this.props.onPropose(name);
  }


  render() {
    const { response } = this.props
    // const { registerOpen } = this.state

    let formatResponse =  response.map((item) => {
      return { ...item,
        startDate:moment(item.startDate).format('LL'),
        endDate:moment(item.endDate).format('LL')
      }
    });
    
    const tableLayout = (
      <Table celled attached>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ชื่อโครงการ</Table.HeaderCell>
            <Table.HeaderCell>วันที่เปิดรับโครงการ</Table.HeaderCell>
            <Table.HeaderCell>วันที่ปิดรับโครงการ</Table.HeaderCell>
            <Table.HeaderCell/>
          </Table.Row>
        </Table.Header>

        <Table.Body>
        {formatResponse.map((item,idx) => (
          <Table.Row key={idx}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.startDate}</Table.Cell> 
            <Table.Cell>{item.endDate}</Table.Cell> 
            <Table.Cell>
              <Button size='small' icon 
                labelPosition='left' name={item._id}
                onClick={this.handleUpdateForm}>
               <Icon name='edit'/> รายละเอียด
              </Button>
             <Button size='small' primary
               name={item._id}
               onClick={this.handlePropose}>
               เสนอโครงการ
             </Button>
            </Table.Cell>
          </Table.Row>
        ))}
        </Table.Body>
       
        <Table.Footer fullWidth>
         <Table.Row>
          <Table.HeaderCell colSpan='4'>
           <Button size='medium' primary icon 
             onClick={this.handleRegister}
             labelPosition='left'>
            <Icon name='add'/> เพิ่ม
           </Button>
          </Table.HeaderCell>
         </Table.Row>
        </Table.Footer>
      </Table>
    )

    return (
      <Fragment>
       <Header as='h4' attached='top' content='ชุดโครงการที่เปิดรับลงทะเบียน'/>
       {tableLayout}
      </Fragment>
    );
  }
}

export default withDocumentQuery('/call')(List);
