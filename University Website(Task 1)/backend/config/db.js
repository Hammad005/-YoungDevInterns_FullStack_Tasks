import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "University_website"
        });
        console.log("Connected to MongoDB, Database Name: ", conn.connection.name);
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

export default dbConnect;
// The code above connects to the MongoDB database using the MONGO_URI environment variable. The connection is established using the mongoose.connect() method. The dbName option specifies the name of the database to connect to. The useNewUrlParser and useUnifiedTopology options are set to true to avoid deprecation warnings.