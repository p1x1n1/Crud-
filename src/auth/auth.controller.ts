import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
    constructor(private authSevice: AuthService) {}
    
    @Post('/login')
    login(@Body() userDto: CreateUserDto){
        return this.authSevice.login(userDto);
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto){
         return this.authSevice.registration(userDto);
    }
}
