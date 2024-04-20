<template>
    <ReaderHeader/>
    <div class="container mt-5">
        <div class="card d-flex flex-row">
            <div class="card-body">
                <p class="card-text">Bạn muốn tìm sách gì?</p>
                <div class="form-inline">
                    <input 
                        class="form-control mr-sm-2" 
                        type="text" 
                        placeholder="Nhập tên sách cần tìm" 
                        v-model="searchQuery" 
                        @keydown.enter="submit"
                    >
                    <button
                        class="btn btn-outline-secondary"
                        type="button"
                        @click="submit"
                    >
                    <i class="fas fa-search"></i> Tìm kiếm
                     </button>
                </div>
                <p class="card-text mt-4">Danh sách tìm kiếm</p>
                <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên sách</th>
                        <th scope="col">Tác giả</th>
                        <th scope="col">Loại sách</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(book, index) in searchResults" :key="index">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ book.tenSach }}</td>
                        <td>{{ book.tacGia }}</td>
                        <td>{{ book.loaiSach }}</td>
                        <td>{{ book.soQuyen }}</td>
                        <td>
                            <button type="button" class="btn btn-info" @click="selectBook(book)" data-toggle="modal" data-target="#exampleModal">Mượn</button>
                        </td>
                      </tr>
                    </tbody>
                </table>

                

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" v-show="showModal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Phiếu mượn sách</h5>
                                <button type="button" class="close" @click="closeModal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div v-if="errorMessage" class="alert alert-danger" role="alert">
                                    {{ errorMessage }}
                                </div>

                                <form>
                                    <div class="form-group">
                                        <label for="recipient-name" class="col-form-label">Tên sách:</label>
                                        <input type="text" class="form-control" id="recipient-name" v-model="selectedBook.tenSach" readonly>
                                    </div>
                                    <div class="form-group">
                                        <label for="publisher-name" class="col-form-label">Tên:</label>
                                        <input type="text" class="form-control" id="publisher-name" v-model="publishername">
                                    </div>
                                    <div class="form-group">
                                        <label for="borrow-date" class="col-form-label">Ngày mượn:</label>
                                        <input type="date" class="form-control" id="borrow-date" v-model="borrowDate">
                                    </div>
                                    <div class="form-group">
                                        <label for="return-date" class="col-form-label">Ngày trả:</label>
                                        <input type="date" class="form-control" id="return-date" v-model="returnDate">
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" @click="closeModal">Đóng</button>
                                <button type="button" class="btn btn-primary" @click="borrowBook">Mượn sách</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ReaderHeader from '../../components/reader/ReaderHeader.vue';
import BookService from '@/services/book.service';
import BorrowBookService from '@/services/borrowbook.service';

export default {
    components: {
        ReaderHeader
    },
    props: {
        modelValue: { type: String, default: "" },
    },
    data() {
        return {
            searchQuery: "", 
            searchResults: [], 
            selectedBook: {},
            showModal: false,
            publishername: "",
            borrowDate: "",
            returnDate: "",
            errorMessage: "", 
        };
    },
    methods: {
        async submit() {
            try {
                if (this.searchQuery.trim() === "") {
                    this.errorMessage = "Vui lòng nhập từ khóa tìm kiếm.";
                    return;
                }
                // Gửi yêu cầu tìm kiếm đến BookService
                this.searchResults = await BookService.getByName(this.searchQuery);
            } catch (error) {
                console.error('Lỗi khi tìm kiếm sách:', error);
            }
        },
        selectBook(book) {
            // Cập nhật selectedBook khi người dùng chọn một cuốn sách
            this.selectedBook = book;
            this.showModal = true; // Hiển thị modal khi người dùng chọn sách
        },
        closeModal() {
            this.showModal = false;
            // Reset giá trị ngày mượn và ngày trả khi đóng modal
            this.borrowDate = "";
            this.returnDate = "";
            this.errorMessage = ""; // Reset thông báo lỗi
        },
        async borrowBook() {
            try {
                if (!localStorage.getItem('maDocGia')) {
                    this.errorMessage = "Bạn chưa đăng nhập";
                    return;
                }

                if (!this.borrowDate || !this.returnDate) {
                    this.errorMessage = "Vui lòng chọn ngày mượn và ngày trả.";
                    return;
                }

                if (this.returnDate <= this.borrowDate) {
                    this.errorMessage = "Ngày trả phải sau ngày mượn.";
                    return;
                }

                if (this.selectedBook.soQuyen <= 0) {
                    this.errorMessage = "Sách không còn trống để mượn.";
                    return;
                }

                const maDocGia = localStorage.getItem('maDocGia');
                let existingRecord = await BorrowBookService.getByMADOCGIA(maDocGia);

                if (!Array.isArray(existingRecord)) {
                    existingRecord = [];
                }

                const bookRecord = existingRecord.find(record => record.maSach === this.selectedBook.maSach);

                if (bookRecord) {
                    this.errorMessage = "Bạn đã mượn sách này rồi.";
                    return;
                }

                const response = await BorrowBookService.create({
                    maDocGia: maDocGia,
                    maSach: this.selectedBook.maSach,
                    tenDocGia: this.publishername,
                    ngayMuon: this.borrowDate,
                    ngayTra: this.returnDate,
                    trangThai: "Chưa duyệt"
                });

                await BookService.update(this.selectedBook._id, { soQuyen: this.selectedBook.soQuyen - 1 });
                window.alert("Mượn sách thành công");
                window.location.reload();
                this.closeModal();

            } catch (error) {
                console.error("Lỗi khi mượn sách:", error);
            }
        },
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
