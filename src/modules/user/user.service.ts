import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { User } from 'src/models';
import { RegisterUserDTO } from '../auth/dto/register-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findAll(): Promise<User[]> {
        const users = await this.usersRepository.find();
        if (users) {
            return users
        }
    }

    async create(@Body() Body: RegisterUserDTO): Promise<User> {
        const newUser = await this.usersRepository.create(Body)
        await this.usersRepository.save(newUser)
        return newUser
    }

    async findByUsername(username: string): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { username } })
        console.log(user)
        if (user) {
            return user
        }
        else {
        }
    }

    async findOne(id: number): Promise<{ user?: User, isSuccess: boolean }> {
        const user = await this.usersRepository.findOne({ where: { id: id } })
        if (!user) {
            return { isSuccess: false }
        }
        return { user, isSuccess: true }
    }

    async update(@Body() Body: UpdateUserDTO, id: number, currentUser: User): Promise<{ updatedUser?: User, isSuccess?: boolean }> {
        const user = await this.usersRepository.findOne({ where: { id: id } })
        if (!user) {
            return { isSuccess: false }
        }

        const updatedUser = await this.usersRepository.save({
            id: id, ...Body
        })
        return { updatedUser, isSuccess: true }
    }
    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }


}