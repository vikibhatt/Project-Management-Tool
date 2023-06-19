import React,{useState} from 'react'
import { useNavigate,useHistory } from "react-router-dom";
import logo from '../images/logo.png'

const Signup = () => {
  const navigate = useNavigate(); 
  const home = () => {
    navigate('/');
  }
  const signupPage = () =>{
    navigate('/Signup');
  }
  const loginPage = () =>{
    navigate('/Login');
  }


  const [fdata,Setfdata] = useState({
    name: '',
    email:'',
    password:'',
    cpassword:''
  })
  const handleChange = (e) => {
    Setfdata({ ...fdata, [e.target.name]: e.target.value });
  };

  const [errMsg,setErrMsg] = useState(null)

  const sendToBackend = () => {
    // console.log(fdata);
    if(fdata.name == '' || fdata.email == '' || fdata.password == '' || fdata.cpassword == ''){
      return setErrMsg("*All fields are required");
    }
    else{
        if(fdata.password.length < 8 && fdata.cpassword.length < 8){
            return setErrMsg("*Password and confirm password is too short");
          }
      if(fdata.password != fdata.cpassword){
        return setErrMsg("*Password and confirm password must be same");
      }
      else{
        fetch('http://localhost:3000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(fdata),
        })
        .then(res => res.json()).then(
          (data) => {
            console.log(data);
            Setfdata(data)
          }
        )
      } 
    }
  }
  return (
    <section className="h-screen flex flex-col justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
      <img className="w-[50vh]" src={logo} alt="logo" onClick = {home}/>
        <img onClick = {home}
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image" />
      </div>
      <div className="md:w-1/3 max-w-sm">
      <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" 
      onClick={() =>setErrMsg(null)}
      type="text"
      name = "name"
      placeholder="UserName"
      value={fdata.name}
      onChange={handleChange} />

      <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-3" 
      onClick={() =>setErrMsg(null)}
      type="text" 
      name = "email"
      placeholder="Email Address" 
       value={fdata.email}
       onChange={handleChange}/>

        <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-3" 
        onClick={() =>setErrMsg(null)}
        type="text" 
        name = "password"
        placeholder="Password" 
        value={fdata.password}
        onChange={handleChange} />

        <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-3" 
        onClick={() =>setErrMsg(null)}
        type="text" 
        name = "cpassword"
        placeholder="Confirm Password" 
        value={fdata.cpassword}
        onChange={handleChange} />

        <div className="mt-4 flex justify-between font-semibold text-sm">
          <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
            <input className="mr-1" type="checkbox" />
            <span>Remember Me</span>
          </label>
        </div>
        {errMsg && (
          <div className="text-red-600 text-xs mt-2">
            {errMsg}
          </div>
        )}
        <div className="text-center md:text-left">
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider" type="submit"
           onClick = {() => {sendToBackend()}}
          >Sign Up</button>
        </div>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Have an account? <a className="text-red-600 hover:underline hover:underline-offset-4" href="#" onClick = {loginPage}>Login</a>
        </div>
      </div>
    </section>
  )
}

export default Signup
