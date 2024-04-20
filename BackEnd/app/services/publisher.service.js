const { ObjectId} = require('mongodb')

class PublisherService {
    constructor(client) {
        this.Publisher = client.db().collection('publisher')
    }

    extractPublisherData(payload) {
        const publisher = {
            maNXB: payload.maNXB,
            tenNXB: payload.tenNXB,
            diaChi: payload.diaChi,
        }

        Object.keys(publisher).forEach(
            (key) => publisher[key] === undefined && delete publisher[key]
        );

        return publisher;
    }

    async create(payload) {
        const publisher = this.extractPublisherData(payload);
        const result = await this.Publisher.findOneAndUpdate(
            publisher,
            { $set: publisher },
            { returnDocument: 'after', upsert: true }
        );
        return result;
    }

    async find(filter) {
        const cursor = await this.Publisher.find(filter);
        return await cursor.toArray();
    }

    async findByName(tenNXB) {
        return await this.find ({
            tenNXB: { $regex: new RegExp(tenNXB), $options: 'i'},
        });
    }

    async findByMaNXB(maNXB) {
        const filter = { maNXB: maNXB };
        const publisher = await this.Publisher.findOne(filter); 
        return publisher;
    }

    async findByID (id) {
        return await this.Publisher.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        let filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null, 
        };

        const update = this.extractPublisherData(payload);
        const result = await this.Publisher.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: 'after' }
        );
        return result;
    }

    async delete (id) {
        const result = await this.Publisher.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.Publisher.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = PublisherService;