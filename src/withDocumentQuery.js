import React from 'react';
import { urlServiceEndpoint } from './config';

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
      console.log(body)
      if(body && token !== null) {
        this.query(body);
      }
    }

    componentWillReceiveProps(nextProps) {
      console.log(nextProps)
      if(JSON.stringify(nextProps.body) !== JSON.stringify(this.props.body)) this.query(nextProps.body);
    }

    query(body) {
      console.log(body)
      const { token } = this.props;
      fetch(urlServiceEndpoint +path+ '/query', {
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
        ref = "form" { ...this.props } { ...this.state }/>
    }
  }
  return WithDocumentQuery;
};

export default withDocumentQuery;
