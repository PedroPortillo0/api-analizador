import { User } from './user';
import { Vendedor } from './vendedor';
import { Appointment } from './appointment';

export interface UserRepository {
    save(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    update(user: User): Promise<User | null>;
    deleteById(id: string): Promise<void>;

    // Nuevo método para actualizar solo la contraseña
    updatePassword(user: User): Promise<User | null>;
}


export interface VendedorRepository {
    save(vendedor: Vendedor): Promise<Vendedor>;
    findById(id: string): Promise<Vendedor | null>;
    findAll(): Promise<Vendedor[]>;
    update(vendedor: Vendedor): Promise<Vendedor | null>;
    deleteById(id: string): Promise<void>;
    findAll(): Promise<Vendedor[]>;
}

export interface AppointmentRepository {
    save(appointment: Appointment): Promise<Appointment>;
    findById(id: string): Promise<Appointment | null>;
    findAll(): Promise<Appointment[]>;
    update(appointment: Appointment): Promise<Appointment | null>;
    deleteById(id: string): Promise<void>;
}

