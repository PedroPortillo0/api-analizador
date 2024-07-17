"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUncaughtExceptions = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}
const logsDir = path_1.default.join(__dirname, '../../', 'uncaughtException-log');
const errorLogPath = path_1.default.join(logsDir, `uncaughtException-log-${getCurrentDate()}.log`);
function handleUncaughtExceptions(err) {
    // Registra el error en el log
    const errorMessage = `Error no controlado: ${err}\n`;
    if (!fs_1.default.existsSync(logsDir)) {
        fs_1.default.mkdirSync(logsDir);
    }
    fs_1.default.appendFileSync(errorLogPath, errorMessage, 'utf8');
    // Continúa ejecutando la aplicación
    // NOTA: No se recomienda seguir ejecutando después de un error no controlado, ya que puede resultar en un estado inestable
}
exports.handleUncaughtExceptions = handleUncaughtExceptions;
