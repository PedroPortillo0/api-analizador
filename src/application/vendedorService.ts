import { VendedorRepository } from '../domain/interfaces';
import { Vendedor } from '../domain/vendedor';

export class VendedorService {
    constructor(private vendedorRepository: VendedorRepository) {}

    async createVendedor(vendedor: Vendedor): Promise<Vendedor> {
        return this.vendedorRepository.save(vendedor);
    }

    async getVendedor(id: string): Promise<Vendedor | null> {
        return this.vendedorRepository.findById(id);
    }

    async updateVendedor(id: string, vendedor: Vendedor): Promise<Vendedor | null> {
        return this.vendedorRepository.update(vendedor);
    }

    async deleteVendedor(id: string): Promise<void> {
        return this.vendedorRepository.deleteById(id);
    }

    async getAllVendedores(): Promise<Vendedor[]> {
        return this.vendedorRepository.findAll();
    }
}
