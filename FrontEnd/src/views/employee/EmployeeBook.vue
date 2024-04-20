<template>
    <div>
        <EmployeeHeader/>
        <div class="container mt-5">
            <div class="card d-flex flex-row">
                <div class="card-body" v-if="bookList.length > 0">
                    <p class="card-text">
                        <i class="fas fa-book"></i>
                        QUẢN LÝ SÁCH
                    </p>
                   <hr>
                    <table class="table table-bordered mt-5">
                        <thead>
                            <tr>
                                <th class="col-1" scope="col">STT</th>
                                <th class="col-2" scope="col">Mã sách</th>
                                <th scope="col">Tên sách</th>
                                <th scope="col">Tác giả</th>
                                <th class="col-3" scope="col">Thể loại</th>
                                <th class="col-2" scope="col">Số lượng</th>
                                <th class="col-3" scope="col">Mã nhà xuất bản</th>
                                <th class="col-3" scope="col">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(book, index) in bookList" :key="index">
                                <td>{{ index + 1 }}</td>
                                <td>{{ book.maSach }}</td>
                                <td>{{ book.tenSach }}</td>
                                <td>{{ book.tacGia }}</td>
                                <td>{{ book.loaiSach }}</td>
                                <td>{{ book.soQuyen }}</td>
                                <td>{{ book.maNXB }}</td>
                                <td> 
                                    <router-link :to="'/book/bookedit/' + book._id">
                                        <button type="button" class="btn btn-info mr-2"> <i class="fas fa-edit"></i></button> 
                                    </router-link>
                                    
                                    <button type="button" class="btn btn-danger" @click="confirmDelete(book._id)"> <i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <router-link to="/book/bookadd">
                        <button type="button" class="btn btn-info">
                            <i class="fas fa-plus"></i>
                            Thêm sách
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EmployeeHeader from '../../components/employee/EmployeeHeader.vue';
import BookService from '../../services/book.service';

export default {
    components: {
        EmployeeHeader
    },
    data() {
        return {
            bookList: [] // Danh sách sách
        };
    },
    created() {
        this.getAllBooks();
    },
    methods: {
        async getAllBooks() {
            try {
                // Gọi phương thức getAll từ BookService để lấy danh sách sách
                this.bookList = await BookService.getAll();
            } catch (error) {
                console.error('Lỗi khi lấy danh sách sách:', error);
            }
        },
        async confirmDelete(bookId) {
            if (confirm("Bạn có chắc muốn xóa sách này?")) {
                try {
                    await BookService.delete(bookId);
                    // Sau khi xóa thành công, cập nhật lại danh sách sách
                    this.getAllBooks();
                } catch (error) {
                    console.error('Lỗi khi xóa sách:', error);
                }
            }
        }
    }
};
</script>

<style>
    .col-1 {
        width: 5%;
    }
    .col-2 {
        width: 10%;
    }
    .col-3 {
        width: 15%;
    }
    .col-4 {
        width: 20%;
    }
</style>
