import React from 'react';
import { serviceUrl } from '../Config';

const withDocumentQuery = (path) => WrappedComponent => {
  class WithDocumentQuery extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data:{},
        response:[]
      }
    }

    componentDidMount() {
      const {body, token} = this.props;
      if(body && token !== null) {
        this.query(body);
      }
    }

    componentWillReceiveProps(nextProps) {
      if(JSON.stringify(nextProps.body) !== JSON.stringify(this.props.body)) 
        this.query(nextProps.body);
    }

    handleRefresh = () => this.query(this.props.body);

    query(body) {
      const { token } = this.props;
      fetch(serviceUrl +path+ '/query', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + token
        },
        body: JSON.stringify(body)
      })
      .then(response => response.json())
      .then(result =>this.setState({response:result}))
    }

    render() {
      return <WrappedComponent
        ref="form" { ...this.props } { ...this.state } onRefresh={this.handleRefresh}/>
    }
  }
  return WithDocumentQuery;
};

export default withDocumentQuery;
