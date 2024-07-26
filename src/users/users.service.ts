import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
// import { RolesService } from 'src/roles/roles.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}
    async createUser(dto:CreateUserDto) {
        const user = this.userRepository.create(dto);
        return await this.userRepository.save(user);
      }
    

    async getAllUsers() {
        const users = await this.userRepository.find();
        return users;
    }

    async getUserByEmail(email: string){
        const user = await this.userRepository.findOne({where:{email}}) ;
        return user;
    }

    // async addRole(dto: AddRoleDto){
    //     const user = await this.userRepository.findOneBy(dto.userId);
    //     const role = await this.roleService.getRoleByValue(dto.value);
    //     if (role && user) {
    //         return await user.$add('role',role.id);//с помощью адд к инициализированной роли добавляем к массиву ещё одно значение
    //     }
    //     throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);

    // }

 
    async findUserById(id: number) {
        return await this.userRepository.findOneBy({id});
    }
    
    
    async updateUser(id: number, dto:CreateUserDto) {
        const existingUser = await this.userRepository.findOneBy({ id });
            if (!existingUser) {
                throw new Error('User not found');
            }
            await this.userRepository.update(id, dto);
            return await this.userRepository.findOneBy({ id });
    }
    
    async deleteUser(id: number): Promise<void> {
        const existingUser = await this.userRepository.findOneBy({ id });
        if (!existingUser) {
            throw new Error('User not found');
        }
        await this.userRepository.delete(id);
    }


}
