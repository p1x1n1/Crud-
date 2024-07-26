import { ApiProperty } from "@nestjs/swagger";
import { IsString} from "class-validator";
import { User } from "src/users/users.model";

export class CreateProjectDto{
    
    @ApiProperty({example:'To do list',description:'Название проекта'})
    @IsString({message:"Должно быть строкой"})
    readonly name: string;
    
    @ApiProperty({example:'Планер для задач',description:'Описание проекта'})
    @IsString({message:"Должно быть строкой"})
    readonly description: string;

    @ApiProperty({example:'1',description:'Пользователь-Владелец'})
    readonly user: User;
}