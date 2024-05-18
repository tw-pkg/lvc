import { Input } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 20px;
  height: fit-content;
  padding: 12px;
  padding-left: 24px;

  &:hover {
    background-color: #2b2d31;
  }
`;

export const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  
  .rank-badge { 
    &, * {
      cursor: pointer;
    }
  }
`;

export const Nickname = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #f2f3f5;
  cursor: pointer;
`;

export const Time = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #7f8189;
`;

export const Text = styled(Input.TextArea)`
  resize: none !important;

  padding: 0 !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;

  color: #f2f3f5 !important;
  background-color: transparent !important;
  font-size: 14px !important;
  font-weight: 400 !important;

  cursor: default !important;
`;
