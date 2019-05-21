import React from 'react';
import PropTypes from 'prop-types';

const GridModal = (props) => {
  const {
    name, images, transitionExit, closeModal, changeView,
  } = props;

  return (
    <div className="modal-dialog">
      <div className="modal-header">
        <div className="modal-title">{name}</div>
      </div>
      <div className="button-bar">
        <span className="close-modal" onClick={closeModal} role="presentation">
          <svg className="x-btn-close-modal" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </span>
      </div>
      <div className={`grid-photo-view ${transitionExit}`}>
        <div className="grid-container">
          {images.map((image, index) => (
            <div className="modal-img" onClick={() => changeView('slideshow', index)} role="presentation">
              <img src={image} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

GridModal.propTypes = {
  name: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  transitionExit: PropTypes.func,
  closeModal: PropTypes.func,
  changeView: PropTypes.func,
};

GridModal.defaultProps = {
  name: 'restuarant name',
  images: [''],
  transitionExit: () => { },
  closeModal: () => { },
  changeView: () => { },
};

export default GridModal;
