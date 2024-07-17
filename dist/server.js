"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_validator_1 = require("express-validator");
const sqlController_1 = require("./adapters/http/sqlController");
const database_1 = require("./config/database");
const uncaughtException_1 = require("./config/uncaughtException");
dotenv_1.default.config(); // Asegúrate de que esto se ejecute primero
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
let mysqlConnection;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            mysqlConnection = yield (0, database_1.connectToMySQL)();
            console.log('Conexión a MySQL establecida');
            // Rutas para ejecutar SQL
            app.post('/sql/execute-sql', sqlController_1.executeSql);
            // Rutas de autenticación con validación
            app.post('/auth/mysql/register', [
                (0, express_validator_1.check)('nombre').notEmpty().withMessage('Nombre es requerido'),
                (0, express_validator_1.check)('apellido').notEmpty().withMessage('Apellido es requerido'),
                (0, express_validator_1.check)('correo').isEmail().withMessage('Correo no es válido'),
                (0, express_validator_1.check)('password').isLength({ min: 5 }).withMessage('Password debe tener al menos 5 caracteres'),
            ], (req, res) => __awaiter(this, void 0, void 0, function* () {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                // Lógica de registro aquí
                const { nombre, apellido, correo, password } = req.body;
                const sql = `INSERT INTO users (nombre, apellido, correo, password) VALUES (?, ?, ?, ?)`;
                try {
                    const [result] = yield mysqlConnection.execute(sql, [nombre, apellido, correo, password]);
                    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
                }
                catch (error) {
                    res.status(500).json({ message: 'Error registering user', error: error.message });
                }
            }));
            app.post('/auth/mysql/login', [
                (0, express_validator_1.check)('correo').isEmail().withMessage('Correo no es válido'),
                (0, express_validator_1.check)('password').notEmpty().withMessage('Password es requerido'),
            ], (req, res) => __awaiter(this, void 0, void 0, function* () {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                // Lógica de login aquí
                const { correo, password } = req.body;
                const sql = `SELECT * FROM users WHERE correo = ? AND password = ?`;
                try {
                    const [rows] = yield mysqlConnection.execute(sql, [correo, password]);
                    if (rows.length > 0) {
                        res.status(200).json({ message: 'Login successful', user: rows[0] });
                    }
                    else {
                        res.status(401).json({ message: 'Invalid credentials' });
                    }
                }
                catch (error) {
                    res.status(500).json({ message: 'Error logging in', error: error.message });
                }
            }));
            app.listen(3000, () => {
                console.log('Server is running on port 3000');
            });
        }
        catch (error) {
            console.error('Error al iniciar el servidor:', error);
        }
    });
}
startServer().catch(err => console.error(err));
process.on('uncaughtException', (err) => {
    (0, uncaughtException_1.handleUncaughtExceptions)(err);
});
