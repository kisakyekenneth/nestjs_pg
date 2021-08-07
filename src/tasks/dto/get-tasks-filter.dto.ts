import { TaskStatus } from '../task-status.enum';

export class GetTasksFilterDto {
  status?: TaskStatus; //Note, the question mark means this is optional field
  search?: string;
}
