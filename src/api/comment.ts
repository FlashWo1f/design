import { get, post } from './index';

export function getCommentByISBN(params: any) {
  return post("/comment/getcomm", params)
}