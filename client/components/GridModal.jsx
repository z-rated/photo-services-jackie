import React from 'react';
import PropTypes from 'prop-types';
import { ModalTitle } from '../styled/Modal';
import { ButtonBar } from '../styled/Buttons';
import { CloseModalIcon } from '../styled/Icons';
import { GridViewer, GridModalPhoto } from '../styled/GridModal';

export default function GridModal(props) {
  const {
    name, images, onExit, closeModal, changeView,
  } = props;

  return (
    <div className="modal-dialog">
      <ModalTitle>{name}</ModalTitle>
      <ButtonBar>
        <CloseModalIcon onClick={closeModal} role="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </CloseModalIcon>
      </ButtonBar>
      <GridViewer onExit={onExit}>
        {images.map((image, index) => (
          <GridModalPhoto onClick={() => changeView('slideshow', index)} role="presentation" key={index}>
            <img src={image} alt="" />
          </GridModalPhoto>
        ))}
      </GridViewer>
    </div>
  );
}

GridModal.propTypes = {
  name: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  onExit: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  changeView: PropTypes.func.isRequired,
};

GridModal.defaultProps = {
  name: 'restuarant name',
  images: [],
  onExit: false,
};
