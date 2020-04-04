
import Home from '../pages/Home';
import Login from '../pages/Login';
import Detail from '../pages/Detail';
import NotFound from '../pages/NotFound';

export default [
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/detail/:id',
    component: Detail
  },
  {
    path: '/404',
    component: NotFound,
  }
];