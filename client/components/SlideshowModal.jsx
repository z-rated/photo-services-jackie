import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ModalTitle = styled.div`
  margin: 28px 0;
  text-align: center;
  text-transform: uppercase;
  color: white;
  font-size: 17px;
  letter-spacing: .086em;
`;

const ButtonBar = styled.div`
  position: absolute;
  right: -20px;
  top: 20px;
  z-index: 10;
`;

const SlideshowViewIndex = styled.span`
  font-size: 14px;
  letter-spacing: .013em;
  color: white;
  margin-right: 20px;
`;

const GridIcon = styled.span`
  display: inline-block;
  vertical-align: middle;
  border-right: 1px solid #656666;
  cursor: pointer;
  height: 32px;
  margin: 4px 11px 4px 0;
  padding-right: 16px;

  > svg {
    fill: white;
    margin: 12% 12%;
  }
`;

const CloseModalIcon = styled.span`
  display: inline-block;
  vertical-align: middle;
  margin-right: 30px;
  height: 40px;
  width: 40px;
  border-radius: 50%;

  > svg {
    fill:white;
    height: 36px;
    width: 36px;
    margin: 6% 6%;
  }

  :hover {
    background: white;
    cursor: pointer;
    
    > svg {
      fill: rgba(16, 24, 32, 1);
    }
  }
`;

export default function SlideshowModal(props) {
  const {
    name, images, onExit, closeModal, currSlide, changeView, nextSlide, prevSlide,
  } = props;

  return (
    <div className="modal-dialog">
      <div className="modal-header">
        <ModalTitle>{name}</ModalTitle>
      </div>
      <ButtonBar>
        <SlideshowViewIndex>
          {`${currSlide + 1} of ${images.length}`}
        </SlideshowViewIndex>
        <GridIcon onClick={() => changeView('grid')} role="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </GridIcon>
        <CloseModalIcon onClick={closeModal} role="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </CloseModalIcon>
      </ButtonBar>
      <div className={`slideshow-photo-view ${onExit}`}>
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
}

SlideshowModal.propTypes = {
  name: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  onExit: PropTypes.string,
  currSlide: PropTypes.number,
  closeModal: PropTypes.func.isRequired,
  changeView: PropTypes.func.isRequired,
  nextSlide: PropTypes.func.isRequired,
  prevSlide: PropTypes.func.isRequired,
};

SlideshowModal.defaultProps = {
  name: 'restaurant name',
  images: [],
  onExit: '',
  currSlide: 0,
};
