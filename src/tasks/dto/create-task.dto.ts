import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString} from "class-validator";
import { ColumnEntity } from "src/columns/column.model";


export class CreateTaskDto{
    
    @ApiProperty({example:'Сделать кнопку',description:'Название задача'})
    @IsString({message:"Должно быть строкой"})
    readonly name: string;
    
    @ApiProperty({example:'Кнопка должна быть красной',description:'Описание задачи'})
    @IsString({message:"Должно быть строкой"})
    readonly description: string;

    @ApiProperty({example:'0',description:'Порядковый номер'})
    @IsNumber()
    readonly order: number;

    @ApiProperty({example:'Колонка to do',description:'На какой стадии находится задача'})
    readonly column: ColumnEntity;
}