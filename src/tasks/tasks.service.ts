import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './taskStatus.enum';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ){}


    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto);
    }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if(!found) throw new NotFoundException(`Task with Id ${id} not found`);
        return found;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }
    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const found = await this.getTaskById(id);
        found.status = status;
        await found.save();
        return found;
    }

    async deleteTask(id: number): Promise<void> {

        // const found = await this.getTaskById(id);
        // found.remove();

        const result = await this.taskRepository.delete(id);
        if(!result.affected) throw new NotFoundException(`Task with Id ${id} not found`);
    }
}
