export default [
    {
        path: "/person/archives",
        name: "person-archives",
        component: () => import("@/views/person/archives"),
        meta: {
            title: "人员档案", // 网页标题
            requiresAuth: true
        }
    },
    {
        path: "/person/archives/modal",
        name: "person-archives",
        component: () => import("@/views/person/archives/modal"),
        meta: {
            title: "人员档案", // 网页标题
            requiresAuth: true
        }
    }
]