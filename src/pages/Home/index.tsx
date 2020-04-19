import React, { useState, useEffect, createElement } from 'react';
import Header from '../../components/Header';
import { Card, Divider, Tag, Carousel, Comment, Tooltip, Rate, message, Popover } from 'antd'
import "./home.less"
import { NewBookSkeletons } from "../../skeletons"
import { asideTags, homeInfo, comment } from "../../mock/home"
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import { getAllBook } from "../../api/book"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Meta } = Card;

const RenderDesc = (props: any) => {
  const [status, setStatus] = useState(false)
  const { text } = props
  return (
    <p>
      {status ? text : text.slice(0, 130)}
      {
        text.length > 130
          ?
          <span onClick={() => setStatus(!status)} className="status-trigger link">
            {
              status ? <span>(收起)</span> : <span>...(展开)</span>
            }
          </span>
          : null
      }
    </p>
  )
}

interface CommentProps {
  comment: any,
  history: any
}

const RenderComments = (props: CommentProps) => {
  const { comment } = props
  const { like: likeNum, dislike: dislikeNum, meta, bookName, star, desc } = comment
  const [action, setAction] = useState<String | null>(null);
  const [likes, setLikes] = useState(comment.like);
  const [dislikes, setDislikes] = useState(comment.dislike);

  const like = (likeNum: any, dislikeNum: any) => {
    console.log("like", likeNum, dislikeNum)
    setLikes(++likeNum);
    setDislikes(dislikeNum);
    setAction('liked');
    message.success("好评成功！")
  };

  const dislike = (likeNum: any, dislikeNum: any) => {
    setLikes(likeNum);
    setDislikes(++dislikeNum);
    setAction('disliked');
    message.success("丢了个差评！")
  };

  const handleClickToBookComment = (ISBN: String) => {
    props.history.push(`/detail/${ISBN}#comments`)
  }

  const actions = (likeNum: any, dislikeNum: any) => [
    <span key="comment-basic-like">
      <Tooltip title="Like">
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined, {
          onClick: () => like(likeNum * 1, dislikeNum * 1),
        })}
      </Tooltip>
      <span className="comment-action">{likes}</span>
    </span>,
    <span key=' key="comment-basic-dislike"'>
      <Tooltip title="Dislike">
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined, {
          onClick: () => dislike(likeNum * 1, dislikeNum * 1),
        })}
      </Tooltip>
      <span className="comment-action">{dislikes}</span>
    </span>
  ];

  return (
    <div key={comment.ISBN} onClick={() => handleClickToBookComment(comment.ISBN)}>
      <Comment
        actions={actions(likeNum, dislikeNum)}
        author={<div className="link">{comment.title}</div>}
        avatar={
          <img
            src={comment.img}
            alt="Han Solo"
          />
        }
        content={
          <>
            <div className="metaAndRate">
              <span className="commenter">{meta}</span>
              <span style={{ marginLeft: 10, marginRight: 10 }}>评论</span>
              <span className="comment-bname">{bookName}</span>
              <Rate allowHalf defaultValue={star} disabled />
            </div>
            <RenderDesc text={desc} />
          </>
        }
      />
      <Divider />
    </div>
  )
}

function Home(props: any) {
  const [books, setBooks] = useState([])
  const [loadingNewBooks, setLoadingNewBooks] = useState(true)

  // 第二参数为空数组, 不依赖任何state, 所以相当于componentDidMount
  useEffect(() => {
    getAllBook()
      .then(({ data = {} }) => {
        if (data.success) {
          setLoadingNewBooks(false)
          setBooks(data.data)
        }
      })
  }, [])

  const handleGoNewBookPage = (): any => {
    console.log("gogogo")
  }

  const handleGoDetail = (ISBN: String) => {
    props.history.push(`/detail/${ISBN}`)
  }

  const homeBooks = () => {
    return (
      <div className="newBooks">
        {
          Array.isArray(books) && books.map((item: any) =>
            <div className="card-container link" key={item.ISBN} onClick={() => handleGoDetail(item.ISBN)}>
              <Popover placement="right" title={<span>{`《${item.bookName}》简介`}</span>} content={<p>{item.titleIntro}</p>} trigger="hover">
                <Card
                  className="books-card"
                  // bordered={false}
                  hoverable
                  cover={
                    <div className="book-img-box">
                      <img src={item.img} alt="loading" />
                    </div>
                  }
                >
                  <Meta title={item.bookName} description={item.author} />
                </Card>
              </Popover>
            </div>
          )
        }
      </div>
    )
  }

  return (
    <div className="home-wrap">
      <Header />
      <div className="home-main">
        <div className="top-image link" onClick={() => message.error("这块功能没有实现...")}>
          <img src={require("../../assets/header.jpg")} alt="" />
        </div>
        <div className="main">
          <Divider orientation="left">
            <h2 className="link" onClick={handleGoNewBookPage}>新书速递</h2>
          </Divider>
          <div className="newBooks">
            {
              loadingNewBooks ? <NewBookSkeletons column={10} /> : homeBooks()
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
              comment.map(item => <RenderComments comment={item} history={props.history} />)
            }
          </div>
        </div>
        <div className="aside">
          <div className="bookRank">
            <Divider orientation="left">畅销图书榜</Divider>
            <div className="rankList">
              {
                books.map((item: any, index) => <>
                  {
                    index === 0 ? <Divider dashed /> : null
                  }
                  <div className="rank-wrap link" key={index} onClick={() => handleGoDetail(item.ISBN)}>
                    {/* <Link to={`/detail/${id}`}> */}
                    <div className={`${index < 3 ? "rank colorful" : "rank"}`}>{index * 1 + 1}</div>
                    <div className="title">
                      <h3>{item.bookName}</h3>
                      <p>{item.author}</p>
                    </div>
                    <div className="gobuy">去购买</div>
                    {/* </Link> */}
                  </div>
                  <Divider dashed />
                </>)
              }
            </div>
          </div>
          <div className="asideTags">
            <Divider orientation="left">热门标签</Divider>
            <div className="tagsWrap">
              {
                asideTags.map(item => 
                  <div className="tagWrap" key={item.id}>
                    <h4 className="tagsTitle">{item.title}</h4>
                    <div className="tags">
                      {
                        item.tags.map(temp => <>
                          {
                            <Tag onClick={() => message.error("这块功能没有实现...")} key={temp.id}>{temp.name}</Tag>
                          }
                        </>)
                      }
                    </div>
                    <Divider dashed />
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home