<template>
  <div class="layout">
    <span class="title">{{title}}</span>

    <section class="form-box">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="企业名称" prop="corpName" label-width="150px">
              <el-input v-model="form.corpName" :disabled="type === 'view'" placeholder="请在此输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业法人" prop="legalPerson" label-width="150px">
              <el-input v-model="form.legalPerson" :disabled="type === 'view'" placeholder="请在此输入"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="组织机构代码" prop="orgCode" label-width="150px">
              <el-input v-model="form.orgCode" :disabled="type === 'view'" placeholder="请在此输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人" prop="contact" label-width="150px">
              <el-input v-model="form.contact" :disabled="type === 'view'" placeholder="请在此输入"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="联系人电话" prop="contactTel" label-width="150px">
              <el-input v-model="form.contactTel" :disabled="type === 'view'" placeholder="请在此输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="财务联系人" prop="finance" label-width="150px">
              <el-input v-model="form.finance" :disabled="type === 'view'" placeholder="请在此输入"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="财务联系人电话" prop="financeTel" label-width="150px">
              <el-input v-model="form.financeTel" :disabled="type === 'view'" placeholder="请在此输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地址" prop="address" label-width="150px">
              <el-input v-model="form.address" :disabled="type === 'view'" placeholder="请在此输入"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="电话" prop="tel" label-width="150px">
              <el-input v-model="form.tel" :disabled="type === 'view'" placeholder="请在此输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="传真" prop="fax" label-width="150px">
              <el-input v-model="form.fax" :disabled="type === 'view'" placeholder="请在此输入"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="银行卡号" prop="cardNo" label-width="150px">
              <el-input v-model="form.cardNo" :disabled="type === 'view'" placeholder="请在此输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开户银行" prop="cardBank" label-width="150px">
              <el-input v-model="form.cardBank" :disabled="type === 'view'" placeholder="请在此输入"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="银行账户名" prop="accountName" label-width="150px">
              <el-input v-model="form.accountName" :disabled="type === 'view'" placeholder="请在此输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="remark" label-width="150px">
              <el-input v-model="form.remark" :disabled="type === 'view'" placeholder="请在此输入"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item v-if="type === 'view'">
          <el-col :span="12">
            <el-form-item label="录入人" prop="inputEmpName" label-width="150px">
              <el-input v-model="form.inputEmpName" :disabled="type === 'view'" placeholder="请在此输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="录入时间" prop="inputDateTime" label-width="150px">
              <el-input
                v-model.trim="form.inputDateTime"
                :disabled="type === 'view'"
                placeholder="请在此输入"
              ></el-input>
            </el-form-item>
          </el-col>
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

export default {
  name: 'modal',
  data() {
    return {
      corpId: this.$route.query.id,
      type: this.$route.query.type,
      form: {},

      rules: {
        corpName: [{ required: true, message: '请输入企业名称' }],
        legalPerson: [{ required: true, message: '请输入企业法人' }],
        orgCode: [{ required: true, message: '请输入组织机构代码' }],
        contact: [{ required: true, message: '请输入联系人' }],
        contactTel: [{ required: true, message: '联系人电话' }],
        address: [{ required: true, message: '请输入地址' }],
        cardNo: [{ required: true, message: '请输入银行卡号' }],
        cardBank: [{ required: true, message: '请输入开户银行' }],
        accountName: [{ required: true, message: '请输入银行账户名' }]
      }
    }
  },

  computed: {
    title() {
      const { type } = this
      if (type === 'add') {
        return '企业信息新增'
      }
      if (type === 'edit') {
        return '企业信息编辑'
      }

      return '企业信息查看'
    }
  },

  methods: {
    // 查询详情
    getDetail() {
      const { corpId, type } = this
      if (type === 'add') {
        return
      }
      this.$api.business.getCompanyById({ corpId }).then(res => {
        const user = auth.getUser()
        this.form = Object.assign({}, res, { inputEmpName: user.empname })
      })
    },

    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const { type, corpId } = this
          const event = type === 'add' ? 'addSysCompany' : 'updateSysCompany'
          const params = { ...this.form }
          if (type === 'edit') {
            params.corpId = corpId
          }
          this.$api.business[event](params).then(() => {
            this.$message.success(
              `${type === 'add' ? '新增' : '编辑'}企业信息成功`
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
