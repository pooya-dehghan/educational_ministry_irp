export interface GetTaskRequest {}

export interface GetTaskResponse {}

export interface CreateTaskRequest {
  title: string;
  description: string;
  deadline: string;
}

export interface CreateTaskResponse {}

export interface UploadTaskRequest {
  task_id: number;
}

export interface UploadTaskResponse {}
