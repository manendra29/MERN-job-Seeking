import app from "./app.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name:process.env.cloudinary_client_name,
    api_key:process.env.cloudinary_client_api,
    api_secret :process.env.cloudinary_client_secret,
});
app.listen(process.env.PORT, () =>{
    console.log(`port is listening on ${process.env.PORT}`);
 })