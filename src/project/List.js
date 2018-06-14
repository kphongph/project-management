import React, { Component,Fragment } from 'react';
import moment from 'moment';
import { Dbs } from '../Config'
import  withDocumentQuery from '../withDocumentQuery';
import { Table, Header } from 'semantic-ui-react'


class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { response } = this.props

    let formatResponse =  response.map((item) => {
      return {
        name:item.name,
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
          </Table.Row>
        </Table.Header>

        <Table.Body>
        {formatResponse.map((item,idx) => (
          <Table.Row key={idx}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.startDate}</Table.Cell> 
            <Table.Cell>{item.endDate}</Table.Cell> 
          </Table.Row>
        ))}
        </Table.Body>
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
