import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";

import { fetchDeleteAlbum } from '../../store/albums';


const DeleteAlbumModal = ({ albumId }) => {
  const member = useSelector(state => state.session.member)
  const dispatch = useDispatch();
  const history = useHistory();
  const {closeModal} = useModal();


  const handleDelete = async (e) => {
    e.preventDefault();
      dispatch(fetchDeleteAlbum(albumId)).catch(res => console.log(res)).then(closeModal);
    }


  return (
    <div className='delete-modal'>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this Album?</p>
      <button onClick={handleDelete}>Yes,delete my album.</button>
      <button onClick={closeModal}>No, keep my album.</button>
    </div>
  );
};

export default DeleteAlbumModal;
