/**
 * API列表，建议最多两层嵌套
 *
 * url值的格式为 String/Object
 * String: url的值
 * Object：{ // axios config options
 *  url: '',
 *  method: '',// get/post/put/delete, 为URL的请求方法，不写默认为post
 *  baseUrl: ''
 * }
 */
export default {
  login: {
    getCom: {
      url: '/system/login/getcom', // 获取企业列表
      method: 'get'
    },
    enter: '/system/login/enter', // 登录
  },

  home: {
    getMenu: {
      url: '/system/system/sysMenu/homemenu', // 获取菜单
      method: 'get'
    },
    getNotice: {
      url: '/system/sysmessage/select', // 获取公告
      method: 'get'
    }
  },

  user: {
    updatePassword: '/system/login/updatepassward' // 修改密码

  },

  business: {
    getList: {
      url: '/system/systemmanage/sysCompany/findAll', // 获取企业信息
      method: 'get'
    },
    getCompanyById: {
      url: '/system/systemmanage/sysCompany/findbyid', // 查企业详情
      method: 'get'
    },
    addSysCompany: '/system/systemmanage/sysCompany/addSysCompany', // 新增企业信息
    updateSysCompany: '/system/systemmanage/sysCompany/update', // 修改企业信息
    deleteSysCompany: '/system/systemmanage/sysCompany/delete', // 删除企业信息
  },

  baseBussParamType: {
    queryByParentTypeid: {
      url: '/system/basics/basebussparamtype/querybyparenttypeid', // 查工种
      method: 'get'
    },
    selectAllByParamCode: {
      url: '/system/basics/baseBussParamInfo/selectallbyparamcode', // 查参数树
      method: 'get'
    },
    queryAll: {
      url: '/system/basics/basebussparamtype/queryall', // 查询基础档案参数全部类型且分树形结构
      method: 'get'
    },
    queryById: {
      url: '/system/basics/baseBussParamInfo/querybyid', // 查询详情
      method: 'get'
    },
    add: '/system/basics/baseBussParamInfo/addBaseBussParamInfo', // 添加
    update: '/system/basics/baseBussParamInfo/updateBaseBussParamInfo', // 修改
  },

  companyOrg: {
    getCompany: {
      url: '/system/sysOrganization/queryAllSysOrganizationCompany', // 所属单位
      method: 'get'
    }
  },

  role: {
    delete: '/system/systemmanage/role/delete', // 删除角色
    add: '/system/systemmanage/role/insert', // 新增角色
    update: '/system/systemmanage/role/update', // 修改角色
    select: {
      url: '/system/systemmanage/role/select',
      method: 'get'
    },
    selectById: {
      url: '/system/systemmanage/role/selectbyid',
      method: 'get'
    },
    selectMenu: {
      url: '/system/systemmanage/role/selectmenu', // 查询菜单
      method: 'get'
    },
    selectEmp: {
      url: '/system/systemmanage/role/selectemp', // 查询人员
      method: 'get'
    },
    insertRoleMenu: '/system/systemmanage/role/insertrolemenu',
    updateRolePeo: '/system/systemmanage/role/updaterolepeo', // 配置角色人员
  },

  position: {
    delete: '/system/systemmanage/position/delete',
    add: '/system/systemmanage/position/insert',
    update: '/system/systemmanage/position/update',
    updatePositionPeo: '/system/systemmanage/position/updatepositionpeo', // 编辑岗位人员
    updatePositionPrg: '/system/systemmanage/position/updatepositionorg', // 编辑岗位关联企业内部的组织
    select: {
      url: '/system/systemmanage/position/select',
      method: 'get'
    },
    selectById: {
      url: '/system/systemmanage/position/selectbyid',
      method: 'get'
    },
    selectByCorpId: {
      url: '/system/systemmanage/position/selectbycorpId', // 根据企业ID查询岗位
      method: 'get'
    },
    selectEmp: {
      url: '/system/systemmanage/position/selectemp', // 查询岗位人员
      method: 'get'
    },
    selectOrg: {
      url: '/system/systemmanage/position/selectorg', // 岗位关联企业内部的组织展示
      method: 'get'
    },

  },

  baseCraft: {
    delete: '/system/basics/basecraft/delete',
    download: '/system/basics/basecraft/download',
    insert: '/system/basics/basecraft/insert',
    select: {
      url: '/system/basics/basecraft/select',
      method: 'get'
    },
    selectById: {
      url: '/system/basics/basecraft/selectbyid',
      method: 'get'
    },
    update: '/system/basics/basecraft/update',
    upload: '/system/basics/basecraft/upload'
  },

  sysEmployee: {
    sysEmployeeFind: {
      url: '/system/systemmanage/sysEmployee/find', // 人员档案列表
      method: 'get'
    },
    sysEmployeeDetail: {
      url: '/system/systemmanage/sysEmployee/querybyid', // 查询详情
      method: 'get'
    },
    sysEmployeeDelete: '/systemmanage/sysEmployee/delete', // 删除人员档案

    sysEmployeeAdd: '/system/systemmanage/sysEmployee/add', // 添加人员档案
    sysEmployeeUpdate: '/system/systemmanage/sysEmployee/update', // 修改人员档案
    queryAllFactory: {
      url: '/system/systemmanage/sysEmployee/queryall', // 获取工厂下的人员列表
      method: 'get'
    },
    queryAllWorkShop: {
      url: '/system/systemmanage/sysEmployee/queryalls',  // 获取车间下的人员列表
      method: 'get'
    },
    queryAllClass: {
      url: '/system/systemmanage/sysEmployee/queryallss',  // 获取班组下的人员列表
      method: 'get'
    },
    queryAllByEmpName: {
      url: '/system/systemmanage/sysEmployee/queryallbyempname',  // 模糊查询岗位人员
      method: 'get'
    },
    queryAllByEmpId: {
      url: '/system/systemmanage/sysEmployee/queryallbyempid',  // 模糊查询角色人员
      method: 'get'
    },
  },

  sysOrganization: {
    add: '/system/systemmanage/sysOrganization/add', // 添加组织,
    getList: {
      url: '/system/systemmanage/sysOrganization/queryAllSysOrganizationCompany', // 查询组织
      method: 'get'
    },
    getFactory: {
      url: '/system/systemmanage/sysOrganization/queryfindbyall', // 查询工厂
      method: 'get'
    },
    getWorkShop: {
      url: '/system/systemmanage/sysOrganization/queryfindbyalllevel', // 查询车间
      method: 'get'
    },
    getClass: {
      url: '/system/systemmanage/sysOrganization/queryfindbylevel', // 查询班组
      method: 'get'
    },
    getDetail: {
      url: '/system/systemmanage/sysOrganization/querybyid', // 查询详情
      method: 'get'
    },
    update: '/system/systemmanage/sysOrganization/updateSysOrganization', // 修改组织
    delete: '/system/systemmanage/sysOrganization/delete' // 删除组织
  },

  sysMachine: {
    delete: '/system/systemmanage/sysmachine/delete', // 删除设备
    add: '/system/systemmanage/sysmachine/insert', // 添加设备
    getList: {
      url: '/system/systemmanage/sysmachine/queryall', // 查询设备列表
      method: 'get'
    },
    getDetail: {
      url: '/system/systemmanage/sysmachine/querybyid', // 获取设备详情
      method: 'get'
    },
    update: '/system/systemmanage/sysmachine/update' // 修改设备
  },

  uploadFile: {
    upload: '/api/uploadFile/upload'
  },
};
