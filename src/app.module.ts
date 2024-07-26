import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import {ConfigModule} from "@nestjs/config";
import { User } from "./users/users.model";
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ColumnsModule } from './columns/columns.module';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from "./projects/projects.module";
import { Project } from "./projects/projects.model";
import { ColumnEntity } from "./columns/column.model";
import { Task } from "./tasks/tasks.model";
import { UsersModule } from "./users/users.module";

@Module({
  controllers: [AppController],
  providers: [AppService], //любой переиспользуемый компонент с логикой - сервис
  imports: [
    ConfigModule.forRoot({//передаём объект содержащий информацию о
      envFilePath: `.${process.env.NODE_ENV}.env` //файл с системными переменными
    }),
      TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User,Project,ColumnEntity,Task],
      synchronize: true      
    }),
    UsersModule,
    AuthModule,
    ProjectsModule,
    ColumnsModule,
    TasksModule,
  ],
})
export class AppModule {

}