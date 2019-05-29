import styled from 'styled-components';
import { zoomIn } from './Keyframes';

export const ModalContainer = styled.div`
  display: block;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(16,24,32,.95); 
  animation-name: ${props => (props.handleEnter ? zoomIn : 'none')};
  animation-duration: 0.3s;
`;

export const ModalTitle = styled.div`
  margin: 28px 0;
  text-align: center;
  text-transform: uppercase;
  color: white;
  font: 18px/20px 'Calibre-Medium', sans-serif;
  letter-spacing: .086em;
`;
