import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const OpenGridBox = styled.div`
    position: absolute;
    background-color: rgba(16,24,32,0.75);
    height: 40px;
    padding-right: 10px;
    padding-left: 16px;
    right: 40px;
    top: calc(50% - 15px);
    color: white;
    font: 12px/40px 'Roboto', sans-serif;
    letter-spacing: 0.125em;
    text-transform: uppercase;
    z-index: 1;

    :hover {
      background-color: #101820;
      cursor: pointer;
    }
`;

const PlusIcon = styled.svg`
    fill:white;
    vertical-align: middle;
    margin-left: 3px;
    margin-bottom: 3px;
`;

export default function ShowGridModalBox({ images, openModal }) {
  return (
    <OpenGridBox onClick={() => openModal('grid')} role="presentation">
      {`${images.length} photos`}
      <PlusIcon xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        <path d="M0 0h24v24H0z" fill="none" />
      </PlusIcon>
    </OpenGridBox>
  );
}

ShowGridModalBox.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  openModal: PropTypes.func.isRequired,
};

ShowGridModalBox.defaultProps = {
  images: [],
};
