import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ProjectsModule } from 'src/projects/projects.module';
import { ColumnsModule } from 'src/columns/columns.module';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => ProjectsModule),
    forwardRef(()=>ColumnsModule),
    forwardRef(()=>TasksModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET4444',
      signOptions:{
        expiresIn: '2h',
      }
    })
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
