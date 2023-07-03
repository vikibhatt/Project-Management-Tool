import react,{useEffect, useState} from 'react'
import './App.css';
import Home from './components/home/home'
import Profile from './components/profile/profile'
import Auth from './components/auth/auth'
import Spinner from './components/spinner/spinner'
import Project from "./components/projects/projects"
import AllProjects from './components/AllProjects/AllProjects'
import {Routes,Route,Navigate,useLocation} from 'react-router-dom'
import { auth, getUserFromDatabase } from './firebase';
import {AnimatePresence} from 'framer-motion'
import MessagingPage from './components/MessagingPage/MessagingPage';

function App() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [room, setRoom] = useState("Room1");

  const fetchUserDetails = async (uid) => {
    const userDetails = await getUserFromDatabase(uid);
    setIsDataLoaded(true);
    setUserDetails(userDetails);
  }

  useEffect (() => {
    const listner = auth.onAuthStateChanged((user) => {
      if(!user){
        setIsDataLoaded(true);
        setIsAuthenticated(false)
        return;
      }

      setIsAuthenticated(true);
      const userId = user.uid;

      fetchUserDetails(user.uid);
    })

    return () => listner();
  }, [])
  return (
    <div className="app">
      
      {isDataLoaded ? 
      
      
      ( <AnimatePresence>
        <Routes location = {location} key = {location.pathname}>
        { !isAuthenticated && (<> 
        <Route path="/login" element = {<Auth/>}/>
        <Route path="/signup" element = {<Auth signup/>}/>
       </>
       )}
        <Route path="/chatting" element = {<MessagingPage
        room = {room}
        auth = {isAuthenticated}
        userDetails = {userDetails}/>}/>
         <Route path="/allprojects" element = {<AllProjects
         userDetails = {userDetails} />}/>
        
         <Route path="/projects" element = {<Project userDetails = {userDetails}/>}/>
        <Route path="/userprofile" 
        element = {<Profile 
        userDetails = {userDetails} 
        auth = {isAuthenticated}/>}/>
        <Route path="/" element = {<Home auth = {isAuthenticated} userDetails = {userDetails} room = {room}/>}/>
        <Route path="/*" element = {<Navigate to = "/"/>}/>
       </Routes>  
       
       </AnimatePresence>
       ): 
       (<Spinner/>)

    }
    </div>
  );
}

export default App;
