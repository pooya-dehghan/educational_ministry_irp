export interface GetProfessorRequest {
  id: number;
}

export interface GetProfessorResponse {
  username: string;
  region: number;
  schools: string[];
}

export interface CreateProfessorRequest {}

export interface CreateProfessorResponse {}

export interface UpdateProfessorRequest {
  id: number;
}

export interface UpdateProfessorResponse {}

export interface DeleteProfessorRequest {
  id: number;
}

export interface DeleteProfessorResponse {}

export interface GetAllProfessorsRequest {}

export interface GetAllProfessorResponse {}
