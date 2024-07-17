"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}
const baseLogPath = path_1.default.join(__dirname, '../../', 'logs');
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.json(),
    transports: [
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.File({
            filename: path_1.default.join(baseLogPath, `error-log-${getCurrentDate()}.log`),
            level: 'error'
        }),
        new winston_1.default.transports.File({
            filename: path_1.default.join(baseLogPath, `info-log-${getCurrentDate()}.log`),
            level: 'info'
        })
    ]
});
exports.default = logger;
