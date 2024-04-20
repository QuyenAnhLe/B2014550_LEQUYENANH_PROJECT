<template>
    <EmployeeHeader/>
    <div class="container mt-5">
        <div class="card d-flex flex-row w-50" style="margin: 0 auto;">
            <div class="card-body">
                <p class="card-text">
                    HIỆU CHỈNH SÁCH
                </p>
               <hr>
               <BookForm :book="book" @submit:book="updateBook"/>
               <p class="mt-2">{{ message }}</p>
                <hr>
                <router-link to="/employee/employeebook" style="text-decoration: none;" >Quay lại</router-link>
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
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            book: null,
            message: ""
        }
    },
    methods: {
        async getBook(id) {
            try {
                this.book = await BookService.getById(id);
            } catch (error) {
                console.log(error);
            }
        },
        async updateBook(data) {
            try {
                await BookService.update(this.book._id, data);
                this.message = "Sách được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        }
    },
    created() {
        this.getBook(this.id);
        this.message = "";
    }
};
</script>
