import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { Table, Button } from 'antd';
import { withRouter } from 'react-router-dom'
import './Cart.less'

function Cart(props: any) {
  const [list, setList] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const columns = [
    {
      title: "图书信息",
      width: 200,
      dataIndex: "info",
      // render: () => {}
    },
    {
      title: "价格",
      width: 100,
      dataIndex: "price",
    },
    {
      title: "数量",
      width: 100,
      dataIndex: "price",
    },
    {
      title: "操作",
      width: 100,
      render: (field: any, allFields: any) => (
        <Button type="link">删除</Button>
      )
    }
  ]
  const onSelectChange = (selectedRowKeys:any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys)
  }
  const data: Array<Object> = [{}]
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }
  const handleGoHome = () => {
    props.history.push("/home")
  }
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
        <Table rowKey="ISBN" rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
    </div>
  )
}

export default withRouter(Cart)