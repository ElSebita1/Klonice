import React from 'react';
import Sidebar from './Barrita';

const Layout = ({ children }) => {
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1 p-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;
