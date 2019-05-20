/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

const SlideshowModal = (props) => {
  const {
    name, images, currSlide, changeView, nextSlide, prevSlide
  } = props;

  return (
    <div className="modal-dialog">
      <div className="modal-header">
        <div className="modal-title">{name}</div>
      </div>
      <div className="button-bar">
        <span className="slideshow-view-index">
          {`${currSlide} of ${images.length - 1}`}
        </span>
        <span className="open-grid-view" role="button">
          {/* TODO: insert grid image here */}
        </span>
        <span className="close-modal" role="button">
          <div className="x-btn-close-modal">X</div>
        </span>
      </div>

    </div>
  );
};

SlideshowModal.propTypes = {
  name: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  currSlide: PropTypes.number,
  changeView: PropTypes.func,
  nextSlide: PropTypes.func,
  prevSlide: PropTypes.func,
};

export default SlideshowModal;
