class errorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;        
    }
}

export const errorMiddleware =(err,req,res,next) =>{
err.message=err.message || "Internal Server Error";
err.statusCode=err.statusCode || 500;

if(err.message === "CaseError"){
    const message=`Resources are not Found. invalid ${err.path}`;
    err=new errorHandler(message,400);
}

if(err.message === "1100"){
    const message=`Duplicate ${Object.keys(err.keyValue)} Entered`;
    err=new errorHandler(message,400);
}

if(err.message === "JsonWebTokenError"){
    const message=`Json web token invalid.Try Again`;
    err=new errorHandler(message,400);
}

if(err.message === "TokenExpiredError"){
    const message=`Json web token Expired.Try Again`;
    err=new errorHandler(message,400);
}

return res.status(err.statusCode).json({
    success:false,
    message:err.message
});
}

export default errorHandler;