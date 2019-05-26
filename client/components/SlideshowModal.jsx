import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const zoomOut = keyframes`
  from {
    opacity: 1;
    }

    50% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
    }

    to {
    opacity: 0;
    }
`;

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

const CloseModalIcon = styled.div`
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

const slideButton = styled.div`
  position: absolute;
  height: 40px;
  width: 40px;
  top: 46%;
  text-align: center;
  border-radius: 50%;

  > svg {
    fill: white;
    height: 100%;
    width: 100%;
  }

  :hover {
    background:rgba(16,24,32,0.95); 
    cursor: pointer;
  }
`;

const PrevSlideBtn = styled(slideButton)`
  left: 40px;
`;

const NextSlideBtn = styled(slideButton)`
  right: 40px;
`;

const SlideshowViewer = styled.div`
  height: calc(100vh - 76px - 92px - 20px);
  padding: 10px 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  animation-name: ${props => (props.onExit ? zoomOut : 'none')};
  animation-duration: 0.3s;

  > img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`;

const SlideshowFooter = styled.div`
  width: 100%;
  height: 52px;
`;

const SlideshowSeparator = styled.div`
  border-bottom: 1px white solid;
  border-top: 1px white solid;
  height: 2px;
  margin-bottom: 8px;
  margin-top: 16px;
  margin-left: 40px;
  width: 32px;
`;

const SlideshowUserAvatar = styled.div`
  display: inline-block;
  height: 24px;
  width: 24px;
  margin-left: 40px;
  margin-right: 12px;
  vertical-align: middle;
`;

const SlideshowUserName = styled.div`
  display: inline-block;
  color: white;
  font-size: 13px;
  font-weight: 300;
  letter-spacing: 0.013em ;
  line-height: 24px;
  text-transform: uppercase;
  vertical-align: middle;
  text-align: left;
`;

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
