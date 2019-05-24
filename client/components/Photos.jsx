/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

export default function Photos({ images, openModal }) {
  const firstSeven = images.slice(0, 7);

  return (
    <div className="photos-container">
      {firstSeven.map((imageUrl, index) => (
        <div className={`img-${index + 1}`} onClick={() => openModal('slideshow', index)} role="presentation" key={index}>
          <img src={imageUrl} alt="" />
        </div>
      ))}
    </div>
  );
}

Photos.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  openModal: PropTypes.func.isRequired,
};

Photos.defaultProps = {
  images: [],
};
