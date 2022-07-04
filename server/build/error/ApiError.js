"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(status, messege) {
        super();
        this.status = status;
        this.message = messege;
    }
    static badRequest(messege) {
        return new ApiError(404, messege);
    }
    static internal(messege) {
        return new ApiError(500, messege);
    }
    static forbidden(messege) {
        return new ApiError(403, messege);
    }
}
exports.default = ApiError;
