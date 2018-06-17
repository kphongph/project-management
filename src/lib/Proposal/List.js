import React, { Component,Fragment } from 'react';
import moment from 'moment';
import { Table, Header, Button, Icon } from 'semantic-ui-react'

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
  
  handleSelectForm = (event,{name}) => { 
    if(this.props.onSelect) this.props.onSelect(name);
  }

  render() {
    const { response } = this.props

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
            <Table.Cell>{item.nameTh}</Table.Cell>
            <Table.Cell>{item.startDate}</Table.Cell> 
            <Table.Cell>{item.endDate}</Table.Cell> 
            <Table.Cell>
              <Button size='small' icon 
                labelPosition='left' name={item._id}
                onClick={this.handleSelectForm}>
               <Icon name='edit'/>รายละเอียด
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
        </Table.Body>
       
      </Table>
    )

    return (
      <Fragment>
       <Header as='h4' attached='top' content='โครงการที่เสนอ'/>
       {tableLayout}
      </Fragment>
    );
  }
}

export default withDocumentQuery('/proposal')(List);
