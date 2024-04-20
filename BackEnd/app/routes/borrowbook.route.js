const express = require("express")
const borrowbooks = require("../controllers/borrowbook.controller")

const router = express.Router();

router.route("/")
        .get(borrowbooks.findAll)
        .post(borrowbooks.create)
        .delete(borrowbooks.deleteAll)

router.route("/:id")
        .get(borrowbooks.findOne)
        .put(borrowbooks.update)
        .delete(borrowbooks.delete)

router.get("/masach/:maSach", borrowbooks.findByMaSach);
router.get("/madocgia/:maDocGia", borrowbooks.findByMaDocGia);
module.exports = router;