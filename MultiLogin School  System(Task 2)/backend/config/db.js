import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "MultiLogin_School_System"
        });
        console.log("Connected to MongoDB, Database Name: ", conn.connection.name);
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error.message);
        process.exit(1);
    }
};

export default dbConnect;