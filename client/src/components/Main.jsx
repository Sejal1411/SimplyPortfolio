import Signup from './Signup'
import Login from './Login'
import { Outlet } from 'react-router-dom';
// import Home from './Home';

const Main = () => {
  return (
    <main>
      {/* <Home /> */}
      {/* <Login /> */}
      <Outlet />
      {/* <Signup /> */}


    </main>
  );
};

export default Main

