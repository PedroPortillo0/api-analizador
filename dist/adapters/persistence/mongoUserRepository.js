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
exports.MongoUserRepository = void 0;
const user_1 = require("../../domain/user");
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    correo: { type: String, required: true },
    password: { type: String, required: true },
});
const UserModel = mongoose_1.default.model('User', userSchema);
class MongoUserRepository {
    constructor() {
        this.userModel = UserModel;
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userModel = new this.userModel(user);
            const savedUser = yield userModel.save();
            return new user_1.User(savedUser._id.toString(), savedUser.nombre, savedUser.apellido, savedUser.correo, savedUser.password);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findById(id);
            if (!user)
                return null;
            return new user_1.User(user._id.toString(), user.nombre, user.apellido, user.correo, user.password);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userModel.find();
            return users.map(user => new user_1.User(user._id.toString(), user.nombre, user.apellido, user.correo, user.password));
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield this.userModel.findByIdAndUpdate(user.id, user, { new: true });
            if (!updatedUser)
                return null;
            return new user_1.User(updatedUser._id.toString(), updatedUser.nombre, updatedUser.apellido, updatedUser.correo, updatedUser.password);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userModel.findByIdAndDelete(id);
        });
    }
}
exports.MongoUserRepository = MongoUserRepository;
