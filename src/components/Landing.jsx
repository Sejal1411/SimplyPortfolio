import { Button } from "@mui/material";
import logo1 from "/img2.jpg";
import { Link } from "react-router-dom";


const Landing = (props) => {
  return (
    <div>
      <h1 className="heading">"InvestWise: Your Ultimate Portfolio Tracker" 🚀</h1>
      <div className="container">
      <div className='image-con'>
        <img src={logo1} alt="LOGO" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="button-container">
        <Link to="/app/signup" style={{ textDecoration: 'none' }}>
          <Button 
            className='button'
            variant="outlined"
          >
            Sign Up
          </Button>
        </Link>

        <Link to="/app/login" style={{ textDecoration: 'none' }}>
          <Button 
            className='button'
            variant="outlined"
          >
            Login
          </Button>
        </Link>
      </div>
    </div>
    </div>
  
  );
};

export default Landing;