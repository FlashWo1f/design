// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect } from "react";
import Header from '../../components/Header'
import { detailInfo } from '../../mock/home'
import { Rate, Divider } from 'antd'
import { getBookDetail } from "../../api/book"
import './detail.less'

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
        for(let key in data) {
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
              detailInfo.titleIntro.map(item => <p>
                {item}
              </p>)
            }
            <p>🕳 内容简介</p>
            {
              detailInfo.conIntro.map(item => <p>
                {item}
              </p>)
            }
          </div>
          <div className="detail-shortComm">
            <Divider orientation="left">
              <h3>短评</h3>
            </Divider>
          </div>
        </div>
        <div className="aside"></div>
      </div>
    </div>
  )
}