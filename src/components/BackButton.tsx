// import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'


function BackButton() { 
    const goBackTo = useNavigate()
    const redirectTo = () => { 
      goBackTo(-1)
    }

  return (
    <div>
        <Button onClick={redirectTo}>Back</Button>
    </div>
  )
}

export default BackButton