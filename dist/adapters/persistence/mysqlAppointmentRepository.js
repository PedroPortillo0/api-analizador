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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlAppointmentRepository = void 0;
const appointment_1 = require("../../domain/appointment");
class MysqlAppointmentRepository {
    constructor(connection) {
        this.connection = connection;
    }
    save(appointment) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield this.connection.execute('INSERT INTO appointments (nombre, fecha, hora) VALUES (?, ?, ?)', [appointment.nombre, appointment.fecha, appointment.hora]);
            const insertId = result.insertId;
            return new appointment_1.Appointment(insertId.toString(), appointment.nombre, appointment.fecha, appointment.hora);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield this.connection.execute('SELECT * FROM appointments WHERE id = ?', [id]);
            const appointments = rows;
            if (appointments.length === 0)
                return null;
            const appointment = appointments[0];
            return new appointment_1.Appointment(appointment.id.toString(), appointment.nombre, appointment.fecha, appointment.hora);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield this.connection.execute('SELECT * FROM appointments');
            const appointments = rows;
            return appointments.map(appointment => new appointment_1.Appointment(appointment.id.toString(), appointment.nombre, appointment.fecha, appointment.hora));
        });
    }
    update(appointment) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.execute('UPDATE appointments SET nombre = ?, fecha = ?, hora = ? WHERE id = ?', [appointment.nombre, appointment.fecha, appointment.hora, appointment.id]);
            return appointment;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.execute('DELETE FROM appointments WHERE id = ?', [id]);
        });
    }
}
exports.MysqlAppointmentRepository = MysqlAppointmentRepository;
