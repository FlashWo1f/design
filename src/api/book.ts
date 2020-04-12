import { get, post } from './index';
import { stringify } from 'querystring';


export function getBookDetail(params:any) {
  return post(`/book/detail`, params)
}