import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { ProjectsService } from '../projects.service';
import { User } from 'src/users/users.model';

@Injectable()
export class ProjectGuard implements CanActivate {
  constructor(
    private readonly projectService: ProjectsService,
  ) {}

  async canActivate(context: ExecutionContext){
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    const projectId = request.params.id;

    console.log(request.user)

    if (projectId) {
    const project = await this.projectService.getById(projectId);
    if (!project) {
      throw new ForbiddenException('Проект не найден');
    }

    if (project.user.id !== user.id) {
      throw new ForbiddenException('Не достаточно прав');
    }}

    return true;
  }
}
