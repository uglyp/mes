import auth from "@/service/auth";
import deepClone from "deep-clone";

const sourceMenus = [
  {
    name: "首页",
    url: "/",
    icon: "iconxiangmu"
  },
  {
    name: "企业设置",
    url: "/business",
    icon: "iconxiangmu",
    subMenu: [
      {
        name: "企业信息",
        url: "/business/info"
      },
      {
        name: "企业组织架构",
        url: "/business/organizational"
      }
    ]
  },
  {
    name: "基础档案",
    url: "/base",
    icon: "iconxiangmu",
    subMenu: [
      {
        name: "基础档案参数",
        url: "/base/parameter"
      },
      {
        name: "工序工艺档案",
        url: "/base/production-process"
      },
    ]
  },

  {
    name: "人员档案",
    url: "/person/archives",
    icon: "iconxiangmu"
  },
  {
    name: "设备信息",
    url: "/devices/info",
    icon: "iconxiangmu"
  },
  {
    name: "岗位权限",
    url: "/post",
    icon: "iconxiangmu",
    subMenu: [
      {
        name: "岗位信息",
        url: "/post/set"
      },
      {
        name: "角色设置",
        url: "/post/role"
      }
    ]
  },
];

export default sourceMenus;
