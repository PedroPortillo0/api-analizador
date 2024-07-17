import fs from 'fs';
import path from 'path';

function getCurrentDate(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const logsDir = path.join(__dirname, '../../', 'uncaughtException-log');
const errorLogPath = path.join(logsDir, `uncaughtException-log-${getCurrentDate()}.log`);

export function handleUncaughtExceptions(err: Error) {
    // Registra el error en el log
    const errorMessage = `Error no controlado: ${err}\n`;
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir);
    }
    fs.appendFileSync(errorLogPath, errorMessage, 'utf8');
    // Continúa ejecutando la aplicación
    // NOTA: No se recomienda seguir ejecutando después de un error no controlado, ya que puede resultar en un estado inestable
}
