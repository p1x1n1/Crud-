import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService ){}
    @ApiOperation({summary:'Создание пользователя'})
    @ApiResponse({status:200, type:User })
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto:CreateUserDto){
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({summary:'Получение пользователей'})
    @ApiResponse({status:200, type: [User] })
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(){
            return this.usersService.getAllUsers();
    }

    @ApiOperation({summary:'Получение пользователя по почте'})
    @ApiResponse({status:200, type: User })
    @UseGuards(JwtAuthGuard)
    @Get()
    getByEmail(email: string){
            return this.usersService.getUserByEmail(email);
    }


    @ApiOperation({summary:'Обновление полей пользователя'})
    @ApiResponse({status:200, type:User })
    @UsePipes(ValidationPipe)
    @Put('/:id')
    update(@Param('id') id : number, @Body() userDto:CreateUserDto){
        return this.usersService.updateUser(id, userDto);
    }

    @ApiOperation({summary:'Удаления пользователя'})
    @ApiResponse({status:200, type:User })
    @UsePipes(ValidationPipe)
    @Delete('/:id')
    delete(@Param('id') id : number){
        return this.usersService.deleteUser(id);
    }
   
}
