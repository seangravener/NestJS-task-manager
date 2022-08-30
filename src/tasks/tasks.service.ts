import { Injectable, NotFoundException } from '@nestjs/common';

import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';

import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTasksFilterDto } from './dtos/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dtos/update-task-status.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(public tasksRepository: TasksRepository) {}

  async getTasks(filterDto: GetTasksFilterDto = {}): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  async getTaskById(id: string) {
    return await this.tasksRepository.getTaskById(id);
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: string) {
    this.tasksRepository.deleteTask(id);
  }

  async updateTaskStatus(id, dto: UpdateTaskStatusDto): Promise<void> {
    const results = await this.tasksRepository
      .updateTaskStatus(id, dto)
      .then((value) => value.affected > 0);

    if (!results) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }
}
