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
exports.UserController = void 0;
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            const createdUser = yield this.userService.createUser(user);
            return res.status(201).json(createdUser);
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const user = yield this.userService.getUser(id);
            return res.status(200).json(user);
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const user = req.body;
            const updatedUser = yield this.userService.updateUser(id, user);
            return res.status(200).json(updatedUser);
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield this.userService.deleteUser(id);
            return res.status(204).send();
        });
    }
    // Nuevo método para actualizar la contraseña
    updatePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { password } = req.body;
            const updatedUser = yield this.userService.updatePassword(id, password);
            return res.status(200).json(updatedUser);
        });
    }
}
exports.UserController = UserController;
