import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  // @Get()
  // getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
  //   //If we have any filters defined, we call tasksService.getTasksWilFilters
  //   //Other Just get all the tasks
  //   //Since we using model which is of Array type, the required method from service returns an array so this must also return an array.
  //   if (Object.keys(filterDto).length) {
  //     return this.taskService.getTaskWithFilters(filterDto);
  //   } else {
  //     return this.taskService.getTasks();
  //   }
  // }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    //Getting the parameter passed using @param('id') and storing them into an "id" of type string
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskdto: CreateTaskDto): Promise<Task> {
    //Modifying our code to be able to capture data in-form of DTOs passed as parameters in the tables
    return this.taskService.createTask(createTaskdto);
  }

  // @Delete('/:id')
  // deleteTask(@Param('id') id: string): void {
  //   return this.taskService.deleteTask(id);
  // }

  // //Since we can have an instance to patch given number of field, like @patch('/:id/description') given the id
  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status') status: TaskStatus,
  // ): Task {
  //   //Patch requires getting "id" from params  which was sent and get "Status" from the Body
  //   return this.taskService.updateTaskStatus(id, status);
  // }

  // @Patch('/:id/description')
  // updateTaskDescription(
  //   @Param('id') id: string,
  //   @Body('description') description: string,
  // ): Task {
  //   return this.taskService.updateTaskDescription(id, description);
  // }
}
