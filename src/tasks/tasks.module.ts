import { forwardRef, Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks.model';
import { ColumnsModule } from 'src/columns/columns.module';
import { AuthModule } from 'src/auth/auth.module';
import { TaskGuard } from './guard/owner-task.guard';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [TasksService, TaskGuard],
  controllers: [TasksController],
  imports: [
    TypeOrmModule.forFeature([Task]),
    forwardRef(()=>ColumnsModule),
    forwardRef(()=>AuthModule),
    UsersModule
  ],
  exports: [TasksService],
})
export class TasksModule {}
