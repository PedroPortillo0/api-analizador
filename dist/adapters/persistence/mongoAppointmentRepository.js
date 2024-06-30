"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.MongoAppointmentRepository = void 0;
const appointment_1 = require("../../domain/appointment");
const mongoose_1 = __importStar(require("mongoose"));
const appointmentSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true },
    fecha: { type: String, required: true },
    hora: { type: String, required: true },
});
const AppointmentModel = mongoose_1.default.model('Appointment', appointmentSchema);
class MongoAppointmentRepository {
    constructor() {
        this.appointmentModel = AppointmentModel;
    }
    save(appointment) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointmentModel = new this.appointmentModel(appointment);
            const savedAppointment = yield appointmentModel.save();
            return new appointment_1.Appointment(savedAppointment._id.toString(), savedAppointment.nombre, savedAppointment.fecha, savedAppointment.hora);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = yield this.appointmentModel.findById(id);
            if (!appointment)
                return null;
            return new appointment_1.Appointment(appointment._id.toString(), appointment.nombre, appointment.fecha, appointment.hora);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const appointments = yield this.appointmentModel.find();
            return appointments.map(appointment => new appointment_1.Appointment(appointment._id.toString(), appointment.nombre, appointment.fecha, appointment.hora));
        });
    }
    update(appointment) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedAppointment = yield this.appointmentModel.findByIdAndUpdate(appointment.id, appointment, { new: true });
            if (!updatedAppointment)
                return null;
            return new appointment_1.Appointment(updatedAppointment._id.toString(), updatedAppointment.nombre, updatedAppointment.fecha, updatedAppointment.hora);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.appointmentModel.findByIdAndDelete(id);
        });
    }
}
exports.MongoAppointmentRepository = MongoAppointmentRepository;
