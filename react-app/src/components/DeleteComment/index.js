import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import { fetchDeleteComment } from '../../store/comments';

const DeleteComment = ({ commentId }) => {

  const dispatch = useDispatch();
  const {closeModal} = useModal();


  const handleDelete = async (e) => {
    e.preventDefault();
      dispatch(fetchDeleteComment(commentId)).catch(res => console.log(res)).then(closeModal);
    }


  return (
    <div className='delete-modal'>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this Comment?</p>
      <button onClick={handleDelete}>Yes,delete my comment.</button>
      <button onClick={closeModal}>No, keep my comment.</button>
    </div>
  );
};

export default DeleteComment;
