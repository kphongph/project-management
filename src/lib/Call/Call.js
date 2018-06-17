import React from 'react'

import List from './List'

function Call(props) {
  const { defaultProps = {} } = Call
  const ElementType = defaultProps.as || 'div';
  return (
    <ElementType></ElementType>
  )
}

Call.List = List;

export default Call
