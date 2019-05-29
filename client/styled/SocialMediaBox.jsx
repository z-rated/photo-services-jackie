import styled from 'styled-components';

export const SocialMediaBar = styled.div`
  position: absolute;
  right: 40px;
  top: calc(100% - 45px);
  display: flex;
  background: #101820;
  padding: 10px 8px 10px 15px;
  z-index: 2;

  > div {
    margin: 0px 8px;
  }
`;

export const SocialMediaSeparator = styled.div`
  background: #656666;
  height: 30px;
  margin: 5px 0;
  width: 1px;
  margin-top: 5px;
`;
