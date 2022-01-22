import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('Tasks')
export class Task {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    userId: string;

    @Column()
    title: string;

    @Column()
    completed: boolean;

    @Column()
    excluido: boolean;
}