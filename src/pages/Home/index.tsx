import React, { useState, useEffect, createElement } from 'react';
import Header from '../../components/Header/index';
import { Card, Divider, Tag, Carousel, Comment, Tooltip, Rate } from 'antd'
import "./home.less"
import { NewBookSkeletons } from "../../skeletons"
import { asideTags, homeInfo, rankList, comment } from "../../mock/home"
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Meta } = Card;

function Home() {

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState<any>(null)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loadingNewBooks, setLoadingNewBooks] = useState(true)

  // 第二参数为空数组, 不依赖任何state, 所以相当于componentDidMount
  useEffect(() => {

  }, [])

  const handleClickCategoryTag = (id: number): any => {
    console.log("hi")
  }

  const handleGoNewBookPage = (): any => {
    console.log("gogogo")
  }

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };

  const actions = [
    <span key="comment-basic-like">
      <Tooltip title="Like">
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined, {
          onClick: like,
        })}
      </Tooltip>
      <span className="comment-action">{likes}</span>
    </span>,
    <span key=' key="comment-basic-dislike"'>
      <Tooltip title="Dislike">
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined, {
          onClick: dislike,
        })}
      </Tooltip>
      <span className="comment-action">{dislikes}</span>
    </span>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];

  return (
    <div className="home-wrap">
      <Header />
      <div className="home-main">
        <div className="top-image link">
          <img src={require("../../assets/header.jpg")} alt="" />
        </div>
        <div className="main">
          <Divider orientation="left">
            <h2 className="link" onClick={handleGoNewBookPage}>新书速递</h2>
          </Divider>
          <div className="newBooks">
            {
              loadingNewBooks ? <NewBookSkeletons column={10} /> : null
            }
          </div>
          <Divider orientation="left">
            <h3>图书资讯</h3>
          </Divider>
          <div className="infomation">
            <div className="info-carousel">
              <Carousel dotPosition="right" autoplay>
                {
                  homeInfo.map(item => <div className="carousel-all" key={item.id}>
                    <div className="carousel-title title link">
                      {item.title}
                    </div>
                    <div className="carousel-tag meta link">
                      {item.tag}
                    </div>
                    <div className="carousel-intro text link">
                      {item.intro}
                    </div>
                  </div>)
                }
              </Carousel>
            </div>
          </div>
          <Divider orientation="left" style={{ marginTop: 30 }}>
            <h3>最受欢迎的书评</h3>
          </Divider>
          <div className="comment">
            {
              comment.map(item => <>
                <Comment
                  actions={actions}
                  author={<div className="link">{item.title}</div>}
                  avatar={
                    <img
                      src={item.img}
                      alt="Han Solo"
                    />
                  }
                  content={
                    <>
                      <div className="metaAndRate">
                        <span className="commenter">{item.meta}</span>
                        <span style={{ marginLeft: 10, marginRight: 10 }}>评论</span>
                        <span className="comment-bname">{item.bookName}</span>
                        <Rate allowHalf defaultValue={item.star} disabled />
                      </div>
                      <p>{item.desc}</p>
                    </>
                  }
                />
                <Divider />
              </>)
            }
          </div>
        </div>
        <div className="aside">
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
          <div className="bookRank">
            <Divider orientation="left">畅销图书榜</Divider>
            <div className="rankList">
              {
                rankList.map((item, index) => <>
                  {
                    index === 0 ? <Divider dashed /> : null
                  }
                  <div className="rank-wrap link" key={index}>
                    {/* <Link to={`/detail/${id}`}> */}
                    <div className={`${index < 3 ? "rank colorful" : "rank"}`}>{item.rank}</div>
                    <div className="title">
                      <h3>{item.name}</h3>
                      <p>{item.desc}</p>
                    </div>
                    <div className="gobuy">去购买</div>
                    {/* </Link> */}
                  </div>
                  <Divider dashed />
                </>)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home