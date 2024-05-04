import React from 'react';
import { Container } from './style';
import CLOSE_ICON from '../../../../assets/icon/close_icon.svg';
import QUIT_ICON from '../../../../assets/icon/quit_icon.svg';

function Header() {
  return (
    <Container>
      <div onClick={() => {}}>
        <img src={CLOSE_ICON} />
      </div>
      <div onClick={() => {}}>
        <img src={QUIT_ICON} />
      </div>
    </Container>
  );
}

export default Header;
