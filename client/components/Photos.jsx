/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { PhotosContainer, RestaurantPhoto } from '../styled/Photos';

export default function Photos({ images, openModal }) {
  const firstSeven = images.slice(0, 7);

  return (
    <PhotosContainer>
      {firstSeven.map((imageUrl, index) => (
        <RestaurantPhoto i={index} onClick={() => openModal('slideshow', index)} role="presentation" key={index}>
          <img src={imageUrl} alt="" />
        </RestaurantPhoto>
      ))}
    </PhotosContainer>
  );
}

Photos.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  openModal: PropTypes.func.isRequired,
};

Photos.defaultProps = {
  images: [],
};
