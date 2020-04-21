// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect, createElement } from "react";
import Header from '../../components/Header'
import { Rate, Divider, Comment, Avatar, Tooltip, Card, message, Anchor } from 'antd'
import { getBookDetail, getRecommend } from "../../api/book"
import { addBookToCart } from "../../api/user"
import { getCommentByISBN } from "../../api/comment"
import moment from 'moment';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { isAuthority } from "../../utils"
import './detail.less'
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';

const { Meta } = Card
const { Link } = Anchor
interface CommentProps {
  comment: any
}

const RenderComments = (props: CommentProps) => {

  const { comment } = props
  const { like: likeNum, dislike: dislikeNum, account: { userName, avatar }, score, id, text, createdAt } = comment

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
    <div className="comments-wrap">
      {
        <div className="comment-wrap" key={id}>
          <Comment
            actions={actions(likeNum, dislikeNum)}
            author={
              <>
                <span style={{ marginRight: 12 }}>{userName}</span>
                <Rate allowHalf defaultValue={Number(score)} disabled />
              </>
            }
            avatar={
              <Avatar
                src={avatar}
                alt="Han Solo"
              />
            }
            content={<p>{text}</p>}
            datetime={
              <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment(createdAt).fromNow()}</span>
              </Tooltip>
            }
          />
          <Divider />
        </div>
      }
    </div>
  )
}


export default function (props: any) {

  const [myISBN, setMyISBN] = useState(props.match.params.id)
  const [isGetInfo, setIsGetInfo] = useState(false)
  const [bookDetail, setBookDetail] = useState<any>({})
  const [comments, setComments] = useState<any>([])
  const [isGetComment, setIsGetComment] = useState(false)
  const [recomm, setRecomm] = useState<any>([])
  const [isGetRec, setIsGetRec] = useState(false)

  useEffect(() => {
    getBookDetail({ ISBN: myISBN }).then(res => {
      const { data: { success = false, data } } = res
      if (success) {
        const info = []
        for (let key in data) {
          if (typeof data[key] === "object" && data[key]["label"]) {
            info.push(data[key])
          }
        }
        info.push({
          label: "ISBN",
          value: myISBN
        })
        if (data) data.info = info
        setBookDetail(data)
        setIsGetInfo(true)
      }
    })
    // window.location.hash = "#comment"
    console.log("sdasd", window.location.hash, window.location.hash === "#comments")
    if (window.location.hash === "#comments") {
      setTimeout(() => {
        // const ele: any = document.getElementById("comments")
        // console.log("是的", ele)
        // ele.scrollIntoView()
        window.location.hash = '#comments'
      }, 0);
    }
    getCommentByISBN({ ISBN: myISBN }).then((res: any) => {
      if (res.data && res.data.success) {
        const { data: { data } } = res
        setComments(data)
        setIsGetComment(true)
      }
    })
    getRecommend({ ISBN: myISBN }).then((res: any) => {
      if (res.data && res.data.success) {
        const { data: { data } } = res
        setRecomm(data)
        setIsGetRec(true)
      }
    })
  }, [myISBN])

  const handleAddToCart = () => {
    const auth = isAuthority()
    const userInfo:any = localStorage.getItem("userInfo")
    const { userId } =  JSON.parse(userInfo) || {}
    auth && userId && addBookToCart({ISBN: myISBN, userId}).then(res => {
      const { data: { success }} = res
      if (success) {
        message.success("成功添加到购物车")
      }
    }) 
  }

  const handleGoDetail = (ISBN: String) => {
    props.history.push(`/detail/${ISBN}`)
    // eslint-disable-next-line no-restricted-globals
    location.reload()
  }

  const { book, info } = bookDetail
  return (
    <div className="detail-wrap">
      <Header />
      <div className="detail-body">
        <h1 className="title">{isGetInfo && book.bookName}</h1>
        <div className="main">
          <div className="detail-info">
            <div className="detail-info-image link" onClick={() => window.open(book.img, "_blank")}>
              {
                isGetInfo &&
                <img src={book.img} alt="" />
              }
            </div>
            <div className="detail-info-logs">
              {
                isGetInfo && Array.isArray(info) && info.map((item: any, index) => <>
                  <div className="log" key={index}>
                    <span className="log-key">{item.label}:&nbsp;&nbsp;</span>
                    <span className="log-value">{item.value}</span>
                  </div>
                </>)
              }
            </div>
            <div className="detail-info-score">
              <div className="score-text">评分</div>
              {
                isGetInfo &&
                <Rate allowHalf defaultValue={book.score} disabled />
              }
              <div className="addtocart link" onClick={handleAddToCart}>
                <ShoppingCartOutlined /> 添加到购物车
              </div>
            </div>
          </div>
          <div className="detail-desc">
            <Divider orientation="left">
              <h3>内容简介</h3>
            </Divider>
            {
              isGetInfo && book.titleIntro.split("。").map((item: any, index: any) => <p key={index}>{item}</p>)
            }
            <p style={{ marginBottom: 10, fontSize: 16 }}>🕳 内容简介</p>
            {
              isGetInfo && book.conIntro.split("。").map((item: any, index: any) => <p key={index}>{item}</p>)
            }
          </div>
          <div className="detail-shortComm" id="comments">
            <Divider orientation="left">
              <h3>短评</h3>
            </Divider>
            {
              !isGetComment ? "Loading" :
                comments.length ?
                  comments.map((item: any) => <RenderComments key={item.id} comment={item} />)
                  : <div>暂时还没有评论~</div>
            }
          </div>
        </div>
        <div className="aside">
          <Divider orientation="left">
            <h3>同类书籍推荐</h3>
          </Divider>
          <div className="aside-flex-books">
            {
              isGetRec && recomm.map((item: any) =>
                <div className="aside-book-wrap" key={item.ISBN} onClick={() => handleGoDetail(item.ISBN)}>
                  <Card
                    hoverable
                    bodyStyle={{ display: "none" }}
                    cover={<img alt="example" src={item.img} />}
                  >
                  </Card>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}