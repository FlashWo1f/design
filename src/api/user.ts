// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { get, post } from './index';

export function userRegister(params: Object) {
  return post('/user/register', params)
}