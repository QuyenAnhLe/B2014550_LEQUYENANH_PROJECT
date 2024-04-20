<template>
    <form
        @submit.prevent="login"
    >
        <div class="form-group">
            <input type="text" class="form-control" id="username" v-model="username" placeholder="Nhập tên đăng nhập" required>
        </div>
        <div class="form-group">
            <input type="password" class="form-control" id="password" v-model="password" placeholder="Mật khẩu" required>
        </div>
        <div class="form-group form-button">
            <button type="submit" class="btn btn-submit">Đăng nhập</button>
        </div>
    </form>
</template>
<script>
    export default {
        data() {
           return {
              username: '',
              password: ''
           };
        },
        methods: {
            login() {
                this.$emit('login', {
                    userName: this.username,
                    password: this.password
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