import React from 'react';
import validate from 'validate.js';
import { serviceUrl } from '../Config';

var savedTime;
var setAttribute = {};

const withDocumentFetch = (path,constraints) => WrappedComponent => {
  let localValidate = validate;
  if(constraints.validator) {
    localValidate = constraints.validator;
    delete constraints.validator;
  }

  class WithDocumentFetch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: {},
        validateError:{}
      }
    }

    componentDidMount() {
      const { docId,token } = this.props;
      fetch(serviceUrl + path + '/data/' + docId, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + token
        }
      })
      .then(response => response.json())
      .then(data => this.setState({
        data
      }))
    }

    componentWillReceiveProps(nextProps) {
      const checkArray = ['docId'];
      let reload = false;
      for(var i = 0;i<checkArray.length;i++) {
        if(this.props[checkArray[i]] !== nextProps[checkArray[i]]){
          reload = true;
          break;
        }
      }
      if(reload) {
        const {docId,token} = nextProps;
        fetch(serviceUrl + path + '/data/' + docId, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + token
          }
        })
        .then(response => response.json())
        .then(data => this.setState({
          data
        }))
      }
    }

    save = (content) => {
      const { data } = this.state;
      const { token, docId } = this.props;
      this._validate(data).then(() => {
        clearTimeout(savedTime);
        fetch(serviceUrl + path + '/data/' + docId, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + token
          },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
          if (data.ok) {
            if(this.props.onSaveSuccess) this.props.onSaveSuccess();
          } else {
            if(this.props.onSaveError) this.props.onSaveError();
          }
        })
      })
      .catch((err) => {
        this.setState({validateError:err});
        if(this.props.onValidateError) this.props.onValidateError(err)
      })
    }

    remove = () => {
      const {
        token,
        docId
      } = this.props;
      fetch(serviceUrl + path + '/data/' + docId, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + token
        }
      })
      .then(response => response.json())
      .then(data => {
        if(this.props.onRemoved) this.props.onRemoved();
      })
    }

    update = (name, value) => {
      const { token, docId } = this.props;
      const { data } = this.state;
      data[name] = value
      setAttribute[name] = value
      this.setState({data}, () => {
        this._validate(setAttribute).then(() => {
          clearTimeout(savedTime);
          savedTime = setTimeout(() => {
            fetch(serviceUrl + path + '/data/' + docId, {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'JWT ' + token
                },
                body: JSON.stringify({
                  $set: setAttribute
                })
              })
              .then(response => response.json())
              .then(data => {
                if (data.ok) {
                  setAttribute = {}
                  if(this.props.onSaveSuccess) this.props.onSaveSuccess()
                } else {
                  if(this.props.onSaveError) this.props.onSaveError()
                }
              })
          }, 5000)
        }).catch((err) => {
          this.setState({validateError:err});
          if(this.props.onValidateError) this.props.onValidateError(err)
        })
      })
    }

    _validate = (data) => {
      return new Promise((resolve, reject) => {
        let _constraints = constraints ? constraints : {};
        let result = localValidate(data,_constraints);
        if(!result) resolve();
        else reject(result);
      });
    }

    onDocumentChange = (doc) => {
      const { data } = this.state;
      var merged = { ...data,...doc };
      this._validate(merged).then(() => {
        clearTimeout(savedTime)
        this.setState({
          'data': merged,
          'validateError':{}
        },() => {
          if(this.props.onChange) this.props.onChange(merged)
        });

      }).catch((err) => {
        this.setState({'data': merged,validateError:err});
        if(this.props.onValidateError) this.props.onValidateError(err)
      })
    }

    render() {
      return <WrappedComponent
        ref = "form" { ...this.props } { ...this.state }
        onRemove={this.remove}
        onSave={this.save}
        onDocumentChange={this.onDocumentChange}/>
    }
  }
  return WithDocumentFetch;
};

export default withDocumentFetch;
