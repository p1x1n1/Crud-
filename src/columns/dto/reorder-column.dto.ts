import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber } from "class-validator";

export class ReorderColumnsDto {
    @ApiProperty({example: [1, 2, 3],description: 'Массив идентификаторов колонок в новом порядке',})
    @IsArray()
    @IsNumber({}, { each: true })
    readonly columnIds: number[];
}
