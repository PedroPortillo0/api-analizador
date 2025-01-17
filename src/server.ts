import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { check, validationResult } from 'express-validator';
import { executeSql } from './adapters/http/sqlController';
import { connectToMySQL } from './config/database';
import { handleUncaughtExceptions } from './config/uncaughtException';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

let mysqlConnection: any;

async function startServer() {
    try {
        mysqlConnection = await connectToMySQL();
        console.log('Conexión a MySQL establecida');

        // Rutas para ejecutar SQL
        app.post('/sql/execute-sql', executeSql);

        // Ruta para crear base de datos
        app.post('/create-database', [
            check('databaseName')
                .notEmpty().withMessage('Database name is required')
                .matches(/^[^\d]*$/).withMessage('Database name must not contain numbers')
        ], async (req: Request, res: Response) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { databaseName } = req.body;
            const sql = `CREATE DATABASE ${databaseName}`;

            try {
                await mysqlConnection.execute(sql);
                res.status(201).json({ message: 'Database created successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Error creating database', error: (error as Error).message });
            }
        });

        // Rutas de autenticación con validación
        app.post('/auth/mysql/register', [
            check('nombre')
                .notEmpty().withMessage('Nombre es requerido')
                .matches(/^[^\d]+$/).withMessage('El nombre no debe contener números'),
            check('apellido')
                .notEmpty().withMessage('Apellido es requerido')
                .matches(/^[^\d]+$/).withMessage('El apellido no debe contener números'),
            check('correo').isEmail().withMessage('Correo no es válido'),
            check('password').isLength({ min: 5 }).withMessage('Password debe tener al menos 5 caracteres'),
        ], async (req: Request, res: Response) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { nombre, apellido, correo, password } = req.body;
            const sql = `INSERT INTO users (nombre, apellido, correo, password) VALUES (?, ?, ?, ?)`;
            try {
                const [result] = await mysqlConnection.execute(sql, [nombre, apellido, correo, password]);
                res.status(201).json({ message: 'User registered successfully', userId: (result as any).insertId });
            } catch (error) {
                res.status(500).json({ message: 'Error registering user', error: (error as Error).message });
            }
        });

        app.post('/auth/mysql/login', [
            check('correo').isEmail().withMessage('Correo no es válido'),
            check('password').notEmpty().withMessage('Password es requerido'),
        ], async (req: Request, res: Response) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { correo, password } = req.body;
            const sql = `SELECT * FROM users WHERE correo = ? AND password = ?`;
            try {
                const [rows] = await mysqlConnection.execute(sql, [correo, password]);
                if ((rows as any).length > 0) {
                    res.status(200).json({ message: 'Login successful', user: (rows as any)[0] });
                } else {
                    res.status(401).json({ message: 'Invalid credentials' });
                }
            } catch (error) {
                res.status(500).json({ message: 'Error logging in', error: (error as Error).message });
            }
        });

        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
}

startServer().catch(err => console.error(err));

process.on('uncaughtException', (err: Error) => {
    handleUncaughtExceptions(err);
});
