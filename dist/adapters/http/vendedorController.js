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
exports.VendedorController = void 0;
class VendedorController {
    constructor(vendedorService) {
        this.vendedorService = vendedorService;
    }
    createVendedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const vendedor = req.body;
            const createdVendedor = yield this.vendedorService.createVendedor(vendedor);
            return res.status(201).json(createdVendedor);
        });
    }
    getVendedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const vendedor = yield this.vendedorService.getVendedor(id);
            return res.status(200).json(vendedor);
        });
    }
    updateVendedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const vendedor = req.body;
            const updatedVendedor = yield this.vendedorService.updateVendedor(id, vendedor);
            return res.status(200).json(updatedVendedor);
        });
    }
    deleteVendedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield this.vendedorService.deleteVendedor(id);
            return res.status(204).send();
        });
    }
}
exports.VendedorController = VendedorController;
