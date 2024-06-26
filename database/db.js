import mongoose from "mongoose";

const Connection = async (USERNAME, PASSWORD) => {
    const URL  = `mongodb://${USERNAME}:${PASSWORD}@ac-ixgskez-shard-00-00.ua66cg1.mongodb.net:27017,ac-ixgskez-shard-00-01.ua66cg1.mongodb.net:27017,ac-ixgskez-shard-00-02.ua66cg1.mongodb.net:27017/?ssl=true&replicaSet=atlas-4p16sz-shard-0&authSource=admin&retryWrites=true&w=majority&appName=blog-app`;
    try {
       await mongoose.connect(URL, {useNewUrlParser: true});
       console.log("Database Connected Successfully!!");
    } catch (error){
        console.log("Database Not Connected!!!", error);
    }
}

export default Connection;
