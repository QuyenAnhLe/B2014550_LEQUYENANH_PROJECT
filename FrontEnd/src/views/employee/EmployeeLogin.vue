<template>
    <div class="main">
        <div class="container-login">
            <div class="size-card d-flex flex-row">
                <div class="login-img">
                    <figure>
                        <img src="../../assets/images/admin-login.png" alt="">
                    </figure>
                </div>
                <div class="login-form">
                    <h2 class="form-title">Đăng nhập</h2>
                    <LoginForm @login="handleLogin"/>
                    <p class="ms-4 text-danger" v-if="error">{{ error }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import LoginForm from '../../components/LoginForm.vue';
import EmployeeService from '@/services/employee.service';

export default {
    components: {
        LoginForm
    },
    data() {
        return {
            error: ''
        };
    },
    methods: {
        async handleLogin(credentials) {
            try {
                const response = await EmployeeService.login(credentials);
                const { masoNV } = response.employee;

                localStorage.setItem('masoNV', masoNV);
                localStorage.setItem('Admin_token', true);
    
                window.alert("Bạn đã đăng nhập thành công")
                console.log(masoNV);
                this.$router.push({ name: 'employee.employeehome' }); 
            } catch (error) {
                this.error = 'Tên đăng nhập hoặc mật khẩu không đúng.';
                console.error(error);
            }
        },

    }
}
</script>
<style>
    .main {
        background-color: #d6d4d4; 
    }
    .container-login {
        height: 100vh; 
        display: flex;
        justify-content: center; 
        align-items: center;
    }
    .size-card {
        background-color: #fff;
        justify-content: center; 
        align-items: center;
        width: 900px; 
        height: 600px;
        padding: 20px; 
        border-radius: 10px; 
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
    }
    .login-img {
        margin-left: 110px;
        margin-right: 20px;
        margin-top: 10px;
        width: 50%;
    }
    .login-form {
        margin-right: 90px;
        margin-left: 80px;
        width: 50%;
    }
    .form-title{
        margin-bottom: 33px;
        font-size: 36px;
        font-weight: 700;
    }
    .signup-link {
        margin-top: 80px;
    }
</style>