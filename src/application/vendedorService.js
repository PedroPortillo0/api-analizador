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
exports.VendedorService = void 0;
class VendedorService {
    constructor(vendedorRepository) {
        this.vendedorRepository = vendedorRepository;
    }
    createVendedor(vendedor) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.vendedorRepository.save(vendedor);
        });
    }
    getVendedor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.vendedorRepository.findById(id);
        });
    }
    updateVendedor(id, vendedor) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.vendedorRepository.update(vendedor);
        });
    }
    deleteVendedor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.vendedorRepository.deleteById(id);
        });
    }
}
exports.VendedorService = VendedorService;
