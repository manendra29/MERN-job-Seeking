
//It will check if there is any asych error,
//It will take theFunction (which is a function like login,etc) ,it will return a promise ,if it doesn't have any error it will call theFunction else move ahead.
export const catchAsyncError=(theFunction) =>{
    return (req,res,next)=>{
        Promise.resolve(theFunction(req,res,next)).catch(next);
    };
}