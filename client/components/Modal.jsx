import React from 'react';
import PropTypes from 'prop-types';
import GridModal from './GridModal';
import SlideshowModal from './SlideshowModal';
import { ModalContainer } from '../styled/Modal';

export default function Modal(props) {
  const {
    name, view, images, onEnter, onExit, currSlide, closeModal,
    changeView, prevSlide, nextSlide,
  } = props;

  return (
    <ModalContainer onEnter={onEnter}>
      {view === 'slideshow' && (
        <SlideshowModal
          name={name}
          images={images}
          currSlide={currSlide}
          onExit={onExit}
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
          onExit={onExit}
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
  onEnter: PropTypes.bool,
  onExit: PropTypes.bool,
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
  onEnter: false,
  onExit: false,
  currSlide: 0,
};
