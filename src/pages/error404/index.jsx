import { NavLink } from "react-router-dom";
import './index.css'

export const Error404 = () => {
    return (
        <div className="errorPage">
            <p className="errorTitle">ERROR 404</p>
            <p className="errorText">Page not Found</p>
            <NavLink to="/">Back to homepage</NavLink>
        </div>
    );
};
