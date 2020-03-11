<template>
  <div class="layout">
    <span class="title">{{title}}</span>

    <section class="form-box">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="设备名称" prop="macName" label-width="150px">
              <el-input
                v-model.trim="form.macName"
                :disabled="type === 'view'"
                maxlength="20"
                placeholder="请在此输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备编码" prop="macNo" label-width="150px">
              <el-input
                v-model.trim="form.macNo"
                :disabled="type === 'view'"
                maxlength="30"
                placeholder="请在此输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="设备规格型号" prop="model" label-width="150px">
              <el-input
                v-model.trim="form.model"
                :disabled="type === 'view'"
                maxlength="20"
                placeholder="请在此输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备单位" prop="unit" label-width="150px">
              <el-input
                v-model.trim="form.unit"
                :disabled="type === 'view'"
                maxlength="10"
                placeholder="请在此输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="所属工厂" prop="factoryId" label-width="150px">
              <el-select v-model="form.factoryId" placeholder="请选择" @change="handleFactoryChange">
                <el-option
                  v-for="item in factoryOptions"
                  :disabled="type === 'view'"
                  :key="item.orgid"
                  :label="item.orgname"
                  :value="item.orgid"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属车间" prop="workShopId" label-width="150px">
              <el-select v-model="form.workShopId" placeholder="请选择" @change="handleWorkShopChange">
                <el-option
                  v-for="item in workShopOptions"
                  :disabled="type === 'view'"
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
            <el-form-item label="所属班组" prop="classId" label-width="150px">
              <el-select v-model="form.classId" :disabled="type === 'view'" placeholder="请选择">
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
            <el-form-item label="购入时间" prop="buyDate" label-width="150px">
              <el-date-picker
                v-model="form.buyDate"
                type="date"
                :disabled="type === 'view'"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="设备类型" prop="typeId" label-width="150px">
              <el-select v-model="form.typeId" :disabled="type === 'view'" placeholder="请选择">
                <el-option
                  v-for="(item, index) in keymap.deviceType"
                  :key="index"
                  :label="item"
                  :value="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备参数" prop="macParam" label-width="150px">
              <el-input
                v-model.trim="form.macParam"
                :disabled="type === 'view'"
                maxlength="20"
                placeholder="请在此输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="条形码" prop="barcode" label-width="150px">
              <el-input
                v-model.trim="form.barcode"
                :disabled="type === 'view'"
                maxlength="40"
                placeholder="请在此输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="FRID卡号" prop="RFIDcode" label-width="150px">
              <el-input
                v-model.trim="form.RFIDcode"
                :disabled="type === 'view'"
                maxlength="40"
                placeholder="请在此输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item v-if="type === 'view'">
          <el-col :span="12">
            <el-form-item label="二维码" prop="QRcode" label-width="150px">
              <canvas ref="qrCode"></canvas>
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="使用地点" prop="usePlace" label-width="150px">
              <el-input
                v-model="form.usePlace"
                :disabled="type === 'view'"
                maxlength="30"
                placeholder="请在此输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
        </el-form-item>
        <el-form-item label="注意事项" prop="notes" label-width="150px">
          <el-input
            type="textarea"
            rows="3"
            v-model="form.notes"
            :disabled="type === 'view'"
            maxlength="100"
            placeholder="请在此输入"
            show-word-limit
          ></el-input>
        </el-form-item>

        <el-form-item label="备注信息" prop="remark" label-width="150px">
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
        <template v-if="type === 'view'">
          <el-form-item>
            <el-col :span="12">
              <el-form-item label="录入人" prop="inputEmpName" label-width="150px">
                <el-input
                  v-model="form.inputEmpName"
                  :disabled="type === 'view'"
                  maxlength="20"
                  placeholder="请在此输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="提交人" prop="postMan" label-width="150px">
                <el-input
                  v-model="form.postMan"
                  :disabled="type === 'view'"
                  maxlength="20"
                  placeholder="请在此输入"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>

          <!-- <el-form-item>
            <el-col :span="12">
              <el-form-item label="审核人" prop="indate" label-width="150px">
                <el-input
                  v-model="form.remark"
                  :disabled="type === 'view'"
                  maxlength="20"
                  placeholder="请在此输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="审核时间" prop="checkDateTime" label-width="150px">
                <el-date-picker
                  v-model="form.checkDateTime"
                  :disabled="type === 'view'"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>-->

          <el-form-item>
            <el-col :span="12">
              <el-form-item label="启用时间" prop="startUseDate" label-width="150px">
                <el-date-picker
                  v-model="form.startUseDate"
                  type="date"
                  :disabled="type === 'view'"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="停用时间" prop="stopUseDate" label-width="150px">
                <el-date-picker
                  v-model="form.stopUseDate"
                  type="date"
                  :disabled="type === 'view'"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-col :span="12">
              <el-form-item label="报废时间" prop="scrapDateTime" label-width="150px">
                <el-date-picker
                  v-model="form.scrapDateTime"
                  type="date"
                  :disabled="type === 'view'"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12"></el-col>
          </el-form-item>
        </template>

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
import QRCode from 'qrcode'

