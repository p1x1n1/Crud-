import { Injectable } from '@nestjs/common';
import { Project } from './projects.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { User } from 'src/users/users.model';


@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
    ){}

    async create(dto: CreateProjectDto) {
        const project = this.projectRepository.create(dto);
        return await this.projectRepository.save(project);
      }
    
      async getById(id: number) {
        return await this.projectRepository.findOne( {
          relations: ['user', 'columns', 'columns.tasks'],
           where: {id: id} ,
           select: {
            user:{
              id:true,
              email:true
            }
          }
          });
      }

      async getByName(name: string,user: User): Promise<Project>{
        return await this.projectRepository.findOne( { 
          relations: ['user', 'columns', 'columns.tasks'],
          where: {
            name: name,
            user: {id: user.id}
          },
          select: {
            user:{
              id:true,
              email:true
            }
          }   
        });
      }
    
      async getAll(user: User) {
        return await this.projectRepository.find({ 
          relations: ['user', 'columns', 'columns.tasks'], 
          where: {
            user: {id: user.id}
          },
          select: {
            user:{
              id:true,
              email:true
            }
          }  
        });
      }

      async update(id: number, dto: CreateProjectDto){
        await this.projectRepository.update(id, dto);
        return await this.projectRepository.findOne( { 
          relations: ['user', 'columns', 'columns.tasks'],
          where: {
            id: id
          },
          select: {
            user:{
              id:true,
              email:true
            }
          }  
         });
      }


      async delete(id: number) {
        await this.projectRepository.delete({id});
      }


    
}
