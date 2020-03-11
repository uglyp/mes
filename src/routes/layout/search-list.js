export default [
  {
    path: "search-list",
    name: "search-list",
    component: () => import("@/views/search-list"),
    meta: {
      title: "搜索列表", // 网页标题
      keepAlive: false,
      requiresAuth: true
    }
  }
];
