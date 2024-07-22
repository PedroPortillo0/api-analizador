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
exports.executeSql = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = promise_1.default.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
const executeSql = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = req.body.sql;
    if (!sql) {
        res.status(400).json({ message: "No SQL query provided." });
        return;
    }
    // Validar que la consulta termine con un punto y coma
    if (!sql.trim().endsWith(';')) {
        res.status(400).json({ message: "SQL query must end with a semicolon." });
        return;
    }
    // Validar que el nombre de la base de datos no contenga números
    const match = sql.match(/CREATE\s+DATABASE\s+(\w+)/i);
    if (match) {
        const databaseName = match[1];
        if (/\d/.test(databaseName)) {
            res.status(400).json({ message: "Database no debe de contener numeros." });
            return;
        }
    }
    try {
        const [results] = yield pool.query(sql);
        res.json({ results });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: "Error executing SQL query.", error: error.message });
        }
        else {
            res.status(500).json({ message: "Error executing SQL query.", error: String(error) });
        }
    }
});
exports.executeSql = executeSql;
