const express = require("express");
const readers = require("../controllers/reader.controller");

const router = express.Router();

router.route("/")
        .get(readers.findAll)
        .delete(readers.deleteAll)

router.route("/:id")
        .get(readers.findOne)
        .put(readers.update)
        .delete(readers.delete)

router.route("/register")
        .post(readers.register)
    
router.route("/login")
        .post(readers.login)
    
router.route("/madocgia/:maDocGia")
        .get(readers.findByMaDocGia)
module.exports = router;