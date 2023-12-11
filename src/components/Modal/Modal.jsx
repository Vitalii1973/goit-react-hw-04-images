import React, { useEffect } from 'react';
import ReactModal from 'react-modal';
import './Modal.css';

const Modal = ({ imageUrl, alt, onClose, modalRef }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <ReactModal
      ref={modalRef}
      isOpen={!!imageUrl}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      className="Modal"
      overlayClassName="Overlay"
    >
      <img src={imageUrl} alt={alt} />
    </ReactModal>
  );
};

export default Modal;
