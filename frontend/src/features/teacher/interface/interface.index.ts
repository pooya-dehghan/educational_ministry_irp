export interface GetteacherRequest {
  teacherID: number;
}

export interface GetteacherResponse {
  username: string;
  region: number;
  schools: string[];
}

export interface CreateteacherRequest {}

export interface CreateteacherResponse {}

export interface UpdateteacherRequest {}

export interface UpdateteacherResponse {}

export interface DeleteteachereRequest {
  id: number;
}

export interface DeleteteacherResponse {}

export interface GetAllteachersRequest {}

export interface GetAllteachersResponse {}
