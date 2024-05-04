import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 16px;

  padding: ${({ $clicked }) => $clicked && '16px 0'};
  padding: ${({ $clicked }) => !$clicked && '16px'};
  margin-top: 26px;

  border-radius: 6px;
  background-color: ${({ $clicked }) => !$clicked && '#36373c'};
  cursor: pointer;
`;

export const Img = styled.img`
  width: 50px;
  height: 50px;

  border-radius: 50%;
  object-fit: cover;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

export const Nickname = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #f2f3f5;
`;
