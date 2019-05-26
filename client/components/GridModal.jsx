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

const GridViewer = styled.div`
  height: calc(100vh - 76px - 20px);
  width: 96%;
  margin: 1% 2%;
  overflow: scroll;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2px;
  animation-name: ${props => (props.onExit ? zoomOut : 'none')};
  animation-duration: 0.3s;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #e1e1e1;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-corner {
    background:transparent;
  }
`;

const GridModalPhoto = styled.div`
  height: 31vw;
  width: 31vw;
  position: relative;
  overflow: hidden;
  margin: 2px;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  ::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.15);
    transition: all 0.4s;
  }

  :hover {
    ::before {
      opacity: 1;
      z-index: 1;
      cursor: pointer;
    }
    > img {
      transform: scale(1.015);
      transition: all 0.4s;
    }
  }

`;

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
