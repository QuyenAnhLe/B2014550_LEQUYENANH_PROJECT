const { ObjectId} = require('mongodb')

class BorrowBookService {
    constructor(client) {
        this.BorrowBook = client.db().collection('borrowbook')
    }

    extractBorrowBookData(payload) {
        const borrowbook = {
            maDocGia: payload.maDocGia,
            maSach: payload.maSach,
            tenDocGia: payload.tenDocGia,
            ngayMuon: payload.ngayMuon,
            ngayTra: payload.ngayTra,
            trangThai: "Chưa duyệt"
        }

        Object.keys(borrowbook).forEach(
            (key) => borrowbook[key] === undefined && delete borrowbook[key]
        );

        return borrowbook;
    }

    async create(payload) {
        const borrowbook = this.extractBorrowBookData(payload);
        const result = await this.BorrowBook.findOneAndUpdate(
           borrowbook,
            { $set: borrowbook },
            { returnDocument: 'after', upsert: true }
        );
        return result;
    }

    async find(filter) {
        const cursor = await this.BorrowBook.find(filter);
        return await cursor.toArray();
    }

    async findByID (id) {
        return await this.BorrowBook.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async findByMaSach(maSach) {
        const filter = { maSach: maSach };
        const book = await this.BorrowBook.findOne(filter); 
        return book;
    }

    async findByMaDocGia(maDocGia) {
        // Chuyển đổi maDocGia thành ObjectId
        const objectId = ObjectId.isValid(maDocGia) ? new ObjectId(maDocGia) : null;
    
        // Sử dụng maDocGia để tìm kiếm trong cơ sở dữ liệu
        return await this.BorrowBook.findOne({ maDocGia: objectId });
    }

    async update(id, payload) {
        let filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null, 
        };
    
        const updateData = {
            $set: {
                ...payload, 
                trangThai: "Đã duyệt" 
            }
        };
    
        const result = await this.BorrowBook.findOneAndUpdate(
            filter,
            updateData,
            { returnDocument: 'after' }
        );
        return result;
    }

    async delete (id) {
        const result = await this.BorrowBook.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.BorrowBook.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = BorrowBookService;