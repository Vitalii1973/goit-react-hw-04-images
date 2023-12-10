import React from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import './ImageGallery.css';

const ImageGallery = ({ images, onOpenModal }) => {
  const handleImageClick = image => {
    onOpenModal(image);
  };

  return (
    <div className="ImageGallery">
      {images.length > 0 && (
        <div className="gallery-container">
          <ul className="gallery">
            {images.map((image, index) => (
              <ImageGalleryItem
                key={`${image.id}-${index}`}
                image={image}
                onImageClick={handleImageClick}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
