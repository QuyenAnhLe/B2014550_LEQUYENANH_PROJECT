const express = require("express")
const employees = require("../controllers/employee.controller")

const router = express.Router();

router.route("/")
        .get(employees.findAll)
        .delete(employees.deleteAll)

router.route("/:id")
        .get(employees.findOne)
        .put(employees.update)
        .delete(employees.delete)

router.route("/register")
        .post(employees.register)
    
router.route("/login")
        .post(employees.login)

router.get("/manhanvien/:masoNV", employees.findByMSNV)
module.exports = router;