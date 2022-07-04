"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const ErrorHandlingMiddleware_1 = __importDefault(require("./middleware/ErrorHandlingMiddleware"));
const fileUpload = require("express-fileupload");
const process = require("process");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', index_1.default);
// Error middleware in the latest processing
app.use(ErrorHandlingMiddleware_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("SERVER RUNNING ON  PORT " + PORT);
});
