// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect, createElement } from "react";
import Header from '../../components/Header'
import { detailInfo } from '../../mock/home'
import { Rate, Divider, Comment, Avatar, Tooltip, Card } from 'antd'
import { getBookDetail } from "../../api/book"
import moment from 'moment';
import './detail.less'
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';

export default function (props: any) {

  const [myISBN, setMyISBN] = useState(props.match.params.id)
  const [isGetInfo, setIsGetInfo] = useState(false)
  const [bookDetail, setBookDetail] = useState<any>({})

  useEffect(() => {
    getBookDetail({ ISBN: myISBN }).then(res => {
      console.log("zzz111", res)
      const { data: { success = false, data } } = res
      if (success) {
        const info = []
        for (let key in data) {
          console.log("111", key)
          if (typeof data[key] === "object" && data[key]["label"]) {
            info.push(data[key])
          }
        }
        data.info = info
        setBookDetail(data)
        setIsGetInfo(true)
      }
    })
  }, [myISBN])

  const { book, info } = bookDetail
  // console.log("kelong", book, info) 

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState<String | null>(null);

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
    <div className="detail-wrap">
      <Header />
      <div className="detail-body">
        <h1 className="title">{isGetInfo && book.bookName}</h1>
        <div className="main">
          <div className="detail-info">
            <div className="detail-info-image">
              <img src="https://img3.doubanio.com/view/subject/s/public/s33595640.jpg" alt="" />
            </div>
            <div className="detail-info-logs">
              {
                isGetInfo && Array.isArray(info) && info.map((item: any) => <>
                  <div className="log">
                    <span className="log-key">{item.label}:&nbsp;&nbsp;</span>
                    <span className="log-value">{item.value}</span>
                  </div>
                </>)
              }
            </div>
            <div className="detail-info-score">
              <div className="score-text">评分</div>
              <Rate allowHalf defaultValue={2.5} disabled />
            </div>
          </div>
          <div className="detail-desc">
            <Divider orientation="left">
              <h3>内容简介</h3>
            </Divider>
            {
              detailInfo.titleIntro.map(item => <p>{item}</p>)
            }
            <p>🕳 内容简介</p>
            {
              detailInfo.conIntro.map(item => <p>{item}</p>)
            }
          </div>
          <div className="detail-shortComm">
            <Divider orientation="left">
              <h3>短评</h3>
            </Divider>
            <Comment
              actions={actions}
              author={<a>Han Solo</a>}
              avatar={
                <Avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="Han Solo"
                />
              }
              content={
                <p>
                  We supply a series of design principles, practical patterns and high quality design
                  resources (Sketch and Axure), to help people create their product prototypes beautifully
                  and efficiently.
        </p>
              }
              datetime={
                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                  <span>{moment().fromNow()}</span>
                </Tooltip>
              }
            />
          </div>
        </div>
        <div className="aside">
          <Divider orientation="left">
            <h3>同类书籍推荐</h3>
          </Divider>
          <div className="aside-flex-books">
            <div className="aside-book-wrap">
              {
                <Card />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}