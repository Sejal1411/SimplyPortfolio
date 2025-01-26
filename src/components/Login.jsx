import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../Firebase';
import { Link, useNavigate } from 'react-router-dom';
import logo from "/img1.jpg";
import logo2 from "/search.png";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.email || !values.pass) {
      setErrorMsg("Please fill all the fields*");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        const name = user.displayName || user.email.split('@')[0]; // Use email prefix if displayName is not available
        localStorage.setItem("name", name);
        setUsername(name);
        navigate("/app/dashboard");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
        console.log("Error-", err.message);
      });
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const profilePic = result.user.photoURL;

        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("profilePic", profilePic);
        setUsername(name);
        navigate('/app/dashboard');
      })
      .catch((error) => {
        console.error('Error signing in with Google', error);
      });
  };

  return (
    <div className='log-in'>
      <div className='log-in-box'>
        <p> User Login </p>

        <TextField
          id="outlined-basic"
          color=""
          label='Email'
          onChange={(e) => setValues((prev) => ({ ...prev, email: e.target.value }))}
          fullWidth
        />

        <TextField
          id="outlined-basic"
          color="success"
          type="password"
          autoComplete="current-password"
          label='Enter Password'
          onChange={(e) => setValues((prev) => ({ ...prev, pass: e.target.value }))}
          fullWidth
        />

        <b style={{ color: 'red', fontSize: '14px' }}>{errorMsg}</b>

        <Button
          className='button'
          variant="outlined"
          fullWidth
          onClick={handleSubmit}
          disabled={submitButtonDisabled}
        >
          Login
        </Button>

        <p className='text'>Not Registered? Create an account{" "}
          <span>
            <Link to="/app/signup" className='text2'>Signup</Link>
          </span>
        </p>

        <p style={{ color: 'white', fontSize: '14px' }}>OR</p>

        <Button
          className='button1'
          variant="text"
          onClick={signInWithGoogle}
        >
          <img src={logo2} alt="LOGO" />
          <p className='text1' styles={{ paddingRight: 16 }}>Sign in with Google</p>
        </Button>
      </div>
    </div>
  );
};

export default Login;