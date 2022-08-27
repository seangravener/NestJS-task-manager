import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Task } from './task.entity';

import { TasksService } from './tasks.service';

@Controller('tasks')
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

  // @Get()
  // getTasks(@Query() filterDto: GetTasksFilterDto) {
  //   const { search, status } = filterDto;

  //   if (search || status) {
  //     return this.tasksService.getTasksWithFilters(filterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }

  // @Delete('/:id')
  // deleteTask(@Param('id') id: string) {
  //   console.log(id, this.tasksService.getAllTasks());
  //   return this.tasksService.deleteTask(id);
  // }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body() { status }: UpdateTaskStatusDto,
  // ): Task {
  //   return this.tasksService.updateTaskStatus(id, status);
  // }

  // @Post()
  // async createTask(
  //   @Body('title') title: string,
  //   @Body('description') description: string,
  // ): Promise<Task> {
  //   return await this.tasksService.createTask(title, description);
  // }

  // Eg. Use of pipe in controller at the "handler level"
  // @Post()
  // @UsePipes(SomePipe)
  // handlerMethod(@Body('description') description: string) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.tasksService.createTask(createTaskDto);
  }
}
