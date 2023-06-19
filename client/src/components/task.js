import React, { useState } from 'react';
import logo from '../images/logo.png';
import home from '../images/home.png';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineMenu } from 'react-icons/ai';
import {AiOutlinePlus} from 'react-icons/ai'
import {GrStorage} from 'react-icons/gr'
import { useNavigate } from 'react-router-dom';

const Task = () => {
  const [active, setActive] = useState(false);
  const [menu, setMenu] = useState(true);

  const navigate = useNavigate();
  const home = () => {
    navigate('/');
  }
  const createTask = () => {
  navigate('/task');
   }

   const profile = () => {
    navigate('/profile');
   }

   const message = () => {
    navigate('/message');
   }
   const list = () => {
    navigate('/list');
   }
   const newtask = () => {
    navigate('/currentlist');
   }

  return (
    <div className="flex flex-row divide-y ">
      <div id="navbar" className="flex p-2 w-2/12 h-[100vh] bg-[#2573ef]">
           <div className="flex flex-col m-2 w-full">
             <img className="w-full h-[6%] mb-8" src={logo} alt="logo" onClick = {home}/>
  
             <div className="flex mt-2 justify-start items-center p-4 pl-5 text-white hover:opacity-[100%] hover:bg-[#0398dc] rounded-lg">
               <button className="flex flex-row justify-center items-center"
               onClick = {list}> 
                <GrStorage className = "mr-2 text-white"/>
               All Task</button>
             </div>
  
             <div className="flex mt-2 justify-start items-center p-4 pl-5 text-white hover:opacity-[100%] hover:bg-[#0398dc] rounded-lg">
               <button className="flex flex-row justify-center items-center"
               onClick = {newtask}> 
                <AiOutlinePlus className = "mr-1 text-black"/>
               Create New Task</button>
             </div>
           </div>
         </div>

      <div className=" bg-[#ADD8E6] Text-black w-full flex justify-end items-center text-white">
        <div className="bg-[#ADD8E6] w-full h-[99vh]">
        </div>
        </div>
      </div>
    )
}

export default Task
