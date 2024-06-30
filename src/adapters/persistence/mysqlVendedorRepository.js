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
exports.MysqlVendedorRepository = void 0;
const vendedor_1 = require("../../domain/vendedor");
class MysqlVendedorRepository {
    constructor(connection) {
        this.connection = connection;
    }
    save(vendedor) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield this.connection.execute('INSERT INTO vendedores (nombre, apellido, correo, telefono, password) VALUES (?, ?, ?, ?, ?)', [vendedor.nombre, vendedor.apellido, vendedor.correo, vendedor.telefono, vendedor.password]);
            const insertId = result.insertId;
            return new vendedor_1.Vendedor(insertId.toString(), vendedor.nombre, vendedor.apellido, vendedor.correo, vendedor.telefono, vendedor.password);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield this.connection.execute('SELECT * FROM vendedores WHERE id = ?', [id]);
            const vendedores = rows;
            if (vendedores.length === 0)
                return null;
            const vendedor = vendedores[0];
            return new vendedor_1.Vendedor(vendedor.id.toString(), vendedor.nombre, vendedor.apellido, vendedor.correo, vendedor.telefono, vendedor.password);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield this.connection.execute('SELECT * FROM vendedores');
            const vendedores = rows;
            return vendedores.map(vendedor => new vendedor_1.Vendedor(vendedor.id.toString(), vendedor.nombre, vendedor.apellido, vendedor.correo, vendedor.telefono, vendedor.password));
        });
    }
    update(vendedor) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.execute('UPDATE vendedores SET nombre = ?, apellido = ?, correo = ?, telefono = ?, password = ? WHERE id = ?', [vendedor.nombre, vendedor.apellido, vendedor.correo, vendedor.telefono, vendedor.password, vendedor.id]);
            return vendedor;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.execute('DELETE FROM vendedores WHERE id = ?', [id]);
        });
    }
}
exports.MysqlVendedorRepository = MysqlVendedorRepository;
