import createApiClient from "./api.service";

class StaffService {
    constructor(baseUrl = "/api/employees") {
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

    async getByName(name) {
        return (await this.api.get(`?name=${name}`)).data;
    }

    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }

    async login(data) {
        return (await this.api.post("/login", data)).data;
    }

    async getByMSNV(masoNV) {
        return (await this.api.get(`/manhanvien/${masoNV}`)).data;
    }
}

export default new StaffService();