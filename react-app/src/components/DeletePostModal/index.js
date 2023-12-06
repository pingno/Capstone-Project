import React from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import { fetchDeletePost } from '../../store/posts';


const DeletePostModal = ({ postId }) => {

  const dispatch = useDispatch();
  const {closeModal} = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();
      dispatch(fetchDeletePost(postId)).catch(res => console.log(res)).then(closeModal);
    }


  return (
    <div className='delete-modal'>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this Post?</p>
      <button onClick={handleDelete}>Yes,delete my post.</button>
      <button onClick={closeModal}>No, keep my post.</button>
    </div>
  );
};

export default DeletePostModal;
