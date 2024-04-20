const { ObjectId} = require('mongodb')

class EmployeeService {
    constructor(client) {
        this.Employee = client.db().collection('employee')
    }

    extractEmployeeData(payload) {
        const employee = {
            masoNV: payload.masoNV,
            hotenNV: payload.hotenNV,
            userName: payload.userName,
            password: payload.password,
            chucVu: payload.chucVu,
            diaChi: payload.diaChi,
            soDienThoai: payload.soDienThoai,
        }

        Object.keys(employee).forEach(
            (key) => employee[key] === undefined && delete employee[key]
        );

        return employee;
    }

    async register(payload) {
        const { userName, password } = payload;

        const existingUser = await this.Employee.findOne({ userName });
        if (existingUser) {
            throw new Error("Username already exists");
        }

        const newUser = this.extractEmployeeData(payload);
        newUser.masoNV = new ObjectId(); 
        const result = await this.Employee.insertOne(newUser);
        return result;
    }

    async login(userName, password) {
        const user = await this.Employee.findOne({ userName });
        if (!user) {
            throw new Error("User not found");
        }

        if (user.password !== password) {
            throw new Error("Incorrect password");
        }

        const { masoNV } = user; 
        return { masoNV };
    }


    async find(filter) {
        const cursor = await this.Employee.find(filter);
        return await cursor.toArray();
    }

    async findByName(hotenNV) {
        return await this.find ({
            hotenNV: { $regex: new RegExp(hotenNV), $options: 'i'},
        });
    }

    async findByID (id) {
        return await this.Employee.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async findByMaSoNV(masoNV) {
        // Chuyển đổi masoNV thành ObjectId
        const objectId = ObjectId.isValid(masoNV) ? new ObjectId(masoNV) : null;
    
        // Sử dụng masoNV để tìm kiếm trong cơ sở dữ liệu
        return await this.Employee.findOne({ masoNV: objectId });
    }

    async update(id, payload) {
        let filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null, 
        };

        const update = this.extractEmployeeData(payload);
        const result = await this.Employee.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: 'after' }
        );
        return result;
    }

    async delete (id) {
        const result = await this.Employee.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.Employee.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = EmployeeService;