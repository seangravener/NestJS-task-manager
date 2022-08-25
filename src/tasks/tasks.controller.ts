import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { createTaskDto } from './create-task.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    console.log(id, this.tasksService.getAllTasks());
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }

  // @Post()
  // async createTask(
  //   @Body('title') title: string,
  //   @Body('description') description: string,
  // ): Promise<Task> {
  //   return await this.tasksService.createTask(title, description);
  // }

  @Post()
  async createTask(@Body() createTaskDto: createTaskDto): Promise<Task> {
    return await this.tasksService.createTask(createTaskDto);
  }
}
