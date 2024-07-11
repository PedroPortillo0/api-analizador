import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import { connectToMySQL } from './config/database';
import { UserController } from './adapters/http/userController';
import { VendedorController } from './adapters/http/vendedorController';
import { AppointmentController } from './adapters/http/appointmentController';
import { ImageController } from './adapters/http/ImageController';
import { MysqlUserRepository } from './adapters/persistence/mysqlUserRepository';
import { MysqlVendedorRepository } from './adapters/persistence/mysqlVendedorRepository';
import { MysqlAppointmentRepository } from './adapters/persistence/mysqlAppointmentRepository';
import { S3StorageRepository } from './adapters/persistence/S3StorageRepository';
import { UserService } from './application/userService';
import { VendedorService } from './application/vendedorService';
import { AppointmentService } from './application/appointmentService';
import { ImageService } from './application/ImageService';

const app = express();
app.use(bodyParser.json());
const upload = multer();

async function startServer() {
    // Conectar a MySQL
    const mysqlConnection = await connectToMySQL();
    const mysqlUserRepository = new MysqlUserRepository(mysqlConnection);
    const mysqlUserService = new UserService(mysqlUserRepository);
    const mysqlUserController = new UserController(mysqlUserService);

    const mysqlVendedorRepository = new MysqlVendedorRepository(mysqlConnection);
    const mysqlVendedorService = new VendedorService(mysqlVendedorRepository);
    const mysqlVendedorController = new VendedorController(mysqlVendedorService);

    const mysqlAppointmentRepository = new MysqlAppointmentRepository(mysqlConnection);
    const mysqlAppointmentService = new AppointmentService(mysqlAppointmentRepository);
    const mysqlAppointmentController = new AppointmentController(mysqlAppointmentService);

    // Repositorio de almacenamiento S3
    const s3StorageRepository = new S3StorageRepository();
    const imageService = new ImageService(s3StorageRepository);
    const imageController = new ImageController(imageService);

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
}

startServer().catch(err => console.error(err));
