export default [
  {
    path: "form/simple",
    name: "form-simple",
    component: () => import("@/views/form/simple"),
    meta: {
      title: "简单表单", // 网页标题
      keepAlive: false,
      requiresAuth: true
    }
  }
];
