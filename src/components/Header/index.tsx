import React, {  } from 'react';
import { Input, Divider } from 'antd';
import './index.less'
import { withRouter } from "react-router-dom"
import { ShoppingCartOutlined } from '@ant-design/icons';
const { Search } = Input;
function Header(props: any) {

  const handleClickLogin = () => {
    props.history.push("/login")
  }

  const handleClickReg = () => {
    
  }

  return (
    <div className="header-wrap">
      <div className="nav-primary">
        <div className="nav-logo">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="">豆瓣读书</a>
        </div>
        <div className="nav-search">
          <Search placeholder="书名、作者、ISBN" onSearch={value => console.log(value)} enterButton />
        </div>
      </div>
      <Divider />
      <div className="nav-links">
        <div className="nav-link link">购书单</div>
        <div className="nav-link link">2019年度榜单</div>
        <div className="nav-link link">豆瓣书店</div>
        <div className="nav-link link">
          <ShoppingCartOutlined style={{ fontSize: 18, marginRight: 5 }} />
          购物车
        </div>
      </div>
      <div className="loginOrReg link">
        <p onClick={handleClickLogin}>登录</p>  / <p onClick={handleClickReg}>注册</p>
      </div>
    </div>
  )
}

export default withRouter(Header)