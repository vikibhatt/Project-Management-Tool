import React,{useState} from 'react'
import logo from '../images/logo.png'
import home from '../images/home.png'
import {BsSearch} from 'react-icons/bs';
import {FaImages} from 'react-icons/fa'
import {MdPlace} from 'react-icons/md'
import {FaUserFriends} from 'react-icons/fa'
import {AiOutlineMenu} from 'react-icons/ai'
import { useNavigate } from "react-router-dom";


const UI = () => {
  const [active, setActive] = useState(false);
  const [menu, setMenu] = useState(true)

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
   const signupPage = () =>{
    navigate('/Signup');
  }
  const loginPage = () =>{
    navigate('/Login');
  }
  return (
    <div className = "flex flex-col divide-y ">
        <div id = "navbar" className = "flex p-2 w-full bg-[#2573ef]">
        <div className="menu-btn">
        <div className="flex justify-end items-center mr-2">
         <button className="" onClick={() => setMenu(!menu)}>
          <AiOutlineMenu/>
        </button>
      </div>
         
        </div>
         <div className="flex flex-row">
         
         <img className="w-[20vh]" src={logo} alt="logo" onClick = {home}/>
         <div className="container flex justify-center items-center">
          <div className="searchbox flex justify-center items-center relative">
            <input type="text" className = {active?'input-active':'input'} placeholder = "SearchBox"/>
            <button className="btn rounded-full opacity-[80%] hover:opacity-[100%]" type = "submit"
            onClick = {() =>{setActive(!active)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            </button>
          </div>
         </div>


         {/* <input id = "search" type="text" className="border border-2 ml-14 rounded-lg w-[50%] text-black font-bold" placeholder = "Search"/> */}
         </div>
         
         <button className = "hidden md:block lg:block p-1 w-[10vh] rounded-lg opacity-[70%] border hover:border hover:opacity-[100%] absolute right-20 mr-10 text-white" onClick = {signupPage}> SignIn </button>
         <button className = "hidden md:block lg:block p-1 w-[10vh] rounded-lg opacity-[70%] border hover:border hover:opacity-[100%] absolute right-4 text-white" onClick = {loginPage }> Login </button>
        </div>

      <div className = "flex justify-start items-center text-white"> 
      
      {/* flex bg-[#2573ef] lg:w-3/12 h-[94vh] sm:w-3/12 hidden md:block lg:block */}
      
      <div id="slide_view" class = "slide_view" className = {menu ? 'slide' : 'nor'}>
      
      <button className="flex justify-start items-center p-2 pl-5 cursor-pointer opacity-[80%] 
          hover:opacity-[100%] hover:opacity-[100%] hover:bg-[#0398dc] rounded-lg m-2"
          onClick = {profile}>
            Profile
          </button>
          <button className="flex justify-start items-center p-2 pl-5 cursor-pointer opacity-[80%] 
          hover:opacity-[100%] hover:opacity-[100%] hover:bg-[#0398dc] rounded-lg m-2"
          onClick = {createTask}>
            Create Task
          </button>
          <button className="flex justify-start items-center p-2 pl-5 cursor-pointer opacity-[80%] 
          hover:opacity-[100%] hover:opacity-[100%] hover:bg-[#0398dc] rounded-lg m-2"
          onClick = {message}>
            Messages
          </button>
        <div className="md:hidden lg:hidden">
        <button className = "p-1 hover:bg-[#0398dc] m-2 pl-2 w-[16vh] rounded-lg opacity-[70%] border hover:border hover:opacity-[100%] text-white"> SignIn </button>
         <button className = "p-1 hover:bg-[#0398dc] m-2 w-[10vh] rounded-lg opacity-[70%] w-[16vh] border hover:border hover:opacity-[100%] text-white"> Login </button>
        </div>
      </div>

      <div className="bg-[#ADD8E6] w-full h-[94vh] overflow-auto">
      <div className="bg-[#0398dc] flex flex-col justify-center bg-white h-[17vh] m-8 text-black rounded-lg">
        <div className="flex justify-center items-center">
        <div className="photo mt-3">
          ok
        </div>
        <input id = "grp_msg" type="text" className="mb-5 bg-transparent w-full rounded-lg pl-20 mr-3 mt-8" 
        placeholder = "What's on your mind?"/>
        </div>

        <div className="line"></div>

        <div className="flex justify-between mb-3 mt-2 ">
          <label htmlFor="file1" className="flex justify-center items-center opacity-[60%] ml-12 text-sm"> 
          <FaImages className = "mr-1"/> Add Images</label>
          <button className="bg-[#2573ef] rounded-lg border text-white w-[7vh] mr-10"> Share </button>
        </div>
      </div>

      </div>
      </div>
    </div>
  )
}

export default UI
