const { ObjectId } = require('mongodb')

class ReaderService {
    constructor(client) {
        this.Reader = client.db().collection('reader')
    }

    extractReaderData(payload) {
        const reader = {
            maDocGia: payload.maDocGia,
            userName: payload.userName,
            password: payload.password,
            hoLot: payload.hoLot,
            ten: payload.ten,
            ngaySinh: payload.ngaySinh,
            phai: payload.phai,
            diaChi: payload.diaChi,
            dienThoai: payload.dienThoai,
        }

        Object.keys(reader).forEach(
            (key) => reader[key] === undefined && delete reader[key]
        );

        return reader;
    }

    async register(payload) {
        const { userName, password } = payload;

        const existingUser = await this.Reader.findOne({ userName });
        if (existingUser) {
            throw new Error("Username already exists");
        }

        const newUser = this.extractReaderData(payload);
        newUser.maDocGia = new ObjectId(); 
        const result = await this.Reader.insertOne(newUser);
        return result;
    }

    async login(userName, password) {
        const user = await this.Reader.findOne({ userName });
        if (!user) {
            throw new Error("User not found");
        }

        if (user.password !== password) {
            throw new Error("Incorrect password");
        }

        const { maDocGia } = user; 
        return {maDocGia};
    }

    async find(filter) {
        const cursor = await this.Reader.find(filter);
        return await cursor.toArray();
    }

    async findByName(ten) {
        return await this.find ({
            ten: { $regex: new RegExp(ten), $options: 'i'},
        });
    }

    async findByID (id) {
        return await this.Reader.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async findByMaDocGia(maDocGia) {
        // Chuyển đổi maDocGia thành ObjectId
        const objectId = ObjectId.isValid(maDocGia) ? new ObjectId(maDocGia) : null;
    
        // Sử dụng maDocGia để tìm kiếm trong cơ sở dữ liệu
        return await this.Reader.findOne({ maDocGia: objectId });
    }
    

    async update(id, payload) {
        let filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null, 
        };

        const update = this.extractReaderData(payload);
        const result = await this.Reader.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: 'after' }
        );
        return result;
    }

    async delete (id) {
        const result = await this.Reader.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.Reader.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = ReaderService;