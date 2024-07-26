import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto{
    
    @ApiProperty({example:'1@mail.ru',description:'Уникальная почта пользователя'})
    @IsString({message:"Должно быть строкой"})
    @IsEmail({},{message:'Неверный формат email'})
    readonly email: string;
    
    @ApiProperty({example:'1111pass',description:'Пароль пользователя'})
    @IsString({message:"Должно быть строкой"})
    @Length(4,16,{message: 'Не меньше 4 и не больше 16'})
    readonly password: string;
}