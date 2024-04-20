const ApiError = require("../api-error")
const BookService = require("../services/book.service")
const MongoDB = require("../utils/mongodb.util")

exports.create = async (req, res, next) => {
    if(!req.body?.tenSach) {
        return next(new ApiError(400, "name book can not be empty"));
    }

    try{
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the book")  
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const bookService = new BookService(MongoDB.client);
        const { tenSach } = req.query;
        
        if (tenSach) {
            documents = await bookService.findByName(tenSach);
        }
        else {
            documents = await bookService.find();
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving books")
        );
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client) 
        const documents = await bookService.findByID(req.params.id)

        if (!documents) {
            return next (new ApiError(404, "Không tìm thấy sách"));
        }
        return res.send(documents);
    } catch (error){
        return next (
            new ApiError(
                500, 
                `Error retrieving book with id=${req.params.id}`
            )
        );
    }
};

exports.findByMaSach = async (req, res, next) => {
    try {
        const { maSach } = req.params;
        const bookService = new BookService(MongoDB.client); 
        const book = await bookService.findByMaSach(maSach);
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

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next (new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const bookService = new BookService(MongoDB.client);
        const documents = await bookService.update(req.params.id, req.body);
        if (!documents) {
            return next (new ApiError(404, "Không tìm thấy sách"));
        }
        return res.send({message: "Sách được cập nhật thành công!"});
    } catch (error) {
        return next (
            new ApiError(500, `Error updating book with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.delete(req.params.id);
        if (!document) {
            return next (new ApiError(404, "Không tìm thấy sách"));
        }
        return res.send({ message: "Sách được xóa thành công" });
    } catch (error) {
        return next (
            new ApiError(500, 
                `Could not delete book with id=${req.params.id}`
            )
        );
    }
};

exports.deleteAll = async (_req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const deletedCount = await bookService.deleteAll()
        return res.send({
            message: `${deletedCount} books were deleted succecssfully`,
        });
    } catch (error) {
        return next (
            new ApiError(500, "An error occurred while removing all books")
        );
    }
};