<template>
  <div class="layout">
    <span class="title">{{title}}</span>

    <section class="form-box">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="工号" prop="empno" label-width="150px">
              <el-input
                v-model.trim="form.empno"
                :disabled="type === 'view'"
                maxlength="20"
                placeholder="请在此输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工种" prop="worktype" label-width="150px">
              <el-select v-model="form.worktype" placeholder="请选择">
                <el-option
                  v-for="(item, key) in keymap.workType"
                  :disabled="type === 'view'"
                  :key="key"
                  :label="item"
                  :value="key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="姓名" prop="empname" label-width="150px">
              <el-input
                v-model.trim="form.empname"
                :disabled="type === 'view'"
                maxlength="20"
                placeholder="请在此输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="英文姓名" prop="empEnName" label-width="150px">
              <el-input
                v-model.trim="form.empEnName"
                :disabled="type === 'view'"
                maxlength="20"
                placeholder="请在此输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="手机号" prop="tel" label-width="150px">
              <el-input
                v-model.trim="form.tel"
                :disabled="type === 'view'"
                maxlength="11"
                placeholder="请在此输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status" label-width="150px">
              <el-select v-model="form.status" :disabled="type === 'view'" placeholder="请选择">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.typeid"
                  :label="item.typename"
                  :value="item.typeid"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex" label-width="150px">
              <el-radio v-model="form.sex" :disabled="type === 'view'" label="1">男</el-radio>
              <el-radio v-model="form.sex" :disabled="type === 'view'" label="0">女</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号" prop="idcardno" label-width="150px">
              <el-input
                v-model.trim="form.idcardno"
                :disabled="type === 'view'"
                maxlength="18"
                placeholder="请在此输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="户籍地址" prop="residentAddress" label-width="150px">
              <el-input
                v-model.trim="form.residentAddress"
                :disabled="type === 'view'"
                maxlength="40"
                placeholder="请在此输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="当前住址" prop="address" label-width="150px">
              <el-input
                v-model.trim="form.address"
                :disabled="type === 'view'"
                maxlength="30"
                placeholder="请在此输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="所属工厂" prop="factoryid" label-width="150px">
              <el-select
                v-model="form.factoryid"
                :disabled="type === 'view'"
                placeholder="请选择"
                @change="handleFactoryChange"
              >
                <el-option
                  v-for="item in factoryOptions"
                  :key="item.orgid"
                  :label="item.orgname"
                  :value="item.orgid"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属车间" prop="workShopid" label-width="150px">
              <el-select
                v-model="form.workShopid"
                :disabled="type === 'view'"
                placeholder="请选择"
                @change="handleWorkShopChange"
              >
                <el-option
                  v-for="item in workShopOptions"
                  :key="item.orgid"
                  :label="item.orgname"
                  :value="item.orgid"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="所属班组" prop="classid" label-width="150px">
              <el-select v-model="form.classid" :disabled="type === 'view'" placeholder="请选择">
                <el-option
                  v-for="item in classOptions"
                  :key="item.orgid"
                  :label="item.orgname"
                  :value="item.orgid"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="岗位" prop="posid" label-width="150px">
              <el-select v-model="form.posid" :disabled="type === 'view'" placeholder="请选择">
                <el-option
                  v-for="item in postOptions"
                  :key="item.postid"
                  :label="item.postname"
                  :value="item.postid"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="入厂日期" prop="indate" label-width="150px">
              <el-date-picker
                v-model="form.indate"
                type="date"
                :disabled="type === 'view'"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="离厂日期" prop="outdate" label-width="150px">
              <el-date-picker
                v-model="form.outdate"
                type="date"
                placeholder="选择日期"
                :disabled="type === 'view'"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="银行账号" prop="cardno" label-width="150px">
              <el-input v-model.trim="form.cardno" :disabled="type === 'view'" placeholder="请在此输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开户银行" prop="cardbank" label-width="150px">
              <el-input
                v-model.trim="form.cardbank"
                :disabled="type === 'view'"
                placeholder="请在此输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="密码" prop="passwd" label-width="150px">
              <el-input v-model.trim="form.passwd" :disabled="type === 'view'" placeholder="请在此输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Email" prop="email" label-width="150px">
              <el-input v-model.trim="form.email" :disabled="type === 'view'" placeholder="请在此输入"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="照片" prop="img" label-width="150px">
              <my-upload v-model="form.img" :disabled="type === 'view'"></my-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
        </el-form-item>
        <el-form-item label="备注" prop="remark" label-width="150px">
          <el-input
            type="textarea"
            rows="3"
            v-model="form.remark"
            :disabled="type === 'view'"
            maxlength="100"
            placeholder="请在此输入"
            show-word-limit
          ></el-input>
        </el-form-item>

        <el-form-item label-width="150px" class="form-box-btn">
          <template v-if="type !== 'view'">
            <el-button type="primary" @click="handleSubmit">提交</el-button>
            <el-button type="danger" @click="resetForm('form')">重置</el-button>
          </template>
          <el-button type="danger" @click="handleBack()">返回</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import auth from '@/service/auth'
