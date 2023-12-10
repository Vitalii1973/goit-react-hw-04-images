import React, { useEffect } from 'react';
import ReactModal from 'react-modal';
import './Modal.css';

const Modal = ({
  imageUrl,
  onClose,
  showNextImage,
  showPrevImage,
  modalRef,
}) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight') {
        showNextImage();
      } else if (event.key === 'ArrowLeft') {
        showPrevImage();
      }
    };

    const handleClickOutside = event => {
      const modalElement = modalRef.current && modalRef.current.portal;

      if (
        modalElement &&
        modalElement.contains &&
        !modalElement.contains(event.target)
      ) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, showNextImage, showPrevImage, modalRef]);

  return (
    <ReactModal
      ref={modalRef}
      isOpen={!!imageUrl}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      className="Modal"
      overlayClassName="Overlay"
    >
      <img src={imageUrl} alt="" />
    </ReactModal>
  );
};

export default Modal;
