export default [
    {
        path: "/base/production-process",
        name: "base-production-process",
        component: () => import("@/views/base/production-process"),
        meta: {
            title: "工序工艺档案", // 网页标题
            requiresAuth: true
        }
    },
    {
        path: "/base/parameter",
        name: "base-parameter",
        component: () => import("@/views/base/parameter"),
        meta: {
            title: "基础档案参数", // 网页标题
            requiresAuth: true
        }
    },

]