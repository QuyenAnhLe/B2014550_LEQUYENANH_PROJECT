const ApiError = require("../api-error")
const ReaderService = require("../services/reader.service")
const MongoDB = require("../utils/mongodb.util")

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const readerService = new ReaderService(MongoDB.client);
        const { ten } = req.query;
        
        if (ten) {
            documents = await readerService.findByName(ten);
        }
        else {
            documents = await readerService.find();
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving reader")
        );
    }

    return res.send(documents);
};


exports.findOne = async (req, res, next) => {
    try {
        const readerService = new ReaderService(MongoDB.client); 
        const documents = await readerService.findByID(req.params.id)

        if (!documents) {
            return next (new ApiError(404, "Không tìm thấy đọc giả"));
        }
        return res.send(documents);
    } catch (error){
        return next (
            new ApiError(
                500, 
                `Error retrieving reader with id=${req.params.id}`
            )
        );
    }
};

exports.findByMaDocGia = async (req, res, next) => {
    try {
        const { maDocGia } = req.params;
        const readerService = new ReaderService(MongoDB.client);
        const documents = await readerService.findByMaDocGia(maDocGia);
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving Books")
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next (new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const readerService = new ReaderService(MongoDB.client);
        const documents = await readerService.update(req.params.id, req.body);
        if (!documents) {
            return next (new ApiError(404, "Không tìm thấy đọc giả"));
        }
        return res.send({message: "Đọc giả được cập nhật thành công!"});
    } catch (error) {
        return next (
            new ApiError(500, `Error updating reader with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const readerService = new ReaderService(MongoDB.client);
        const document = await readerService.delete(req.params.id);
        if (!document) {
            return next (new ApiError(404, "Không tìm thấy nhân viên"));
        }
        return res.send({ message: "Nhân viên được xóa thành công" });
    } catch (error) {
        return next (
            new ApiError(500, 
                `Could not delete reader with id=${req.params.id}`
            )
        );
    }
};

exports.deleteAll = async (_req, res, next) => {
    try {
        const readerService = new ReaderService(MongoDB.client);
        const deletedCount = await readerService.deleteAll()
        return res.send({
            message: `${deletedCount} readers were deleted succecssfully`,
        });
    } catch (error) {
        return next (
            new ApiError(500, "An error occurred while removing all readers")
        );
    }
};

exports.register = async (req, res, next) => {
    try {
        const readerService = new ReaderService(MongoDB.client);
        const document = await readerService.register(req.body);
         return res.send({ message: "Register Successfully" });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while registering the reader")
        );
    }
};

exports.login = async (req, res, next) => {
    const { userName, password } = req.body;

    try {
        const readerService = new ReaderService(MongoDB.client);
        const user = await readerService.login(userName, password);
        return res.send({ message: "Login Successfully", user });
    } catch (error) {
        return next(
            new ApiError(401, "Invalid credentials")
        );
    }
};