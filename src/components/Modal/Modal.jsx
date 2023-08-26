import { useEffect } from 'react';
import { ModalDiv, ModalOverlay } from './Modal.styled';

export const Modal = ({ src, alt, onClose }) => {
  const handlerKey = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handlerKey);

    return () => {
      window.removeEventListener('keydown', handlerKey);
    };
  });
  return (
    <ModalOverlay>
      <ModalDiv>
        <img src={src} alt={alt} />
      </ModalDiv>
    </ModalOverlay>
  );
};
