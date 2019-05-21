/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

const SlideshowModal = (props) => {
  const {
    name, images, closeModal, currSlide, changeView, nextSlide, prevSlide,
  } = props;

  return (
    <div className="modal-dialog">
      <div className="modal-header">
        <div className="modal-title">{name}</div>
      </div>
      <div className="button-bar">
        <span className="slideshow-view-index">
          {`${currSlide + 1} of ${images.length}`}
        </span>
        <span className="open-grid-view" role="button">
          {/* TODO: insert grid image here */}
        </span>
        <span className="close-modal" role="button">
          <div className="x-btn-close-modal" onClick={closeModal} role="button" tabIndex="0">X</div>
        </span>
      </div>
      <div className="slideshow-photo-view">
        <div className="slideshow-img">
          <img src={images[currSlide]} alt="" />
        </div>
      </div>
      <div className="container-prev-slide">
        <span className="btn-prev-slide" onClick={prevSlide} role="button" tabIndex="-2">&#60;</span>
      </div>
      <div className="container-next-slide">
        <span className="btn-next-slide" onClick={nextSlide} role="button" tabIndex="-1">&#62;</span>
      </div>
      <div className="slideshow-footer">
        <div className="slideshow-separator" />
        <div className="slideshow-user-avatar">
          <img src="http://s3.amazonaws.com/eugeniazagatphotos/user-avatar.png" alt="" />
        </div>
        <div className="slideshow-user-name">
          a google user
        </div>
      </div>

    </div>
  );
};

SlideshowModal.propTypes = {
  name: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  closeModal: PropTypes.func,
  currSlide: PropTypes.number,
  changeView: PropTypes.func,
  nextSlide: PropTypes.func,
  prevSlide: PropTypes.func,
};

export default SlideshowModal;
