import { Injectable } from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';

import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { NotFoundException } from '@nestjs/common';
import { IEmail, mailSender } from 'src/utils/mailTester';

@Injectable()
export class TasksService {
  //Injecting TasksRepostory into our "Service" to be able to use it
  constructor(
    @InjectRepository(TasksRepository)
    private taskRepository: TasksRepository,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne(id); //Within the repo findOne with given ID
    if (!found) {
      throw new NotFoundException('Task with Id "${id}" not found');
    }
    return found;
  }
  // getTasks(): Task[] {
  //   // The tasks array is exposed on through the message to read from it
  //   return this.tasks;
  // }
  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    //console.log(result);
    if (result.affected === 0) {
      throw new NotFoundException(`Task  with ID "${id}" is not found`);
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    //The the task that you want to update by id
    const task = await this.getTaskById(id); //Re-using the getTaskById method to get Tasks given id,
    task.status = status;
    await this.taskRepository.save(task);
    return task; //Return array of Tasks
  }
  // //Upate description
  async updateTaskDescription(id: string, description: string): Promise<Task> {
    const task = await this.getTaskById(id);
    task.description = description;
    await this.taskRepository.save(task);
    return task;
  }
  //Get all the tasks
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  async sendMail(data: IEmail): Promise<any> {
    const sentMail = await mailSender(data);
    return sentMail;
  }
}
