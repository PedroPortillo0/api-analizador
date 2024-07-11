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
const multer_1 = __importDefault(require("multer"));
const database_1 = require("./config/database");
const userController_1 = require("./adapters/http/userController");
const vendedorController_1 = require("./adapters/http/vendedorController");
const appointmentController_1 = require("./adapters/http/appointmentController");
const ImageController_1 = require("./adapters/http/ImageController");
const mysqlUserRepository_1 = require("./adapters/persistence/mysqlUserRepository");
const mysqlVendedorRepository_1 = require("./adapters/persistence/mysqlVendedorRepository");
const mysqlAppointmentRepository_1 = require("./adapters/persistence/mysqlAppointmentRepository");
const S3StorageRepository_1 = require("./adapters/persistence/S3StorageRepository");
const userService_1 = require("./application/userService");
const vendedorService_1 = require("./application/vendedorService");
const appointmentService_1 = require("./application/appointmentService");
const ImageService_1 = require("./application/ImageService");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const upload = (0, multer_1.default)();
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        // Conectar a MySQL
        const mysqlConnection = yield (0, database_1.connectToMySQL)();
        const mysqlUserRepository = new mysqlUserRepository_1.MysqlUserRepository(mysqlConnection);
        const mysqlUserService = new userService_1.UserService(mysqlUserRepository);
        const mysqlUserController = new userController_1.UserController(mysqlUserService);
        const mysqlVendedorRepository = new mysqlVendedorRepository_1.MysqlVendedorRepository(mysqlConnection);
        const mysqlVendedorService = new vendedorService_1.VendedorService(mysqlVendedorRepository);
        const mysqlVendedorController = new vendedorController_1.VendedorController(mysqlVendedorService);
        const mysqlAppointmentRepository = new mysqlAppointmentRepository_1.MysqlAppointmentRepository(mysqlConnection);
        const mysqlAppointmentService = new appointmentService_1.AppointmentService(mysqlAppointmentRepository);
        const mysqlAppointmentController = new appointmentController_1.AppointmentController(mysqlAppointmentService);
        // Repositorio de almacenamiento S3
        const s3StorageRepository = new S3StorageRepository_1.S3StorageRepository();
        const imageService = new ImageService_1.ImageService(s3StorageRepository);
        const imageController = new ImageController_1.ImageController(imageService);
        // Rutas para Usuarios (MySQL)
        app.post('/users/mysql', (req, res) => mysqlUserController.createUser(req, res));
        app.get('/users/mysql/:id', (req, res) => mysqlUserController.getUser(req, res));
        app.put('/users/mysql/:id', (req, res) => mysqlUserController.updateUser(req, res));
        app.delete('/users/mysql/:id', (req, res) => mysqlUserController.deleteUser(req, res));
        // Nueva ruta para actualizar la contraseña
        app.put('/users/mysql/:id/password', (req, res) => mysqlUserController.updatePassword(req, res));
        // Rutas para Vendedores (MySQL)
        app.post('/vendedores/mysql', (req, res) => mysqlVendedorController.createVendedor(req, res));
        app.get('/vendedores/mysql/:id', (req, res) => mysqlVendedorController.getVendedor(req, res));
        app.put('/vendedores/mysql/:id', (req, res) => mysqlVendedorController.updateVendedor(req, res));
        app.delete('/vendedores/mysql/:id', (req, res) => mysqlVendedorController.deleteVendedor(req, res));
        // Rutas para Citas (MySQL)
        app.post('/appointments/mysql', (req, res) => mysqlAppointmentController.createAppointment(req, res));
        app.get('/appointments/mysql/:id', (req, res) => mysqlAppointmentController.getAppointment(req, res));
        app.put('/appointments/mysql/:id', (req, res) => mysqlAppointmentController.updateAppointment(req, res));
        app.delete('/appointments/mysql/:id', (req, res) => mysqlAppointmentController.deleteAppointment(req, res));
        // Rutas para Imágenes
        app.post('/images/upload', upload.single('file'), (req, res) => imageController.uploadImage(req, res));
        app.delete('/images/:key', (req, res) => imageController.deleteImage(req, res));
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    });
}
startServer().catch(err => console.error(err));
