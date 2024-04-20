const ApiError = require("../api-error")
const EmployeeService = require("../services/employee.service")
const MongoDB = require("../utils/mongodb.util")

exports.create = async (req, res,next) => {
    try {
        const employeeService = new EmployeeService(MongoDB.client);
        const existingEmployee = await employeeService.findByID(masoNV);
        if (existingEmployee) {
            return res.status(409).json({ error: 'Mã số nhân viên đã tồn tại' });
        }
        const document = await employeeService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the employee")
        );
    }
};

exports.findAll = async (_req, res, next) => {
    let documents = [];
    try {
        const employeeService = new EmployeeService(MongoDB.client);
        documents = await employeeService.find();
        
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving employees")
        );
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const employeeService = new EmployeeService(MongoDB.client); 
        const documents = await employeeService.findByID(req.params.id);

        if (!documents) {
            return next (new ApiError(404, "Không tìm thấy nhân viên"));
        }
        return res.send(documents);
    } catch (error){
        return next (
            new ApiError(
                500, 
                `Error retrieving employee with id=${req.params.id}`
            )
        );
    }
};

exports.findByMSNV = async (req, res, next) => {
    try {
        const { masoNV } = req.params;
        const employeeService = new EmployeeService(MongoDB.client); 
        const employee = await employeeService.findByMaSoNV(masoNV);
        if (!employee) {
            return next (new ApiError(404, "Không tìm thấy mã số nhân viên"));
        }
        return res.send(employee);
    } catch (error){
        return next (
            new ApiError(500, "An error occurred while retrieving employee")
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next (new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const employeeService = new EmployeeService(MongoDB.client);
        const documents = await employeeService.update(req.params.id, req.body);
        if (!documents) {
            return next (new ApiError(404, "Không tìm thấy nhân viên"));
        }
        return res.send({message: "Nhân viên được cập nhật thành công!"});
    } catch (error) {
        return next (
            new ApiError(500, `Error updating employee with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const employeeService = new EmployeeService(MongoDB.client);
        const document = await employeeService.delete(req.params.id);
        if (!document) {
            return next (new ApiError(404, "Không tìm thấy nhân viên"));
        }
        return res.send({ message: "Nhân viên được xóa thành công" });
    } catch (error) {
        return next (
            new ApiError(500, 
                `Could not delete employee with id=${req.params.id}`
            )
        );
    }
};

exports.deleteAll = async (_req, res, next) => {
    try {
        const employeeService = new EmployeeService(MongoDB.client);
        const deletedCount = await employeeService.deleteAll()
        return res.send({
            message: `${deletedCount} employees were deleted succecssfully`,
        });
    } catch (error) {
        return next (
            new ApiError(500, "An error occurred while removing all employees")
        );
    }
};

exports.login = async (req, res, next) => {
    const { userName, password } = req.body;

    try{
        const employeeService = new EmployeeService(MongoDB.client);
        const employee = await employeeService.login(userName, password);
        return res.send({ message: "Đăng nhập thành công", employee});
    } catch (error) {
        return next (
            new ApiError(401, 
                'Invalid username or password'
            )
        );
    }
};

exports.register = async (req, res, next) => {
    try {
        const employeeService = new EmployeeService(MongoDB.client);
        const document = await employeeService.register(req.body);
         return res.send({ message: "Register Successfully" });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while registering the reader")
        );
    }
};