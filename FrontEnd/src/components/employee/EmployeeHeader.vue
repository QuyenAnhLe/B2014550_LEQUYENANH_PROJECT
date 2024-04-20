<template>
    <div class="container-fluid header">
       <div class="container">
            <nav class="navbar navbar-expand-lg">
                <a class="navbar-brand" href="#">
                    <img src="../../assets/images/Colorful.png" width="60px" height="60px"  class="d-inline-block align-center" alt="">
                </a>
                <span class="title">THƯ VIỆN</span>
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                      <router-link to="/employee/employeehome" class="nav-link" >Quản lý phiếu mượn</router-link>
                    </li>
                    <li class="strike-down"></li>
                    <li class="nav-item active">
                        <router-link to="/employee/employeebook" class="nav-link" >Quản lý sách</router-link>
                    </li>
                    <li class="strike-down"></li>
                    <li class="nav-item active">
                        <router-link to="/employee/employeepublisher" class="nav-link" >Quản lý nhà xuất bản</router-link>
                    </li>
                    <li class="strike-down"></li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click="logout">Đăng xuất</a>
                    </li>
                </ul>
            </nav>
       </div>
    </div>
</template>
<script>
    export default {
        methods: {
            logout() {
                localStorage.removeItem('Admin_token');
                localStorage.removeItem('masoNV');
                window.alert("Bạn đã đăng xuất thành công")
                this.$router.push({ name: 'homepage' });
            },
        }
    }
</script>
<style>
    .header {
        background-color: #59c5ff;
    }
    .title {
        color: #fff;
        font-size: 26px;
        font-weight: 800;
        
    }
    .nav-link {
        color: #fff;
        font-size: 18px;
        font-weight: 500;
    }
    .strike-down {
        border-right: 3px solid #fff;
        height: 15px;
        margin: 14px 10px;
    }
</style>