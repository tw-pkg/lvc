import styled from 'styled-components';
import LNB from './LNB';
import { Fragment } from 'react';

function Layout({ children }) {
  return (
    <Fragment>
      <Container>
        {children}
      </Container>
      <LNB />
    </Fragment>
  );
}

const Container = styled.div`
  width: calc(100vw - 300px);
`;

export default Layout;
