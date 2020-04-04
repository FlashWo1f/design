import React, { useEffect, useState } from 'react';
import { Tabs, Form, Input, Button } from "antd";
import './login.less'

const { TabPane } = Tabs;

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

  const onTabsChange = () => {

  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = (values :any) => {
    console.log(values)
  }

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
        <div className="login-right">
          <div className="account-body">
            <div className="account-body-tabs">
              <Tabs defaultActiveKey="1" onChange={onTabsChange}>
                <TabPane tab="登录" key="1">
                  <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                  >
                    <Form.Item
                      name="username"
                      rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                      <Input placeholder="账号" />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                      <Input.Password placeholder="密码" />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </TabPane>
                <TabPane tab="注册" key="2">
                  Content of Tab Pane 2
                </TabPane>
              </Tabs>
            </div>
            <div className="account-form-3rd">
              <div className="account-form-3rd-hd">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}