export default {
  name: 'modal',

  data() {
    return {
      keymap,
      macId: this.$route.query.id,
      type: this.$route.query.type,
      form: {},
      factoryOptions: [],
      statusOptions: [],
      workShopOptions: [],
      classOptions: [],
      // pickerOptions: {
      //   disabledDate: time => {
      //     return time.getTime() < this.form.indate
      //   }
      // },

      rules: {
        macName: [{ required: true, message: '请输入设备名称' }],
        macNo: [{ required: true, message: '请输入设备编码' }],
        // model: [{ required: true, message: '请输入设备规格型号' }],
        unit: [{ required: true, message: '请输入设备单位' }],
        factoryId: [{ required: true, message: '请选择所属工厂' }],
        workShopId: [{ required: true, message: '请选择所属车间' }],
        classId: [{ required: true, message: '请选择所属班组' }],
        typeId: [{ required: true, message: '请选择设备类型' }],
        buyDate: [{ required: true, message: '请选择购入时间' }],
      //   barcode: [{ required: true, message: '请输入条形码' }],
      //   RFIDcode: [{ required: true, message: '请输入RFIDcode卡号' }],
      //   macParam: [{ required: true, message: '请输入设备参数' }]
      }
    }
  },

  computed: {
    title() {
      const { type } = this
      if (type === 'add') {
        return '设备信息新增'
      }
      if (type === 'edit') {
        return '设备信息编辑'
      }

      return '设备信息查看'
    }
  },

  watch: {
    'form.factoryId': {
      handler(val) {
        if (!val) {
          return
        }

        this.handleFactoryChange(val)
      }
    },

    'form.workShopId': {
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

    // 查询详情
    getDetail() {
      const { macId, type } = this
      if (type === 'add') {
        return
      }
      this.$api.sysMachine.getDetail({ macId }).then(res => {
        let qrCode = this.$refs.qrCode
        const user = auth.getUser()
        this.form = Object.assign({}, res, {
          typeId: res.typeId.toString(),
          RFIDcode: res.rfidcode,
          QRcode: res.qrcode,
          inputEmpName: user.empname
        })

        // 将获取到的数据（val）画到（canvas）上
        QRCode.toCanvas(qrCode, res.qrcode, function(error) {
          console.log(error)
        })
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
          const { macId, type } = this
          const event = type === 'add' ? 'add' : 'update'
          const params = { ...this.form }
          if (type === 'edit') {
            params.macId = macId
          }

          this.$api.sysMachine[event](params).then(() => {
            this.$message.success(
              `${type === 'add' ? '新增' : '编辑'}设备信息成功`
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
