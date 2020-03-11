export default [
    {
        path: "/business/info",
        name: "business-info",
        component: () => import("@/views/business/info"),
        meta: {
            title: "企业信息", // 网页标题
            requiresAuth: true
        }
    },
    {
        path: "/business/info/modal",
        name: "business-info",
        component: () => import("@/views/business/info/modal"),
        meta: {
            title: "企业信息", // 网页标题
            requiresAuth: true
        }
    },
    {
        path: "/business/organizational",
        name: "business-organizational",
        component: () => import("@/views/business/organizational"),
        meta: {
            title: "企业组织架构", // 网页标题
            requiresAuth: true
        }
    },
    {
        path: "/business/organizational/modal",
        name: "business-organizational",
        component: () => import("@/views/business/organizational/modal"),
        meta: {
            title: "企业组织架构", // 网页标题
            requiresAuth: true
        }
    },
];