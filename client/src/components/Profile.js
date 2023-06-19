import React from 'react'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
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
      profile
    </div>
  )
}

export default Profile
