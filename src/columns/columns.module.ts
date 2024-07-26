import { forwardRef, Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from './column.model';
import { AuthModule } from 'src/auth/auth.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  providers: [ColumnsService],
  controllers: [ColumnsController],
  imports: [
    TypeOrmModule.forFeature([ColumnEntity]),
    forwardRef(()=>AuthModule),
    forwardRef(()=>ProjectsModule),
    forwardRef(()=>TasksModule),
  ],
  exports: [
    ColumnsService
  ],
})
export class ColumnsModule {}
