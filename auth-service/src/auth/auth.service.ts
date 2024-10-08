import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
                private jwtService: JwtService,
    ){}
    
    async login(userDto: CreateUserDto){
        const user = this.validateUser(userDto);
        return this.generateToken(await user);
    }
    
    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        if (!user) throw new UnauthorizedException({message:'Пользователя с таким email не существует'})
        const passwordEquals = await bcrypt.compare(userDto.password,user.password);
        if (passwordEquals) return user;
        throw new UnauthorizedException({message:'Неккоректный пароль'})
    }

   
    async registration(userDto: CreateUserDto){
         const candidate = await this.userService.getUserByEmail(userDto.email);
         if (candidate) {
            throw new HttpException('Пользователь с таким email уже существует!',HttpStatus.BAD_REQUEST);
         }
         const hashPassword = await bcrypt.hash(userDto.password,5);
         const user = await this.userService.createUser({...userDto,password: hashPassword});
         return this.generateToken(user);
    }

    private async generateToken(user: User){
        const payload = { email: user.email, id: user.id};//, roles: user.roles
        return {
            token: this.jwtService.sign(payload)
        }
    }

    async validateToken(token: string) {
       try{ 
            const payload = this.jwtService.verify(token);
            return this.userService.getUserById(payload.id);
        }
        catch (error) {
            throw new UnauthorizedException('Невалидный токен');
        }
    }
}
