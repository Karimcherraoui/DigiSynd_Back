
import errorHandler  from "../utils/errorHandler";

export const  errorHandlerMiddleware = (err, req, res, next) =>{
    let error = {...err}
    error.message = err.message
    
    if(err.message === 'CastError'){
        const message = `Ressource not found ${err.value}`
        error = new errorHandler(message, 404)
    }

    if(err.code === 11000){
        const message = `Duplicated field value entered`
        error = new errorHandler(message, 400)
    }

    if(err.name === "ValidationError"){
    const message = Object.values(err.errors).map((val) => ' ' + val.message);
        error = new errorHandler(message, 400)
    }

    res.status(error.codeStatus || 500).json({
        success: false,
        error: error.message || 'server error'
    })

}

