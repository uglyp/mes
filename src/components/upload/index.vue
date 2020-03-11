<template>
  <div
    class="upload-wrapper"
    v-loading="loading"
    :fileSize="fileSize"
    :fileWidthHeight="fileWidthHeight"
  >
    <span class="upload-delete" v-if="imageUrl && showDelete" @click="deleteImage">删除</span>
    <el-upload
      class="upload"
      :disabled="disabled"
      :action="action"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :data="extData"
      :on-error="closeLoading"
    >
      <img v-if="imageUrl" :src="imageUrl" class="upload-image">
      <i v-else class="el-icon-plus upload-icon"></i>
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
      default: `${api._urls.uploadFile.upload}`
    },
    fileSize: {
      type: Number,
      default: 2
    },
    fileWidthHeight: {
      type: String
    },
    showDelete: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      user: storage.get('user'),
      imageUrl: (this.value && this.value.url) || '',
      imageId: '',
      extData: {
        token: '',
        userId: ''
      },
      loading: false
    };
  },
  watch: {
    'value.id': function change(val) {
      this.imageId = val;
    },
    'value.url': function change(val) {
      this.imageUrl = val;
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
    deleteImage() {
      this.imageUrl = '';
      this.imageId = '';
    },
    handleAvatarSuccess(res, file) {
      this.closeLoading();
      const { status, data, msg } = res;
      if (status === '1') {
        const { fileDomain, fileName, id } = data;

        this.imageUrl = fileDomain + fileName;
        this.imageId = id;
        // this.imageUrl = URL.createObjectURL(file.raw);
      } else {
        this.$message.error(msg || '图片上传出错，请稍后重试！');
      }
    },
    beforeAvatarUpload(file) {
      const isPic = file.type.indexOf('image') === 0;
      const isLt2M = file.size / 1024 / 1024 <= this.fileSize;
      let flag = false;

      if (!isPic) {
        this.$message.error('只能上传图片文件!');
      }

      if (!isLt2M) {
        const unit =
          this.fileSize < 1
            ? `${this.fileSize * 1000}KB`
            : `${this.fileSize}MB`;
        this.$message.error(`上传图片大小不能超过${unit}!`);
      }

      flag = isPic && isLt2M;

      if (flag) {
        this.loading = true;
      }

      return flag;
    }
  },
  created() {
    const { user } = this;
    this.extData.token = user && user.token;
    this.extData.userId = 0
  }
};
</script>

<style>
.upload-wrapper {
  display: inline-block;
  position: relative;
}

.upload {
  display: inline-block;
}

.upload .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.upload .el-upload:hover {
  border-color: #20a0ff;
}

.upload-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.upload-image {
  width: 178px;
  height: 178px;
  display: block;
}

.upload-delete {
  position: absolute;
  top: 0;
  right: 0;
  line-height: 1.5;
  padding: 5px 10px;
  background-color: #20a0ff;
  color: #fff;
  z-index: 1;
  cursor: pointer;
}
</style>
