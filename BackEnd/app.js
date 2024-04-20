const express = require("express");
const cors = require("cors");

const app = express();

const booksRouter = require("./app/routes/book.route");
const publishersRouter = require("./app/routes/publisher.route");
const employeesRouter = require("./app/routes/employee.route");
const readersRouter = require("./app/routes/reader.route");
const borrowbooksRouter = require("./app/routes/borrowbook.route");

const ApiError = require("./app/api-error");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Librabry."
    });
})

app.use("/api/books", booksRouter);
app.use("/api/publishers", publishersRouter);
app.use("/api/employees", employeesRouter);
app.use("/api/readers", readersRouter);
app.use("/api/borrowbooks", borrowbooksRouter);


app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});
module.exports = app;