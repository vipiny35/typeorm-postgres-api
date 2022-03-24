import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, } from "typeorm";

export enum UserRole {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN",
}
export enum UserStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    googleId: string;

    @Column()
    name: string;

    @Column({ nullable: true, unique: true })
    phone?: string;

    @Column({ nullable: true })
    avatar?: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.NORMAL })
    role: UserRole;

    @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
    status: UserStatus;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;
}
