// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect } from "react";
import Header from '../../components/Header'
import { detailInfo } from '../../mock/home'
import { Rate, Divider } from 'antd'
import './detail.less'

export default function () {


  return (
    <div className="detail-wrap">
      <Header />
      <div className="detail-body">
        <h1 className="title">草仍然绿，水仍在流</h1>
        <div className="main">
          <div className="detail-info">
            <div className="detail-info-image">
              <img src="https://img3.doubanio.com/view/subject/s/public/s33595640.jpg" alt="" />
            </div>
            <div className="detail-info-logs">
              {
                detailInfo.info.map((item) => <>
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