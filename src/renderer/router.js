import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

function Router() {
  return (
    <HashRouter>
      <Routes>{/* <Route path={PATH.HOME} element={<GeneralChatRoom />} /> */}</Routes>
    </HashRouter>
  );
}

export default Router;
