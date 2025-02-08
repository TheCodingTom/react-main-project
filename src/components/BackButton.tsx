// import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import ThemeToggle from './ThemeToggle'


function BackButton() { 
    const goBackTo = useNavigate()
    const redirectTo = () => { 
      goBackTo(-1)
    }

  return (
    <div className='back-button'>
        <Button onClick={redirectTo}>Back</Button>
        <ThemeToggle/>
    </div>
  )
}

export default BackButton