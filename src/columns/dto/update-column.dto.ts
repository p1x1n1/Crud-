import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsOptional } from "class-validator";

export class UpdateColumnDto {
    @ApiProperty({ example: 'To do', description: 'Название колонки', required: false })
    @IsString({ message: "Должно быть строкой" })
    @IsOptional()
    readonly name?: string;

    @ApiProperty({ example: '0', description: 'Порядковый номер', required: false })
    @IsNumber()
    @IsOptional()
    readonly order?: number;
}
