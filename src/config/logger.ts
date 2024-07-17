import winston from 'winston';
import path from 'path';

function getCurrentDate(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const baseLogPath = path.join(__dirname, '../../', 'logs');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: path.join(baseLogPath, `error-log-${getCurrentDate()}.log`),
            level: 'error'
        }),
        new winston.transports.File({
            filename: path.join(baseLogPath, `info-log-${getCurrentDate()}.log`),
            level: 'info'
        })
    ]
});

export default logger;
