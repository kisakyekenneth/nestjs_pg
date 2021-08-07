import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  //Create Tasks, since its direct db interaction
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    //this.taskRepository turns to this. since we are now into the Repo
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    //Then the tastRepository handles task of saving it
    await this.save(task);
    return task;
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    //Destruct filterDto
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task'); //TypeOrm interprets this query as an entity
    //With QueryBuilder you create queries based on certain conditions
    if (status) {
      query.andWhere('tast.status = :status', { status }); //:status is a variable and is defined by {status} provided to us from filterDto
    }
    if (search) {
      //Use the like statement to find similar test and %${search}% search anything that has 2 or 3 charaters provided
      //Using the LOWER keyword converts UPPERCASE to LOWERCASE. This solves cases when user enters UPPERCASE TO SEARCH
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.discription) LIKE LOWER(:search)',
        { search: `%${search}%}` },
      ); //Wrapping the content from DataBase to LOWERCASE and that of variable to LOWERCASE for easier compare
    }
    //Else getMany, or get all tasks
    const tasks = await query.getMany();
    return tasks;
  }
  //QueryBuilder uses the tasksRepository to create a query object for tasks
  //Arg dictates how we refer to task within the query
  //With QueryBuilder you create queries based on certain conditions
}
