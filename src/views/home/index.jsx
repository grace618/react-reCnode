import React from 'react';
// eslint-disable-next-line import/no-unresolved
import Header from './header';
import Footer from './footer';
import './index.css';

function Home(props) {
  return (
    <div className="page">
      <Header />
      <div className="container">
        <div className="app-wrap">
          {props.children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Home;
