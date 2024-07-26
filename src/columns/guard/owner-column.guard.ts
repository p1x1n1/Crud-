import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

import { User } from 'src/users/users.model';
import { ColumnsService } from '../columns.service';


@Injectable()
export class ColumnGuard implements CanActivate {
  constructor(
    private readonly columnService: ColumnsService,
  ) {}

  async canActivate(context: ExecutionContext){
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    const columnId = request.params.id;

    const column = await this.columnService.getById(columnId);
    if (!column) {
      throw new ForbiddenException('Колонка не найдена');
    }
    console.log(column);
    if (!column.project || !column.project.user) {
      throw new ForbiddenException('Проект или пользователь не найден');
    }

    if (column.project.user.id !== user.id) {
      throw new ForbiddenException('Не достаточно доступа');
    }

    return true;
  }
}
