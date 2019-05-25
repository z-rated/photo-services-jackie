/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PhotosContainer = styled.div`
height: 400px;
display: grid;
grid-template-rows: 1fr 1fr;
grid-template-columns: 2fr 1fr 2fr 1fr 1.2fr;
grid-gap: 4px;
`;

const defaultPhoto = styled.div`
justify-items: center;
overflow: hidden;
position: relative;

> img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

:hover > img {
  transform: scale(1.015);
  transition: all 0.4s;
}

::before {
  content: '';
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.15);
  transition: all 0.4s;
}

:hover::before {
  opacity: 1;
  z-index: 1;
  cursor: pointer;
}`;

const indexToGrid = (i) => {
  const rowStart = (i + 1) % 3 ? 1 : 2;
  const rowEnd = (i - 1) % 3 ? 3 : 2;
  const colStart = Math.round((2 * i / 3)) + 1;
  const colEnd = colStart + 1;
  return `${rowStart} / ${colStart} / ${rowEnd} / ${colEnd}`;
};

const RestaurantPhoto = styled(defaultPhoto)`
  grid-area: ${props => indexToGrid(props.i)}
`;

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
