<template>
    <div class="main">
        <div class="container-signup">
            <div class="size-card d-flex flex-row">
                <div class="login-form">
                    <h2 class="form-title">Đăng ký</h2>
                    <RegisterForm  @register="handleRegister"/>
                    <p class="ms-4 text-danger" v-if="error">{{ error }}</p>
                </div>
                <div class="login-img">
                    <figure>
                        <img src="../../assets/images/signup-image.jpg" alt="">
                    </figure>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import RegisterForm from '../../components/RegisterForm.vue';
import ReaderService from '@/services/reader.service';


export default {
    components: {
        RegisterForm
    },
    data() {
        return {
            error: '' 
        };
    },
    methods: {
        async handleRegister(data) {
            try {
                await ReaderService.register(data);
                window.alert("Bạn đã đăng ký thành công")
                this.$router.push({ name: "reader.login" });
            } catch (error) {
                this.error = 'Đăng ký thất bại!';
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
    .container-signup {
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
</style>