import { Injectable, NotFoundException } from '@nestjs/common';

import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';

import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTasksFilterDto } from './dtos/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dtos/update-task-status.dto';

const initTasks = [
  {
    id: '1',
    title: 'First task.',
    description: 'Hard coded.',
    status: 'OPEN',
  },
  {
    id: '2',
    title: 'Second task.',
    description: 'Hard coded.',
    status: 'IN_PROGRESS',
  },
] as Task[];

@Injectable()
export class TasksService {
  private tasks: Task[] = [...initTasks];

  constructor(public tasksRepository: TasksRepository) {}

  async getAllTasks() {
    return await this.tasksRepository.getAllTasks();
  }

  async getTaskById(id: string) {
    return await this.tasksRepository.getTaskById(id);
  }

  async getTasks(filterDto: GetTasksFilterDto = {}): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
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
