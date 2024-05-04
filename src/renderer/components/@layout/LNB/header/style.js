import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  margin-left: auto;

  div {
    width: 14px;
    height: 14px;
    cursor: pointer;
    -webkit-app-region: no-drag;

    img {
      width: 100%;
      height: auto;
    }
  }
`;