import reg from '@/config/regexp'
import keymap from '@/config/key-map'
import MyUpload from '@/components/upload'

export default {
  name: 'modal',
  components: {
    MyUpload
  },
  data() {
    const checkCard = (rule, value, callback) => {
      if (!reg.cardNo.test(value)) {
        callback(new Error('身份证号格式不正确'))
      }
      callback()
    }

    const checkPasswd = (rule, value, callback) => {
      if (value.length < 7) {
        callback(new Error('密码至少6位'))
      }
      callback()
    }

    const checkTel = (rule, value, callback) => {
      if (!reg.phone.test(value)) {
        callback(new Error('手机号格式不正确'))
      }

      callback()
    }

    return {
      keymap,
      empid: this.$route.query.id,
      type: this.$route.query.type,
      form: {
        sex: '1'
      },
      postOptions: [],
      factoryOptions: [],
      statusOptions: [],
      workShopOptions: [],
      classOptions: [],
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() < this.form.indate
        }
      },

      rules: {
        empname: [{ required: true, message: '请输入姓名' }],
        sex: [{ required: true, message: '请选择性别' }],
        idcardno: [
          { required: true, message: '请输入身份证号' },
          { validator: checkCard }
        ],
        residentAddress: [{ required: true, message: '请输入户籍地址' }],
        posid: [{ required: true, message: '请选择岗位' }],
        indate: [{ required: true, message: '请选择入厂日期' }],
        status: [{ required: true, message: '请选择状态' }],
        tel: [
          { required: true, message: '请输入手机号' },
          { validator: checkTel }
        ],
        worktype: [{ required: true, message: '请选择工种' }],
        // outdate: [{ required: true, message: '请选择离厂日期' }],
        passwd: [
          { required: true, message: '请输入密码' },
          { validator: checkPasswd }
        ]
      }
    }
  },

  computed: {
    title() {
      const { type } = this
      if (type === 'add') {
        return '人员档案新增'
      }
      if (type === 'edit') {
        return '人员档案编辑'
      }

      return '人员档案查看'
    }
  },

  watch: {
    'form.factoryid': {
      handler(val) {
        if (!val) {
          return
        }

        this.handleFactoryChange(val)
      }
    },

    'form.workShopid': {
      handler(val) {
        if (!val) {
          return
        }

        this.handleWorkShopChange(val)
      }
    }
  },

  methods: {
    // 所属工厂
    getFactory() {
      this.$api.sysOrganization.getFactory().then(res => {
        this.factoryOptions = res.items
      })
    },

    // 查询岗位
    getPostion() {
      this.$api.position.selectByCorpId().then(res => {
        this.postOptions = res
      })
    },

    //查状态
    getStatus() {
      this.$api.baseBussParamType
        .queryByParentTypeid({ parentTypeId: 17 })
        .then(res => {
          this.statusOptions = res.items
        })
    },

    // 查询详情
    getDetail() {
      const { empid, type } = this
      if (type === 'add') {
        return
      }
      this.$api.sysEmployee.sysEmployeeDetail({ empid }).then(res => {
        this.form = Object.assign({}, res, { status: Number(res.status) })
      })
    },

    //根据工厂查车间
    handleFactoryChange(val) {
      this.$api.sysOrganization.getWorkShop({ orgid: val }).then(res => {
        this.workShopOptions = res.items
      })
    },

    //根据车间查班组
    handleWorkShopChange(val) {
      this.$api.sysOrganization.getClass({ orgid: val }).then(res => {
        this.classOptions = res.items
      })
    },

    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const { type, empid } = this
          const event = type === 'add' ? 'sysEmployeeAdd' : 'sysEmployeeUpdate'
          const params = { ...this.form }
          if (type === 'edit') {
            params.empid = empid
            delete params.factoryname
            delete params.postionName
            delete params.classname
            delete params.statusname
            delete params.workShopname
          }

          this.$api.sysEmployee[event](params).then(() => {
            this.$message.success(
              `${type === 'add' ? '新增' : '编辑'}人员档案成功`
            )
            this.$router.go(-1)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 重置
    resetForm() {
      const { form } = this

      form && this.$refs.form.resetFields()
    },

    // 返回
    handleBack() {
      this.$router.go(-1)
    }
  },

  created() {
    this.getFactory()
    this.getPostion()
    this.getStatus()
    this.getDetail()
  }
}
</script>

<style lang='scss' scoped>
.layout {
  padding: 25px 0 20px 0;
  border: 1px solid $colorBorder;
  background-color: #fff;
}
.title {
  position: relative;
  padding-left: 40px;
  color: $color6;
  font-size: 20px;
  &::before {
    position: absolute;
    left: 30px;
    top: 2px;
    content: '';
    height: 20px;
    border-left: 4px solid $primary;
  }
}
.form-box {
  padding: 90px 100px 40px 30px;
}
.form-box-btn {
  margin-top: 80px;
}
</style>
