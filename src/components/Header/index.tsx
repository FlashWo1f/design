import React, { useEffect, useState } from 'react';
import { Input, Divider, Menu, Dropdown } from 'antd';
import './index.less'
import { withRouter } from "react-router-dom"
import { ShoppingCartOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { isAuthority } from "../../utils"
import { getBookDetail } from "../../api/book"
const { Search } = Input;
function Header(props: any) {

  const handleClickLogin = () => {
    props.history.push("/login")
  }

  const handleClickReg = () => {

  }

  const [userId, setUserId] = useState("")
  const [userName, setUserName] = useState("")
  const [avatar, setAvatar] = useState("")

  useEffect(() => {
    console.log()
    const local: any = localStorage.getItem("userInfo")
    const userInfo = JSON.parse(local) || {}
    const { userId, userName, avatar } = userInfo
    setUserId(userId)
    setAvatar(avatar)
    setUserName(userName)
  }, [])

  const handleGoCart = () => {
    const auth = isAuthority()
    const isInCart = props.match.path !== "/cart"
    auth && isInCart && props.history.push("/cart")
  }

  const handleLogout = () => {
    localStorage.removeItem("userInfo")
    setUserId("")
    setAvatar("")
    setUserName("")
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <div className="goCart" onClick={handleGoCart}>
          购书单
        </div>
      </Menu.Item>
      <Menu.Item>
        <div className="logout" onClick={handleLogout}>
          登出
        </div>
      </Menu.Item>
    </Menu>
  )

  const onSearch = (e: any) => {
    if (e) {
      getBookDetail({ ISBN: e }).then(res => {
        console.log("sadasda", res)
        const { data: { data } } = res
        if (data) {
          const { ISBN } = data
          props.history.push(`detail/${ISBN}`)
        } else {
          notification.open({
            message: '全局提示',
            description: '您所搜索的内容不存在',
            onClick: () => {
              console.log('Notification Clicked!');
            },
          });
        }
      })
    }
  }

  return (
    <div className="header-wrap">
      <div className="nav-primary">
        <div className="nav-logo">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="">豆瓣读书</a>
        </div>
        <div className="nav-search">
          <Search placeholder="ISBN" onSearch={onSearch} enterButton />
        </div>
      </div>
      <Divider />
      <div className="nav-links">
        <div className="nav-link link" onClick={() => props.history.push("/")}>首页</div>
        <div className="nav-link link" onClick={() => window.open("https://book.douban.com/annual/2019?source=navigation", "_blank")}>2019年度榜单</div>
        <div className="nav-link link">豆瓣书店</div>
        <div className="nav-link link" onClick={handleGoCart}>
          <ShoppingCartOutlined style={{ fontSize: 18, marginRight: 5 }} />
          购物车
        </div>
      </div>
      <div className="loginOrReg link">
        {
          userId ?
            <Dropdown overlay={menu}>
              <div className="user">
                <>
                  <div className="user-avatar"><img src={avatar} alt="" /></div>
                  <div className="user-name">{userName}</div>
                </>
              </div>
            </Dropdown>
            :
            <><p onClick={handleClickLogin}>登录</p>  / <p onClick={handleClickReg}>注册</p></>
        }
      </div>
    </div>
  )
}

export default withRouter(Header)