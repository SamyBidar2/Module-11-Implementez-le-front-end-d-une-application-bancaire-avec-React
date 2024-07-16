import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../store/reducers/AuthSlice';
import { useNavigate } from 'react-router-dom';
import './index.css';
import Logo from '../../assets/argentBankLogo.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from "@fortawesome/free-solid-svg-icons/faUserCircle";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((store) => store.auth.currentUser);
  const userStatus = useSelector((store) => store.auth.userStatus);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className='main-nav'>
      <NavLink to={'/'} className="main-nav-logo">
        <img src={Logo} alt='logo ArgentBank' className='main-nav-logo-image'/>
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      
      <div>
        {userStatus.connected ? (
          <div className="container">
            <NavLink to={'/'} className="main-nav-item">
              <FontAwesomeIcon icon={faUserCircle} />
              {currentUser && currentUser.firstName}
            </NavLink>
            <NavLink to={'/'} className="main-nav-item" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOut} />
              Sign Out
            </NavLink>
          </div>
        ) : (
          <NavLink to={'/SignIn'} className="main-nav-item">
            <FontAwesomeIcon icon={faUserCircle}/>
            Sign In
          </NavLink>
        )}
      </div>
    </div>
  );
};
