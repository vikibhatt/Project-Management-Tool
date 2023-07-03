import React, { useRef, useState } from 'react'
import styles from "./projectForm.module.css"
import Modal from '../../modal/modal'
import InputControl from '../../inputControl/inputControl'
import {MdClose} from "react-icons/md"
import {addProjectInDatabase, updateProjectInDatabase, uploadImage} from '../../../firebase'
import { updateProfile } from 'firebase/auth'
import {motion} from 'framer-motion'


function ProjectForm(props) {
  const fileInputRef = useRef();
  const isEdit = props.isEdit ? true : false;
  const defaults = props.default;

  
  const [errorMessage, setErrorMessage] = useState("");
  const [imageUploadStarted, setImageUploadStarted] = useState(false);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);


  const imagePicker = useRef();
  const handleCameraChange = () => {
    imagePicker.current.click();
  }
  const [values, setValues] = useState({
    thumbnail: defaults?.thumbnail || "",
    projecttitle: defaults?.projecttitle || "",
    projectoverview: defaults?.projectoverview || "",
    assignto: defaults?.assignto || "",
    assignby: defaults?.assignby || "",
    assigntoemail: defaults?.assigntoemail || "",
    points: defaults?.points || [""],
    github: defaults ?.github || "",
  });


  const handleAddPoint = (value,index) => {
    const tempPoints = [...values.points];
    tempPoints[index] = value;
    setValues(prev => ({...prev,points:tempPoints}));
  }
  const handlePointDelete = (index) => {
    const tempPoints = [...values.points];
    tempPoints.splice(index, 1);
    setValues((prev) => ({ ...prev, points: tempPoints }));
  };
  const handleAddPointToValues = () => {
    setValues(prev => ({...prev,points:[...values.points,""]}));
  }

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImageUploadStarted(true);
    uploadImage(
      file,
      (progress) => {
        setImageUploadProgress(progress);
      },
      (url) => {
        setImageUploadStarted(false);
        setImageUploadProgress(0);
        setValues((prev) => ({ ...prev, thumbnail: url }));
      },
      (error) => {
        setImageUploadStarted(false);
        setErrorMessage(error);
      }
    )
  };

  const validateForm = () => {
    const actualPoints = values.points.filter((item) => item.trim());

    let isValid = true;

    if (!values.thumbnail) {
      isValid = false;
      setErrorMessage("Thumbnail for project is required");
    } else if (!values.assignto) {
      isValid = false;
      setErrorMessage("Please Assign task to someone");
    } else if (!values.assignby) {
      isValid = false;
      setErrorMessage("Please insert Assigner name");
    } else if (!values.assigntoemail) {
      isValid = false;
      setErrorMessage("Add email");
    } else if (!values.projecttitle) {
      isValid = false;
      setErrorMessage("Project's Title required");
    } else if (!values.projectoverview) {
      isValid = false;
      setErrorMessage("Project's Overview required");
    } else if (!actualPoints.length) {
      isValid = false;
      setErrorMessage("Description of Project is required");
    } else if (actualPoints.length < 1) {
      isValid = false;
      setErrorMessage("AtLeast 1 description points required");
    } else {
      setErrorMessage("");
    }

    return isValid;
  };

  const handleSubmission = async () => {
    if (!validateForm()) return;

    setSubmitButtonDisabled(true);
    if(isEdit) 
     await updateProjectInDatabase({...values,refUser:props.uid},defaults.pid)
    else await addProjectInDatabase({ ...values, refUser: props.uid });
    setSubmitButtonDisabled(false);
    if(props.onSubmission) props.onSubmission();
    if(props.onClose) props.onClose();
  }

  return (
    <Modal onClose={() => (props.onClose ? props.onClose() : "")}>
    <motion.div className={styles.container}
     initial ={{opacity: 0}}
     animate ={{opacity: 1}}
     exit = {{opacity: 0}}>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleFileInputChange}
        accept="image/*"
      />
        <div className={styles.inner}>
          <div className={styles.left}>
          <div className={styles.image}>
            <img
              src={
                values.thumbnail ||
                "https://www.agora-gallery.com/advice/wp-content/uploads/2015/10/image-placeholder-300x200.png"
              }
              alt="Thumbnail"
              onClick={() => fileInputRef.current.click()}
            />
            {imageUploadStarted && (
              <p>
                <span>{imageUploadProgress.toFixed(2)}%</span> Uploaded
              </p>
            )}
          </div>
            <InputControl label = "Assigned To" placeholder = "Assign Task to someone"
            value = {values.assignto} 
            onChange = {(event) => setValues(prev => ({...prev,assignto:event.target.value}))}
            onClick = {() => setErrorMessage(false)}/>
            <InputControl label = "Assigned By" placeholder = "Enter Your Name"
            value = {values.assignby} 
            onChange = {(event) => setValues(prev => ({...prev,assignby:event.target.value}))}
            onClick = {() => setErrorMessage(false)}/>
            <InputControl type = "assigntoemail" pattern=".+@gmail.com" label = "Email"
            placeholder = "Enter your Email Address"
            value = {values.assigntoemail} 
            onChange = {(event) => setValues(prev => ({...prev,assigntoemail:event.target.value}))}
            onClick = {() => setErrorMessage(false)}/>
          </div>
          <div className={styles.right}>
         <InputControl label = "GitHub Repository" placeholder = "Enter Your Github Link"
            value = {values.github} 
            onChange = {(event) => setValues(prev => ({...prev,github:event.target.value}))}
            onClick = {() => setErrorMessage(false)}/>
          <InputControl label = "Project Title" placeholder = "Project Title"
          value = {values.projecttitle} 
          onChange = {(event) => setValues(prev => ({...prev,projecttitle:event.target.value}))}
          onClick = {() => setErrorMessage(false)}/>
          <InputControl label = "Project Overview" placeholder = "Project Overview"
          value = {values.projectoverview} 
          onChange = {(event) => setValues(prev => ({...prev,projectoverview:event.target.value}))}
          onClick = {() => setErrorMessage(false)}/>

          <div className={styles.description}>
            <div className={styles.top}>
            <p className={styles.title}>Project description </p>
            <p className={styles.link}
            onClick = {handleAddPointToValues}>+ Add Point</p>
          </div>

          <div className={styles.inputs}>
          {values.points?.map((item,index )=> (

            <div className={styles.input} key = {index}>
             <InputControl
             key={index} 
             value = {item}
             onChange = {(event) => handleAddPoint(event.target.value,index)}
             onClick = {() => setErrorMessage(false)}/>
  
             {index > 0 && <MdClose
             onClick = {() => {handlePointDelete(index)}}/>}
            </div>
          ))}
          </div>
          </div>
          </div>
          </div>
      <p className={styles.error}>{errorMessage}</p>
      <div className={styles.footer}>
        <p
          className={styles.cancel}
          onClick={() => (props.onClose ? props.onClose() : "")}
         >
          Cancel
        </p>
        <button
          className="btn"
          onClick={handleSubmission}
          disabled={submitButtonDisabled}
        >
          Submit
        </button>
      </div>
    </motion.div>
  </Modal>
);
}

export default ProjectForm
 