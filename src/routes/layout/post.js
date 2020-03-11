export default [
    {
        path: "/post/set",
        name: "post-set",
        component: () => import("@/views/post/set"),
        meta: {
            title: "岗位设置", // 网页标题
            requiresAuth: true
        }
    },
    {
        path: "/post/set/modal",
        name: "post-set",
        component: () => import("@/views/post/set/modal"),
        meta: {
            title: "岗位设置", // 网页标题
            requiresAuth: true
        }
    },
    {
        path: "/post/set/modal-menu",
        name: "post-set",
        component: () => import("@/views/post/set/modal-menu"),
        meta: {
            title: "岗位设置", // 网页标题
            requiresAuth: true
        }
    },
    {
        path: "/post/set/modal-user",
        name: "post-set",
        component: () => import("@/views/post/set/modal-user"),
        meta: {
            title: "岗位设置", // 网页标题
            requiresAuth: true
        }
    },
    {
        path: "/post/role",
        name: "post-role",
        component: () => import("@/views/post/role"),
        meta: {
            title: "角色设置", // 网页标题
            requiresAuth: true
        }
    },
    {
        path: "/post/role/modal",
        name: "post-role",
        component: () => import("@/views/post/role/modal"),
        meta: {
            title: "角色设置", // 网页标题
            requiresAuth: true
        }
    },
    {
        path: "/post/role/modal-menu",
        name: "post-role",
        component: () => import("@/views/post/role/modal-menu"),
        meta: {
            title: "角色设置", // 网页标题
            requiresAuth: true
        }
    },
    {
        path: "/post/role/modal-user",
        name: "post-role",
        component: () => import("@/views/post/role/modal-user"),
        meta: {
            title: "角色设置", // 网页标题
            requiresAuth: true
        }
    },
];