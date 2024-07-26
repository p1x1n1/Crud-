import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Project } from "src/projects/projects.model";
import { Task } from "src/tasks/tasks.model";


@Entity('columns')
export class ColumnEntity {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'To Do', description: 'Название колонки' })
    @Column({ type: 'varchar', nullable: false })
    name: string;

    @ApiProperty({ example: '0', description: 'Порядковый номер' })
    @Column({ type: 'int', nullable: false })
    order: number;

    @ApiProperty({ example: '2024-07-16T19:57:10Z', description: 'Дата и время создания' })
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(() => Project, project => project.columns, { onDelete: 'CASCADE' })
    project: Project;

    @OneToMany(() => Task, task => task.column, { cascade: true })
    tasks: Task[];
}
