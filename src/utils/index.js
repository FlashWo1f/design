import { message } from "antd"
export function isAuthority() {
  const data = JSON.parse(localStorage.getItem("userInfo"))
  if (!data) {
    message.error("请先登录再执行该操作")
    return false
  }
  return data
}