import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnEntity } from './column.model';
import { Repository } from 'typeorm';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Injectable()
export class ColumnsService {
    constructor(
        @InjectRepository(ColumnEntity)
        private readonly columnRepository: Repository<ColumnEntity>,
      ) {}
    
      async create(dto: CreateColumnDto){
        const column = this.columnRepository.create(dto);
        return await this.columnRepository.save(column);
      }
    
      async getById(id: number){
        return await this.columnRepository.findOne({ 
          relations: ['project', 'project.user', 'tasks'] , 
          where: {id: id}
        });
      }

      async getByName(projectId: number, name: string): Promise<ColumnEntity> {
        return await this.columnRepository.findOne({ 
          relations: ['project', 'project.user', 'tasks'] , 
          where: { 
            project: { 
              id: projectId 
            }, 
            name },
          });
      }

      async getAllByProject(projectId: number): Promise<ColumnEntity[]> {
       return await this.columnRepository.find({ 
        relations: ['project', 'project.user', 'tasks'] , 
        where: { 
          project: { 
            id: projectId 
        } }, 
        order: { order: 'ASC' } 
      });
      }
    
     
    
      async update(id: number, dto: UpdateColumnDto){
        await this.columnRepository.update(id, dto);
        return await this.columnRepository.findOne( {
          relations: ['project', 'project.user', 'tasks'] ,
          where: {id: id} ,
        });
      }
    
      async delete(id: number){
        await this.columnRepository.delete(id);
      }


      async reorderColumns(projectId: number, columnIds: number[]){
        const columns = await this.columnRepository.find({
            where: { project: { id: projectId } },
            order: { order: 'ASC' }
        });
        if (columnIds.length !== columns.length) {
          throw new Error('Неверное количество идентификаторов колонок');
        }
        columns.forEach((column, index) => {
            column.order = columnIds.indexOf(column.id);
        });
        await this.columnRepository.save(columns);
        return columns;
      }
}
