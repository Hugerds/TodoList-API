import { Router } from "express";
import asyncHandler from "express-async-handler";
import { getCustomRepository } from "typeorm";
import authMiddleware from "../middlewares/authMiddlewares";
import { Task} from "../Models/Task";
import TaskRepository from "../Repositories/TaskRepository";

export const taskRouter = Router();
const path = "/task";

taskRouter.get(`${path}`, authMiddleware, asyncHandler(async (request, response) => {
    const taskRepository = getCustomRepository(TaskRepository);
    const page = parseInt(request.query.page as string);
    const skipIndex = (page - 1) * 50;
    const tasks = await taskRepository.getAllTasks(skipIndex);
    response.json(tasks);
}));

taskRouter.post(`${path}`, authMiddleware, asyncHandler(async (request, response) => {
    const task : Partial<Task> = {
        title: request.body.title as string,
        userId: request.body.userId as string,
        completed: request.body.completed as boolean
    };
    task.excluido = false;
    const taskRepository = getCustomRepository(TaskRepository);
    const save = await taskRepository.createTask(task);
    response.json(save);
    
}));

taskRouter.post(`${path}/completeTask`, authMiddleware, asyncHandler(async (request, response) => {
    const task : Partial<Task> = {
        completed: request.body.completed as boolean,
        id: request.body.id as string,
    };
    const taskRepository = getCustomRepository(TaskRepository);
    const save = await taskRepository.completeTask(task.id);
    response.json(save);
}));

taskRouter.delete(`${path}/:id`, authMiddleware, asyncHandler(async (request, response) => {
    const taskRepository = getCustomRepository(TaskRepository);
    const id = request.params.id as string;
    const tasks = await taskRepository.deleteTask(id);
    response.json(tasks);
}));