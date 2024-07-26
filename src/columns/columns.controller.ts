import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ColumnEntity } from './column.model';
import { CreateColumnDto } from './dto/create-column.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProjectGuard } from 'src/projects/guard/owner-project.guard';
import { ColumnGuard } from './guard/owner-column.guard';
import { ProjectsService } from 'src/projects/projects.service';
import { ReorderColumnsDto } from './dto/reorder-column.dto';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { UpdateColumnDto } from './dto/update-column.dto';

@ApiTags('Колонки')
@Controller('columns')
export class ColumnsController {
    constructor(
        private columnService: ColumnsService,
        private readonly projectService: ProjectsService
    ){}

    @ApiOperation({ summary: 'Создание колонки' })
    @ApiResponse({ status: 200, type: ColumnEntity })
    @UseGuards(JwtAuthGuard, ProjectGuard)
    @Post('projects/:projectId')
    async create(@Param('projectId') projectId: number, @Body() dto: CreateColumnDto) {
        const project = await this.projectService.getById(projectId);
        return this.columnService.create({ ...dto, project });
    }

    @ApiOperation({ summary: 'Поиск колонки по id' })
    @ApiResponse({ status: 200, type: ColumnEntity })
    @UseGuards(JwtAuthGuard, ColumnGuard)
    @Get(':id')
    async getById(@Param('id') id: number) {
        return this.columnService.getById(id);
    }

    @ApiOperation({ summary: 'Поиск колонки по названию' })
    @ApiResponse({ status: 200, type: ColumnEntity })
    @UseGuards(JwtAuthGuard, ProjectGuard)
    @Get('projects/:projectId/name/:name')
    async getByName(@Param('projectId') projectId: number, @Param('name') name: string) {
        return this.columnService.getByName(projectId, name);
    }

    @ApiOperation({ summary: 'Получение информации о всех колонках проекта' })
    @ApiResponse({ status: 200, type: [ColumnEntity] })
    @UseGuards(JwtAuthGuard, ProjectGuard)
    @Get('projects/:projectId')
    async getAllByProject(@Param('projectId') projectId: number) {
        return this.columnService.getAllByProject(projectId);
    }


    @ApiOperation({ summary: 'Обновление данных о колонке по id' })
    @ApiResponse({ status: 200, type: ColumnEntity })
    @UseGuards(JwtAuthGuard, ColumnGuard)
    @Put(':id')
    async update(@Param('id') id: number, @Body() dto: UpdateColumnDto) {
        return this.columnService.update(id, dto);
    }

    @ApiOperation({ summary: 'Удаление колонки по id' })
    @ApiResponse({ status: 200, type: ColumnEntity })
    @UseGuards(JwtAuthGuard, ColumnGuard)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.columnService.delete(id);
    }

    @ApiOperation({ summary: 'Изменение порядка колонок' })
    @ApiResponse({ status: 200, type: [ColumnEntity] })
    @UseGuards(JwtAuthGuard, ProjectGuard)
    @Put('projects/:projectId/reorder')
    async reorderColumns(@Param('projectId') projectId: number, @Body() orderDto: ReorderColumnsDto) {
        return this.columnService.reorderColumns(projectId, orderDto.columnIds);
    }
}
