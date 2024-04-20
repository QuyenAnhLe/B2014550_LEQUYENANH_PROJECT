<template>
    <div class="page">
        <div class="content">
            <h1>Explore our collection of books...</h1>
            <div class="d-flex justify-content-center mt-4">
                <router-link to="employee/login" class="custom-btn btn btn-info mr-4 btn-lg">Admin</router-link>
                <router-link to="reader/login" class="custom-btn btn btn-info btn-lg">Reader</router-link>
            </div>
        </div>
    </div>
</template>
<style>
    .page {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: white;
        width: 100%;
        height: 100vh;
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: 0 -50px;
        background-image: url(../assets/images/backgroud.png);
    }
    .content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: white;
    }
    .custom-btn {
        width: 150px; 
        height: 50px; 
    }
</style>