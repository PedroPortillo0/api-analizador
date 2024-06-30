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
exports.ImageController = void 0;
class ImageController {
    constructor(imageService) {
        this.imageService = imageService;
    }
    uploadImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = req.file;
            if (!file) {
                return res.status(400).send({ message: 'No file provided' });
            }
            const url = yield this.imageService.uploadImage(file);
            return res.status(201).json({ url });
        });
    }
    deleteImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { key } = req.params;
            yield this.imageService.deleteImage(key);
            return res.status(204).send();
        });
    }
}
exports.ImageController = ImageController;
