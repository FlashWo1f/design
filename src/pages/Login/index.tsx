import React, { useEffect, useState } from 'react';
import { Tabs, Form, Input, Button } from "antd";
import './login.less'
import { userRegister } from "../../api/user";

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = (values: any) => {
    console.log(values)
    userRegister({userName: "xiaoawei", pwd: "12345678", userId: "15870907594"})
  }

  const onFinishRegister = (value: Object) => {
    const {  } = value 
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
                      rules={[{ required: true, message: '请输入账号 / 手机号!' }]}
                    >
                      <Input placeholder="账号 / 手机号" />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[{ required: true, message: '请输入密码!' }]}
                    >
                      <Input.Password placeholder="密码" />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                      <Button type="primary" htmlType="submit">
                        登录
                      </Button>
                    </Form.Item>
                  </Form>
                </TabPane>
                <TabPane tab="注册" key="2">
                  <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinishRegister}
                  // onFinishFailed={onFinishFailed}
                  >
                    <Form.Item
                      name="username"
                      rules={[{ required: true, message: '请输入账号或者手机号!' }]}
                    >
                      <Input placeholder="账号 / 手机号" />
                    </Form.Item>
                    <Form.Item
                      name="username"
                      rules={[{ required: true, message: '请填写昵称!' }]}
                    >
                      <Input placeholder="取个昵称吧" />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[{ required: true, message: '请输入您的密码!' }]}
                    >
                      <Input.Password placeholder="密码" />
                    </Form.Item>
                    <Form.Item
                      name="repeatPassword"
                      rules={[
                        { required: true, message: '请再重复一次密码!' },
                        ({ getFieldValue }) => ({
                          validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject('两次密码不匹配!');
                          },
                        })
                      ]}
                    >
                      <Input.Password placeholder="确认密码" />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                      <Button type="primary" htmlType="submit">
                        注册
                      </Button>
                    </Form.Item>
                  </Form>
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