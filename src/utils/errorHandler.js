// import errorHandlerMiddleware from "../middleware/errorHandlerMiddleware";


class errorHandler extends Error{
    constructor (message, statusCode){
        super(message)
        this.statusCode= statusCode
    }
}

module.exports = errorHandler