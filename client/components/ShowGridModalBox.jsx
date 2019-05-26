import React from 'react';
import PropTypes from 'prop-types';
import { PlusIcon } from '../styled/Icons';
import OpenGridBox from '../styled/ShowGridModalBox';

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
