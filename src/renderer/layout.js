import LNB from './components/@layout/LNB';

function Layout({ children }) {
  return (
    <>
      {children}
      <LNB />
    </>
  );
}

export default Layout;
