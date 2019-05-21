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
          <svg className="open-grid-svg" onClick={() => changeView('grid')} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </span>
        <span className="close-modal" onClick={closeModal} role="presentation">
          <svg className="x-btn-close-modal" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </span>
      </div>
      <div className="slideshow-photo-view">
        <div className="slideshow-img">
          <img src={images[currSlide]} alt="" />
        </div>
      </div>
      <div className="container-prev-slide" onClick={prevSlide} role="presentation">
        <svg className="btn-prev-slide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
          <path fill="none" d="M0 0h24v24H0V0z" />
        </svg>
      </div>
      <div className="container-next-slide" onClick={nextSlide} role="presentation">
        <svg className="btn-next-slide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
          <path fill="none" d="M0 0h24v24H0V0z" />
        </svg>
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

SlideshowModal.defaultProps = {
  name: 'restaurant name',
  images: [''],
  closeModal: () => { },
  currSlide: 0,
  changeView: () => { },
  nextSlide: () => { },
  prevSlide: () => { },
};

export default SlideshowModal;
