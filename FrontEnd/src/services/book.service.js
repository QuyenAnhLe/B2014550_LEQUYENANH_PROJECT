import createApiClient from "./api.service";

class BookService {
    constructor(baseUrl = "/api/books") {
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

    async getByName(tenSach) {
        return (await this.api.get(`?tenSach=${tenSach}`)).data;
    }

    async getByMASACH(maSach) {
        return (await this.api.get(`/masach/${maSach}`)).data;
    }

    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default new BookService();