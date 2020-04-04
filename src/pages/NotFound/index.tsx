import React, { useEffect } from 'react';
import './notFound.less';
import notFound from '../../assets/notFound.jpg'

export default function NotFound() {

  useEffect(() => {
 
  }, []);

  return (
    <div className="page page-404" style={{
      backgroundImage: `url(${notFound})`,
      backgroundSize: '100% 100%'
    }}>
      <h1 className="title">404</h1>
      <h1 className="desc">Not Found</h1>
    </div>
  );
}
