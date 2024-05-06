import React from 'react';
import { RecoilRoot } from 'recoil';
import GlobalStyle from './style/global-style';
import Layout from './components/@layout';
import Router from './router';

function Renderer() {
  return (
    <RecoilRoot>
      <GlobalStyle />

      <Layout>
        <Router />
      </Layout>
    </RecoilRoot>
  );
}

export default Renderer;
