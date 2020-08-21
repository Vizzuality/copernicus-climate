import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import './styles.scss';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    borderRadius: 'none'
  }
};

// http://reactcommunity.org/react-modal/accessibility/
Modal.setAppElement('#root');

function ModalComponent(props) {
  const { title, text, isOpen, afterOpen, handleClose } = props;

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpen}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel="Modal"
        overlayClassName="modal-background"
      >
        <div className="c-modal">
          <h2 className="modal-title">{title}</h2>
          <p className="modal-text">{text}</p>
          <div className="modal-button-wrapper">
            <button className="modal-button" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

ModalComponent.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  afterOpen: PropTypes.func
};

export default ModalComponent;
