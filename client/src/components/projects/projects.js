import React,{useEffect, useState} from 'react'
import {BiEditAlt,BiTrash,BiLogoGithub,BiLogoLinkedinSquare} from "react-icons/bi"
import {BsLinkedin,BsGithub} from "react-icons/bs"
import styles from './projects.module.css'
import ProjectForm from './projectForm/projectForm'
import {TbMessages} from "react-icons/tb"
import {userProfileValues,userDetails,profileImageUrl} from '../profile/profile'
import {values} from './projectForm/projectForm'
import {Link} from "react-router-dom"
import { auth, deleteProject, getAllProjectsForUser,updateProjectInDatabase } from '../../firebase'
import Spinner from '../spinner/spinner'
import {FiSearch} from 'react-icons/fi'
import {HiOutlineMail} from 'react-icons/hi'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import {FiLogOut} from 'react-icons/fi'
import { signOut } from 'firebase/auth'
import {motion} from 'framer-motion'

function Projects(props) {
  const navigate =  useNavigate();
  function handleBack(){
    navigate('/allprojects');
  }
  const profileImageUrl = props.profileImageUrl;
   const userProfileValues = props.userProfileValues;
   const userDetails = props.userDetails;
   const values = props.values;
   const [showProjectForm, setShowProjectForm] = useState(false);
   const [projectLoaded, setProjectLoaded] = useState(false);
   const [projects, setProjects] = useState([]);
   const [isEditProjectModal, setIsEditProjectModal] = useState(false)
   const [editProject, setEditProject] = useState([])
   const [searchQuery, setSearchQuery] = useState('');

   const filteredProjects = projects.filter((item) =>
    item.projecttitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

   const fetchAllProjects = async (pid) => {
     const result  = await getAllProjectsForUser(userDetails.uid);

     if(!result){
      setProjectLoaded(true);
      return;
     }
     setProjectLoaded(true);

     const tempProjects = [];
     result.forEach((doc)=> tempProjects.push({...doc.data(),pid:doc.id}));
     setProjects(tempProjects);
   }

   useEffect(() => {
    fetchAllProjects();
   },[])
   
   const handleEditClick = (project) => {
    setIsEditProjectModal(true);
    setEditProject(project);
    setShowProjectForm(true);
   }

   const handleDeletion = async (pid) => {
    await deleteProject(pid);
    fetchAllProjects();
   }
   const handleLogout = async () => {
    await signOut(auth);
   }

   const message = () => {
    navigate('/chatting');
   }
  return (
    <motion.div className = {styles.container}
    initial ={{width: 0}}
    animate ={{width: "100%"}}
    exit = {{x: -window.innerWidth,transition: {duration: 0.1}}}>


      {showProjectForm && <ProjectForm 
      onSubmission = {fetchAllProjects}
      onClose = {() => {setShowProjectForm(false)}}
      uid = {userDetails.uid}
      isEdit = {isEditProjectModal}
      default = {editProject}/> 
      }
      <div className={styles.section}>
        <div className={styles.nav}>
          <button className={styles.back}
           onClick = {handleBack}>
            <AiOutlineArrowLeft
            className = "mr-1"/>Back to Projects
          </button>
         <Link to = "/userprofile" className = {styles.profile}>
          <div className={styles.left}>
          <button className= "btn" onClick={handleLogout}>
                   <FiLogOut /> Logout
          </button>
            <div className={styles.image}>
              <img src={userDetails.profileImage} alt="Profile Image" />
            
            <p>{userDetails.name}</p>
         
           </div> 
         
           </div>
         
         </Link>
         </div>
        
         <div className={styles.projectHeader}>
            <div className={styles.title}>Your Projects</div>
            
            <div className={styles.searchheader}>
             <div className={styles.ico}>
             <input type="text" className = {styles.searchbar}
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}/>
             <FiSearch className = {styles.icon}/>
             </div>
             <button className="btn"
              onClick = {() => setShowProjectForm(true)}>Add Project
             </button>
            </div>
             
             
         </div>
         

         <div className={styles.projects}>
          {projectLoaded ? (
            filteredProjects.length > 0 ? (
              filteredProjects.map((item, index) => (
                <div
                  className={styles.project}
                  key={item.projecttitle + index}
                >
                  <p
                    className={styles.title}
                    // onClick={() => setShowProjectForm(true)}
                  >
                    {item.projecttitle}
                  </p>

                  <div className={styles.links}>
                    <BiEditAlt onClick={() => handleEditClick(item)} />
                    <BiTrash onClick={() => handleDeletion(item.pid)} />
                  </div>
                </div>
              ))
            ) : (
              <p>No Projects Found</p>
            )
          ) : (
            <Spinner />
          )}
         </div>
      </div>
    </motion.div>
  )
}

export default Projects
