import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import { fetchDeletePost } from '../../store/posts';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const DeletePostModal = ({ postId }) => {

  const dispatch = useDispatch();
  const {closeModal} = useModal();
  const history = useHistory()


  const handleDelete = async (e) => {
    e.preventDefault();
      dispatch(fetchDeletePost(postId)).catch(res => console.log(res)).then(closeModal).then(history.goBack());
    }


  return (
    <div className='delete-modal'>
      <h2 style={{fontFamily: "Arial"}}>Confirm Delete</h2>
      <p style={{fontFamily: "Arial"}}>Are you sure you want to delete this Post?</p>
      <div className="login-buttons">



      <button onClick={handleDelete}>Yes,delete my post.</button>
      <button onClick={closeModal}>No, keep my post.</button>


      </div>
    </div>
  );
};

export default DeletePostModal;
