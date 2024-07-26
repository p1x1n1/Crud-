import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { ColumnEntity } from "src/columns/column.model";

export class UpdateTaskDto {
    @ApiProperty({ example: 'Task 1', description: 'Название задачи', required: false })
    @IsString({ message: "Должно быть строкой" })
    readonly name?: string;

    @ApiProperty({ example: 'Описание задачи', description: 'Описание задачи', required: false })
    @IsString({ message: "Должно быть строкой" })
    readonly description?: string;

    @ApiProperty({ example: 0, description: 'Порядковый номер задачи', required: false })
    @IsNumber({}, { message: "Должно быть числом" })
    readonly order?: number;

    @ApiProperty({ example: 'ID колонки', description: 'Колонка, к которой присоединена задача', required: false })
    readonly column?: ColumnEntity;
}