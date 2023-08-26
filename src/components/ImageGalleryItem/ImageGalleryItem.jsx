import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';
import {
  ImageGalleryItemCard,
  ImageGalleryItemCardImg,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  image: { webformatURL, largeImageURL, tags },
}) => {
  const [isModal, setIsModal] = useState(false);

  const handlerSwitchModal = () => {
    setIsModal(!isModal);
  };

  return (
    <ImageGalleryItemCard onClick={handlerSwitchModal}>
      <ImageGalleryItemCardImg src={webformatURL} alt={tags} />
      {isModal && (
        <Modal src={largeImageURL} alt={tags} onClose={handlerSwitchModal} />
      )}
    </ImageGalleryItemCard>
  );
};
