import React,{useEffect, useRef, useState} from 'react'
import {FiLogOut} from 'react-icons/fi'
import {LuCamera,LuCameraOff} from 'react-icons/lu'
import styles from './profile.module.css'
import {Navigate,useNavigate,Link} from 'react-router-dom'
import InputControl from '../inputControl/inputControl'
import { signOut } from 'firebase/auth'
import { auth,uploadImage,updateUserToDatabase } from '../../firebase'
import { ref } from 'firebase/storage'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import {motion} from 'framer-motion'

function Account(props) {

  const userDetails = props.userDetails;
  const isAuthenticated = props.auth;
  const navigate = useNavigate();

  const [progress, setProgress] = useState(0)
  const [profileImageUrl, setProfileImageUrl] = useState
  (userDetails.profileImage || "https://fl-1.cdn.flockler.com/embed/no-image.svg");

  const [profileImageUploadStarted, setProfileImageUploadStarted] = useState(false);

  const [saveDetailsButton, setSaveDetailsButton] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);

  const [userProfileValues, setUserProfileValues] = useState({
    name:userDetails.name,
    title:userDetails.title || "",
    github:userDetails.github || "",
    linkedin:userDetails.linkedin || "",
  })

  const handleLogout = async () => {
    await signOut(auth);
  }

  const imagePicker = useRef();

  const handleCameraClick = () => {
    imagePicker.current.click();
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if(!file) return;

    setProfileImageUploadStarted(true);
    uploadImage(file,
     (progress)=>{setProgress(progress)},
     (url)=>{
      setProfileImageUrl(url);
      updateProfileImage(url)
      setProfileImageUploadStarted(false);
      setProgress(0);
    },
     (error)=>{
      console.log("Error-> ",error)
      setProfileImageUploadStarted(true);
    },
    );
  }

  const handleInputChange = (event,property) => {
    setSaveDetailsButton(true);

    setUserProfileValues((prev) => ({
      ...prev,
      [property]:event.target.value
    }))
  }

  const saveDetailsToDatabase = async () => {
    if (!userProfileValues.name) {
      setErrMsg("Name required");
      return;
    }
    setSaveButtonDisabled(true);
    await updateUserToDatabase({ ...userProfileValues }, userDetails.uid);
    setSaveDetailsButton(false);
    setSaveButtonDisabled(false);
  };

  const updateProfileImage = async (url) => {
    await updateUserToDatabase({ ...userProfileValues,profileImage:url }, userDetails.uid);
  }

  return isAuthenticated ? (
    <motion.div className = {styles.container}
    initial ={{width: 0}}
    animate ={{width: "100%"}}
    exit = {{x: -window.innerWidth,transition: {duration: 0.1}}}>
      <div className={styles.header}>
      <Link to = "/projects" className={styles.back}><AiOutlineArrowLeft
            className = "mr-1"/>Back</Link>
        

        <div className="btn"
         onClick = {handleLogout}>
          <FiLogOut/>Logout
        </div>
      </div>

      <div className={styles.section}>
        
        <p className={styles.heading}>
          Welcome <span>{userDetails.name}</span>
        </p>
        <div className={styles.profile}>
          <div className={styles.left}>
            <div className={styles.image}>
              <img src={profileImageUrl} alt="Profile Image" />
              
              <div className={styles.camera}
              onClick = {handleCameraClick}>
              <LuCamera/>
              </div>
            </div>
           {profileImageUploadStarted ? (
           <p className={styles.progress}>
             {
              progress == 100  
              ? "Getting image ready..."
              : `${progress.toFixed(2)} % uploaded`
             }
            </p>
           ):(
            ""
           )}
           
          </div>

          <input ref = {imagePicker} type="file" hidden accept='image/*'
          onChange = {handleImageChange}/>

          <div className={styles.right}>
            <div className={styles.row}>
              <InputControl 
              label = "Name"
              placeholder = "Enter your name"
              value = {userProfileValues.name}
               onChange = {(event) => 
               handleInputChange(event,"name")}
               onClick = {()=> setErrMsg(null)}/>
              <InputControl 
              label = "Title"
              placeholder = "eg. Full stack developer"
              value = {userProfileValues.title}
              onChange = {(event) => 
               handleInputChange(event,"title")}
               onClick = {()=> setErrMsg(null)}/>
            </div>
            <div className={styles.row}>
              <InputControl 
              label = "Github"
              placeholder = "Enter your github link"
              value = {userProfileValues.github}
              onChange = {(event) => 
               handleInputChange(event,"github")}
               onClick = {()=> setErrMsg(null)}/>
              <InputControl 
              label = "Linkedin"
              placeholder = "Enter your linkedin link"
              value = {userProfileValues.linkedin}
              onChange = {(event) => 
               handleInputChange(event,"linkedin")}
               onClick = {()=> setErrMsg(null)}/>
            </div>

             <div className={styles.footer}>

              <p className={styles.error}>{errMsg}</p>
            {
              saveDetailsButton && 
              <button className={styles.button}
              disabled = {saveButtonDisabled}
              onClick = {saveDetailsToDatabase}>Save Details
              </button>
            }
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  ) : (
    <Navigate to = "/"/>
  )
}

export default Account
