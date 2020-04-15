import { get, post } from './index';
import { stringify } from 'querystring';


export function getBookDetail(params:any) {
  return post(`/book/detail`, params)
}

export function getAllBook() {
  return post("http://localhost:9094/book/allbook")
}