export interface GetTeacherRequest {
  teacherID: number;
}

export interface GetTeacherResponse {
  username: string;
  region: number;
  schools: string[];
  students: [];
}

export interface CreateTeacherRequest {}

export interface CreateTeacherResponse {}

export interface UpdateTeacherRequest {}

export interface UpdateTeacherResponse {}

export interface DeleteTeacherRequest {}

export interface DeleteTeacherResponse {}

export interface GetAllTeachersRequest {}

export interface GetAllTeachersResponse {}
