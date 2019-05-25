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
      <div className={`grid-photo-view ${onExit}`}>
        <div className="grid-container">
          {images.map((image, index) => (
            <div className="modal-img" onClick={() => changeView('slideshow', index)} role="presentation" key={index}>
              <img src={image} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

GridModal.propTypes = {
  name: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  onExit: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  changeView: PropTypes.func.isRequired,
};

GridModal.defaultProps = {
  name: 'restuarant name',
  images: [],
  onExit: '',
};
