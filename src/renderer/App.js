import React from 'react';
import { RecoilRoot } from 'recoil';
import GlobalStyle from './style/global-style';
import Layout from './layout';
import Router from './router';

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />

      <Layout>
        <Router />
      </Layout>
    </RecoilRoot>
  );
}

export default App;
