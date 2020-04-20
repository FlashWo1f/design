// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { get, post } from './index';

export function userRegister(params: Object) {
  return post('/user/register', params)
}

export function getBookCart(params: Object) {
  return post('/user/getbooks', params)
}

export function userLogin(params: Object) {
  return post('/user/login', params)
}

interface addToCartParams {
  ISBN: String,
  userId: String
}

export function addBookToCart(params: addToCartParams) {
  return post('/user/addtocart', params)
}

export function delBookFromCart(params: addToCartParams) {
  return post('/user/delfromcart', params)
}