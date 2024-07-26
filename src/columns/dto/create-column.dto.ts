import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString} from "class-validator";
import { Project } from "src/projects/projects.model";

export class CreateColumnDto{
    
    @ApiProperty({example:'To do', description:'Название колонки'})
    @IsString({message:"Должно быть строкой"})
    readonly name: string;
    
    @ApiProperty({example: 0,description:'Порядковый номер колонки'})
    @IsNumber()
    readonly order: number;

    @ApiProperty({example:'Проект ту ду листа',description:'Проект к которому присоединена колонка'})
    readonly project: Project;
}