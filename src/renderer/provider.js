import React from 'react';
import { RecoilRoot } from 'recoil';
import { ConfigProvider } from 'antd';
import ko from 'antd/locale/ko_KR';
import { HashRouter } from 'react-router-dom';

function Provider({ children }) {
  return (
    <HashRouter>
      <RecoilRoot>
        <ConfigProvider locale={ko}>
          {children}
        </ConfigProvider>
      </RecoilRoot>
    </HashRouter>
  );
}

export default Provider;
