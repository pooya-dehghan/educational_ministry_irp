export interface GetprofessorRequest {
  professorID: number;
}

export interface GetprofessorResponse {
  username: string;
  region: number;
  schools: string[];
}

export interface CreateprofessorRequest {}

export interface CreateprofessorResponse {}

export interface UpdateprofessorRequest {}

export interface UpdateprofessorResponse {}

export interface DeleteprofessoreRequest {}

export interface DeleteprofessorResponse {}

export interface GetAllProfessorRequest {}

export interface GetAllProfessorResponse {}
