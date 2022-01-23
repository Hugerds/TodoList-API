import { DeepPartial, EntityRepository, Repository } from "typeorm";
import { Task } from "../Models/Task";

@EntityRepository(Task)
class TaskRepository extends Repository<Task> {
    async createTask(taskProps: Partial<Task>) : Promise<Task> {
        const task = this.create(taskProps);
        await this.save(task);
        return task;
    }

    async getAllTasks(skipIndex: number) : Promise<Task[]> {
        const tasks = await this.find({take: 50, skip: skipIndex, where: {excluido: false}});
        return tasks;
    }

    async getTaskById(id: string) : Promise<Task> {
        const tasks = await this.findOne(id);
        return tasks;
    }

    async updateTask(taskProps: Partial<Task>) : Promise<Partial<Task>> {
        const tasks = await this.update(taskProps.id, taskProps);
        return taskProps;
    }

    async completeTask(id: string) : Promise<Task> {
        const task = await this.getTaskById(id);
        task.completed = !task.completed;
        const newTask = this.create(task);
        const updateTask = await this.updateTask(newTask);
        if(!updateTask)
            return undefined;
        return newTask;
    }

    async deleteTask(id: string) : Promise<boolean> {
        const task = await this.getTaskById(id);
        task.excluido = true;
        const updateTask = await this.updateTask(task);
        if(!updateTask)
            return false;
        return true;
    }

} export default TaskRepository;