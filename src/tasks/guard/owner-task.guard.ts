import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { TasksService } from '../tasks.service';
import { User } from 'src/users/users.model';


@Injectable()
export class TaskGuard implements CanActivate {
  constructor(
    private readonly taskService: TasksService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    const taskId = request.params.id;

    const task = await this.taskService.getById(taskId);
    if (!task) {
      throw new ForbiddenException('Задачи не существует');
    }

    if (!task.column || !task.column.project || !task.column.project.user) {
      throw new ForbiddenException('Проект или пользователь не найден');
    }

    if (task.column.project.user.id !== user.id) {
      throw new ForbiddenException('Не достаточно прав доступа');
    }

    return true;
  }
}
