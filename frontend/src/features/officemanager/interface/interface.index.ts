export interface GetOfficeManagerRequest {
  officemanagerID: number;
}

export interface GetOfficeManagerResponse {
  username: string;
  region: number;
  schools: string[];
}

export interface CreateOfficeManagerRequest {
  username: string;
  password: string;
  password_confirmation: string;
  region: string;
}

export interface CreateOfficeManagerResponse {}

export interface UpdateOfficeManagerRequest {}

export interface UpdateOfficeManagerResponse {}

export interface DeleteOfficeManagereRequest {
  id: number;
}

export interface DeleteOfficeManagerResponse {}

export interface GetAllOfficeManagersRequest {}

export interface GetAllOfficeManagersResponse {}
