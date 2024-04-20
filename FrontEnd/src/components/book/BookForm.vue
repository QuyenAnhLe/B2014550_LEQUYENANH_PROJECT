<template>
    <form @submit.prevent="submitBook">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="maSach">Mã sách:</label>
          <input
            name="maSach"
            type="text" 
            class="form-control"
            v-model="bookLocal.maSach"
            required
          >
        </div>
        <div class="form-group col-md-6">
          <label for="tenSach">Tên sách:</label>
          <input
            name="tenSach"
            type="text" 
            class="form-control"
            v-model="bookLocal.tenSach"
            required
          >
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="tacGia">Tác giả:</label>
          <input
            name="tacGia"
            type="text" 
            class="form-control"
            v-model="bookLocal.tacGia"
            required
          >
        </div>
        <div class="form-group col-md-6">
          <label for="loaiSach">Thể loại:</label>
          <input
            name="loaiSach"
            type="text" 
            class="form-control"
            v-model="bookLocal.loaiSach"
            required
          >
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="soQuyen">Số quyển:</label>
          <input
            name="soQuyen"
            type="number" 
            class="form-control"
            v-model="bookLocal.soQuyen"
            required
          >
        </div>
        <div class="form-group col-md-6">
          <label for="maNXB">Mã nhà xuất bản:</label>
          <input
            name="maNXB"
            type="text" 
            class="form-control"
            v-model="bookLocal.maNXB"
            required
          >
        </div>
      </div>
      <button class="btn btn-info" type="submit">Lưu</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        bookLocal: {
          maSach: '',
          tenSach: '',
          tacGia: '',
          loaiSach: '',
          soQuyen: '',
          maNXB: ''
        }
      };
    },
    methods: {
      submitBook() {
        this.$emit('submit:book', this.bookLocal);

        this.bookLocal = {
          maSach: '',
          tenSach: '',
          tacGia: '',
          loaiSach: '',
          soQuyen: '',
          maNXB: ''
        };
      }
    }
  };
  </script>
  