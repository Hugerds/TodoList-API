import { EntityRepository, Repository } from "typeorm";
import { User } from "../Models/User";

@EntityRepository(User)
class UserRepository extends Repository<User> {
    async createUser(userProps: Partial<User>) : Promise<User> {
        const user = this.create(userProps);
        await this.save(user);
        return user;
    }

    async findByLogin(login: string) : Promise<User> {
        const userProps = await this.findOne(login);
        return userProps;
    }

} export default UserRepository;