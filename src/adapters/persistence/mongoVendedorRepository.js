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
exports.MongoVendedorRepository = void 0;
const vendedor_1 = require("../../domain/vendedor");
const mongoose_1 = __importStar(require("mongoose"));
const vendedorSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    telefono: { type: String, required: true },
    password: { type: String, required: true },
});
const VendedorModel = mongoose_1.default.model('Vendedor', vendedorSchema);
class MongoVendedorRepository {
    constructor() {
        this.vendedorModel = VendedorModel;
    }
    save(vendedor) {
        return __awaiter(this, void 0, void 0, function* () {
            const vendedorModel = new this.vendedorModel(vendedor);
            const savedVendedor = yield vendedorModel.save();
            return new vendedor_1.Vendedor(savedVendedor._id.toString(), savedVendedor.nombre, savedVendedor.apellido, savedVendedor.correo, savedVendedor.telefono, savedVendedor.password);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const vendedor = yield this.vendedorModel.findById(id);
            if (!vendedor)
                return null;
            return new vendedor_1.Vendedor(vendedor._id.toString(), vendedor.nombre, vendedor.apellido, vendedor.correo, vendedor.telefono, vendedor.password);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const vendedores = yield this.vendedorModel.find();
            return vendedores.map(vendedor => new vendedor_1.Vendedor(vendedor._id.toString(), vendedor.nombre, vendedor.apellido, vendedor.correo, vendedor.telefono, vendedor.password));
        });
    }
    update(vendedor) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedVendedor = yield this.vendedorModel.findByIdAndUpdate(vendedor.id, vendedor, { new: true });
            if (!updatedVendedor)
                return null;
            return new vendedor_1.Vendedor(updatedVendedor._id.toString(), updatedVendedor.nombre, updatedVendedor.apellido, updatedVendedor.correo, updatedVendedor.telefono, updatedVendedor.password);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.vendedorModel.findByIdAndDelete(id);
        });
    }
}
exports.MongoVendedorRepository = MongoVendedorRepository;
