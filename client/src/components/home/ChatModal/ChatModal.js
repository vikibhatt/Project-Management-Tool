import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";

import Modal from "../../modal/modal";

import styles from "./ChatModal.module.css";
import {HiOutlineMail} from  'react-icons/hi'
import { getAllProjects } from "../../../firebase";
import {BsGithub} from 'react-icons/bs'
import {motion} from 'framer-motion'

function ChatModal(props) {
  const room = props.room;
  const details = props.details;
  const [projectsLoaded, setProjectsLoaded] = useState(false);
  const [projects, setProjects] = useState([]);

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

  useEffect(() => {
    fetchAllProjects();
  }, []);

  return (
    <Modal onClose={() => (props.onClose ? props.onClose() : "")}>
    <motion.div className={styles.container}
    initial ={{opacity: 0}}
    animate ={{opacity: 1}}
    exit = {{opacity: 0}}>


        <div className={styles.image}>
            <label htmlFor="rooms">Room: </label>
            <input type="text" placeholder="Enter Your Room " label = "Room" id = "rooms"/>
        </div>

        
        <div className = {styles.footer}>

        <p className={styles.cancel}
          onClick={() => (props.onClose ? props.onClose() : "")}>
          Cancel
        </p>
          <button className = "btn">Submit</button>

       </div>
      
    </motion.div>
  </Modal>
);
}

export default ChatModal;
