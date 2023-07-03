import React,{useState,useEffect} from 'react'
import styles from './AllProjects.module.css'
import Spinner from '../spinner/spinner'
import { useNavigate } from "react-router-dom";
import { auth, getAllProjects } from "../../firebase";
import ProjectModal from "./ProjectModal/ProjectModal";
import {AiOutlineArrowLeft} from 'react-icons/ai'
import {FiLogOut,FiSearch } from 'react-icons/fi'
import { signOut } from 'firebase/auth';
import {motion} from 'framer-motion'

function AllProjects(props) {
    const userDetails = props.userDetails;
    const navigate = useNavigate();
    const isAuthenticated = props.auth ? true : false;
    const [projectsLoaded, setProjectsLoaded] = useState(false);
    const [projects, setProjects] = useState([]);
    const [showProjectModal, setShowProjectModal] = useState(false);
    const [projectDetails, setProjectDetails] = useState({});
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProjects = projects.filter((item) =>
     item.projecttitle.toLowerCase().includes(searchQuery.toLowerCase())
   );

    const navigateToProject = () => {
      navigate('/projects')
    }
    const navigateToUserProfile = () => {
      navigate('/userprofile')
    }

    const handleNextButtonClick = () => {
        if (isAuthenticated) navigate("/account");
        else navigate("/login");
      };
    
      const fetchAllProjects = async () => {
        const result = await getAllProjects();
        setProjectsLoaded(true);
        if (!result) {
          return;
        }
    
        const tempProjects = [];
        result.forEach((doc) => tempProjects.push({ ...doc.data(), pid: doc.id }));
    
        setProjects(tempProjects);
      };
    
      const handleProjectCardClick = (project) => {
        setShowProjectModal(true);
        setProjectDetails(project);
      };
    
      useEffect(() => {
        fetchAllProjects();
      }, []);

      function handleBack(){
        navigate('/');
      }

      const handleLogout = async () => {
        await signOut(auth);
       }

  return (
    <motion.div className = {styles.container}
     initial ={{width: 0}}
     animate ={{width: "100%"}}
     exit = {{x: -window.innerWidth,transition: {duration: 0.1}}}
    >

       {showProjectModal && (
        <ProjectModal
          onClose={() => setShowProjectModal(false)}
          details={projectDetails}
        />
      )}

       <div className={styles.body}>
        <div className={styles.nav}>
         <button className={styles.back}
           onClick = {handleBack}>
            <AiOutlineArrowLeft
            className = "mr-1"/>Back to Home
          </button>
        <div className={styles.leftCorner}>
        <button className= "btn" onClick={handleLogout}>
          <FiLogOut /> Logout
        </button>
        <div className={styles.imag}
        onClick = {() => {navigateToUserProfile()}}>
              <img src={userDetails.profileImage} alt="Profile Image" />
            
         <p>{userDetails.name}</p>
         
        </div> 
        </div>
        </div>
        
        <div className={styles.navbtn}>
        <p className={styles.title}>All Projects</p>
        <button className="btn"
        onClick = {() => {navigateToProject()}} >Add Projects
        </button>
        </div>
        <div className={styles.searchheader}>
             <div className={styles.ico}>
             <input type="text" className = {styles.searchbar}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}/>
             <FiSearch className = {styles.icon}/>
             </div>
        </div>
        
        <div className={styles.projects}>
          {projectsLoaded ? (
            filteredProjects.length > 0 ? (
              filteredProjects.map((item) => (
                <div
                  className={styles.project}
                  key={item.pid}
                  onClick={() => handleProjectCardClick(item)}
                >
                  <div className={styles.image}>
                    <img
                      src={
                        item.thumbnail ||
                        "https://www.agora-gallery.com/advice/wp-content/uploads/2015/10/image-placeholder-300x200.png"
                      }
                      alt="Project thumbnail"
                    />
                  </div>
                  <p className={styles.title}>{item.projecttitle}</p>
                </div>
              ))
            ) : (
              <p>No projects found</p>
            )
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default AllProjects
