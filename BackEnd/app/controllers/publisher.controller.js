const ApiError = require("../api-error")
const PublisherService = require("../services/publisher.service")
const MongoDB = require("../utils/mongodb.util")

exports.create = async (req, res, next) => {
    if (!req.body?.tenNXB) {
        return next(new ApiError(400, "Không tìm thấy tên nhà xuất bản"));
    }
    try {
        const publisherService = new PublisherService(MongoDB.client);
        const document = await publisherService.create(req.body);
        return res.send(document);
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the publisher")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const publisherService = new PublisherService(MongoDB.client);
        const { tenNXB } = req.query;
        
        if (tenNXB) {
            documents = await publisherService.findByName(tenSach);
        }
        else {
            documents = await publisherService.find();
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving publishers")
        );
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const publisherService = new PublisherService(MongoDB.client) 
        const documents = await publisherService.findByID(req.params.id)

        if (!documents) {
            return next (new ApiError(404, "Không tìm thấy nhà xuất bản"));
        }
        return res.send(documents);
    } catch (error){
        return next (
            new ApiError(
                500, 
                `Error retrieving publisher with id=${req.params.id}`
            )
        );
    }
};   

exports.findByMaNXB = async (req, res, next) => {
    try {
        const { maNXB } = req.params;
        const publisherService = new PublisherService(MongoDB.client); 
        const publisher = await publisherService.findByMSNV(maNXB);
        if (!publisher) {
            return next (new ApiError(404, "Không tìm thấy mã số nhà xuất bản"));
        }
        return res.send(publisher);
    } catch (error){
        return next (
            new ApiError(500, "An error occurred while retrieving publisher")
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next (new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const publisherService = new PublisherService(MongoDB.client);
        const documents = await publisherService.update(req.params.id, req.body);
        if (!documents) {
            return next (new ApiError(404, "Không tìm thấy nhà xuất bản"));
        }
        return res.send({message: "Nhà xuất bản được cập nhật thành công!"});
    } catch (error) {
        return next (
            new ApiError(500, `Error updating publisher with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const publisherService = new PublisherService(MongoDB.client);
        const document = await publisherService.delete(req.params.id);
        if (!document) {
            return next (new ApiError(404, "Không tìm thấy nhà xuất bản"));
        }
        return res.send({ message: "Nhà xuất bản được xóa thành công" });
    } catch (error) {
        return next (
            new ApiError(500, 
                `Could not delete publisher with id=${req.params.id}`
            )
        );
    }
};

exports.deleteAll = async (_req, res, next) => {
    try {
        const publisherService = new PublisherService(MongoDB.client);
        const deletedCount = await publisherService.deleteAll()
        return res.send({
            message: `${deletedCount} publishers were deleted succecssfully`,
        });
    } catch (error) {
        return next (
            new ApiError(500, "An error occurred while removing all publishers")
        );
    }
    
};