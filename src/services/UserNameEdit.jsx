import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userNameUpdate } from "../store/reducers/AuthSlice";
import { Modal } from "../components/modal";
import "./UserNameEdit.css";

export const UserNameEdit = ({ show, handleClose }) => {
  const userData = useSelector((store) => store.auth.currentUser);
  const [newUserName, setNewUserName] = useState(userData.userName);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('Token');

    if (!token) {
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
        throw new Error('User Name Update failed');
      }

      const result = await response.json();
      console.log('User Name Update : ', result);

      if (result.body) {
        dispatch(userNameUpdate(newUserName));
        handleClose();
        setShowSuccessModal(true);
      } else {
        console.error('Failed to update user name');
      }
    } catch (error) {
      console.error('Error during User Name Update', error);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <Modal show={show} handleClose={handleClose}>
        <h2>Edit Name</h2>
        <form id="UserNameEditForm" onSubmit={handleSubmit}>
          <div className="container">
            <label htmlFor="username">New Username</label>
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
      </Modal>
      <Modal show={showSuccessModal} handleClose={closeSuccessModal}>
        <h2>Success</h2>
        <p>Your username has been successfully updated.</p>
        <button onClick={closeSuccessModal}>Close</button>
      </Modal>
    </>
  );
};
