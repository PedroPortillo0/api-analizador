import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createConnection } from 'mysql2/promise';


dotenv.config();

// MongoDB connection configuration
export const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

// MySQL connection configuration
export const connectToMySQL = async () => {
    try {
        const connection = await createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });
        console.log('Connected to MySQL');
        return connection;
    } catch (error) {
        console.error('Error connecting to MySQL', error);
        process.exit(1);
    }
};

