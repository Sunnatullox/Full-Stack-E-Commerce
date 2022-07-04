class ApiError extends Error {
    status: any;
    constructor(status:any,messege:any){
        super();
        this.status = status
        this.message = messege
    }

    
    static badRequest(messege:any){
        return new ApiError(404, messege)
    }

    static internal(messege:any){
        return new ApiError(500, messege)
    }

    static forbidden(messege:any){
        return new ApiError(403, messege)
    }
}

export default ApiError