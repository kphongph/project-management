import React from 'react'

import List from './List'
import FormContent from './FormContent'

function Call(props) {
  const { defaultProps = {} } = Call
  const ElementType = defaultProps.as || 'div';
  return (
    <ElementType></ElementType>
  )
}

Call.List = List;
Call.Form = FormContent;

export default Call
