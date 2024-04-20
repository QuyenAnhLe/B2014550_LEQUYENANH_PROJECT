<template>
    <EmployeeHeader/>
    <div class="container mt-5">
        <div class="card d-flex flex-row">
            <div class="card-body">
                <p class="card-text">
                    <i class="fas fa-book"></i>
                    QUẢN LÝ PHIẾU MƯỢN SÁCH
                </p>
               <hr>
                <table class="table table-bordered mt-5">
                    <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Mã đọc giả</th>
                        <th scope="col">Mã sách</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Ngày Mượn</th>
                        <th scope="col">Ngày Trả</th>
                        <th scope="col">Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(borrowbook, index) in borrowList" :key="index">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ borrowbook.tenDocGia }}</td>
                        <td>{{ borrowbook.maSach }}</td>
                        <td>{{ borrowbook.trangThai }}</td>
                        <td>{{ borrowbook.ngayMuon }}</td>
                        <td>{{ borrowbook.ngayTra }}</td>
                        <td> <button @click="approveBorrow(borrowbook._id)" class="btn btn-success">Duyệt</button> </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import EmployeeHeader from '../../components/employee/EmployeeHeader.vue';
import BorrowBookService from '../../services/borrowbook.service';

export default {
    components: {
        EmployeeHeader
    },
    data() {
        return {
            borrowList: [] // Danh sách phiếu mượn
        };
    },
    async created() {
        try {
            // Lấy tất cả thông tin về phiếu mượn từ BorrowBookService
            this.borrowList = await BorrowBookService.getAll();
        } catch (error) {
            console.error('Lỗi khi lấy thông tin phiếu mượn:', error);
        }
    },
    methods: {
        async approveBorrow(id, index) {
            try {
                // Cập nhật trạng thái của phiếu mượn thành "Đã duyệt"
                await BorrowBookService.update(id, { trangThai: 'Đã duyệt' });

                // Xóa phiếu mượn khỏi danh sách phiếu mượn chờ duyệt
                this.borrowList.splice(index, 1);
            } catch (error) {
                console.error('Lỗi khi duyệt phiếu mượn:', error);
            }
        }
    }
};
</script>

<style>
    .card {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
    }
    .card-text {
        font-size: 20px;
        color: black;
        font-weight: 600;
    }
</style>
