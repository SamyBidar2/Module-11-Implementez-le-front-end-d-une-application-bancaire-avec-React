import { NavLink } from "react-router-dom";
import './index.css'

export const Error = () => {
    return (
        <div className="errorPage">
            <p className="errorTitle">ERROR 401</p>
            <p className="errorText">Unauthenticated User. Please Sign In</p>
            <NavLink to="/">Back to homepage</NavLink>
        </div>
    );
};
