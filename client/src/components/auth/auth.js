import React,{useState} from 'react'
import InputControl from '../inputControl/inputControl';
import {Link} from 'react-router-dom'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import {useNavigate} from 'react-router-dom'
import {createUserWithEmailAndPassword,signInWithEmailAndPassword, signInWithPopup} from "firebase/auth"
import {provider, updateUserToDatabase} from "../../firebase"
import {auth} from "../../firebase"
import styles from './auth.module.css'
import {motion} from 'framer-motion'
import {FcGoogle} from 'react-icons/fc'

 function Auth (props) {
    const navigate = useNavigate();
    const isSignup = props.signup ? true : false;

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [errMsg, setErrMsg] = useState("");
   
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const handleSignup = () => {
        if(!values.name || !values.email || !values.password){
            return setErrMsg("*All Fields are Required");  
        }

        setSubmitButtonDisabled(true);
        createUserWithEmailAndPassword(auth,values.email,values.password).then(
            async (res) => {
                
                const userId = res.user.uid;
                await updateUserToDatabase(
                  {name:values.name,email:values.email},
                  userId
                );
                setSubmitButtonDisabled(false);
                navigate('/');
            })
            .catch(err => {
                setSubmitButtonDisabled(false);
                setErrMsg(err.message);
            }
        );
    }

    const handleLogin = () => {
        if(!values.email || !values.password){
            return setErrMsg("*All Fields are Required");  
        }

        setSubmitButtonDisabled(true);
        signInWithEmailAndPassword(auth,values.email,values.password)
        .then( async () => {
                setSubmitButtonDisabled(false);
                navigate('/');
            })
            .catch(err => {
                setSubmitButtonDisabled(false);
                setErrMsg(err.message);
            }
        );
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(isSignup) handleSignup();
        else handleLogin();
    }

    const signInWithGoogle = async() => {
      await signInWithPopup(auth,provider)
      
    }
  return (
    <motion.div className={styles.container}
    initial ={{width: 0}}
     animate ={{width: "100%"}}
     exit = {{x: -window.innerWidth,transition: {duration: 0.1}}}>
        
        <form className = {styles.form} onSubmit = {handleSubmit} >
            <Link to = "/" className={styles.back}> <AiOutlineArrowLeft
            className = "mr-1"/>{"Back "}</Link>
            <p className={styles.heading}>{isSignup ? "Signup" : "Login"}</p>

            {isSignup && <InputControl label = "Name" placeholder = "Enter your Name"
            onChange = {(event) => setValues(prev => ({...prev,name:event.target.value}))}
            onClick = {() => setErrMsg(null)}
            />}
            <InputControl label = "Email" placeholder = "Enter your Email"
            onChange = {(event) => setValues(prev => ({...prev,email:event.target.value}))}
            onClick = {() => setErrMsg(null)}
            />
            <InputControl label = {"Password"} isPassword = {true} placeholder = "Enter your Password"
            onChange = {(event) => setValues(prev => ({...prev,password:event.target.value}))}
            onClick = {() => setErrMsg(null)}
            />
           <p className={styles.error}> {errMsg}</p>

            <button type = "submit"
              disabled = {submitButtonDisabled}
            >{isSignup ? "SIGNUP" : "LOGIN"}</button>

            <div className={styles.bottom}>
                {
                  isSignup ? (
                    <p>
                     <div className = {styles.google} 
                     onClick = {() => signInWithGoogle()}><FcGoogle/> Signup with google</div>
                    Already have an account ? <Link to = "/login"
                    onClick = {() => setErrMsg(null)}>
                      Login here
                    </Link>
                    </p>
                  ) : (
                    <p>
                    <div className = {styles.google}
                    onClick = {() => signInWithGoogle()}><FcGoogle/> Login with google</div>
                    New Here ? <Link to = "/signup"
                    onClick = {() => setErrMsg(null)}>
                      Create an account
                    </Link>
                    
                    </p>
                  )
                }
            </div>
        </form>
    </motion.div>
  )
}

export default Auth
