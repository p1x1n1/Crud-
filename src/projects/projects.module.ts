import { forwardRef, Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './projects.model';
import { AuthModule } from 'src/auth/auth.module';
import { ColumnsModule } from 'src/columns/columns.module';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [
            TypeOrmModule.forFeature([Project]),
            forwardRef(()=>AuthModule),
            forwardRef(()=>ColumnsModule)
          ],
            
  exports: [ProjectsService],
})
export class ProjectsModule {}
