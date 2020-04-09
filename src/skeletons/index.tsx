import React from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Card, Skeleton } from 'antd'
import loadingSvg from "../assets/loading.svg";
import './index.less'

interface ICardList {
  column: number;
}

export function NewBookSkeletons(props: ICardList) {
  const { column } = props
  const list = new Array(column || 6).fill(1)
  return (
    <>
      {
        list.map((item:number, index: number) => {
          return (
            <div className="card-container" key={index}>
              <Card 
                loading={true}
                className="books-card"
                // bordered={false}
                cover={
                  <div className="loading-img-box">
                    <img src={loadingSvg} alt="loading"/>
                  </div>
                }
              />
            </div>
          )
        })
      }
    </>
  )
}