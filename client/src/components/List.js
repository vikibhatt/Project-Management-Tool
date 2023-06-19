import React, { useState } from 'react';
import logo from '../images/logo.png';
import home from '../images/home.png';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineMenu } from 'react-icons/ai';
import {AiOutlinePlus} from 'react-icons/ai'
import {FaCircle} from 'react-icons/fa'
import {GrStorage} from 'react-icons/gr'
import { useNavigate } from 'react-router-dom';


const List = () => {
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
     const newtask = () => {
      navigate('/currentlist');
     }
  
    return (

      <div className = "flex flex-row divide-x ">
      <div id="navbar" className="flex p-2 w-2/12 h-[100vh] bg-[#2573ef]">
           <div className="flex flex-col m-2 w-full">
             <img className="w-full h-[6%] mb-8" src={logo} alt="logo" onClick = {home}/>
  
             <div className="flex mt-2 justify-start items-center p-4 pl-5 text-white hover:opacity-[100%] hover:bg-[#0398dc] rounded-lg">
               <button className="flex flex-row justify-center items-center"> 
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
      <div className = "flex flex-col w-full items-center font-bold bg-[#ADD8E6] text-white">
          <div className = "flex justify-start items-center bg-[#2573ef] h-[12vh] w-full text-4xl pl-8">
            Task List
          </div>

        <div className = "flex sm:m-5 sm:flex-col justify-center items-center lg:flex-row justify-center items-center w-[52vw] my-8">

         <div className = "flex sm:flex-col justify-center items-center w-[16vw] text-black">
         <div className="flex justify-center">
           <FaCircle className = "mr-2 mt-1.5 clrtodo"/> 
            TODO
         </div>
         <div className = "flex lg:w-[16vw] sm:w-[42vw] sm:flex-col lg:flex-col mt-3">
         <button className = "rounded-md m-2 p-1 bg-white hover:bg-[#e8eaec] opacity-[80%] hover:opacity-[100%]">
          Explain quantum computing in simple terms
         </button>
         <button className = "rounded-md m-2 p-1 bg-white hover:bg-[#e8eaec] opacity-[80%] hover:opacity-[100%]">
          Got any creative ideas for a 10 year old’s birthday?
         </button>
         <button className = "rounded-md m-2 p-1 bg-white hover:bg-[#e8eaec] opacity-[80%] hover:opacity-[100%]">
          How do I make an HTTP request in Javascript?
         </button>
         </div>
         </div>

         <div className = "flex sm:m-5 sm:flex-col justify-center items-center w-[16vw] text-black">
            <div className="flex justify-center">
           <FaCircle className = "mr-2 mt-1.5 clrdoing"/> 
           DOING
          </div>
         <div className = "flex lg:w-[16vw] sm:w-[42vw] sm:flex-col lg:flex-col mt-3">
         <button className = "rounded-md m-2 p-1 bg-white hover:bg-[#e8eaec] opacity-[80%] hover:opacity-[100%]">
         Remembers what user said earlier in the conversation
         </button>
         <button className = "rounded-md m-2 p-1 bg-white hover:bg-[#e8eaec] opacity-[80%] hover:opacity-[100%]">
         Allows user to provide follow-up corrections
         </button>
         <button className = "rounded-md m-2 p-1 bg-white hover:bg-[#e8eaec] opacity-[80%] hover:opacity-[100%]">
         Trained to decline inappropriate requests
         </button>
         </div>
         </div>

         <div className = "flex sm:m-5 sm:flex-col justify-center items-center w-[16vw] text-black">
         <div className="flex justify-center">
           <FaCircle className = "mr-2 mt-1.5 clrdone"/> 
           DONE
          </div>
         <div className = "flex lg:w-[16vw] sm:w-[42vw] sm:flex-col lg:flex-col mt-3">
         <button className = "rounded-md m-2 p-1 bg-white hover:bg-[#e8eaec] opacity-[80%] hover:opacity-[100%]">
         May occasionally generate incorrect information
         </button>
         <button className = "rounded-md m-2 p-1 bg-white hover:bg-[#e8eaec] opacity-[80%] hover:opacity-[100%]">
         May occasionally produce harmful instructions or biased content
         </button>
         <button className = "rounded-md m-2 p-1 bg-white hover:bg-[#e8eaec] opacity-[80%] hover:opacity-[100%]">
          Limited knowledge of world and events after 2021
         </button>
         </div>
         </div>
        </div>
      </div>
    </div>
      )
}

export default List
