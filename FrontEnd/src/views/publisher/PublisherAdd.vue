<template>
    <EmployeeHeader/>
    <div class="container mt-5">
        <div class="card d-flex flex-row w-50" style="margin: 0 auto;">
            <div class="card-body">
                <p class="card-text">THÊM NHÀ XUẤT BẢN</p>
                <hr>
                <PublisherForm :publisher="publisher" @submit:publisher="uploadPublisher" />
                <p class="mt-2">{{ message }}</p>
                <hr>
                <router-link to="/employee/employeepublisher" style="text-decoration: none;">Quay lại</router-link>
            </div>
        </div>
    </div>
</template>
  
<script>
import EmployeeHeader from '../../components/employee/EmployeeHeader.vue';
import PublisherForm from '../../components/publisher/PublisherForm.vue';
import PublisherService from '@/services/publisher.service';
  
export default {
    components: {
        EmployeeHeader,
        PublisherForm
    },
    data() {
        return {
            publisher: {},
            message: ""
        }
    },
    methods: {
        async uploadPublisher(data) {
            try {
                await PublisherService.create(data);
                this.message = "Nhà xuất bản mới được thêm thành công.";
            } catch (error) {
                console.error(error);
                this.message = "Đã xảy ra lỗi khi thêm nhà xuất bản.";
            }
        }
    }
};
</script>
  