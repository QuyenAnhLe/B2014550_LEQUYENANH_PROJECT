<template>
    <form @submit.prevent="submitPublisher">
        <div class="form-group">
          <label for="tenNXB">Tên nhà xuất bản:</label>
          <input
            name="tenNXB"
            type="text" 
            class="form-control"
            v-model="publisherLocal.tenNXB"
            required
          >
        </div>
        <div class="form-group">
          <label for="maNXB">Mã nhà xuất bản:</label>
          <input
            name="maNXB"
            type="text" 
            class="form-control"
            v-model="publisherLocal.maNXB"
            required
        >
        </div>
        <div class="form-group">
          <label for="diaChi">Địa chỉ:</label>
          <input
            name="diaChi"
            type="text" 
            class="form-control"
            v-model="publisherLocal.diaChi"
            required
        >
        </div>
      <button class="btn btn-info" type="submit">Lưu</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        publisherLocal: {
          tenNXB: '',
          maNXB: '',
          diaChi: ''
        }
      };
    },
    methods: {
      submitPublisher() {
        this.$emit('submit:publisher', this.publisherLocal);

        this.publisherLocal = {
          tenNXB: '',
          maNXB: '',
          diaChi: ''
        };
      }
    }
  };
  </script>
  