import { Input } from 'antd';
import styled from 'styled-components';
import { scroll } from '../../../style/scroll-style';

export const CustomTextArea = styled(Input.TextArea)`
  resize: none !important;

  padding: 12px !important;
  border: none !important;
  border-radius: 8px !important;
  box-shadow: none !important;

  color: #f2f3f5 !important;
  background-color: #36383d !important;

  font-size: 14px !important;
  font-weight: 500 !important;

  &::placeholder {
    color: #545760 !important;
    font-size: 14px !important;
    font-weight: 500 !important;
  }

  ${scroll};
`;
