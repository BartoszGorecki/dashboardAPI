import React from "react";
import PropTypes from 'prop-types';

import Button from '../Button';

import './deleteUserModal.css';

const DELETE = 'Delete'

const DeleteUserModal = ({ children, onCloseModal, onDeleteUser }) => {
    return (
      <div className='modal' role="dialog">
          <header className='modal-header'>
              <h3>{DELETE}</h3>
          </header>
          <div className="modal-content">{ children }</div>
          <footer className='modal-footer'>
            <Button
                onClick={ () => onCloseModal() }
                text='Cancel'
                variant='cancelM'
            />
            <Button
                onClick={ () => onDeleteUser() }
                text='Delete'
                variant='delete'
            />
          </footer>
      </div>
    );
}

DeleteUserModal.displayName = 'DeleteUserModal';

DeleteUserModal.propTypes = {
    children: PropTypes.node.isRequired,
    onCloseModal: PropTypes.func.isRequired,
    onDeleteUser: PropTypes.func.isRequired
};

export default DeleteUserModal;