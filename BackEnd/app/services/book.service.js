const { ObjectId} = require('mongodb')

class BookService {
    constructor(client) {
        this.Book = client.db().collection('book')
    }

    extractBookData(payload) {
        const book = {
            maSach: payload.maSach,
            tenSach: payload.tenSach,
            donGia: payload.donGia,
            soQuyen: payload.soQuyen,
            loaiSach: payload.loaiSach,
            namXB: payload.namXB,
            maNXB: payload.maNXB,
            tacGia: payload.tacGia,
        }

        Object.keys(book).forEach(
            (key) => book[key] === undefined && delete book[key]
        );

        return book;
    }

    async create(payload) {
        const book = this.extractBookData(payload);
        const result = await this.Book.findOneAndUpdate(
           book,
            { $set: book },
            { returnDocument: 'after', upsert: true }
        );
        return result;
    }

    async find(filter) {
        const cursor = await this.Book.find(filter);
        return await cursor.toArray();
    }

    async findByName(tenSach) {
        return await this.find ({
            tenSach: { $regex: new RegExp(tenSach), $options: 'i'},
        });
    }

    async findByID (id) {
        return await this.Book.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async findByMaSach(maSach) {
        const filter = { maSach: maSach };
        const book = await this.Book.findOne(filter); 
        return book;
    }
    
    

    async update(id, payload) {
        let filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null, 
        };

        const update = this.extractBookData(payload);
        const result = await this.Book.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: 'after' }
        );
        return result;
    }

    async delete (id) {
        const result = await this.Book.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.Book.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = BookService;