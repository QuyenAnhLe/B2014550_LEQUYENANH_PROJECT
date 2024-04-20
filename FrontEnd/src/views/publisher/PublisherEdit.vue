<template>
    <EmployeeHeader/>
    <div class="container mt-5">
        <div class="card d-flex flex-row w-50" style="margin: 0 auto;">
            <div class="card-body">
                <p class="card-text">
                    HIỆU CHỈNH NHÀ XUẤT BẢN
                </p>
               <hr>
               <PublisherForm :publisher="publisher" @submit:publisher="updatePublisher" />
               <p class="mt-2">{{ message }}</p>
                <hr>
                <router-link to="/employee/employeepublisher" style="text-decoration: none;" >Quay lại</router-link>
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
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            publisher: null,
            message: ""
        }
    },
    methods: {
        async getPublisher(id) {
            try {
                this.publisher = await PublisherService.getById(id);
            } catch (error) {
                console.log(error);
            }
        },
        async updatePublisher(data) {
            try {
                await PublisherService.update(this.publisher._id, data);
                this.message = "Nhà xuất bản được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        }
    },
    created() {
        this.getPublisher(this.id);
        this.message = "";
    }
};
</script>
