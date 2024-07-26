import { ApiProperty } from "@nestjs/swagger";
import { ColumnEntity } from "src/columns/column.model";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tasks')
export class Task {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Task Name', description: 'Название задачи' })
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @ApiProperty({ example: 'Task description', description: 'Описание задачи' })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ example: 0 , description: 'Порядковый номер' })
  @Column({ type: 'integer', nullable: true })
  order: number;

  @ApiProperty({ example: '2024-07-16T19:57:10Z', description: 'Дата и время создания' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => ColumnEntity, column => column.tasks, { onDelete: 'CASCADE' })
  column: ColumnEntity;
}
