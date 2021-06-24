import { Injectable } from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';

import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { NotFoundException } from '@nestjs/common';

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
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    //Create Object based on a repository(taskRepository)
    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    //Then the tastRepository handles task of saving it
    await this.taskRepository.save(task);
    return task;
  }
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   //Use the destructuring structure of ES6 to get title and description from DTO
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     //uuid an npm package used to auto-generate unique ids
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task; //Return task to controller
  // }

  // deleteTask(id: string): void {
  //   //Filter tasks and only store the tasks not containing the sent id
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  // }
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   //The the task that you want to update by id
  //   const task = this.getTaskById(id); //Re-using the getTaskById method to get Tasks given id,
  //   task.status = status;
  //   return task; //Return array of Tasks
  // }
  // //Upate description
  // updateTaskDescription(id: string, description: string): Task {
  //   const task = this.getTaskById(id);
  //   task.description = description;
  //   return task;
  // }
  // getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   //Define a temporary array to hold the results
  //   let allTasks = this.getTasks();
  //   if (status) {
  //     //filter through array of tasks with "task" as the iterator to find if task.status in array = querried status
  //     allTasks = allTasks.filter((task) => task.status === status); //Only those with status we are looking for will be stored.
  //   }
  //   if (search) {
  //     allTasks = allTasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true; //Includes used to filter and compare array with search string
  //       }
  //       return false;
  //     });
  //   }
  //   return allTasks;
  // }
}
