import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.model';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { ReorderTaskDto } from './dto/reorder-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ColumnsService } from 'src/columns/columns.service';
import { User } from 'src/users/users.model';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        private readonly columnService: ColumnsService,
    ){}

    async create(columnId: number, dto: CreateTaskDto) {
        const column = await this.columnService.getById(columnId);
        const task = this.taskRepository.create({...dto,column});
        return await this.taskRepository.save(task);
      }
    
      async getById(id: number) {
        return await this.taskRepository.findOne( { 
          relations: ['column','column.project', 'column.project.user'], 
          where: {id: id},
        });
      }

      async getByName(columnId: number, name: string) {
        return await this.taskRepository.findOne( { 
          relations: ['column','column.project', 'column.project.user'], 
          where: {
            name: name,
            column: {
              id: columnId
            }
          } 
        });
      }
    
      async getAllByColumn( columnId: number) {
        return await this.taskRepository.find({ 
          relations: ['column'],
          where: { 
            column: 
            { id: columnId } 
          }, 
          order: { order: 'ASC' }
        });
      }
    
      async update(id: number, dto: UpdateTaskDto){
        await this.taskRepository.update(id, dto);
        return await this.taskRepository.findOne( { 
          relations: ['column'], 
          where: {id: id} 
        });
      }
    
      async delete(id: number) {
        await this.taskRepository.delete(id);
      }

      async reorderTasks(reorderDto: ReorderTaskDto[], user: User) {
        for (const { taskId, columnId, order } of reorderDto) {
          const task = await this.getById(taskId);
          const column = await this.columnService.getById(columnId);
          if (task.column.project.user.id !== user.id || column.project.user.id !== user.id) {
            throw new ForbiddenException('Вы можете перемещать только свои задачи');
          }
          
          task.column = column;
          task.order = order;
          await this.taskRepository.save(task);
        }
        return await this.taskRepository.find({
          relations: ['column','column.project', 'column.project.user'], 
          where: {
            column:{
              project:{
                user: {
                  id: user.id
                }
              }
            }
          } 
        });
    }

}
