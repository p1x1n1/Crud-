import { ApiProperty } from "@nestjs/swagger";
import { Project } from "src/projects/projects.model";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User{
    @ApiProperty({example:'1',description:'Уникальный идентификатор'})
    @PrimaryGeneratedColumn()
    id: number;
    
    @ApiProperty({example:'1@mail.ru',description:'Уникальная почта пользователя'})
    @Column({ type: 'varchar', unique: true, nullable: false })
    email: string;
    
    @ApiProperty({example:'1111pass',description:'Пароль пользователя'})
    @Column({ type: 'varchar', nullable: false})
    password: string;
    
    @OneToMany(() => Project, projects => projects.user, { cascade: true })
    projects: Project[];
}