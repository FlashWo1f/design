import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/index';
import { Card, Divider, Tag, Carousel } from 'antd'
import "../../css/home.less"
import { NewBookSkeletons } from "../../skeletons"
import { asideTags, homeInfo } from "../../mock/home"
const { Meta } = Card;

function Home() {

  const [loadingNewBooks, setLoadingNewBooks] = useState(true)

  // 第二参数为空数组, 不依赖任何state, 所以相当于componentDidMount
  useEffect(() => {

  }, [])

  const handleClickCategoryTag = (id: number) :any => {
    console.log("hi")
  }

  const handleGoNewBookPage = () :any => {
    console.log("gogogo")
  }

  return (
    <div className="home-wrap">
      <Header />
      <div className="home-main">
        <div className="top-image link">
          <img src={require("../../assets/header.jpg")} alt="" />
        </div>
        <div className="newBooksAndTags">
          <div className="newBooks">
            <Divider orientation="left">
              <h2 className="link" onClick={handleGoNewBookPage}>新书速递</h2>
            </Divider>
            {
              loadingNewBooks ? <NewBookSkeletons column={10} /> : null
            }
          </div>
          <div className="asideTags">
            <Divider orientation="left">热门标签</Divider>
            <div className="tagsWrap">
              {
                asideTags.map(item => <>
                  <div className="tagWrap" key={item.id}>
                    <h4 className="tagsTitle">{item.title}</h4>
                    <div className="tags">
                      {
                        item.tags.map(temp => <>
                          {
                            <Tag key={temp.id} onClick={() => handleClickCategoryTag(temp.id)}>{temp.name}</Tag>
                          }
                        </>)
                      }
                    </div>
                    <Divider dashed />
                  </div>
                </>)
              }
            </div>
          </div>
        </div>
        <div className="infomation">
          <h2>图书资讯</h2>
          <div className="info-carousel">
            <Carousel dotPosition="right">
              {
                homeInfo.map(item => <div key={item.id}>
                  <div className="carousel-title">
                    {item.title}
                  </div>
                  <div className="carousel-tag">
                    {item.tag}
                  </div>
                  <div className="carousel-intro">
                    {item.intro}
                  </div>
                </div>)
              }
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home