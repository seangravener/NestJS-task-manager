import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTasksFilterDto } from './dtos/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dtos/update-task-status.dto';
import { Task } from './task.entity';

import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/:id')
  async getTaskById(@Param('id') id: string) {
    const task = await this.tasksService.getTaskById(id);

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto) {
    const { search, status } = filterDto;

    if (search || status) {
      return this.tasksService.getTasks(filterDto);
    }

    return this.tasksService.getTasks();
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() dto: UpdateTaskStatusDto,
  ): Promise<void> {
    return this.tasksService.updateTaskStatus(id, dto);
  }

  @Post()
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return await this.tasksService.createTask(createTaskDto, user);
  }
}
