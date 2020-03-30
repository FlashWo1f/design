import React, { PureComponent } from 'react';
import Header from '../../components/Header/index';
import "../../css/home.css"

function Home() {

  return (
    <div className="home-wrap">
      <Header />
      <div className="home-main">
        <div className="top-image link">
          <img src={require("../../assets/header.jpg")} alt=""/>
        </div>
        <div className="newBooksAndTags">
          <div className="newBooks">

          </div>
          <div className="tags">
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home