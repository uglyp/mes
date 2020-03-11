export default [
    {
        path: "/devices/info",
        name: "devices-info",
        component: () => import("@/views/devices/info"),
        meta: {
            title: "设备信息", // 网页标题
            requiresAuth: true
        }
    },
    {
        path: "/devices/info/modal",
        name: "devices-info",
        component: () => import("@/views/devices/info/modal"),
        meta: {
            title: "设备信息", // 网页标题
            requiresAuth: true
        }
    }
]
