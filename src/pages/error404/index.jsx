import { NavLink } from "react-router-dom";
import './index.css';
import error404img from '../../assets/Error-404.webp';

export const Error404 = () => {
  return (
    <div className="errorPage">
      <img src={error404img} alt="404 Error" className="errorImage"/>
      <div className="errorContent">
        <p className="errorText">Page not Found</p>
        <NavLink to="/">Back to homepage</NavLink>
      </div>
    </div>
  );
};
