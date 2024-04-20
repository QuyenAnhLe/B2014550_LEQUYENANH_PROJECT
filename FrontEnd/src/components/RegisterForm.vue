<template>
    <form
    @submit.prevent="register"
    >
        <div class="form-row">
            <div class="col-4 form-group">
                <input type="text" id="ho" v-model="ho" class="form-control" placeholder="Họ" required>
            </div>
            <div class="col-8 form-group">
                <input type="text" id="ten" v-model="ten" class="form-control" placeholder="Tên" required>
            </div>
        </div>
        <div class="form-group">
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="=phai" v-model="phai" value="Nam" required> Nam
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="=phai" v-model="phai" value="Nữ" required> Nữ
            </div>
        </div>
        <div class="form-group">
            <input type="text" id="username" v-model="username" class="form-control"  placeholder="Nhập tên đăng nhập" required>
        </div>
        <div class="form-group">
            <input type="password" id="password" v-model="password" class="form-control"  placeholder="Mật khẩu" required>
        </div>
        <div class="form-group">
            <input type="date" id="ngaysinh" v-model="ngaysinh" class="form-control" placeholder="Ngày sinh" required>
        </div>
        <div class="form-group">
            <input type="tel" class="form-control" id="dienthoai" v-model="dienthoai" placeholder="Số điện thoại" required>
        </div>
        <div class="form-group">
            <input type="text" class="form-control" id="diachi" v-model="diachi" placeholder="Địa chỉ" required>
        </div>
        <div class="form-group form-button">
            <button type="submit" class="btn btn-submit">Đăng ký</button>
        </div>
    </form>
</template>
<script>
    export default {
        data() {
           return {
              ho: '',
              ten: '',
              phai: '',
              username: '',
              password: '',
              ngaysinh: '',
              dienthoai: '',
              diachi: ''
           };
        },
        methods: {
            register() {
                this.$emit('register', {
                    hoLot: this.ho,
                    ten: this.ten,
                    phai: this.phai,
                    userName: this.username,
                    password: this.password,
                    ngaySinh: this.ngaysinh,
                    dienThoai: this.dienthoai,
                    diaChi: this.diachi
                });
            }
        }
    };
</script>
<style>
    .btn-submit {
        background: #6dabe4;
        color: #fff;
        padding: 10px 25px;
    }
</style>