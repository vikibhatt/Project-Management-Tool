import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";

import Modal from "../../modal/modal";

import styles from "./ProjectModal.module.css";
import {HiOutlineMail} from  'react-icons/hi'
import { getAllProjects } from "../../../firebase";
import {BsGithub} from 'react-icons/bs'
import {motion} from 'framer-motion'

function ProjectModal(props) {
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
      <p className={styles.heading}><p>Assigned To: </p>{details.assignto}</p>
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.image}>
            <img
              src={
                details?.thumbnail ||
                "https://www.agora-gallery.com/advice/wp-content/uploads/2015/10/image-placeholder-300x200.png"
              }
              alt="Project thumbnail"
            />
          </div>
          <div className={styles.links}>
            {details.github && <Link target = "_blank" to = {`//${details.github}`}>
             <BsGithub/>
            </Link>}
            <a href={`mailto:${details.assigntoemail}`}>
              <HiOutlineMail />
            </a>
          </div>
        </div>
        <div className={styles.right}>
          <p className={styles.title}><p>Title: </p> {details.projecttitle}</p>
          <p className={styles.overview}><p>Overview:</p> {details.projectoverview}</p>
          {details.points && details.points.length > 0 ? (
            <ul>
              <p>Important Points: </p> 
              {details.points.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </motion.div>
  </Modal>
);
}

export default ProjectModal;
