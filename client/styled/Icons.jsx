import styled from 'styled-components';

export const GridIcon = styled.span`
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

export const CloseModalIcon = styled.div`
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

export const PlusIcon = styled.svg`
    fill:white;
    vertical-align: middle;
    margin-left: 3px;
    margin-bottom: 3px;
`;
