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
exports.MysqlUserRepository = void 0;
const user_1 = require("../../domain/user");
class MysqlUserRepository {
    constructor(connection) {
        this.connection = connection;
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield this.connection.execute('INSERT INTO users (nombre, apellido, correo, password) VALUES (?, ?, ?, ?)', [user.nombre, user.apellido, user.correo, user.password]);
            const insertId = result.insertId;
            return new user_1.User(insertId.toString(), user.nombre, user.apellido, user.correo, user.password);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield this.connection.execute('SELECT * FROM users WHERE id = ?', [id]);
            const users = rows;
            if (users.length === 0)
                return null;
            const user = users[0];
            return new user_1.User(user.id.toString(), user.nombre, user.apellido, user.correo, user.password);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield this.connection.execute('SELECT * FROM users');
            const users = rows;
            return users.map(user => new user_1.User(user.id.toString(), user.nombre, user.apellido, user.correo, user.password));
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.execute('UPDATE users SET nombre = ?, apellido = ?, correo = ?, password = ? WHERE id = ?', [user.nombre, user.apellido, user.correo, user.password, user.id]);
            return user;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.execute('DELETE FROM users WHERE id = ?', [id]);
        });
    }
}
exports.MysqlUserRepository = MysqlUserRepository;
