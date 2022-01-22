import { getCustomRepository } from "typeorm";
import bcrypt from 'bcryptjs';
import UserRepository from "../Repositories/UserRepository";
import { User } from "../Models/User";
import { UnauthorizedException } from "../Errors/unauthorizedException";

export class UserService {
    userRepository = getCustomRepository(UserRepository)
    async loginUser(userProps: Partial<User>) : Promise<User>
	{
		const findUser = await this.userRepository.findByLogin(userProps.login);
        if(!findUser) {
			throw new UnauthorizedException("Usuário ou senha inválidos");
        }

        const isValidPassword = await bcrypt.compare(userProps.password, findUser.password);
        if(!isValidPassword) {
			throw new UnauthorizedException("Usuário ou senha inválidos");
        }
		return findUser;
	}
}