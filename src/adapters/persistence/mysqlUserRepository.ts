import { UserRepository } from '../../domain/interfaces';
import { User } from '../../domain/user';
import { Connection } from 'mysql2/promise';

export class MysqlUserRepository implements UserRepository {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = connection;
    }

    async save(user: User): Promise<User> {
        const [result] = await this.connection.execute(
            'INSERT INTO users (nombre, apellido, correo, password) VALUES (?, ?, ?, ?)',
            [user.nombre, user.apellido, user.correo, user.password]
        );
        const insertId = (result as any).insertId;
        return new User(insertId.toString(), user.nombre, user.apellido, user.correo, user.password);
    }

    async findById(id: string): Promise<User | null> {
        const [rows] = await this.connection.execute('SELECT * FROM users WHERE id = ?', [id]);
        const users = rows as any[];
        if (users.length === 0) return null;
        const user = users[0];
        return new User(user.id.toString(), user.nombre, user.apellido, user.correo, user.password);
    }

    async findAll(): Promise<User[]> {
        const [rows] = await this.connection.execute('SELECT * FROM users');
        const users = rows as any[];
        return users.map(user => new User(user.id.toString(), user.nombre, user.apellido, user.correo, user.password));
    }

    async update(user: User): Promise<User | null> {
        await this.connection.execute(
            'UPDATE users SET nombre = ?, apellido = ?, correo = ?, password = ? WHERE id = ?',
            [user.nombre, user.apellido, user.correo, user.password, user.id]
        );
        return user;
    }

    async deleteById(id: string): Promise<void> {
        await this.connection.execute('DELETE FROM users WHERE id = ?', [id]);
    }

    // Nuevo método para actualizar solo la contraseña
    async updatePassword(user: User): Promise<User | null> {
        await this.connection.execute(
            'UPDATE users SET password = ? WHERE id = ?',
            [user.password, user.id]
        );
        return user;
    }
}
