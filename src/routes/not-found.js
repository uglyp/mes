export default [{
  path: '*',
  name: 'not-found',
  component: () => import('@/views/not-found'),
  meta: {
    title: '404', // 网页标题
    log: {
      ubtName: '404'
    }
  }
}];
