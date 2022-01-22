import {Column, Entity, BeforeInsert, BeforeUpdate, ObjectIdColumn, PrimaryGeneratedColumn} from 'typeorm';
import bcrypt from 'bcryptjs';

@Entity('User')
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    login: string;

    @Column()
    password: string;
    
    @BeforeInsert()
    @BeforeUpdate()
    hashPasswords() {
        this.password = bcrypt.hashSync(this.password, 8);
    }
}