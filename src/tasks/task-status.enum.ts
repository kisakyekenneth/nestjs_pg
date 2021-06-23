//We remove interface class because we now going to be dealing with the database directly

export enum TaskStatus {
  //With "enum" we use a comma (,) at the end while in "Interfaces" we use (;)
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
