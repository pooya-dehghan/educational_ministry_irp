export interface GetRequestsRequest {}

export interface GetRequestsResponse {}

export interface CreateRequestsRequest {}

export interface CreateRequestsResponse {}

export interface UpdateRequestsRequest {}

export interface UpdateRequestsResponse {}

export interface DeleteRequestsRequest {}

export interface DeleteRequestsResponse {}

export interface GetAllRequestsRequest {}

export interface GetAllRequestsResponse {}

export interface AcceptRequestRequest {
  school_id: number;
  request_id: number;
}

export interface AcceptRequestResponse {}

export interface RejectRequestRequest {
  id: number;
}

export interface RejectRequestResponse {}

export interface SendRequestRequest {
  region: number;
}

export interface SendRequestResponse {}
