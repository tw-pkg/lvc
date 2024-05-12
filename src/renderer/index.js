import React from 'react';
import GlobalStyle from './style/global-style';
import Layout from './components/@layout';
import Router from './router';
import Provider from './provider';

function Renderer() {
  return (
    <Provider>
      <GlobalStyle />

      <Layout>
        <Router />
      </Layout>
    </Provider>
  );
}

export default Renderer;
