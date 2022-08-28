import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTasksFilterDto } from './dtos/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dtos/update-task-status.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(Task)
    public dataSource: Repository<Task>,
  ) {}

  async getTasks({ status, search }: GetTasksFilterDto): Promise<Task[]> {
    const query = this.dataSource.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` }, // percents for %fuzzy search%
      );
    }

    return await query.getMany();
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.dataSource.find();
  }

  async getTaskById(id: string): Promise<Task> {
    return await this.dataSource.findOne({ where: { id } });
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.dataSource.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    return await this.dataSource.save(task);
  }

  async deleteTask(id: string) {
    await this.dataSource.delete(id);
  }

  async updateTaskStatus(id, { status }: UpdateTaskStatusDto) {
    const task = await this.getTaskById(id);
    task.status = status;

    return this.dataSource.update(id, task);
  }
}
