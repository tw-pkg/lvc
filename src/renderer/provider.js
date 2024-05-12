import React from 'react';
import { RecoilRoot } from 'recoil';
import { ConfigProvider } from 'antd';
import ko from 'antd/locale/ko_KR';

function Provider({ children }) {
  return (
    <RecoilRoot>
      <ConfigProvider locale={ko}>
        {children}
      </ConfigProvider>
    </RecoilRoot>
  );
}

export default Provider;
