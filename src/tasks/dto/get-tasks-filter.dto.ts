import { TaskStatus } from '../tasks.model';

export class GetTasksFilterDto {
  status?: TaskStatus; //Note, the question mark means this is optional field
  search?: string;
}
