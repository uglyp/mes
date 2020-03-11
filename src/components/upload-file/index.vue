<template>
  <div class="upload-wrapper" v-loading="loading">
    <!-- <span class="upload-delete" v-if="imageUrl" @click="deleteImage">删除</span> -->
    <el-upload class="upload-demo" :action="action" :show-file-list="showFile" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :data="extData" :headers="extData" :on-error="closeLoading" :on-remove="handleRemove" :auto-upload="autoUpload" :on-change="handleChange" :file-list="fileList" ref="upload">
      <!-- <img v-if="imageUrl" :src="imageUrl" class="upload-image"> -->
      <!-- <i v-else class="el-icon-plus upload-icon"></i> -->
      <el-button type="primary" :size="size">{{label}}
        <i class="el-icon-upload el-icon--right"></i>
      </el-button>
    </el-upload>
  </div>
</template>

<script>
import storage from '@/libs/storage';
import api from '@/api';

export default {
  name: 'upload',
  props: {
    value: {
      type: Object
    },
    name: {
      type: String,
      default: 'file'
    },
    action: {
      type: String,
      default: `${api._urls.operate.uploadMessageFile}`
    },
    chooseType: {},
    showFile: {
      type: Boolean,
      default: true
    },
    type: {}, // 上传类型：1：在线打款，2：提现审批 3:拿去花
    wxAccountId: {}, // 微信添加好友的参数
    fromPage: {
      type: String,
      default: ''
    },
    label: '',
    size: {
      type: String,
      default: 'small'
    },
    autoUpload: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      imageUrl: (this.value && this.value.url) || '',
      imageId: '',
      imageName: '',
      user: storage.get('user'),
      extData: {
        token: storage.get('user') && storage.get('user').token,
        userId: storage.get('user') && storage.get('user').uid,
        chooseType: this.chooseType,
        type: this.type,
        wxAccountId: this.wxAccountId
      },
      loading: false,
      fileList: [{
        url: this.value && this.value.url,
        name: this.value && this.value.url,
        id: this.value && this.value.id
      }] || [],
    };
  },

  watch: {
    'value': function change(val) {
      this.imageId = val.id;
      this.imageUrl = val.url;
      this.fileList = [{
        url: val.url,
        name: val.url,
        id: val.id
      }];
    },
    type(val) {
      this.extData.type = val;
    },
    'wxAccountId': {
      handler (val, oldVal) {
        this.extData.wxAccountId = val;
      },
      immediate: true
    },
    imageUrl(val) {
      const { imageId } = this;
      this.$emit('input', {
        url: val,
        id: imageId
      });
    }
  },

  methods: {
    closeLoading() {
      this.loading = false;
    },
    handleChange(file) {
      const status = file.status;
      if (status === 'ready') {
        this.$emit('handleChange');
      }
    },
    deleteImage() {
      this.imageUrl = '';
      this.imageId = '';
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleAvatarSuccess(res, file) {
      this.closeLoading();
      const { status, data, msg, error } = res;
      if (status === '1') {
        const { fileDomain, fileName, id } = data;
        this.imageName = fileName;
        this.imageUrl = fileDomain + fileName;
        this.imageId = id;
        this.fileList = [{
          name: fileDomain + fileName,
          url: fileDomain + fileName,
          id
        }];
        this.$emit('success', data);
      } else if (error === '01000111') {
        const str = JSON.stringify(data).slice(1, -1).split(',').join(', ');
        this.$alert(str, '提示', {
          dangerouslyUseHTMLString: true
        });
        this.showFile = false;
        this.$refs.upload.clearFiles();
      } else {
        this.$message.error(msg || '文件上传出错，请稍后重试！');
      }
    },
    beforeAvatarUpload(file) {
      const isExcel = file.name.indexOf('.xls') > -1;
      const isLt2M = file.size / 1024 / 1024 <= 2;
      let flag = false;

      if (!isExcel) {
        this.$message.error('只能上传xls(x)格式文件!');
      }

      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!');
      }

      flag = isExcel && isLt2M;

      if (flag) {
        this.loading = true;
      }
      return flag;
    },
    handleRemove(file, filelist) {
      if (filelist.length === 0) {
        this.showFile = false;
        this.$refs.upload.clearFiles();
        this.value = {
          url: '',
          id: ''
        };
      }
    }
  },
  created() {
  },
};
</script>

<style>
  [data-page = 'shortMsg'] .el-upload-list__item{
    width: 500px;
  }
</style>


<style scoped>
.upload-wrapper {
  display: inline-block;
  position: relative;
}
</style>

