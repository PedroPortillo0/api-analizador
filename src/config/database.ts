import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // Esto debe estar aquí para cargar las variables de entorno

export const connectToMySQL = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });
        console.log('Conectado a MySQL');
        return connection;
    } catch (error) {
        console.error('Error connecting to MySQL', error);
        throw error;
    }
};
