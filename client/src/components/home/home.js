import React, { useState } from 'react'
import logo from '../../assets/designer.svg'
import {AiOutlineArrowRight} from 'react-icons/ai'
import {useNavigate} from 'react-router-dom'
import styles from "./home.module.css"
import { signOut } from 'firebase/auth'
import {FiLogOut} from 'react-icons/fi'
import { auth,uploadImage,updateUserToDatabase } from '../../firebase'
import {motion} from 'framer-motion'
import { TbMessages } from 'react-icons/tb'
import ChatModal from './ChatModal/ChatModal'

function Home(props){
    const room = props.room;
    const userDetails = props.userDetails;
    const isAuthenticated = props.auth ? true : false;
    const [chatRoom, setChatRoom] = useState(false);

    const navigate = useNavigate();

    const handleNextButtonClick = () =>{
        if(isAuthenticated) navigate("/allprojects");
        else navigate('/login');
    }
    const handleLogout = async () => {
        await signOut(auth);
    }
    const message = () => {
        navigate('chatting')
        // setChatRoom(true)
    }
  return (
    <motion.div className={styles.container}
    initial ={{width: 0}}
    animate ={{width: "100%"}}
    exit = {{x: -window.innerWidth,transition: {duration: 0.1}}}>
        {
            chatRoom && <ChatModal
            room = {room}
            onClose = {() => {setChatRoom(false)}}
            uid = {userDetails.uid}/> 
            
        }
        <div className={styles.header}>
            <div className={styles.left}>
                <p className={styles.heading}>TASK MEDIA</p>
                <p className={styles.subheading}>
                    One stop designation for all tasks
                </p>
                <button className = {styles.button}
                onClick = {handleNextButtonClick}>
                    {
                        isAuthenticated ? "Manage Your Projects" : "Get Started"
                    }
                <AiOutlineArrowRight/>
                </button>

                

                {isAuthenticated && 
                
                <div className={styles.head}>
                    <div className={styles.btn}
                   onClick = {()=>{message()}}>
                   <TbMessages className = {styles.icon}/>
                   <p>Chat Now</p>
                   </div>
                   <div className= {styles.btn} onClick={handleLogout}>
                   <FiLogOut /> Logout
                 </div>
                </div>
                }
                
            </div>

            <div className={styles.right}>
                <img src={logo} alt="" />
            </div>
        </div>
    </motion.div>
  )
}

export default Home
