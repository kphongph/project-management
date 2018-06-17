import React from 'react'

import List from './List'
import FormContent from './FormContent'

function Proposal(props) {
  const { defaultProps = {} } = Proposal
  const ElementType = defaultProps.as || 'div';
  return (
    <ElementType></ElementType>
  )
}

Proposal.List = List;
Proposal.Form = FormContent;

export default Proposal
