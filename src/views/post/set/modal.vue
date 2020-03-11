<template>
  <div class="layout">
    <span class="title">{{title}}</span>

    <section class="form-box">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="岗位名称" prop="postname" label-width="150px">
              <el-input v-model="form.postname" :disabled="type === 'view'" placeholder="请在此输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
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

        <el-form-item>
          <el-form-item label="备注" prop="remark" label-width="150px">
            <el-input
              type="textarea"
              v-model="form.remark"
              :disabled="type === 'view'"
              maxlength="100"
              show-word-limit
              placeholder="请在此输入"
            ></el-input>
          </el-form-item>
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
      postid: this.$route.query.id,
      type: this.$route.query.type,
      form: {},

      rules: {
        postname: [{ required: true, message: '请输入岗位名称' }]
      }
    }
  },

  computed: {
    title() {
      const { type } = this
      if (type === 'add') {
        return '岗位新增'
      }
      if (type === 'edit') {
        return '岗位编辑'
      }

      return '岗位查看'
    }
  },

  methods: {
    // 查询详情
    getDetail() {
      const { postid, type } = this
      if (type === 'add') {
        return
      }
      this.$api.position.selectById({ id: postid }).then(res => {
        const user = auth.getUser()
        this.form = Object.assign({}, res, { inputEmpName: user.empname })
      })
    },

    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const { type, postid } = this
          const event = type === 'add' ? 'add' : 'update'
          const params = { ...this.form }
          if (type === 'edit') {
            params.postid = postid
          }
          this.$api.position[event](params).then(() => {
            this.$message.success(`${type === 'add' ? '新增' : '编辑'}岗位成功`)
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
