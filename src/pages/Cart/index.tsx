import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { Table, Button, Alert, Popconfirm } from 'antd';
import { withRouter } from 'react-router-dom'
import { getBookCart } from '../../api/user'
import './Cart.less'

function Cart(props: any) {
  const [list, setList] = useState<any>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const confirm = () => {
    console.log("彳亍")
  }
  const handleDeleteBook = (ISBN: String) => {
    
  }
  const columns = [
    {
      title: "图书信息",
      width: 200,
      dataIndex: "info",
      render: (field: any, allFields: any) => <div className="book-in-cart">
        <div className="book-img">
          <img src={allFields.img} alt="" />
        </div>
        <div className="book-info">
          {
            Array.isArray(field) && field.map((item: any, index) =>
              <div className="book-info-item" key={index}>{typeof item === "object" ? item.value : item}</div>
            )
          }
        </div>
      </div>
    },
    {
      title: "价格",
      width: 100,
      dataIndex: "price",
    },
    {
      title: "数量",
      width: 100,
      dataIndex: "count",
    },
    {
      title: "操作",
      width: 100,
      render: (field: any, allFields: any) => (
        <Popconfirm placement="top" title={`确定把书《${allFields.info[0]}》删除吗`} onConfirm={confirm} okText="确定" cancelText="取消">
          <Button type="link" onClick={() => handleDeleteBook(allFields.ISBN)}>删除</Button>
        </Popconfirm>
      )
    }
  ]
  const onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys)
  }
  let data: Array<Object> = []
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }
  const handleGoHome = () => {
    props.history.push("/home")
  }

  useEffect(() => {
    getBookCart({ books: "10019-1985;9787535735508" }).then(res => {
      if (res.data.success) {
        res.data.data.rows.map((item: any) => {
          const { author, publisher, originalName, price, ISBN, book: { bookName, img } } = item
          // debugger
          data.push({
            img,
            ISBN,
            info: [
              bookName,
              author,
              publisher,
              originalName,
              ISBN
            ],
            price: price.value,
            count: 1
          })
        })
        setList(data)
      }
    })
  }, [])

  // console.log(0, list,selectedRowKeys.map((item) => {
  //   list.find((temp:any) => temp.ISBN === item)
  //   console.log(item === list[0].ISBN)
  // }))

  // const priccce = () => {
  //   selectedRowKeys.map(item => {
  //     list.find((temp:any) => temp.ISBN === item)
  //   })
  // }
  // console.log(priccce())
  const priceArray = Array.isArray(list) && list.length && list.map((item: any) => {
    // @ts-ignore
    if (selectedRowKeys.includes(item.ISBN)) {
      return Number(item.price) || 0
    }
    return 0
  })
  console.log(9, priceArray)
  // @ts-ignore
  const price = Array.isArray(priceArray) && priceArray.reduce(function (prev: any, cur: any) {
    return Number(prev) + Number(cur);
  })
  const AlertMessage = Array.isArray(list) && list.length && <div>
    <span style={{ marginRight: 15 }}>共&nbsp;&nbsp;{list.length}&nbsp;&nbsp;项</span>
    <span style={{ marginRight: 15 }}>已选中&nbsp;&nbsp;{selectedRowKeys.length}&nbsp;&nbsp;项</span>
    <span>共￥&nbsp;&nbsp;{
      // @ts-ignore

      price
    }&nbsp;&nbsp;元</span>
  </div>

  return (
    <div className="cart-wrap">
      <Header />
      <div className="cart-main">
        <h1>购书单</h1>
        {
          list.length ?
            <></>
            :
            <div className="empty-book">
              购书单空啦，去<span className="goHome link" onClick={handleGoHome}>首页</span>添加图书吧
          </div>
        }
        <Alert style={{ marginTop: 20, marginBottom: 20 }} message={AlertMessage} type="info" showIcon />
        <Table rowKey="ISBN" rowSelection={rowSelection} columns={columns} dataSource={list} pagination={false} />
      </div>
    </div>
  )
}

export default withRouter(Cart)