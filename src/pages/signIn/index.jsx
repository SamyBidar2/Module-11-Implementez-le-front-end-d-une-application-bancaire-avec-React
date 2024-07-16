import './index.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/Authentification';
import { useDispatch } from 'react-redux';
import { loginFailure, loginSuccess } from '../../store/reducers/AuthSlice';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    const message = document.getElementById('error-message');
    const loginFail = document.createElement('div'); 
    
    e.preventDefault();
    try {            
      const { user } = await login(email, password);
      dispatch(loginSuccess({ user }));
      navigate('/User');
    } catch (error) {
      dispatch(loginFailure());
      loginFail.classList.add('error-message');
      loginFail.innerHTML = 'Login Failed, please try again';
      message.appendChild(loginFail);
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper" id="input-wrapper-username">
            <label htmlFor="username">Username</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" id="username" />
          </div>
          <div className="input-wrapper" id="input-wrapper-password">
            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button" type="submit">Sign In</button> 
        </form>
        <div id='error-message'></div>
      </section>
    </main>
  );
};
