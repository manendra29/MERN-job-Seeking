import mongoose from "mongoose";

export const dbConnect = () =>{
    mongoose.connect(process.env.Mongoo_url, {
        dbName:"MERN_STACK_JOB_SEEKING"
    }).then(() =>{
        console.log("Database connected");
    }
    ).catch((err) =>{
        console.log(`error occured ${err}`);
    })
}