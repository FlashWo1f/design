import React, { useEffect, useState } from 'react';
import './login.less'


export default function () {

  const [img, setImg] = useState<any>(0)

  useEffect(() => {

    const myInterval = setInterval(() => {
      img === 2 ? setImg(0) : setImg((img + 1))
    }, 3000)

    return () => {
      clearInterval(myInterval)
    }
  })

  return (
    <div className="login-wrap">
      <div className="login-top-main">
        <div className="login-top">
          <div className="nav-primary">
            <a href="/">
              <img src="https://img3.doubanio.com/f/accounts/4fd84763a74089b20eb02ba0225d6e7739d2c432/passport/pics/douban_logo@2x.png" alt="" />
            </a>
          </div>
        </div>
      </div>
      <div className="login-main">
        <div className="login-left">
          <div className="login-left-box">
            <div className="login-slide">
              <img src={require(`../../assets/pic0.png`)} alt="" className={img === 0 ? "on" : ""} />
              <img src={require(`../../assets/pic1.png`)} alt="" className={img === 1 ? "on" : ""} />
              <img src={require(`../../assets/pic2.png`)} alt="" className={img === 2 ? "on" : ""} />
            </div>
          </div>
        </div>
        <div className="login-right"></div>
      </div>
    </div>
  )

}