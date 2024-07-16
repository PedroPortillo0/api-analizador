import { Request, Response } from 'express';
import { VendedorService } from '../../application/vendedorService';
import { Vendedor } from '../../domain/vendedor';

export class VendedorController {
    constructor(private vendedorService: VendedorService) {}

    public async createVendedor(req: Request, res: Response): Promise<Response> {
        const vendedor: Vendedor = req.body;
        const createdVendedor = await this.vendedorService.createVendedor(vendedor);
        return res.status(201).json(createdVendedor);
    }

    public async getVendedor(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const vendedor = await this.vendedorService.getVendedor(id);
        return res.status(200).json(vendedor);
    }

    public async updateVendedor(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const vendedor: Vendedor = req.body;
        const updatedVendedor = await this.vendedorService.updateVendedor(id, vendedor);
        return res.status(200).json(updatedVendedor);
    }

    public async deleteVendedor(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        await this.vendedorService.deleteVendedor(id);
        return res.status(204).send();
    }

    public async getAllVendedores(req: Request, res: Response): Promise<Response> {
        const vendedores = await this.vendedorService.getAllVendedores();
        return res.status(200).json(vendedores);
    }
}
