<template>
    <div>
        <EmployeeHeader/>
        <div class="container mt-5">
            <div class="card d-flex flex-row">
                <div class="card-body" v-if="publisherList.length > 0">
                    <p class="card-text">
                        <i class="fas fa-home"></i>
                        QUẢN LÝ NHÀ XUẤT BẢN
                    </p>
                   <hr>
                    <table class="table table-bordered mt-5">
                        <thead>
                            <tr>
                                <th class="col-1" scope="col">STT</th>
                                <th class="col-4" scope="col">Nhà xuất bản</th>
                                <th class="col-3" scope="col">Mã nhà xuất bản</th>
                                <th class="col-4" scope="col">Địa chỉ</th>
                                <th class="col-3" scope="col">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(publisher, index) in publisherList" :key="index">
                                <td>{{ index + 1 }}</td>
                                <td>{{ publisher.tenNXB }}</td>
                                <td>{{ publisher.maNXB }}</td>
                                <td>{{ publisher.diaChi }}</td>
                                <td> 
                                    <router-link :to="'/publisher/publisheredit/' + publisher._id">
                                        <button type="button" class="btn btn-info mr-2"> <i class="fas fa-edit"></i></button> 
                                    </router-link>
                                    
                                    <button type="button" class="btn btn-danger" @click="confirmDelete(publisher._id)"> <i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <router-link to="/publisher/publisheradd">
                        <button type="button" class="btn btn-info">
                            <i class="fas fa-plus"></i>
                            Thêm nhà xuất bản
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EmployeeHeader from '../../components/employee/EmployeeHeader.vue';
import PublisherService from '../../services/publisher.service';

export default {
    components: {
        EmployeeHeader
    },
    data() {
        return {
            publisherList: [] // Danh sách nhà xuất bản
        };
    },
    created() {
        this.getAllPublishers();
    },
    methods: {
        async getAllPublishers() {
            try {
                // Gọi phương thức getAll từ PublisherService để lấy danh sách nhà xuất bản
                this.publisherList = await PublisherService.getAll();
            } catch (error) {
                console.error('Lỗi khi lấy danh sách nhà xuất bản:', error);
            }
        },
        async confirmDelete(publisherId) {
            if (confirm("Bạn có chắc muốn xóa sách này?")) {
                try {
                    await PublisherService.delete(publisherId);
                    // Sau khi xóa thành công, cập nhật lại danh sách nhà xuất bản
                    this.getAllPublishers();
                } catch (error) {
                    console.error('Lỗi khi xóa nhà xuất bản:', error);
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
