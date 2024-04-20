const ApiError = require("../api-error")
const BorrowBookService = require("../services/borrowbook.service")
const MongoDB = require("../utils/mongodb.util")

exports.create = async (req, res, next) => {
    try {
        const borrowbookService = new BorrowBookService(MongoDB.client);
        const document = await borrowbookService.create(req.body);
        return res.send(document);
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the borrow book")
        );
    }
};

exports.findAll = async (_req, res, next) => {
    let borrowedBooks = [];
    try {
        const borrowBookService = new BorrowBookService(MongoDB.client);
        borrowedBooks = await borrowBookService.find({ trangThai: 'Chưa duyệt' });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving borrowed books")
        );
    }
    return res.send(borrowedBooks);
};

exports.findOne = async (req, res, next) => {
    try {
        const borrowbookService = new BorrowBookService(MongoDB.client) 
        const documents = await borrowbookService.findByID(req.params.id)

        if (!documents) {
            return next (new ApiError(404, "Không tìm thấy"));
        }
        return res.send(documents);
    } catch (error){
        return next (
            new ApiError(
                500, 
                `Error retrieving borrow book with id=${req.params.id}`
            )
        );
    }
};

exports.findByMaSach = async (req, res, next) => {
    try {
        const { maSach } = req.params;
        const borrowbookService = new BorrowBookService(MongoDB.client) ;
        const book = await borrowbookService.findByMaSach(maSach);
        if (!book || book.length === 0) {
            return next (new ApiError(404, "Không tìm thấy mã sách"));
        }
        return res.send(book);
    } catch (error){
        return next (
            new ApiError(500, "An error occurred while retrieving book")
        );
    }
};

exports.findByMaDocGia = async (req, res, next) => {
    try {
        const { maDocGia } = req.params;
        const borrowbookService = new BorrowBookService(MongoDB.client) ;
        const documents = await borrowbookService.findByMaDocGia(maDocGia);
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving reader")
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next (new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const borrowbookService = new BorrowBookService(MongoDB.client);
        const documents = await borrowbookService.update(req.params.id, req.body);
        if (!documents) {
            return next (new ApiError(404, "Không tìm thấy"));
        }
        return res.send({message: "Được cập nhật thành công!"});
    } catch (error) {
        return next (
            new ApiError(500, `Error updating reader with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const borrowbookService = new BorrowBookService(MongoDB.client);
        const document = await borrowbookService.delete(req.params.id);
        if (!document) {
            return next (new ApiError(404, "Không tìm thấy"));
        }
        return res.send({ message: "Được xóa thành công" });
    } catch (error) {
        return next (
            new ApiError(500, 
                `Could not delete borrow book with id=${req.params.id}`
            )
        );
    }
};

exports.deleteAll = async (_req, res, next) => {
    try {
        const borrowbookService = new BorrowBookService(MongoDB.client);
        const deletedCount = await borrowbookService.deleteAll()
        return res.send({
            message: `${deletedCount} were deleted succecssfully`,
        });
    } catch (error) {
        return next (
            new ApiError(500, "An error occurred while removing all")
        );
    }
    
};