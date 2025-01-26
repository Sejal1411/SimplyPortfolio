import {  Button, TextField } from '@mui/material'
import logo from "/img1.jpg";
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
    confirmPass: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmit = () => {
    if(!values.name || !values.email || !values.pass || !values.confirmPass) {
      setErrorMsg("Please fill all the fields*");
      return;
    }

    if(values.pass !== values.confirmPass) {
        setErrorMsg("Passwords do not match*");
        return;
    }

    setErrorMsg("");
    setSubmitButtonDisabled(true);

    createUserWithEmailAndPassword(auth, values.email, values.pass)
    .then(async(res) => {
      setSubmitButtonDisabled(false);
      const user = res.user;
      await updateProfile(user, {
        displayName: values.name,
      }); 
      navigate("/");
      // console.log(user);
    })
    .catch((err) => {
      setSubmitButtonDisabled(false);
      setErrorMsg(err.message);
      console.log("Error-", err.message)
});
      
  };

  return (

<div className='sign-up'>
    {/* <div className='image-con'>
      <img src={logo} alt="LOGO" />
    </div> */}

    <div className='sign-up-box'>
     <p>Signup !</p>
     <p className='text'>Please enter the details to Create Your Account</p>

     <TextField 
     id="outlined-basic"
     color="success" 
     label='Enter Name'
     //  value={name}
     onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
     fullWidth
     />

     <TextField 
     id="outlined-basic"
     color="success" 
     label='Enter Email'
     //  value={email}
     onChange={(e) => setValues((prev) => ({ ...prev, email: e.target.value }))}
     fullWidth
     />
     
     <TextField
     id="outlined-basic"
     color="success" 
     type="password"
     autoComplete="current-password"
     label='Enter Password'
     //  value={password}
     onChange={(e) => setValues((prev) => ({ ...prev, pass: e.target.value }))}
     fullWidth
     />

    <TextField
     id="outlined-basic"
     color="success" 
     type="password"
     autoComplete="current-password"
     label='Confirm Password'
     //  value={password}
     onChange={(e) => setValues((prev) => ({ ...prev, confirmPass: e.target.value }))}
     fullWidth
     />
    
     <b style={{ color: 'red', fontSize: '14px' }}>{errorMsg}</b>
    
     <Button 
     className='button'
    variant="outlined"
     fullWidth
     onClick={handleSubmit}
     disabled = {submitButtonDisabled}
     >
      Sign Up
     </Button>
     <p className='text'>Already have an account?{" "}
       <span>
        <Link to="/app/login" className='text2'>Login</Link>
       </span>
     </p>
  </div>
</div>
  )
}

export default Signup;

