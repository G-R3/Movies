import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Error connecting to db");
        console.log(error);
        process.exit(1);
    }
};

export default dbConnection;
