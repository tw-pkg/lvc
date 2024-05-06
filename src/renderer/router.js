import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { PATH } from '../renderer/constants/path';
import GlobalChatRoom from './components/chat/global-chat-room';

function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path={PATH.MAIN} element={<GlobalChatRoom />} />
      </Routes>
    </HashRouter>
  );
}

export default Router;
