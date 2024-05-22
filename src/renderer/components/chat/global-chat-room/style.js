import styled from 'styled-components';
import { scroll } from '../../../style/scroll-style';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 80px);
  overflow-x: hidden;
  overflow-y: auto;
  ${scroll};

  background-color: #303236;

  .message-input {
    position: fixed;
    bottom: 24px;
    left: 32px;
    width: calc(100% - 364px);
  }
`;

export const Messages = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
