/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

const Photos = ({ images, openModal }) => {
  const firstSeven = images.slice(0, 7);

  return (
    <div className="photos-container">
      {firstSeven.map((imageUrl, index) => (
        <div className={`img-${index + 1}`} onClick={() => openModal('slideshow', index)} role="presentation">
          <img src={imageUrl} alt="" />
        </div>
      ))}
    </div>
  );
};

Photos.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  openModal: PropTypes.func,
};

export default Photos;
