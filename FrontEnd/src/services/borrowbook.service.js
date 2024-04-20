import createApiClient from "./api.service";

class BorrowBookService {
    constructor(baseUrl = "/api/borrowbooks") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    
    async create(data) {
        return (await this.api.post("/", data)).data;
    }

    async deleteAll() {
        return (await this.api.delete("/")).data;
    }

    async getById(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    
    async getByMADOCGIA(maDocGia) {
        return (await this.api.get(`/madocgia/${maDocGia}`)).data;
    }

    async getByMASACH(maSach) {
        return (await this.api.get(`/masach/${maSach}`)).data;
    }
}

export default new BorrowBookService();