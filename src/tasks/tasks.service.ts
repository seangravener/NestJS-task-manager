import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskStatus } from './task-status.enum';

import { Task } from './task.entity';

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

  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getTaskById(id: string) {
    return await this.tasksRepository.findOne({ where: { id } });
  }

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTasksWithFilters({ status, search }: GetTasksFilterDto): Task[] {
  //   let tasks = this.getAllTasks();

  //   if (status) {
  //     tasks = tasks.filter((task) => status === task.status);
  //   }

  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //     });
  //   }

  //   return tasks;
  // }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    return await this.tasksRepository.save(task);
  }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;

  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(task);
  //   return task;
  // }

  // deleteTask(id: string) {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }

  // updateTaskStatus(id: string, status: TaskStatus) {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
