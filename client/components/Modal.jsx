import React from 'react';
import PropTypes from 'prop-types';
import GridModal from './GridModal';
import SlideshowModal from './SlideshowModal';

const Modal = (props) => {
  const {
    name, view, images, transitionEnter, transitionExit, currSlide, closeModal,
    changeView, prevSlide, nextSlide,
  } = props;

  return (
    <div className={`modal ${transitionEnter}`} id="gallery-modal">
      {view === 'slideshow' && (
        <SlideshowModal
          name={name}
          images={images}
          currSlide={currSlide}
          transitionExit={transitionExit}
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
          transitionExit={transitionExit}
          closeModal={closeModal}
          changeView={changeView}
        />
      )}
    </div>
  );
};


Modal.propTypes = {
  name: PropTypes.string,
  view: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  transitionEnter: PropTypes.string,
  transitionExit: PropTypes.string,
  currSlide: PropTypes.number,
  closeModal: PropTypes.func,
  changeView: PropTypes.func,
  prevSlide: PropTypes.func,
  nextSlide: PropTypes.func,
};

Modal.defaultProps = {
  name: 'restaurant name',
  view: 'slideshow',
  images: [],
  transitionEnter: '',
  transitionExit: '',
  currSlide: 0,
  closeModal: () => { },
  changeView: () => { },
  prevSlide: () => { },
  nextSlide: () => { },
};

export default Modal;
