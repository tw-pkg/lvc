import React from 'react';
import { Container } from './style';
import CLOSE_ICON from '../../../../assets/icon/close_icon.svg';
import QUIT_ICON from '../../../../assets/icon/quit_icon.svg';

function Header() {
  return (
    <Container>
      <div onClick={() => window.ipcRenderer.send('close')}>
        <img src={CLOSE_ICON} />
      </div>
      <div onClick={() => window.ipcRenderer.send('quit')}>
        <img src={QUIT_ICON} />
      </div>
    </Container>
  );
}

export default Header;
