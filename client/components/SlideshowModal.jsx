import React from 'react';
import PropTypes from 'prop-types';
import { ModalTitle } from '../styled/Modal';
import { ButtonBar, PrevSlideBtn, NextSlideBtn } from '../styled/Buttons';
import { GridIcon, CloseModalIcon } from '../styled/Icons';
import {
  SlideshowViewIndex, SlideshowViewer, SlideshowFooter,
  SlideshowSeparator, SlideshowUserAvatar, SlideshowUserName,
} from '../styled/SlideshowModal';

export default function SlideshowModal(props) {
  const {
    name, images, onExit, closeModal, currSlide, changeView, nextSlide, prevSlide,
  } = props;

  return (
    <div className="modal-dialog">
      <ModalTitle>{name}</ModalTitle>
      <ButtonBar>
        <SlideshowViewIndex>{`${currSlide + 1} of ${images.length}`}</SlideshowViewIndex>
        <GridIcon onClick={() => changeView('grid')} role="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </GridIcon>
        <CloseModalIcon onClick={closeModal}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </CloseModalIcon>
      </ButtonBar>
      <SlideshowViewer onExit={onExit}><img src={images[currSlide]} alt="" /></SlideshowViewer>
      <PrevSlideBtn onClick={prevSlide}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
          <path fill="none" d="M0 0h24v24H0V0z" />
        </svg>
      </PrevSlideBtn>
      <NextSlideBtn onClick={nextSlide}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
          <path fill="none" d="M0 0h24v24H0V0z" />
        </svg>
      </NextSlideBtn>
      <SlideshowFooter>
        <SlideshowSeparator />
        <SlideshowUserAvatar><img src="http://s3.amazonaws.com/eugeniazagatphotos/user-avatar.png" alt="" /></SlideshowUserAvatar>
        <SlideshowUserName>a google user</SlideshowUserName>
      </SlideshowFooter>
    </div>
  );
}

SlideshowModal.propTypes = {
  name: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  onExit: PropTypes.bool,
  currSlide: PropTypes.number,
  closeModal: PropTypes.func.isRequired,
  changeView: PropTypes.func.isRequired,
  nextSlide: PropTypes.func.isRequired,
  prevSlide: PropTypes.func.isRequired,
};

SlideshowModal.defaultProps = {
  name: 'restaurant name',
  images: [],
  onExit: false,
  currSlide: 0,
};
