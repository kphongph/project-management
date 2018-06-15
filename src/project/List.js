import React, { Component,Fragment } from 'react';
import moment from 'moment';
import { Dbs } from '../Config'
import { Table, 
  Modal,
  Header, 
  Button, 
  Icon } 
from 'semantic-ui-react'

import ProjectRegister from './Register';
import ProjectForm from './ProjectForm';
import withDocumentQuery from '../withDocumentQuery';

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      registerOpen:false,
      updateFormOpen:false
    }
  }

  handleUpdate = () => {
    this.setState({registerOpen:false,updateFormOpen:false},() => {
      this.props.onRefresh();
    });
  }
  
  handleOpen = () => this.setState({registerOpen:true});
  handleClose = () => this.setState({registerOpen:false});
  handleUpdateFormOpen = () => this.setState({updateFormOpen:true});
  handleUpdateFormClose = () => this.setState({updateFormOpen:false});

  render() {
    const { response } = this.props
    const { registerOpen,updateFormOpen } = this.state

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
              <Button size='small' icon labelPosition='left' onClick={this.handleUpdateFormOpen}>
               <Icon name='edit'/>ปรับแก้
              </Button>
             <Button size='small' primary>เสนอโครงการ</Button>
            </Table.Cell>
          </Table.Row>
        ))}
        </Table.Body>
       
        <Table.Footer fullWidth>
         <Table.Row>
          <Table.HeaderCell colSpan='4'>

           <Modal open={registerOpen} 
             onClose={this.handleClose}
             trigger={
             <Button size='medium' primary icon 
               onClick={this.handleOpen}
               labelPosition='left'>
              <Icon name='add'/> เพิ่ม
             </Button>}>

            <Modal.Header>รายละเอียดพื้นฐานโครงการ</Modal.Header>
            <Modal.Content>
             <Modal.Description>
              <ProjectRegister onProjectCreated={this.handleUpdate}/>
             </Modal.Description>
            </Modal.Content>
           </Modal>
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

export default withDocumentQuery('/'+Dbs.main.name+'/'+Dbs.main.collections.project)(List);
