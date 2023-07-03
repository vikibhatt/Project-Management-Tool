import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import {doc, setDoc,getFirestore, getDoc, addDoc, collection, getDocs, where, query, deleteDoc} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyAQe9cCbCeSCye6aHEGMwDDJ3RktFlDEx0",
  authDomain: "task-media-21c04.firebaseapp.com",
  projectId: "task-media-21c04",
  storageBucket: "task-media-21c04.appspot.com",
  messagingSenderId: "737872908434",
  appId: "1:737872908434:web:be743a413ada4bee09564b",
  measurementId: "G-KM9NVLSCE7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

const updateUserToDatabase = async (user,uid) => {
  if(typeof user != "object") return;

  const docRef = doc(db,"Users",uid);
  await setDoc(docRef, {...user,uid});
}

const addProjectInDatabase = async (project) => {
  if(typeof project != "object") return;

  const collectionRef = collection(db,"Projects");
  await addDoc(collectionRef, {...project});
}
const updateProjectInDatabase = async (project, pid) => {
  if (typeof project !== "object") return;

  const docRef = doc(db, "Projects", pid);
  await setDoc(docRef, { ...project,pid});
};
const deleteProject = async (pid) => {
  const docRef = doc(db, "Projects", pid);
  await deleteDoc(docRef);
};

const getAllProjects = async () => {
  return await getDocs(collection(db, "Projects"));
};

const getAllMessages = async () => {
  return await getDocs(collection(db, "Messages"));
};

const getAllProjectsForUser = async (uid) => {
  if (!uid) return;

  const collectionRef = collection(db, "Projects");
  const condition = where("refUser", "==", uid);
  const dbQuery = query(collectionRef, condition);

  return await getDocs(dbQuery);
};

const getUserFromDatabase = async (uid) => {
  const docRef = doc(db,"Users",uid);
  const result = await getDoc(docRef);

  if(!result.exists()) return null;

  return result.data();
}

const uploadImage = (file,progressCallback,urlCallback,errorCallback) => {
  if(!file){
    errorCallback("File Not Found");
    return;
  }

  const fileType = file.type;
  const fileSize = file.size / 1024 / 1024;

  if(!fileType.includes("image")){
    errorCallback("File must be an image");
    return;
  }

  if(fileSize > 2){
    errorCallback("File must be smaller than 2MB");
    return;
  }

  const storageRef = ref(storage,`images/${file.name}`);
  const task = uploadBytesResumable(storageRef,file);

  task.on("state_changed",
  (snapshot) => {
    const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
    progressCallback(progress);
  },(error) => {
    console.log(error.message);
    return;
  },()=>{
    getDownloadURL(storageRef) .then((url) => {
      urlCallback(url);
    }
    );
  })
}
export {app as default,auth,updateUserToDatabase,getUserFromDatabase,
  uploadImage,addProjectInDatabase,updateProjectInDatabase,getAllProjects,
  getAllProjectsForUser,deleteProject,getAllMessages,db,provider};