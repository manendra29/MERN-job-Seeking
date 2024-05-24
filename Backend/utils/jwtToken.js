export const sendToken= (user,statusCode,res,messgage) =>{
const token=user.getJWTToken();
const options ={
        expires : new Date(
        Date.now() +process.env.Cookie_expire * 24 *60 * 60 * 1000
    ),
    httpOnly :true
};
res.status(statusCode).cookie("token",token,options).json({
    success : true,
    user,
    messgage,
    token,
})

}