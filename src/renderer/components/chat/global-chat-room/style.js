import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: calc(100vw - 300px);
  height: 100vh;

  padding: 32px;

  background-color: #303236;

  .message-input {
    position: fixed;
    bottom: 24px;
    width: calc(100% - 364px);
  }
`;

export const Messages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  padding-bottom: 80px;
`;
