export interface GetstudentRequest {
  studentID: number;
}

export interface GetstudentResponse {
  username: string;
  region: number;
  schools: string[];
}

export interface CreatestudentRequest {}

export interface CreatestudentResponse {}

export interface UpdatestudentRequest {
  studentID: number;
}

export interface UpdatestudentResponse {}

export interface DeletestudenteRequest {
  id: number;
}

export interface DeletestudentResponse {}

export interface GetAllstudentsRequest {}

export interface GetAllstudentsResponse {}
