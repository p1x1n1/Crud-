import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class ReorderTaskDto {
    @ApiProperty({ example: 'ID задачи', description: 'ID задачи' })
    readonly taskId: number;

    @ApiProperty({ example: 'ID колонки', description: 'Колонка, к которой присоединена задача' })
    readonly columnId: number;

    @ApiProperty({ example: 0, description: 'Порядковый номер задачи' })
    @IsNumber({}, { message: "Должно быть числом" })
    readonly order: number;
}