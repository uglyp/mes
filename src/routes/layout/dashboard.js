export default [
  {
    path: '',
    name: 'home',
    component: () => import('@/views/dashboard'),
    meta: {
      title: '首页', // 网页标题
      keepAlive: false,
      requiresAuth: true
    }
  }
];
