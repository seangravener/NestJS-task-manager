import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TasksRepository } from './tasks.repository';
import { TaskStatus } from './task-status.enum';

import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
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

  // async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
  //   return await this.tasksRepository.getAllTasks();
  // }

  async getAllTasks() {
    return await this.tasksRepository.getAllTasks();
  }

  async getTaskById(id: string) {
    return await this.tasksRepository.getTaskById(id);
  }

  async getTasks({ status, search }: GetTasksFilterDto = {}): Promise<Task[]> {
    let tasks = await this.tasksRepository.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => status === task.status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
      });
    }

    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async deleteTask(id: string) {
    this.tasksRepository.deleteTask(id);
  }

  async updateTaskStatus(id, dto: UpdateTaskStatusDto): Promise<boolean> {
    return await this.tasksRepository
      .updateTaskStatus(id, dto)
      .then((value) => !!value.affected);
  }
}
