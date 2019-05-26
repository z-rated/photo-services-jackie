import React from 'react';
import PropTypes from 'prop-types';
import GridModal from './GridModal';
import SlideshowModal from './SlideshowModal';
import { ModalContainer } from '../styled/Modal';

export default function Modal(props) {
  const {
    name, view, images, handleEnter, handleExit, currSlide, closeModal,
    changeView, prevSlide, nextSlide,
  } = props;

  return (
    <ModalContainer handleEnter={handleEnter}>
      {view === 'slideshow' && (
        <SlideshowModal
          name={name}
          images={images}
          currSlide={currSlide}
          handleExit={handleExit}
          closeModal={closeModal}
          changeView={changeView}
          prevSlide={prevSlide}
          nextSlide={nextSlide}
        />
      )}
      {view === 'grid' && (
        <GridModal
          name={name}
          images={images}
          handleExit={handleExit}
          closeModal={closeModal}
          changeView={changeView}
        />
      )}
    </ModalContainer>
  );
}


Modal.propTypes = {
  name: PropTypes.string,
  view: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  handleEnter: PropTypes.bool,
  handleExit: PropTypes.bool,
  currSlide: PropTypes.number,
  closeModal: PropTypes.func.isRequired,
  changeView: PropTypes.func.isRequired,
  prevSlide: PropTypes.func.isRequired,
  nextSlide: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  name: 'restaurant name',
  view: 'slideshow',
  images: [],
  handleEnter: false,
  handleExit: false,
  currSlide: 0,
};
