<template>
  <div class="layout">
    <span class="title">新增{{title}}</span>

    <section class="form-box">
      <el-form :model="form" :rules="rules" ref="form" style="width: 90%">
        <el-form-item>
          <el-col :span="12">
            <el-form-item :label="`${title}名称`" prop="orgname" label-width="150px">
              <el-input v-model.trim="form.orgname" placeholder="请在此输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="tel" label-width="150px">
              <el-input v-model.trim="form.tel" placeholder="请在此输入"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="负责人" prop="contact" label-width="150px">
              <el-input v-model.trim="form.contact" placeholder="请在此输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责人电话" prop="contacttel" label-width="150px">
              <el-input v-model.trim="form.contacttel" placeholder="请在此输入"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="管理人员1" prop="manager1" label-width="150px">
              <el-input v-model.trim="form.manager1" placeholder="请在此输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="管理人员1电话" prop="manager1tel" label-width="150px">
              <el-input v-model.trim="form.manager1tel" placeholder="请在此输入"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="管理人员2" prop="manager2" label-width="150px">
              <el-input v-model.trim="form.manager2" placeholder="请在此输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="管理人员2电话" prop="manager2tel" label-width="150px">
              <el-input v-model.trim="form.manager2tel" placeholder="请在此输入"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="上班时间" prop="onworktime" label-width="150px">
              <el-time-select
                v-model.trim="form.onworktime"
                :picker-options="{
                  start: '06:00',
                  step: '00:05',
                  end: '24:00'
                }"
                placeholder="选择时间"
              ></el-time-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="下班时间" prop="offworktime" label-width="150px">
              <el-time-select
                v-model.trim="form.offworktime"
                :picker-options="{
                  start: '06:00',
                  step: '00:05',
                  end: '24:00'
                }"
                placeholder="选择时间"
              ></el-time-select>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="地址" prop="address" label-width="150px">
          <el-input placeholder="请在此输入" v-model.trim="form.address"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="remark" label-width="150px">
          <el-input
            type="textarea"
            placeholder="请在此输入"
            v-model.trim="form.remark"
            maxlength="100"
            show-word-limit
          ></el-input>
        </el-form-item>

        <el-form-item label-width="150px" class="form-box-btn">
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <el-button type="danger" @click="resetForm('form')">重置</el-button>
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
      level: this.$route.query.level,
      parentorgid: this.$route.query.parentorgid,
      form: {},

      rules: {
        orgname: [{ required: true, message: '请输入组织名称' }],
        contacttel: [{ required: true, message: '请输入负责人电话' }],
        contact: [{ required: true, message: '请输入负责人' }]
      }
    }
  },

  computed: {
    title() {
      const { level } = this
      if (level === 0) {
        return '工厂'
      } else if (level === 1) {
        return '车间'
      } else {
        return '班组'
      }
    }
  },

  methods: {
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const params = { ...this.form, parentorgid: this.parentorgid }
          this.$api.sysOrganization.add(params).then(() => {
            this.$message.success(`新增${this.title}成功！`)
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
