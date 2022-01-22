import { Router } from "express";
import asyncHandler from "express-async-handler";
import { getCustomRepository } from "typeorm";
import authMiddleware from "../middlewares/authMiddlewares";
import { User } from "../Models/User";
import UserRepository from "../Repositories/UserRepository";
import jwt from 'jsonwebtoken';
import { UserService } from "../Services/UserService";

export const userRouter = Router();
const path = "/user";

userRouter.post(`${path}/create`, asyncHandler(async (request, response) => {
    const user : Partial<User> = {
        login: request.body.login as string,
        password: request.body.password as string
    };
    const userRepository = getCustomRepository(UserRepository);
    const saveUser = await userRepository.createUser(user);
    response.json(saveUser);


}));

interface ReturnLoginUser {
    login: string,
    token: string,
    id: string
}

userRouter.post(`${path}/login`, asyncHandler(async (request, response) => {
    const user : Partial<User> = {
        login: request.body.name,
        password: request.body.password,
    };
    const userService = new UserService();
    const loginUser = await userService.loginUser(user);
    const token = jwt.sign({id: user.id}, process.env.TOKEN_JWT);
    const returnLoginUser : ReturnLoginUser = {
        login: loginUser.login,
        token: token,
        id: loginUser.id
    }
    response.json(returnLoginUser);
}));