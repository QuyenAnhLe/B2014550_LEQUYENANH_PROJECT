<template>
    <EmployeeHeader/>
    <div class="container mt-5">
        <div class="card d-flex flex-row w-50" style="margin: 0 auto;">
            <div class="card-body">
                <p class="card-text">THÊM SÁCH</p>
                <hr>
                <BookForm :book="book" @submit:book="uploadBook" />
                <p class="mt-2">{{ message }}</p>
                <hr>
                <router-link to="/employee/employeebook" style="text-decoration: none;">Quay lại</router-link>
            </div>
        </div>
    </div>
</template>
  
<script>
import EmployeeHeader from '../../components/employee/EmployeeHeader.vue';
import BookForm from '../../components/book/BookForm.vue';
import BookService from '@/services/book.service';
  
export default {
    components: {
        EmployeeHeader,
        BookForm
    },
    data() {
        return {
            book: {},
            message: ""
        }
    },
    methods: {
        async uploadBook(data) {
            try {
                await BookService.create(data);
                this.message = "Sách mới được thêm thành công.";
            } catch (error) {
                console.error(error);
                this.message = "Đã xảy ra lỗi khi thêm sách.";
            }
        }
    }
};
</script>
  