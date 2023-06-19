import React from 'react'
import { useNavigate } from 'react-router-dom';

const Message = () => {
   const navigate = useNavigate();
  const createTask = () => {
  navigate('/task');
   }

   const profile = () => {
    navigate('/profile');
   }

   const message = () => {
    navigate('/message');
   }
  return (
    <div>
      message
    </div>
  )
}

export default Message
