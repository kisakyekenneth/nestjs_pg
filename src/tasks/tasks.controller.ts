import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IEmail } from 'src/utils/mailTester';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
// To protect an entire route, import AuthModule under tasks module
//Then use the @useGuard() which protects users from navigating without token
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskService.getTasks(filterDto);
  }

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
  @Post('/email')
  sendMail(@Body() emailDto: IEmail): Promise<any> {
    //Modifying our code to be able to capture data in-form of DTOs passed as parameters in the tables
    return this.taskService.sendMail(emailDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }

  // //Since we can have an instance to patch given number of field, like @patch('/:id/description') given the id
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Promise<Task> {
    //Patch requires getting "id" from params  which was sent and get "Status" from the Body
    return this.taskService.updateTaskStatus(id, status);
  }

  // @Patch('/:id/description')
  updateTaskDescription(
    @Param('id') id: string,
    @Body('description') description: string,
  ): Promise<Task> {
    return this.taskService.updateTaskDescription(id, description);
  }
}
