import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TaskGuard } from './guard/owner-task.guard';
import { ColumnGuard } from 'src/columns/guard/owner-column.guard';
import { ReorderTaskDto } from './dto/reorder-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from 'src/users/users.model';
import { GetUser } from 'src/users/decorators/get-user.decorator';

@ApiTags('Задачи')
@Controller('tasks')
export class TasksController {
    constructor(
      private tasksService: TasksService){}

    @ApiOperation({ summary: 'Создание задачи' })
    @ApiResponse({ status: 200, type: Task })
    @UseGuards(JwtAuthGuard, ColumnGuard)
    @Post('/columns/:id')
    async create(@Param('id') columnId: number,@Body() dto: CreateTaskDto) {
        return this.tasksService.create(columnId, dto);
    }

    @ApiOperation({ summary: 'Поиск задачи по id' })
    @ApiResponse({ status: 200, type: Task })
    @UseGuards(JwtAuthGuard, TaskGuard)
    @Get(':id')
    async getById(@Param('id') id: number) {
        return this.tasksService.getById(id);
    }

    @ApiOperation({ summary: 'Поиск задачи по названию' })
    @ApiResponse({ status: 200, type: Task })
    @UseGuards(JwtAuthGuard, ColumnGuard)
    @Get('/columns/:id/name/:name')
    async getByName(@Param('id') columnId: number,@Param('name') name: string) {
        return this.tasksService.getByName(columnId, name);
    }

    @ApiOperation({ summary: 'Получение всех задач колонки' })
    @ApiResponse({ status: 200, type: [Task] })
    @UseGuards(JwtAuthGuard, ColumnGuard)
    @Get('columns/:id')
    async getAllByColumn(@Param('id') columnId: number) {
        return this.tasksService.getAllByColumn(columnId);
    }
  
    @ApiOperation({ summary: 'Перемещение задач' })
    @ApiResponse({ status: 200, type: [Task] })
    @UseGuards(JwtAuthGuard)
    @Put('reorder')
    async reorder(@Body() reorderDto: ReorderTaskDto[],@GetUser() user: User) {
        return this.tasksService.reorderTasks(reorderDto, user);
    }
    
    @ApiOperation({ summary: 'Обновление задачи по id' })
    @ApiResponse({ status: 200, type: Task })
    @UseGuards(JwtAuthGuard, TaskGuard)
    @Put(':id')
    async update(@Param('id') id: number, @Body() dto: UpdateTaskDto) {
        return this.tasksService.update(id, dto);
    }

    @ApiOperation({ summary: 'Удаление задачи по id' })
    @ApiResponse({ status: 200, type: Task })
    @UseGuards(JwtAuthGuard, TaskGuard)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.tasksService.delete(id);
    }

    

}
