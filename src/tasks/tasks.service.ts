import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { createTaskDto } from './create-task.dto';

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
    status: 'OPEN',
  },
] as Task[];

@Injectable()
export class TasksService {
  private tasks: Task[] = [...initTasks];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => id === task.id);
  }

  createTask(createTaskDto: createTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
