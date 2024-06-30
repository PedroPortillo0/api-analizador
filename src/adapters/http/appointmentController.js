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
exports.AppointmentController = void 0;
class AppointmentController {
    constructor(appointmentService) {
        this.appointmentService = appointmentService;
    }
    createAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = req.body;
            const createdAppointment = yield this.appointmentService.createAppointment(appointment);
            return res.status(201).json(createdAppointment);
        });
    }
    getAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const appointment = yield this.appointmentService.getAppointment(id);
            return res.status(200).json(appointment);
        });
    }
    updateAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const appointment = req.body;
            const updatedAppointment = yield this.appointmentService.updateAppointment(id, appointment);
            return res.status(200).json(updatedAppointment);
        });
    }
    deleteAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield this.appointmentService.deleteAppointment(id);
            return res.status(204).send();
        });
    }
}
exports.AppointmentController = AppointmentController;
