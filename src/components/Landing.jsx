import { Button } from "@mui/material";
import logo from "/side-img.jpg";
import { Link } from "react-router-dom";


const Landing = (props) => {
  return (
    <div>
    <div className='image-con'>
     <img src={logo} alt="LOGO" />
    </div>

    <div>
    <Link to="/app/signup" style={{ textDecoration: 'none' }}>
    <Button 
     className='button'
     variant="contained" 
    >
      Sign Up
    </Button>
    </Link>
    </div>

    <br />

    <div>
    <Link to="/app/login" style={{ textDecoration: 'none' }}>
    <Button 
     className='button'
     variant="contained" 
    >
      Login
    </Button>
    </Link>
    </div>

    <h2>{props.name ? `Welcome - ${props.name}` : "Login please"}</h2>
    
   </div>
  )
}

export default Landing
