import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TasksService, Repository],
})
export class TasksModule {
  constructor(private dataSource: DataSource) {}
}
