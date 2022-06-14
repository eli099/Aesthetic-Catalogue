import React from 'react'

// Import Bootstrap spinner
import Spinner from 'react-bootstrap/Spinner'

const SpinnerIcon = () => {

  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}

export default SpinnerIcon