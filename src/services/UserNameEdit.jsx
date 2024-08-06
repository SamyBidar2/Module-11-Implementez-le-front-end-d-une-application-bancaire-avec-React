import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userNameUpdate } from "../store/reducers/AuthSlice";
import { Modal} from "../components/modal";
import "./UserNameEdit.css";

export const UserNameEdit = ({ show, handleClose }) => {
  const userData = useSelector((store) => store.auth.currentUser);
  const [newUserName, setNewUserName] = useState(userData.userName);
  const [showSuccess, setShowSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('Token');

    if (!token) {
      setMessage('No token found in session storage');
      console.error('No token found in session storage');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userName: newUserName,
        }),
      });

      if (!response.ok) {
        setMessage('Username update failed');
        throw new Error('Username update failed');
      }

      const result = await response.json();
      // console.log('Username update : ', result);

      if (result.body) {
        dispatch(userNameUpdate(newUserName));
        setMessage('Your username has been successfully updated.');
        setShowSuccess(true);
        // console.log('body: ', result.body);
      } else {
        setMessage('Failed to update username');
        // console.error('Failed to update username');
      }
    } catch (error) {
      setMessage('Error during username Update');
      // console.error('Error during username Update', error);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccess(false);
    setMessage("");
    handleClose();
  };

  return (
    <Modal show={show} handleClose={closeSuccessModal}>
      {showSuccess ? (
        <>
          <h2>Success</h2>
          <p>{message}</p>
          <button onClick={closeSuccessModal}>Close</button>
        </>
      ) : (
        <>
          <h2>Edit Name</h2>
          {message && <p className="error-message">{message}</p>}
          <form id="UserNameEditForm" onSubmit={handleSubmit}>
            <div className="container">
              <label htmlFor="username">New Username : </label>
              <input
                type="text"
                id="username"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
            </div>
            <div className="buttons_container">
              <button type="submit">Save</button>
              <button type="button" onClick={handleClose}>Cancel</button>
            </div>
          </form>
        </>
      )}
    </Modal>
  );
};
